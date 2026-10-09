# CLAUDE.md

Astro static site for Raghunath Reddy, deployed to GitHub Pages from `main` via `.github/workflows/deploy.yml`.

The site is a thought-leadership publication, not a resume: it leads with a point of view and is organized around four topics, with past work and research as supporting proof. Don't reintroduce job-hunt patterns (hiring CTAs, availability lines, stats rows, skills grids, dated experience timelines).

## Structure

- **Topics** (`src/data/topics.ts`): the four themes, in site order `ai-adoption`, `ai-systems`, `security-communication`, `technical-marketing` (current practice first). They are the only taxonomy: essays, research, case studies and published-elsewhere items reference them by slug. Each has a hub at `/topics/<slug>/`. Don't add free-form tags.
- **Essays**: `src/content/writing/<slug>.mdx` → `/writing/<slug>/`. Schema in `src/content.config.ts` (`title`, `description`, `pubDate`, optional `updatedDate`, `topics` (1+ slugs, first is primary), optional `toc`, `draft`). Drafts are excluded from production builds, RSS, the sitemap and OG images. `<PullQuote>` and `<Sidenote>` (`src/components/essay/`) are available in MDX without imports; GFM footnotes work too.
- **Red teaming was a one-off (the gpt-oss-20b study, Aug 2025).** Don't present Raghunath as a practicing red-teamer or AI-safety researcher. The claim is understanding how AI systems work (the model, tool calling, harness and context engineering, agent observability), learned hands-on and recently; don't overstate it.
- **Voice:** see the Voice section below. Explain in Raghunath's own terms (deterministic vs probabilistic, harness engineering, context engineering, evidence, traces, audit logs).
- **Current role, stated plainly.** Raghunath works in cybersecurity at a US health system, in a program role. Don't name the current employer anywhere on the site; say "a US health system". Don't present program management as a track record or feature program outcomes as proof; the strengths are technical marketing, security communication and understanding AI systems.
- **Dictated notes:** when Raghunath dictates ideas, correct slips (wrong terms, garbled facts) and check external facts against primary sources, but don't add arguments, examples or claims from general knowledge on Raghunath's behalf. Put suggestions in drafts as clearly marked notes, not as Raghunath's words.
- **Every claim on the live site traces to him.** Sources: his brief for the site, what he has dictated or typed, his writing sample (the guide for AI agents), facts from his resume, and primary sources he pointed at (his Kaggle writeup, Anthropic's incident post). Where his view on a topic hasn't been given (so far he has given it for security communication only on awareness programs, and for technical marketing only on security products), the topic stance and case studies state the facts of the work and stop; questions for him go in the draft outlines, not on the site. The draft essays record provenance in their opening comment.
- **Current AI focus, stated as a fact.** Don't describe it as ongoing learning ("Lately I've been learning how AI systems work…"). Say what he does: harness engineering, context engineering, understanding which models and sub-agents respond better to a task, applied on "a trial project for an internal use case" (his words; keep "trial project"). State it as his focus, not as a claim about the field: "a lot of AI engineering today is harness and context engineering" overstates it.
- **AI adoption framing, in his words:** exploring things first, and helping colleagues explore where AI becomes the best tool and gives productivity and efficiency gains. Don't frame it as getting a team to "build with AI, not just try it" (the wording of his original brief, which he replaced).
- **Security communication, stated as work:** he writes briefings that lay out risks, dependencies and decisions for senior leadership. Don't claim that he makes security understandable to executives, which overstates it; the topic is about people who do not work in security.
- **Never write essays in the owner's voice and publish them.** Drafts with a thesis and outline are fine; prose for publication is the owner's to write.
- **Research, notebooks, case studies**: `src/data/work.ts`. A case study says what the work was; `lesson` is optional and holds only what he has said the work taught him. Leave it out rather than write one for him. `featured: true` puts one on the home page.
- **Hero line:** "The model is probabilistic. The software around it doesn’t have to be." It is his own sentence, from his walk-through of agentic systems; don't replace it with a crafted alternative.
- **Pages**: `/` (point of view, what he is working on now, topics, writing, selected work, short about), `/writing/`, `/topics/`, `/work/` (case studies by topic, then research and notebooks under `#research`), `/about/` (career arc in prose), `/now/`. `/blog/` redirects to `/writing/` and `/research/` to `/work/#research`.

## Voice

All copy in the owner's first person (the home page, `/about`, topic stances, case studies, ledes, `/now`, essay drafts) must read like his own writing. The reference is a guide he wrote by hand for AI agents, about limiting meaning drift. What it shows, and what to copy:

- **First person, complete sentences, present tense.** He says what he has observed, what he presumes and what he wants, and marks uncertainty in words rather than hiding it: "During the LLM training phase, I presume, the model is trained on language patterns created during different times, with many English language words taking different meanings."
- **Explanation in steps.** A claim, then the reason, then what follows from it. Sentences run long, with commas, semicolons and parenthetical asides ("as future AI systems may grow beyond LLMs"). Paragraphs are short and carry one step each. No fragments and no one-line punchlines.
- **Words with a concrete, current meaning.** He wants text "in words, phrases, and sentence lengths that carry concrete meaning and information to the maximum possible extent" and that "stay honest to the current times". So no metaphor, wordplay, antithesis, slogans or rhetorical hooks; no intensifiers or color words that carry no information (actually, really, quietly, unglamorous, painfully); use the technical term and then say what it means (tokens, harness, context window, meaning drift).
- **Sources and scope stated.** He names a source when he leans on one ("This is well noted by Bryan Garner's Garner's Modern English Usage") and says how far a claim reaches ("This is only for my use case"). Never add a claim, example or argument on his behalf; see "Dictated notes" above.
- **Short slots are plain too.** The home statement, topic questions and theses, case-study lessons and pull quotes are ordinary declarative sentences or ordinary questions that state the point, not crafted lines that turn on a contrast.
- **Drafting versus publishing.** A lightly edited train of thought is his drafting mode. Site copy keeps that register and tidies the grammar. Spelling is US English throughout (organized, rigor, modeling). His own drafts mix both, so normalize to US when tidying.

## Editing conventions

- **Personal data lives in one place: `src/data/profile.ts`.** Never hard-code names, roles, dates, employers, contact details or bios in pages or components; read them from `profile`. Unknown facts stay as clearly marked `TODO` placeholders there. Never invent employment history, metrics, quotes or links.
- **"Published elsewhere" (`profile.elsewhere`) lists only pieces under the owner's own byline.** Verify the byline before adding anything. Ghostwritten work (executive bylines in Forbes Technology Council, YourStory, Inc42, Financial Express, Entrepreneur India; company eBooks credited to someone else) must never be listed or linked as the owner's writing. It may be described as a capability on `/about` or `/work`, without links that claim authorship.
- **Site URL lives in one constant**: `SITE_URL` in `src/data/site.ts`, read by `astro.config.mjs`. Never hard-code the domain elsewhere; use `Astro.site` or `SITE_URL`.
- **SEO**: every page passes a unique `title` and `description` to `Base`. Extra JSON-LD nodes go through Base's `schema` prop (helpers in `src/lib/schema.ts`); Person and WebSite are added on every page. Social cards are generated at build time by `src/lib/og.ts` (default `/og.png`, one per essay and per topic); there is no static `public/og.png`.
- Styling: plain CSS. Design tokens (colors, fonts, spacing, `--measure`, `--side`) are CSS custom properties at the top of `src/styles/global.css`, with dark values repeated under both `@media (prefers-color-scheme: dark) :root:not([data-theme='light'])` and `:root[data-theme='dark']`. Keep both in sync. Component styles are scoped `<style>` blocks. Fonts: Cascadia Mono 400/600 (headlines and metadata), Inter (interface and essay text), Source Serif 4 italic (pull quotes, topic questions, lessons). Monospace sets wide, so keep headline sizes modest and use `--font-quote` rather than the headline face for long italic lines.
- Dates read "Oct 09, 2026" (`formatDate` in `src/lib/posts.ts`); month-only dates read "Aug 2025".
- Watch for Astro dropping the space between text and a link that starts on the next line; use `{' '}` at the end of the text line.
- Keep it static and light: no UI framework, no new runtime JS unless essential. Animations must sit behind `prefers-reduced-motion: no-preference`. Target Lighthouse 95+ in every category.
- Accessibility: semantic landmarks, one `h1` per page, visible focus states, AA contrast in both themes.

## Privacy (hard rules)

- This repository is public, and so is its history. Nothing private goes into any file, commit message, pull request, issue, workflow log or memory note: not the owner's contact details, not any form of the name other than the public one, not resume content, not the strings the privacy guard looks for. A rule about a private detail is written without the detail (as this section is).
- Never publish an email address or phone number anywhere: pages, meta tags, JSON-LD, RSS, README or images. Contact is via LinkedIn and GitHub only. Location is "Hyderabad, India" at most.
- No resume page, resume PDF or downloadable CV, and no verbatim copy of resume content. A resume the owner shares is source material to extract facts from, never something to publish, commit or quote in a commit or PR.
- The public name is "Raghunath Reddy", in that form only. Don't use any other form of it (no surname, no initials) and don't add an alternate name to structured data.
- `npm run build` ends with `scripts/privacy-guard.mjs`, which fails the build if `dist/` contains an email-address pattern, a phone-number pattern, "/resume" or a form of the name that is not for publication. The name forms are checked against SHA-256 hashes inside the script, so they are not written anywhere in the repository; to add one, hash it the same way and add the digest, never the string. Never weaken or bypass the guard to get a build through; fix the content. If it reports a false positive (for example a CSS unicode range), tighten the pattern narrowly and keep a test case for the real thing, using made-up data.
- Commit with the GitHub noreply address `11178736+raghunath-ra@users.noreply.github.com`; GitHub rejects pushes that expose the private email.

## Commands

- `npm run dev`: local dev server with drafts
- `npm run build`: `astro check` + production build + privacy guard (must pass with 0 errors)
- `npm run check`: type/diagnostic check only
- `npm run privacy-guard`: re-run the guard on an existing `dist/`
