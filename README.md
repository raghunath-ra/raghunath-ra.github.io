# raghunath-ra.github.io

Personal site of **Raghunath Reddy**: essays on AI adoption at work, how AI systems work, cybersecurity communication, and marketing technical products.
Live at <https://raghunath-ra.github.io>.

Built with [Astro](https://astro.build) and plain CSS. No client-side framework; the only JavaScript is the theme toggle.

## Run locally

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev       # http://localhost:4321 (drafts are visible here)
npm run build     # astro check, production build to ./dist, then the privacy guard
npm run preview   # serves ./dist
```

## How the site is organized

The site leads with a point of view, not a job title. Everything hangs off four topics:

| Topic | Slug |
| --- | --- |
| AI adoption at work | `ai-adoption` |
| How AI systems work | `ai-systems` |
| Cybersecurity communication | `cybersecurity-communication` |
| Marketing technical products | `technical-marketing` |

| Page | What it is | Source |
| --- | --- | --- |
| `/` | Point of view, what he is working on now, the four topics, latest essays (or published-elsewhere pieces while there are none), selected work, short about | `src/pages/index.astro` |
| `/writing/` | Essays, plus "Published elsewhere" | `src/pages/writing/` |
| `/writing/<slug>/` | An essay | `src/content/writing/<slug>.mdx` |
| `/topics/` and `/topics/<slug>/` | One hub per topic: stance, essays, research, related work | `src/pages/topics/`, `src/data/topics.ts` |
| `/work/` | Case studies grouped by topic, then research (a 2025 red-teaming exercise) and notebooks under `#research` | `src/data/work.ts` (`caseStudies`, `research`, `notebooks`) |
| `/about/` | Career story in prose | `src/data/profile.ts` (`story`) |
| `/now/` | What you're doing now | `src/data/profile.ts` (`now`) |
| `/rss.xml`, `/sitemap-index.xml`, `/robots.txt` | Feeds for readers and crawlers | `src/pages/` |

`/blog/` and `/blog/tags/` redirect to `/writing/` and `/topics/`, `/topics/ai-safety/` and `/topics/security-communication/` (old topic names) redirect to `/topics/ai-systems/` and `/topics/cybersecurity-communication/`, and `/research/` redirects to `/work/#research`. The language model essay's old address, `/writing/the-model-is-finishing-your-sentence/`, redirects to `/writing/` while that essay is a draft.

## Where things live

| What | File |
| --- | --- |
| **You**: name, point of view, about story, /now, links, "published elsewhere" | `src/data/profile.ts` |
| **The four topics**: title, question, thesis, stance | `src/data/topics.ts` |
| Research, notebooks, case studies | `src/data/work.ts` |
| Essays | `src/content/writing/*.mdx` (schema in `src/content.config.ts`) |
| Site URL, Search Console token | `src/data/site.ts` |
| Colors, fonts, spacing (design tokens) | `src/styles/global.css` (top of file) |
| Social cards (OG images) | `src/lib/og.ts`, rendered by `src/pages/og.png.ts` and `src/pages/og/` |
| Structured data (JSON-LD) | `src/lib/schema.ts` |
| Privacy guard | `scripts/privacy-guard.mjs` |

Search `src/data/profile.ts` for `TODO` to find what still needs filling in (for example a headshot).

## Write an essay

Six drafts are waiting in `src/content/writing/`. Five are written up as prose from what you have said, with each gap marked by a "Note for Raghunath" block and the editorial additions listed in the opening comment; the language model essay is being written up in a separate thread. To publish one, replace or remove the notes, confirm the editorial additions, set the real `pubDate` and flip `draft` to `false`.

```md
---
title: 'Essay title'
description: 'One or two sentences. Used as the dek, in lists, RSS, search results and the social card.'
pubDate: 2026-10-20
updatedDate: 2026-11-02            # optional
topics: ['cybersecurity-communication'] # one or more of the four slugs; the first is the primary topic
toc: true                          # optional; by default long essays get a table of contents
draft: false                       # true = only visible in `npm run dev`
---
```

In `.mdx` essays these work without imports:

```mdx
<PullQuote>A line from the essay, set large.</PullQuote>

A claim that needs a caveat.<Sidenote>Shown in the margin on wide screens, inline on phones.</Sidenote>

A sourced claim.[^1]

[^1]: Markdown footnotes render as numbered notes at the end.
```

Publishing an essay automatically adds it to `/writing/`, its topic pages, the home page, the RSS feed (full text), the sitemap, and generates its 1200×630 social card at `/og/writing/<slug>.png`.

## Add research or a case study

Append to `research` or `caseStudies` in `src/data/work.ts`. A case study says what the work was; `lesson` is optional and is for what you yourself said it taught you:

```ts
{
  title: 'What the project was',
  kind: 'Cybersecurity education',          // small red label
  context: 'Company · 2026',
  topics: ['cybersecurity-communication'],  // first topic = its group on /work
  summary: 'One or two sentences on the problem and what you did.',
  lesson: 'What it taught you, in your words.',  // optional
  outcome: '2× something',             // optional, only numbers you can stand behind
  links: [],
  featured: true,                      // also list it on the home page
}
```

## Privacy

The build enforces the rules in `CLAUDE.md`: after `astro build`, `scripts/privacy-guard.mjs` scans every text file in `dist/` and fails the build if it finds an email address, a phone number, a link to `/resume`, or a form of the owner’s name that is not for publication (checked by hash, so the strings are not in the repository). Contact is through LinkedIn and GitHub only. Run it on its own with `npm run privacy-guard`.

## SEO

- Every page has a unique title and description, a canonical URL, Open Graph and Twitter tags, and a JSON-LD graph: `Person` and `WebSite` everywhere, `BlogPosting` on essays, `BreadcrumbList` on topic, essay and section pages.
- `/sitemap-index.xml` lists published pages only (no drafts, no redirects). `/rss.xml` carries the full text of each essay.
- **Google Search Console**: choose the "HTML tag" method, copy the `content` value, and paste it into `googleSiteVerification` in `src/data/site.ts`. Then submit `https://<your-domain>/sitemap-index.xml` in Search Console.

## Custom domain

The site's address lives in one constant, `SITE_URL` in `src/data/site.ts`. Canonical URLs, social cards, the sitemap, robots.txt, RSS and JSON-LD all follow it. To move to, say, `www.example.com`:

1. **DNS**: at your registrar, add a `CNAME` record for `www` pointing to `raghunath-ra.github.io`. For the apex domain (`example.com`), add `A` records for `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153` (and `AAAA` records if you want IPv6; see [GitHub's docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)).
2. **GitHub**: in the repo's **Settings → Pages**, enter the domain under **Custom domain**, wait for the DNS check, then tick **Enforce HTTPS**. It's worth [verifying the domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages) for your account too.
3. **Site**: set `SITE_URL` in `src/data/site.ts` to `https://www.example.com` and push.
4. **Optional `CNAME` file**: this repo deploys with GitHub Actions, which takes the domain from the Settings page and ignores a `CNAME` file. If you ever switch to deploying from a branch, add `public/CNAME` containing just `www.example.com`.
5. Add the new domain as a property in Search Console and resubmit the sitemap.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds with the official [`withastro/action`](https://github.com/withastro/action) (it runs `npm run build`, so the privacy guard runs in CI too) and publishes with `actions/deploy-pages`.

One-time setup: in the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.

## Design notes

"Editor's proof", grown into a practitioner's publication: warm paper, near-black ink and one red-pencil accent, hairline rules instead of cards, section marks (§) and a reading column with notes in the margin. Headlines and metadata are set in Cascadia Mono, reading text in Inter, and pull quotes and questions in Source Serif 4 italic, all self-hosted via Fontsource. Essays get a ~65-character measure, a sticky table of contents and margin sidenotes on wide screens, and pull quotes that break into the margin.

Light and dark themes follow the system; the toggle in the header overrides and remembers the choice. Motion is limited to a short entrance, a hand-drawn underline and scroll reveals, and all of it is off under `prefers-reduced-motion`.
