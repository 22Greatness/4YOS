import { cpSync, existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const metadata = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
if (process.platform !== 'win32' || process.arch !== 'x64') throw Error('Run this on 64-bit Windows.');
const output = join(root, 'release', '4YOS-' + metadata.version + '-win-x64');
if (existsSync(output)) throw Error('This release folder already exists. Move it before rebuilding.');
cpSync(join(root, 'node_modules/electron/dist'), output, { recursive: true, errorOnExist: true, force: false });
renameSync(join(output, 'electron.exe'), join(output, '4YOS.exe'));
const app = join(output, 'resources', 'app');
mkdirSync(app, { recursive: true });
writeFileSync(join(app, 'package.json'), JSON.stringify({
  name: metadata.name, productName: metadata.productName, version: metadata.version, main: metadata.main,
}));
cpSync(join(root, 'dist'), join(app, 'dist'), { recursive: true });
const sqlite = 'better-sqlite3-multiple-ciphers';
const from = join(root, 'node_modules', sqlite);
const to = join(app, 'node_modules', sqlite);
mkdirSync(join(to, 'prebuilds'), { recursive: true });
cpSync(join(from, 'lib'), join(to, 'lib'), { recursive: true });
for (const path of ['package.json', 'LICENSE', 'prebuilds/win32-x64.node']) cpSync(join(from, path), join(to, path));
console.log(join(output, '4YOS.exe'));

