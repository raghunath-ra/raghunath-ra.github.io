/**
 * Social cards (Open Graph images), rendered at build time with satori
 * (layout → SVG) and resvg (SVG → PNG). 1200×630, in the site's
 * "Editor's proof" palette. Used by the endpoints under src/pages/og*.
 */
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { profile } from '../data/profile';
import { SITE_URL } from '../data/site';

const require = createRequire(import.meta.url);
const font = (file: string) => readFile(require.resolve(file));

const fontsPromise = Promise.all([
  font('@fontsource/cascadia-mono/files/cascadia-mono-latin-400-normal.woff'),
  font('@fontsource/cascadia-mono/files/cascadia-mono-latin-600-normal.woff'),
  font('@fontsource/source-serif-4/files/source-serif-4-latin-400-italic.woff'),
]).then(([mono, monoBold, serifItalic]) => [
  { name: 'Cascadia Mono', data: mono, weight: 400 as const, style: 'normal' as const },
  { name: 'Cascadia Mono', data: monoBold, weight: 600 as const, style: 'normal' as const },
  { name: 'Source Serif', data: serifItalic, weight: 400 as const, style: 'italic' as const },
]);

const C = {
  paper: '#f6f1e7',
  paper2: '#fbf8f1',
  ink: '#1d1a16',
  ink2: '#3d372f',
  muted: '#5f574c',
  rule: '#d8cebd',
  accent: '#b2361d',
};

type El = { type: string; props: Record<string, unknown> & { style?: Record<string, unknown>; children?: unknown } };
const h = (type: string, style: Record<string, unknown>, children?: unknown): El => ({
  type,
  props: { style: { display: 'flex', ...style }, children },
});

export interface Card {
  /** Small caps line at the top right, e.g. "Essay · How AI systems work". */
  kicker: string;
  title: string;
  /** Words of the title to set in red italic (must appear in `title`). */
  emphasis?: string;
  subtitle?: string;
}

/**
 * Title as a row of words, so part of it can be styled differently. Each word
 * is a group of segments, which keeps punctuation attached across a style change
 * ("plainly" + ".").
 */
function titleWords(title: string, emphasis: string | undefined, size: number) {
  const at = emphasis ? title.indexOf(emphasis) : -1;
  const parts =
    at >= 0
      ? [
          { text: title.slice(0, at), em: false },
          { text: emphasis!, em: true },
          { text: title.slice(at + emphasis!.length), em: false },
        ]
      : [{ text: title, em: false }];
  const words: { text: string; em: boolean }[][] = [];
  for (const part of parts) {
    part.text.split(/(\s+)/).forEach((token, i) => {
      if (!token) return;
      if (/^\s+$/.test(token)) return void words.push([]);
      const glue = i === 0 && words.length > 0;
      if (glue || words.length === 0 || words.at(-1)!.length === 0) {
        if (words.length === 0) words.push([]);
        words.at(-1)!.push({ text: token, em: part.em });
      } else {
        words.push([{ text: token, em: part.em }]);
      }
    });
  }
  return h(
    'div',
    { flexWrap: 'wrap', columnGap: size * 0.45, rowGap: 0, fontSize: size, fontWeight: 600, lineHeight: 1.1, letterSpacing: -size * 0.02 },
    words
      .filter((w) => w.length > 0)
      .map((segments) =>
        h(
          'span',
          {},
          segments.map((seg) => h('span', { color: seg.em ? C.accent : C.ink }, seg.text)),
        ),
      ),
  );
}

export async function renderCard({ kicker, title, emphasis, subtitle }: Card): Promise<Uint8Array> {
  // Monospace sets wide, so long titles step down sooner than they would in a proportional face.
  const size = title.length <= 24 ? 72 : title.length <= 48 ? 60 : title.length <= 80 ? 50 : 42;
  const host = new URL(SITE_URL).host;

  const tree = h(
    'div',
    {
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '64px 80px 56px',
      background: C.paper,
      fontFamily: 'Cascadia Mono',
      borderTop: `10px solid ${C.accent}`,
    },
    [
      // Masthead
      h('div', { alignItems: 'center', justifyContent: 'space-between' }, [
        h('div', { alignItems: 'center', gap: 18 }, [
          h(
            'div',
            {
              width: 52,
              height: 52,
              borderRadius: 26,
              background: C.accent,
              color: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 600,
            },
            'R',
          ),
          h('div', { fontSize: 28, fontWeight: 600, letterSpacing: -0.6, color: C.ink }, profile.name),
        ]),
        h(
          'div',
          { fontSize: 20, letterSpacing: 2, color: C.muted, textTransform: 'uppercase' },
          kicker,
        ),
      ]),
      // Title and subtitle
      h('div', { flexDirection: 'column', gap: 26, maxWidth: 1000 }, [
        titleWords(title, emphasis, size),
        ...(subtitle
          ? [
              h(
                'div',
                { fontFamily: 'Source Serif', fontSize: 32, lineHeight: 1.35, color: C.ink2, fontStyle: 'italic', maxWidth: 960 },
                subtitle,
              ),
            ]
          : []),
      ]),
      // Footer
      h(
        'div',
        {
          justifyContent: 'space-between',
          paddingTop: 22,
          borderTop: `1px solid ${C.rule}`,
          fontSize: 20,
          color: C.muted,
        },
        [h('div', {}, host), h('div', { color: C.accent }, '§')],
      ),
    ],
  );

  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: await fontsPromise,
  });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}

/** Clip long text for a card without cutting a word in half. */
export const clip = (text: string, max: number) =>
  text.length <= max ? text : `${text.slice(0, text.lastIndexOf(' ', max)).replace(/[,.;:]$/, '')}…`;

export const pngResponse = (png: Uint8Array) =>
  new Response(png as unknown as BodyInit, {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
