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
 *  Privacy: never add an email address, phone number, resume or any name
 *  other than "Raghunath Reddy" here (see the Privacy section of CLAUDE.md).
 *  `npm run build` fails if any of them reach the built site.
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
  descriptor: 'AI, security & technical marketing',
  /** Keep this to city and country at most. */
  location: 'Hyderabad, India',

  /**
   * The home page leads with this instead of a job title. `statement` is the
   * point of view in one sentence; `emphasis` is the phrase in it that gets
   * the hand-drawn underline (must appear verbatim in `statement`).
   */
  pov: {
    statement: 'The model is probabilistic. The software around it doesn’t have to be.',
    emphasis: 'doesn’t have to be',
    dek: 'I’m Raghunath Reddy. I work in cybersecurity at a US health system, and I also help colleagues there explore where AI becomes the best tool for their work. Before that, I spent years explaining identity and security products to developers and the people who buy for them. My focus in AI engineering is harness engineering, context engineering and understanding which models and sub-agents respond better to a task, and I am applying this on a trial project for an internal use case. This site is where I write about these subjects.',
  },

  /** Used for <meta name="description"> on the home page and as the site default. */
  seoDescription:
    'Raghunath Reddy writes about AI adoption at work, how AI systems work, making security understandable to executives and non-experts, and marketing technical products.',

  /** Short about for the home page, and the lede of /about. */
  intro:
    'I started in software testing, spent years writing and marketing for cloud, identity and security companies, and now work in cybersecurity for a US health system from Hyderabad. At work I also help colleagues use AI: setting them up with the tools, advising on which tool fits which job, and turning tasks that work into skills they can run.',

  /**
   * The /about page: a career arc in prose, not a dated timeline. The full,
   * dated history lives on LinkedIn. Facts only: what the work was and what
   * he has said about it. No lessons or positions written on his behalf.
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
      heading: 'Working in security',
      paragraphs: [
        'Today I work in cybersecurity for a US health system, in a program role. Part of the work is turning dense security program detail into briefings that lay out risks, dependencies and decisions for senior leadership. Alongside it, I have made comic strips so that busy caregivers can take in a security topic by glancing at them for a minute or two, produced videos for an internal security platform, and helped colleagues use GitHub Copilot CLI and turn tasks that work into skills they can run.',
      ],
    },
    {
      heading: 'AI systems, and this site',
      paragraphs: [
        'I understand how AI systems work from building and probing them: a transformer written from scratch, small models fine-tuned on Kaggle, a one-off red-teaming exercise on OpenAI’s gpt-oss-20b in 2025, and now harness engineering and context engineering on a trial project for an internal use case at work. This site is organized around four topics, and it is where I write about them.',
      ],
    },
  ],

  /**
   * The /now page (https://nownownow.com/about). Update it when things change
   * and bump `updated`. Items with `home: true` also appear on the home page
   * under "What I'm working on now". Set `now` to null to remove the page.
   */
  now: {
    updated: '2026-10-09',
    items: [
      {
        label: 'Working',
        text: 'In cybersecurity at a US health system.',
      },
      {
        label: 'Writing',
        text: 'The essays for this site, one for each of its four topics.',
      },
      {
        label: 'Building',
        home: true,
        text: 'A trial project for an internal use case at work: designing the harness and context around a model, and comparing how different models and sub-agents respond.',
      },
      {
        label: 'Helping',
        home: true,
        text: 'Colleagues use GitHub Copilot CLI, and choose between it and Microsoft 365 Copilot for each job; turning tasks that work into skills they can run.',
      },
      {
        label: 'Studying',
        home: true,
        text: 'Harness engineering and context engineering: the deterministic software that runs a model in loops and manages its context, and how to give the model the specifics of your situation inside a limited context window.',
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
      kind: 'Hackathon writeup',
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
      topics: ['security-communication', 'technical-marketing'],
    },
    {
      title: 'What is Risk-Based Authentication? And Why Should You Implement It?',
      outlet: 'LoginRadius Engineering Blog',
      kind: 'Article',
      year: '2021',
      href: 'https://www.loginradius.com/blog/engineering/risk-based-authentication/',
      topics: ['security-communication', 'technical-marketing'],
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
