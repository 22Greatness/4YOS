import { get } from 'node:https';

export type Citation = { doi: string; title: string; authors: string[]; publisher: string; year: number | null };

export function parseDoi(value: string) {
  const doi = value.trim().replace(/^https:\/\/doi\.org\//i, '').replace(/^doi:\s*/i, '');
  if (doi.length > 240 || !/^10\.\d{4,9}\/[a-z0-9._;()<>:+/-]+$/i.test(doi)) throw Error('Enter a DOI or a doi.org link.');
  return doi;
}

function safeText(value: unknown, max = 300) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export function lookupCitation(doi: string, signal: AbortSignal): Promise<Citation> {
  return new Promise((resolve, reject) => {
    const req = get({
      hostname: 'api.crossref.org', path: '/works/' + encodeURIComponent(doi), agent: false,
      signal: AbortSignal.any([signal, AbortSignal.timeout(12000)]),
      headers: { accept: 'application/json', 'user-agent': '4YOS/0.1 (explicit public DOI lookup)' },
    }, response => {
      if (response.statusCode !== 200) {
        response.resume();
        reject(Error(response.statusCode === 404 ? 'Crossref has no record for this DOI.'
          : response.statusCode === 429 ? 'Crossref is limiting requests. Try again later.'
          : 'Crossref is unavailable. Try again later.'));
        return;
      }
      const chunks: Buffer[] = [];
      let bytes = 0;
      response.on('data', (chunk: Buffer) => {
        bytes += chunk.length;
        if (bytes > 2 * 1024 * 1024) response.destroy(Error('This citation record is too large.'));
        else chunks.push(chunk);
      });
      response.once('error', reject);
      response.once('end', () => {
        try {
          const work = JSON.parse(Buffer.concat(chunks).toString('utf8')).message;
          if (!work || typeof work.DOI !== 'string' || work.DOI.toLowerCase() !== doi.toLowerCase()) throw Error();
          const year = work.issued?.['date-parts']?.[0]?.[0];
          const authors = Array.isArray(work.author) ? work.author.slice(0, 8).map((author: { given?: unknown; family?: unknown; name?: unknown } | null) =>
            safeText(author?.name) || [safeText(author?.given, 80), safeText(author?.family, 100)].filter(Boolean).join(' ')).filter(Boolean) : [];
          resolve({ doi: work.DOI, title: safeText(work.title?.[0], 600), authors, publisher: safeText(work.publisher), year: Number.isInteger(year) ? year : null });
        } catch { reject(Error('Crossref returned an unreadable citation.')); }
      });
    });
    req.once('error', reject);
  });
}
