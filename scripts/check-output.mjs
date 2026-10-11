#!/usr/bin/env node
/**
 * Output check: runs after `astro build` (see `npm run build`) and fails the
 * build if the output in dist/ contains content the site does not publish:
 * contact details, blocked links or blocked terms.
 *
 * Blocked terms are listed as SHA-256 hashes of the lower-cased letters, for
 * single words and for runs of two and three consecutive words. To add one,
 * hash it the same way and append the digest to BLOCKED_HASHES.
 *
 * Usage: node scripts/check-output.mjs [dir]   (default: dist)
 */
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { extname, join, relative, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? 'dist');

/** Files whose text ends up in front of readers, crawlers or feed readers. */
const TEXT_EXTENSIONS = new Set([
  '.html', '.htm', '.xml', '.xsl', '.txt', '.json', '.jsonld', '.webmanifest', '.svg', '.js', '.mjs', '.css', '.md',
]);

const RULES = [
  { name: 'email address', re: /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g },
  { name: 'mailto: link', re: /mailto:/gi },
  { name: 'tel: link', re: /\btel:/gi },
  // International numbers: +91 98765 43210, +1 (555) 123-4567, +44 20 7946 0958 …
  // (not CSS unicode ranges such as U+2010-2011, which follow a letter).
  { name: 'phone number', re: /(?<![\w+])\+\d{1,3}[\s.-]?\(?\d{1,5}\)?(?:[\s.-]?\d{2,5}){2,3}\b/g },
  // Indian mobile numbers without a '+': 9876543210, 98765 43210, 98765-43210,
  // with the trunk prefix (09876543210) or the country code (91-98765-43210).
  { name: 'phone number', re: /(?<![\w.\/#-])(?:0|91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}(?!\w|\.\d)/g },
  // Indian landlines with an STD code: 040-23456789, 040 2345 6789.
  { name: 'phone number', re: /(?<![\w.\/#-])0\d{2,4}[\s-]\d{3,4}[\s-]?\d{4}(?!\w|\.\d)/g },
  // North American style: (555) 123-4567, 555-123-4567, 555.123.4567, 1-555-123-4567.
  { name: 'phone number', re: /(?<![\w.\/#-])(?:1[\s.-])?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}(?!\w|\.\d)/g },
  // WhatsApp click-to-chat links carry a phone number: wa.me/919876543210.
  { name: 'phone link', re: /wa\.me\/\d/gi },
  { name: 'blocked link', re: /\/resume/gi },
];

/**
 * SHA-256 digests of lower-cased, letters-only blocked terms, as single
 * words and as two- and three-word runs with the
 * spaces and punctuation removed. The last entry is a dummy used by the
 * self-test below.
 */
const BLOCKED_HASHES = new Set([
  "7458c423bef74af8624bce6269818d8a50bb7f183c41d12136566bc815f7258e",
  "5b1e33cfc66c54f504200d47690c931b0251bf09578872837dafbfca9257e7da",
  "53925c311158ccbd766595dfbccf85b4ae0cda37e2aee6938ea5c74cc1a476f0",
  "6452a7bd678fe79a6b0a2e4466f504f3deda3c8a4afbc07b2969a45bad8161fc",
  "7bfd5f04b81d7767da1551fb4446c1598fece9fbf95337c2c807a401338fe1d9",
  "95babcee9f26ed9ddca9f618450355980045171798c7abe9de52275bf73b8f79"
]);
const sha256 = (s) => createHash('sha256').update(s).digest('hex');

/** Every blocked term found in `text`, as the lower-cased words that matched. */
function termHits(text) {
  const words = text.toLowerCase().match(/[a-z]+/g) ?? [];
  const found = [];
  for (let i = 0; i < words.length; i++) {
    for (let n = 1; n <= 3 && i + n <= words.length; n++) {
      const run = words.slice(i, i + n);
      if (BLOCKED_HASHES.has(sha256(run.join('')))) found.push(run.join(' '));
    }
  }
  return found;
}

// Self-test: every blocked sample must be caught and every allowed one must
// pass, so a later edit to the patterns can't quietly weaken the check.
const MUST_CATCH = [
  'write to someone@example.com',
  'call +91 98765 43210',
  'call (+44) 20 7946 0958',
  'call 9876543210 today',
  'call 98765-43210 today',
  'call (555) 123-4567.',
  'call 1-555-123-4567',
  'call 09876543210',
  'call 91-98765-43210',
  'call 040-23456789',
  'call 040 2345 6789',
  'chat at wa.me/919876543210',
  'tel:+15551234567',
  '<a href="/resume/">',
  'by Forbidden Example Token, 2026', // dummy entry in BLOCKED_HASHES: proves the hash check runs
];
const MUST_PASS = [
  'unicode-range:U+0000-00FF,U+2010-2011,U+2000-206F',
  'datePublished "2026-10-08T00:00:00.000Z"',
  '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5"/>',
  'installation, parallax, metallic',
  'Raghunath Reddy · Hyderabad, India',
  'import "@fontsource/cascadia-mono/400.css"',
];
const hits = (text) => RULES.some((r) => ((r.re.lastIndex = 0), r.re.test(text))) || termHits(text).length > 0;
const missed = MUST_CATCH.filter((t) => !hits(t));
const falsePositives = MUST_PASS.filter((t) => hits(t));
if (missed.length || falsePositives.length) {
  console.error('check-output: self-test failed.');
  for (const t of missed) console.error(`  should catch: ${t}`);
  for (const t of falsePositives) console.error(`  should allow: ${t}`);
  process.exit(1);
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

if (!existsSync(root)) {
  console.error(`check-output: ${root} does not exist. Run \`astro build\` first.`);
  process.exit(1);
}

const problems = [];
let scanned = 0;

for await (const file of walk(root)) {
  const rel = relative(root, file);
  // Filenames are checked too.
  for (const rule of RULES) {
    rule.re.lastIndex = 0;
    if (rule.re.test(`/${rel}`)) problems.push({ file: rel, rule: rule.name, match: rel });
  }
  // The matched words are not printed: build logs are public too.
  if (termHits(rel).length) problems.push({ file: rel, rule: 'blocked term', match: '(not shown)' });
  if (!TEXT_EXTENSIONS.has(extname(file).toLowerCase())) continue;
  scanned++;
  const text = await readFile(file, 'utf8');
  for (const rule of RULES) {
    for (const m of text.matchAll(rule.re)) {
      const start = Math.max(0, m.index - 40);
      const context = text.slice(start, m.index + m[0].length + 40).replace(/\s+/g, ' ');
      problems.push({ file: rel, rule: rule.name, match: m[0], context });
    }
  }
  if (termHits(text).length) problems.push({ file: rel, rule: 'blocked term', match: '(not shown)' });
}

if (problems.length > 0) {
  console.error(`\ncheck-output: ${problems.length} problem(s) in ${relative(process.cwd(), root) || '.'}/\n`);
  for (const p of problems) {
    console.error(`  ✗ ${p.rule} in ${p.file}: "${p.match}"`);
    if (p.context) console.error(`      …${p.context}…`);
  }
  console.error('\nRemove the flagged content and build again.\n');
  process.exit(1);
}

console.log(`check-output: scanned ${scanned} text files in ${relative(process.cwd(), root) || '.'}/, nothing to report.`);
