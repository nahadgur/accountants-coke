const fs = require('fs');
const path = require('path');

const CSV = 'C:/Users/Jerwin/Downloads/kenya_approved_firms_2026.csv';
const OUT = path.join(__dirname, '..', 'src', 'data', 'firms.ts');

const raw = fs.readFileSync(CSV, 'utf8');
let lines = raw
  .replace(/^﻿/, '')
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter(Boolean)
  // Unwrap Excel CSV quoting: a field containing a comma is wrapped in double
  // quotes, and literal quotes are doubled.
  .map((l) => {
    if (l.startsWith('"') && l.endsWith('"')) {
      l = l.slice(1, -1).replace(/""/g, '"');
    }
    return l.trim();
  });
if (/^firm name$/i.test(lines[0])) lines = lines.slice(1);

const seenName = new Set();
const seenSlug = new Set();
const firms = [];
for (const name of lines) {
  const key = name.toLowerCase();
  if (seenName.has(key)) continue;
  seenName.add(key);
  let slug = name
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
  if (!slug) slug = 'firm';
  let s = slug;
  let n = 2;
  while (seenSlug.has(s)) s = slug + '-' + n++;
  seenSlug.add(s);
  firms.push({ name, slug: s });
}

const body = firms
  .map((f) => `  { name: ${JSON.stringify(f.name)}, slug: ${JSON.stringify(f.slug)} },`)
  .join('\n');

const out = `// Auto-generated from the ICPAK 2026 approved/licensed firms register.
// Names-only registry data. Firms claim and enrich their own listing via the
// "Claim this firm" flow; do not hand-edit names here (they are legal names).

export type LicensedFirm = {
  name: string;
  slug: string;
};

export const LICENSED_FIRMS: LicensedFirm[] = [
${body}
];

export const LICENSED_FIRM_COUNT = LICENSED_FIRMS.length;
`;

fs.writeFileSync(OUT, out);
console.log('Wrote', firms.length, 'firms to', OUT);
