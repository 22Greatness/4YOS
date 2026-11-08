// Programme maps and their gap report. Usage: node scripts/programmes.mjs [--check]
//
// Each university programme is one text file in app/programmes/<university>/<programme>.txt:
//   # name: Computer Science            header lines: name, university, source, verified (yes or no)
//   100 | COS 101 | Introduction to Computing Sciences | 3 | core | how-computers-work
//   level | code | title | units (? if unknown) | core, elective, general or siwes | bank courses, comma separated, or empty
// Bank courses are the courses in docs/13-full-curriculum.md, named by their title in lower case with dashes,
// such as "numbers-and-algebra". A bank course is ready once a course.md with that title exists in app/content.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const app = new URL('..', import.meta.url).pathname.replace(/^\/(\w:)/, '$1');
const slug = title => title.toLowerCase().replace(/\(.*?\)/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]);

const bank = new Map([...readFileSync(join(app, '../docs/13-full-curriculum.md'), 'utf8').matchAll(/^### (.+?) \((\d+) lessons\)/gm)].map(m => [slug(m[1]), { title: m[1], lessons: +m[2], ready: false }]));
for (const file of walk(join(app, 'content')).filter(f => f.endsWith('course.md'))) {
  const title = readFileSync(file, 'utf8').match(/^title: (.+)$/m)?.[1]; const course = title && bank.get(slug(title));
  if (course) course.ready = true;
}

const problems = [], maps = [];
const dir = join(app, 'programmes');
for (const file of existsSync(dir) ? walk(dir).filter(f => f.endsWith('.txt')) : []) {
  const where = relative(app, file), head = {}, rows = [];
  readFileSync(file, 'utf8').split(/\r?\n/).forEach((line, i) => {
    const at = `${where}:${i + 1}`;
    if (line.startsWith('#')) { const [k, ...v] = line.slice(1).split(':'); head[k.trim()] = v.join(':').trim(); return; }
    if (!line.trim()) return;
    const [level, code, title, units, group, courses = ''] = line.split('|').map(s => s.trim());
    if (!/^[1-5]00$/.test(level)) problems.push(`${at}: level must be 100 to 500`);
    if (!/^[A-Z]{3} ?\d{3}$/.test(code ?? '')) problems.push(`${at}: course code looks wrong: ${code}`);
    if (units !== '?' && !/^\d+$/.test(units ?? '')) problems.push(`${at}: units must be a number or ?`);
    if (!['core', 'elective', 'general', 'siwes'].includes(group)) problems.push(`${at}: group must be core, elective, general or siwes`);
    const ids = courses.split(',').map(s => s.trim()).filter(Boolean);
    ids.filter(id => !bank.has(id)).forEach(id => problems.push(`${at}: "${id}" isn't a course in doc 13`));
    if (rows.some(r => r.code === code)) problems.push(`${at}: ${code} appears twice`);
    rows.push({ level, code, title, units, group, ids });
  });
  maps.push({ where, head, rows });
}
if (problems.length || process.argv.includes('--check')) {
  console.log(problems.length ? problems.join('\n') : `Programme maps OK: ${maps.length}`);
  process.exit(problems.length ? 1 : 0);
}

const state = row => !row.ids.length ? (row.group === 'siwes' ? 'placement' : 'missing') : row.ids.every(id => bank.get(id).ready) ? 'ready' : 'planned';
const out = ['# Programme gap report', '', `Bank: ${bank.size} courses, ${[...bank.values()].filter(c => c.ready).length} ready.`, ''];
for (const { where, head, rows } of maps) {
  const count = s => rows.filter(r => state(r) === s).length;
  out.push(`## ${head.university ?? '?'} · ${head.name ?? where}`, `Source: ${head.source ?? '?'} · verified: ${head.verified ?? 'no'}`, '',
    `${rows.length} courses: ${count('ready')} ready, ${count('planned')} planned, ${count('missing')} with no bank course, ${count('placement')} placements. Unknown units: ${rows.filter(r => r.units === '?').length}.`, '');
  const missing = rows.filter(r => state(r) === 'missing');
  if (missing.length) out.push('**No bank course yet:** ' + missing.map(r => `${r.code} ${r.title}`).join(' · '), '');
}
const need = new Map(); // course -> programme -> codes
for (const { head, rows } of maps) for (const r of rows) for (const id of r.ids) if (!bank.get(id).ready) {
  const by = need.get(id) ?? new Map(); need.set(id, by); by.set(head.name, [...(by.get(head.name) ?? []), r.code]);
}
const codes = by => [...by.values()].flat().length;
out.push('## Bank courses to write, most needed first', '', '| Course | Lessons | Programmes | Codes |', '|---|---|---|---|',
  ...[...need].sort((a, b) => b[1].size - a[1].size || codes(b[1]) - codes(a[1])).map(([id, by]) => `| ${bank.get(id).title} | ${bank.get(id).lessons} | ${by.size} | ${[...by].map(([name, c]) => `${name}: ${c.join(', ')}`).join('; ')} |`));
console.log(out.join('\n'));
