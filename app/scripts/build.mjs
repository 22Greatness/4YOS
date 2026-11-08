// Builds the main process, preload, core process and interface into dist/.
import { build as esbuild } from 'esbuild';
import { build as vite } from 'vite';
import react from '@vitejs/plugin-react';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generate } from './lessons.mjs';
import { curriculumOutline } from './curriculum-outline.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
rmSync(resolve(root, 'dist'), { recursive: true, force: true });
generate();

const node = { bundle: true, platform: 'node', target: 'node22', format: 'cjs', sourcemap: false, logLevel: 'warning', define: { 'process.env.NODE_ENV': '"production"' } };
await esbuild({ ...node, entryPoints: [resolve(root, 'src/main/main.ts')], outfile: resolve(root, 'dist/main/main.js'), external: ['electron'] });
await esbuild({ ...node, entryPoints: [resolve(root, 'src/main/preload.ts')], outfile: resolve(root, 'dist/main/preload.js'), external: ['electron'] });
await esbuild({ ...node, entryPoints: [resolve(root, 'src/core/core.ts')], outfile: resolve(root, 'dist/core/core.js'), external: ['better-sqlite3-multiple-ciphers', 'electron'] });
await esbuild({ ...node, entryPoints: [resolve(root, 'src/mcp/server.ts')], outfile: resolve(root, 'dist/mcp/server.cjs') });

const licenses = resolve(root, 'dist/licenses');
mkdirSync(licenses, { recursive: true });
cpSync(resolve(root, 'node_modules/ical.js/LICENSE'), resolve(licenses, 'ical.js-MPL-2.0.txt'));
writeFileSync(resolve(licenses, 'ical.js-NOTICE.txt'), 'ical.js 2.2.1 by Philipp Kewisch and contributors is distributed under the Mozilla Public License 2.0.\nUnmodified upstream source: https://github.com/kewisch/ical.js/tree/277d52c8db379f133a88957793e03997a65307f4\n');

await vite({
  root: resolve(root, 'src/renderer'), base: 'app://4yos/', configFile: false, logLevel: 'warn', plugins: [react()],
  build: { outDir: resolve(root, 'dist/renderer'), emptyOutDir: true, chunkSizeWarningLimit: 4000, assetsInlineLimit: 0 },
});

// Ship the assets used by the classroom, excluding authoring drafts.
const res = resolve(root, 'resources');
for (const name of ['clips', 'content/lessons.json', 'content/checks.json', 'content/hcw-courses.json', 'content/lectures', 'content/channel-topics.json']) {
  const output = resolve(root, 'dist/resources', name);
  mkdirSync(dirname(output), { recursive: true });
  cpSync(resolve(res, name), output, { recursive: true });
}
const py = resolve(root, 'node_modules/pyodide');
const lessons = JSON.parse(readFileSync(resolve(res, 'content/lessons.json'), 'utf8'));
const published = lessons.map(({ id, title, pack, minutes, source, url, goal, sections, practice }) => ({ id, title, pack, minutes, source, url, goal, sections, practice: practice.blocks }));
writeFileSync(resolve(root, 'dist/resources/content/public-lessons.json'), JSON.stringify(published));
const transcripts = Object.fromEntries(lessons.flatMap(({ id, bundledLecture, video }) => {
  const path = resolve(res, 'content/lectures', id + '.vtt');
  if (!(bundledLecture || video) || !existsSync(path)) return [];
  const cues = readFileSync(path, 'utf8').split(/\r?\n\s*\r?\n/).flatMap(block => {
    const lines = block.split(/\r?\n/);
    const timing = lines.findIndex(line => /^\d+(?::\d{2}){1,2}\.\d{3}\s+-->/.test(line));
    return timing < 0 ? [] : lines.slice(timing + 1);
  });
  return [[id, cues.join(' ').replace(/<[^>]+>/g, '')]];
}));
writeFileSync(resolve(root, 'dist/resources/content/transcripts.json'), JSON.stringify(transcripts));
const outline = curriculumOutline(readFileSync(resolve(root, '../docs/13-full-curriculum.md'), 'utf8'));
writeFileSync(resolve(root, 'dist/resources/content/curriculum-outline.json'), JSON.stringify(outline));
cpSync(resolve(root, '../docs/research/course-resources.json'), resolve(root, 'dist/resources/content/course-resources.json'));
if (existsSync(py)) {
  mkdirSync(resolve(root, 'dist/resources/pyodide'), { recursive: true });
  for (const f of ['pyodide.asm.mjs', 'pyodide.asm.wasm', 'pyodide.mjs', 'python_stdlib.zip', 'pyodide-lock.json'])
    if (existsSync(resolve(py, f))) cpSync(resolve(py, f), resolve(root, 'dist/resources/pyodide', f));
}
console.log('built');
