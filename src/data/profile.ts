/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PROFILE DATA: the single place to edit who you are.
 *
 *  Everything personal on the site (the home page point of view, the about
 *  story, /now, contact links, "published elsewhere", SEO defaults and the
 *  social card) is read from this file. Pages never hard-code these facts.
 *
 *  Anything marked `TODO` is a placeholder. Set optional values to `null` to
 *  hide them on the site.
 *
 *  Contact is through the links below only; `npm run build` fails if contact
 *  details reach the built site.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { TopicSlug } from './topics';

export interface Link {
  label: string;
  href: string;
}

/** A piece published somewhere else under your own byline. */
export interface Elsewhere {
  title: string;
  outlet: string;
  kind: string;
  /** `null` hides the item until there is a public URL. */
  href: string | null;
  year?: string;
  topics: TopicSlug[];
}

export const profile = {
  name: 'Raghunath Reddy',
  shortName: 'Raghunath',
  /**
   * Used for Person.jobTitle in structured data. Kept at the level of the
   * visible copy ("a program role" in cybersecurity), not the exact title.
   */
  jobTitle: 'Cybersecurity program role at a US health system',
  /** Follows your name in the home page <title> and the default social card. */
  descriptor: 'AI, cybersecurity & B2B technology',
  /** Follows your name in the masthead line at the top of the home page. */
  masthead: 'Essays on AI, cybersecurity and B2B technology',
  /** Keep this to city and country at most. */
  location: 'Hyderabad, India',

  /**
   * The home page leads with this instead of a job title. `statement` is the
   * point of view in one sentence; `emphasis` is the phrase in it that is set
   * in the accent color (must appear verbatim in `statement`); `position`
   * follows the statement in the hero.
   */
  pov: {
    statement:
      'I explore the frontier of LLMs, along with context and harness engineering for agentic AI, and help colleagues use AI effectively at work.',
    emphasis: 'context and harness engineering for agentic AI',
    position:
      'I operate at the crossroads of AI and cybersecurity, with B2B technology as the primary focus. I am a generalist first, and then a specialist.',
    dek: 'I’m Raghunath Reddy. I work in cybersecurity at a US health system, and before my current role I spent years in B2B technology marketing, explaining identity and cybersecurity products to developers and the people who buy for them. This site is where I write about these subjects.',
  },

  /** Used for <meta name="description"> on the home page and as the site default. */
  seoDescription:
    'Raghunath Reddy writes about LLMs, context and harness engineering for agentic AI, using AI effectively at work, and the crossroads of AI and cybersecurity in B2B technology.',

  /** Short about for the home page. */
  intro:
    'I started in software testing, spent years writing and marketing for B2B cloud, identity and cybersecurity companies, and now work in cybersecurity for a US health system from Hyderabad.',

  /**
   * The /about page: a career arc in prose, not a dated timeline. The full,
   * dated history lives on LinkedIn.
   */
  story: [
    {
      heading: 'Starting in testing',
      paragraphs: [
        'I studied computer science and started my career in quality assurance, testing the firmware inside gas-detection devices: test-case design, gap analysis, exploratory testing and edge cases.',
      ],
    },
    {
      heading: 'Writing about technology',
      paragraphs: [
        'Then I moved into writing. At a cloud infrastructure provider and later a digital engineering firm, I wrote about technology for enterprise audiences in India, the US, the UK and Australia: articles, case studies, landing pages, video scripts, launch announcements and API documentation. I also ghostwrote articles for executives, which were published under their names.',
      ],
    },
    {
      heading: 'Product marketing at LoginRadius',
      paragraphs: [
        'At LoginRadius I worked on a customer identity platform, shaping the messaging and positioning and explaining identity, authentication and data privacy to developers and the people who buy for them. I ran the engineering blog as an open-source project, with outside developers as paid authors and our engineers as reviewers, and rebuilt its editorial strategy around what developers search for. Organic traffic doubled in six months.',
      ],
    },
    {
      heading: 'Working in cybersecurity',
      paragraphs: [
        'Today I work in cybersecurity for a US health system, in a program role. Alongside it, I have made comic strips on cybersecurity topics for busy caregivers, so that they could understand a topic by glancing at a strip for a minute or two, and I have produced videos for an internal cybersecurity platform. I also help colleagues use GitHub Copilot CLI, and I turn tasks that work into skills they can run.',
      ],
    },
    {
      heading: 'AI systems, and this site',
      paragraphs: [
        'I understand how AI systems work from building and probing them: a transformer written from scratch, small models fine-tuned on Kaggle, a one-off red-teaming exercise on OpenAI’s gpt-oss-20b in 2025, and now harness engineering and context engineering on a trial project for an internal use case at work. I am a generalist first, and then a specialist. This site is organized around four topics, and it is where I write about them.',
      ],
    },
  ],

  /**
   * The /now page (https://nownownow.com/about). Update it when things change
   * and bump `updated`. Items with `home: true` also appear on the home page
   * under "What I'm working on now". Set `now` to null to remove the page.
   */
  now: {
    updated: '2026-10-11',
    items: [
      {
        label: 'Working',
        text: 'I work in cybersecurity at a US health system.',
      },
      {
        label: 'Building',
        home: true,
        text: 'I am working on a trial project for an internal use case at work, designing the harness and context around a model and comparing how different models and sub-agents respond.',
      },
      {
        label: 'Helping',
        home: true,
        text: 'I help colleagues use GitHub Copilot CLI and choose between it and Microsoft 365 Copilot for each job, and I turn tasks that work into skills they can run.',
      },
      {
        label: 'Writing',
        home: true,
        text: 'I am writing the first essays for this site, at least one on each of its four topics.',
      },
    ],
  } as { updated: string; items: { label: string; text: string; home?: boolean }[] } | null,

  /** Public profiles. Never add an email address or phone number here. */
  links: {
    linkedin: 'https://www.linkedin.com/in/raghunathreddy',
    github: 'https://github.com/raghunath-ra',
    kaggle: 'https://www.kaggle.com/rnr181818',
  },

  /**
   * TODO: headshot. Drop a square image (~600×600) in /public, e.g.
   * /public/headshot.jpg, and set '/headshot.jpg' here. null hides it.
   */
  headshot: null as string | null,

  /**
   * PUBLISHED ELSEWHERE, shown on /writing, the home page and topic pages.
   *
   * Only pieces published under your own byline belong here. Ghostwritten
   * work (executive bylines, articles in other people's names, company eBooks
   * credited to someone else) must not be listed or linked as your writing;
   * it can be described as a capability on /about or /work instead.
   */
  elsewhere: [
    {
      title: 'Narrative and Reference Prompting as Safety Bypass Techniques',
      outlet: 'Kaggle',
      kind: 'Challenge writeup',
      year: '2025',
      href: 'https://www.kaggle.com/competitions/openai-gpt-oss-20b-red-teaming/writeups/narrative-coaxing-tricks-gpt-oss-20b-to-output-dis',
      topics: ['ai-systems'],
    },
    {
      title: 'How Chrome’s Third-Party Cookie Restrictions Affect User Authentication?',
      outlet: 'LoginRadius Engineering Blog',
      kind: 'Article',
      year: '2024',
      href: 'https://www.loginradius.com/blog/engineering/identity-impact-of-google-chrome-thirdparty-cookie-restrictions/',
      topics: ['cybersecurity-communication', 'technical-marketing'],
    },
    {
      title: 'What is Risk-Based Authentication? And Why Should You Implement It?',
      outlet: 'LoginRadius Engineering Blog',
      kind: 'Article',
      year: '2021',
      href: 'https://www.loginradius.com/blog/engineering/risk-based-authentication/',
      topics: ['cybersecurity-communication', 'technical-marketing'],
    },
    {
      title: 'Everything I published on the LoginRadius blog',
      outlet: 'LoginRadius',
      kind: 'Author page',
      href: 'https://www.loginradius.com/blog/author/raghunath-reddy',
      topics: ['technical-marketing'],
    },
  ] satisfies Elsewhere[] as Elsewhere[],
};

/** Published-elsewhere items that have a public URL. */
export const elsewhere = profile.elsewhere.filter((e): e is Elsewhere & { href: string } => e.href !== null);
