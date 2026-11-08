// Local preview server for 4YOS Web Edition with required COOP/COEP isolation headers for OPFS.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distWeb = path.resolve(root, 'dist-web');
const PORT = parseInt(process.env.PORT || '4173', 10);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.wasm': 'application/wasm',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

export function startPreviewServer(port = PORT) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const parsedUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

      // Admin Operations API mock for local preview hosting
      if (parsedUrl.pathname.startsWith('/admin')) {
        const auth = req.headers['authorization'] || '';
        if (auth !== 'Bearer test-owner-secret-key-4yos') {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, error: 'Unauthorized' }));
          return;
        }

        if (parsedUrl.pathname === '/admin/overview') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            ok: true,
            overview: {
              totalStudents: 142,
              activeDevices: 180,
              totalPurchases: 45,
              successfulPurchases: 44,
              grossRevenueNaira: 44000,
              totalRefunds: 1,
              refundedAmountNaira: 1000,
              openMistakeReports: 2,
              pendingSchoolRequests: 3,
              activeCircles: 12,
            }
          }));
          return;
        }

        if (parsedUrl.pathname === '/admin/purchases') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            ok: true,
            purchases: [
              {
                id: 'purch_preview_1',
                reference: '4YOS-PREVIEW-REF-01',
                phone: '+2348012345678',
                itemType: 'course',
                itemId: 'mth101',
                amountNaira: 1000,
                status: 'success',
                createdAt: Math.floor(Date.now() / 1000) - 2000,
                verifiedAt: Math.floor(Date.now() / 1000) - 1900,
              }
            ]
          }));
          return;
        }

        if (parsedUrl.pathname === '/admin/codes') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            ok: true,
            codes: [
              { code: 'UNIPORT15', discountPercent: 15, school: 'UNIPORT', maxUses: 100, usesCount: 14 }
            ]
          }));
          return;
        }
      }

      let filePath = path.join(distWeb, decodeURIComponent(parsedUrl.pathname));

      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }

      // SPA fallback
      if (!fs.existsSync(filePath)) {
        filePath = path.join(distWeb, 'index.html');
      }

      if (!fs.existsSync(filePath)) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not Found');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      const isCompressible = /\.(html|js|mjs|css|json|svg|webmanifest)$/.test(ext);
      const acceptEncoding = req.headers['accept-encoding'] || '';

      const headers = {
        'Content-Type': contentType,
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Access-Control-Allow-Origin': '*'
      };

      if (isCompressible && acceptEncoding.includes('gzip')) {
        headers['Content-Encoding'] = 'gzip';
        const raw = fs.readFileSync(filePath);
        const compressed = zlib.gzipSync(raw);
        res.writeHead(200, headers);
        res.end(compressed);
        return;
      }

      res.writeHead(200, headers);
      fs.createReadStream(filePath).pipe(res);
    });

    server.listen(port, () => {
      const actualPort = server.address().port;
      const url = `http://127.0.0.1:${actualPort}/`;
      resolve({ server, url });
    });
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { url } = await startPreviewServer();
  console.log(`4YOS Web Preview server running at: ${url}`);
}
