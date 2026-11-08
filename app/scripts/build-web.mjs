// Builds the Web Edition into dist-web/ without touching the Electron desktop dist/.
import { build as esbuild } from 'esbuild';
import { build as vite } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distWeb = path.resolve(root, 'dist-web');

export async function buildWebScaffold() {
  console.log('Building Web Worker and doorway...');
  // 1. Build Web Worker with embedded WASM
  await esbuild({
    entryPoints: [path.resolve(root, 'src/web/worker.ts')],
    outfile: path.resolve(root, 'src/web/worker.js'),
    bundle: true,
    format: 'esm',
    target: 'es2022',
    loader: { '.wasm': 'binary' },
    logLevel: 'warning'
  });

  // 2. Build Web Client Doorway
  await esbuild({
    entryPoints: [path.resolve(root, 'src/web/client.ts')],
    outfile: path.resolve(root, 'src/web/client.js'),
    bundle: true,
    format: 'esm',
    target: 'es2022',
    logLevel: 'warning'
  });

  console.log('Building Web App Shell with Vite into dist-web/...');
  const assetsDir = path.resolve(distWeb, 'assets');
  if (fs.existsSync(assetsDir)) {
    fs.rmSync(assetsDir, { recursive: true, force: true });
  }

  // 3. Build Web App Shell with Vite
  await vite({
    root: path.resolve(root, 'src/web'),
    base: './',
    configFile: false,
    logLevel: 'warn',
    plugins: [react(), {
      name: 'preload-study-entry',
      transformIndexHtml: {
        order: 'post',
        handler(_html, { bundle }) {
          const study = Object.values(bundle ?? {}).find(output =>
            output.type === 'chunk' && output.isDynamicEntry && output.facadeModuleId?.endsWith('/App.tsx'));
          if (!study) return [];
          return [{
            tag: 'script',
            children: `if (new URLSearchParams(location.search).get('study') === '1') {
              const link = document.createElement('link');
              link.rel = 'modulepreload';
              link.href = ${JSON.stringify('./' + study.fileName)};
              document.head.append(link);
            }`,
            injectTo: 'head-prepend',
          }];
        },
      },
    }],
    build: {
      outDir: distWeb,
      emptyOutDir: false,
      chunkSizeWarningLimit: 4000,
      assetsInlineLimit: 0
    }
  });

  console.log('Building Service Worker with exact precache manifest...');
  // 4. Discover hashed assets created by Vite
  const assetFiles = fs.existsSync(assetsDir)
    ? fs.readdirSync(assetsDir).map(f => './assets/' + f)
    : [];

  // Build Service Worker
  await esbuild({
    entryPoints: [path.resolve(root, 'src/web/sw.ts')],
    outfile: path.resolve(distWeb, 'sw.js'),
    bundle: true,
    format: 'esm',
    target: 'es2022',
    define: {
      __ASSETS__: JSON.stringify(assetFiles)
    },
    logLevel: 'warning'
  });

  // 5. Copy Web Worker and WASM into dist-web
  fs.copyFileSync(
    path.resolve(root, 'src/web/worker.js'),
    path.resolve(distWeb, 'worker.js')
  );

  // 6. Copy PWA manifest and icons
  fs.copyFileSync(
    path.resolve(root, 'src/web/manifest.webmanifest'),
    path.resolve(distWeb, 'manifest.webmanifest')
  );

  const iconsDir = path.resolve(distWeb, 'icons');
  if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });
  fs.copyFileSync(path.resolve(root, 'src/web/icons/icon-192.png'), path.resolve(iconsDir, 'icon-192.png'));
  fs.copyFileSync(path.resolve(root, 'src/web/icons/icon-512.png'), path.resolve(iconsDir, 'icon-512.png'));

  // 7. Copy Ayo WebP and PNG Art
  const artDir = path.resolve(distWeb, 'art');
  if (!fs.existsSync(artDir)) fs.mkdirSync(artDir, { recursive: true });
  const artSourceDir = path.resolve(root, '../art/web');
  if (fs.existsSync(artSourceDir)) {
    for (const f of fs.readdirSync(artSourceDir)) {
      if (f.endsWith('.webp') || f.endsWith('.png')) {
        fs.copyFileSync(path.join(artSourceDir, f), path.join(artDir, f));
      }
    }
  }

  // 8. Create free-courses.json
  const contentDir = path.resolve(distWeb, 'content');
  if (!fs.existsSync(contentDir)) fs.mkdirSync(contentDir, { recursive: true });

  // 9. Copy course packs into dist-web
  const packsDir = path.resolve(distWeb, 'packs');
  if (!fs.existsSync(packsDir)) fs.mkdirSync(packsDir, { recursive: true });
  const sourcePacksDir = path.resolve(root, 'resources/packs');
  if (fs.existsSync(sourcePacksDir)) {
    for (const f of fs.readdirSync(sourcePacksDir)) {
      fs.copyFileSync(path.join(sourcePacksDir, f), path.join(packsDir, f));
    }
  }

  // 10. Copy ONLY original 4YOS Camp lecture media and generate unified transcripts.json
  const lecturesDir = path.resolve(distWeb, 'lectures');
  if (!fs.existsSync(lecturesDir)) fs.mkdirSync(lecturesDir, { recursive: true });
  const sourceLecturesDir = path.resolve(root, 'resources/content/lectures');
  const campLectureIds = ['p1-test-function', 'dd-quartiles', 'mth-sets'];
  const lectureExtensions = ['.mp4', '.vtt', '.webp'];

  const webTranscripts = {};

  for (const id of campLectureIds) {
    for (const ext of lectureExtensions) {
      const src = path.join(sourceLecturesDir, id + ext);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(lecturesDir, id + ext));
      }
    }

    // Parse VTT cues for seekable transcript
    const vttPath = path.join(sourceLecturesDir, id + '.vtt');
    if (fs.existsSync(vttPath)) {
      const vttContent = fs.readFileSync(vttPath, 'utf8');
      const blocks = vttContent.split(/\r?\n\s*\r?\n/);
      const cues = [];
      for (const block of blocks) {
        const lines = block.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
        const timeLineIdx = lines.findIndex(l => /^\d+(?::\d{2}){1,2}\.\d{3}\s+-->/.test(l));
        if (timeLineIdx !== -1) {
          const m = lines[timeLineIdx].match(/^(?:(\d+):)?(\d{2}):(\d{2})\.(\d{3})/);
          let startSec = 0;
          let startLabel = '00:00';
          if (m) {
            const hours = m[1] ? parseInt(m[1], 10) : 0;
            const min = parseInt(m[2], 10);
            const sec = parseInt(m[3], 10);
            const ms = parseInt(m[4], 10);
            startSec = hours * 3600 + min * 60 + sec + ms / 1000;
            startLabel = `${String(hours * 60 + min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
          }
          const text = lines.slice(timeLineIdx + 1).join(' ').replace(/<[^>]+>/g, '').trim();
          if (text) {
            cues.push({ start: startLabel, startSec, text });
          }
        }
      }
      webTranscripts[id] = cues;
    }
  }

  // Save generated transcripts.json to both app/src/web/ and dist-web/content/
  fs.writeFileSync(path.resolve(contentDir, 'transcripts.json'), JSON.stringify(webTranscripts, null, 2));
  fs.writeFileSync(path.resolve(root, 'src/web/transcripts.json'), JSON.stringify(webTranscripts, null, 2));

  const freeCourses = {
    meta: {
      tier: "free",
      description: "Free complete 100L courses, foundational lectures and first units for 4YOS Camp Web Edition"
    },
    courses: [
      {
        code: "MTH101",
        title: "Numbers and Algebra",
        type: "full_free",
        lessonsCount: 35,
        summary: "From first basics to polynomials, surds, logarithms, and quadratics."
      },
      {
        code: "COS102",
        title: "Programming 1",
        type: "unit1_free",
        lessonsCount: 39,
        summary: "Algorithms, Python essentials, decisions, loops, and structured problem-solving."
      },
      {
        code: "STA111",
        title: "Describing Data",
        type: "unit1_free",
        lessonsCount: 27,
        summary: "Frequency distributions, charts, measures of location and spread with Nigerian data."
      },
      {
        code: "MTH111",
        title: "Sets, Logic and Proof",
        type: "partial_course",
        lessonsCount: 1,
        summary: "Venn diagrams, set notation, union and intersection, truth values, and direct reasoning (Course partial)."
      }
    ]
  };

  fs.writeFileSync(
    path.resolve(contentDir, 'free-courses.json'),
    JSON.stringify(freeCourses, null, 2)
  );

  console.log('Web edition built successfully in dist-web/.');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await buildWebScaffold();
}
