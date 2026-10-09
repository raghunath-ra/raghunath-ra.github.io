/**
 * WORK & RESEARCH: the proof behind the point of view.
 *
 * - `research`: studies shown in the research section of /work and on topic pages.
 * - `notebooks`: hands-on code and notebooks, shown with them.
 * - `caseStudies`: shown on /work, grouped by their first topic, and on topic pages.
 *
 * A case study says what the work was. `lesson` is optional: it holds only
 * what the owner has himself said the work taught him, in his words. Leave it
 * out rather than write one for him. `featured: true` also puts a case study
 * on the home page. Order in each array = order on the page.
 */
import type { TopicSlug } from './topics';

export interface WorkLink {
  label: string;
  href: string;
}

export interface CaseStudy {
  title: string;
  /** Short label above the title, e.g. "AI enablement". */
  kind: string;
  /** Where / when, e.g. "LoginRadius · 2021–2024". */
  context: string;
  /** First topic decides the group on /work; all of them link it from topic pages. */
  topics: TopicSlug[];
  /** What happened, in a sentence or two. */
  summary: string;
  /** What it taught you, in your own words. Optional; leave it out rather than invent one. */
  lesson?: string;
  /** Optional result. Keep it short and only use numbers you can stand behind. */
  outcome?: string;
  links: WorkLink[];
  featured?: boolean;
}

export interface Study {
  slug: string;
  title: string;
  /** Plain-language subject, e.g. "Red-teaming OpenAI’s gpt-oss-20b". */
  subject: string;
  venue: string;
  date: string;
  /** ISO date, for structured data and sorting. */
  isoDate: string;
  topics: TopicSlug[];
  abstract: string;
  /** Short labeled facts shown beside the abstract. */
  facts: { label: string; value: string }[];
  /** Why it matters: the stance this research supports. */
  takeaways: string[];
  /** A line from the takeaways worth setting large. */
  pullQuote?: string;
  links: WorkLink[];
  featured?: boolean;
}

export const research: Study[] = [
  {
    slug: 'gpt-oss-20b-red-teaming',
    title: 'Narrative and Reference Prompting as Safety Bypass Techniques',
    subject: 'Red-teaming OpenAI’s gpt-oss-20b',
    venue: 'Red-Teaming Challenge: OpenAI gpt-oss-20b, Kaggle',
    date: 'Aug 2025',
    isoDate: '2025-08-24',
    topics: ['ai-systems'],
    abstract:
      'My writeup for Kaggle’s Red-Teaming Challenge on OpenAI’s open-weight gpt-oss-20b. I tested whether the model’s safety layers could withstand indirect or nuanced prompting, using conversation-based strategies that mirror how real users might bypass safeguards, intentionally or not. With narrative-style dialogues and reference-based prompting, the model was coaxed into producing disallowed information.',
    facts: [
      { label: 'Model', value: 'OpenAI gpt-oss-20b (open weights)' },
      { label: 'Techniques', value: 'Narrative prompting, reference prompting' },
      { label: 'Submitted', value: 'Aug 24, 2025' },
    ],
    takeaways: [
      'Naturalistic, conversation-based scenarios got further than confrontational prompts: putting a request inside a story, or approaching it through an indirect reference before getting more direct, made refusals less likely to trigger.',
      'This was a one-off in August 2025. I have not done red-teaming since, and the field has moved a lot, so I am not current on it. The exercise stays here for what it showed me about how a model responds to prompting, not as a claim to current red-teaming work.',
      'This summary stays at the level of method. The full writeup, as submitted to the challenge, is on Kaggle.',
    ],
    pullQuote: 'Naturalistic, conversation-based scenarios made refusals less likely to trigger than confrontational prompts.',
    links: [
      {
        label: 'Read the writeup on Kaggle',
        href: 'https://www.kaggle.com/competitions/openai-gpt-oss-20b-red-teaming/writeups/narrative-coaxing-tricks-gpt-oss-20b-to-output-dis',
      },
      { label: 'About the challenge', href: 'https://www.kaggle.com/competitions/openai-gpt-oss-20b-red-teaming' },
    ],
    featured: true,
  },
];

export const notebooks: { title: string; kind: string; date: string; summary: string; href: string; topics: TopicSlug[] }[] = [
  {
    title: 'Transformer, from scratch',
    kind: 'Gist · Python',
    date: 'Oct 2025',
    summary: 'A heavily commented NumPy implementation for understanding how a transformer works, layer by layer.',
    href: 'https://gist.github.com/raghunath-ra/add974389add0a6c8aed9a4489b66a32',
    topics: ['ai-systems'],
  },
  {
    title: 'TinyLlama QLoRA fine-tuning on Kaggle',
    kind: 'Gist · Notebook',
    date: 'Oct 2025',
    summary:
      'A documented notebook for LoRA/QLoRA instruction-tuning a compact model on Kaggle’s dual T4 GPUs, with notes on a recurring multi-GPU launch failure.',
    href: 'https://gist.github.com/raghunath-ra/0459907871bc0280d609e189af93ec9d',
    topics: ['ai-systems'],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    title: 'Setting up a team to build with AI',
    kind: 'AI enablement',
    context: 'US health system · 2025–',
    topics: ['ai-adoption'],
    summary:
      'I set up more than twenty colleagues with VS Code, GitHub Copilot, Python and Node.js, mapping each Copilot to its strength: Microsoft 365 Copilot for retrieval grounded in the organization’s own content and identity, GitHub Copilot for deep, iterative builds. When a task works well in GitHub Copilot CLI, I transcribe it into a durable skill in the Agent Skills format (agentskills.io) so that colleagues can run it too; we have used these for PowerPoint presentations, HR headcount analysis and governance, risk and compliance (GRC) work.',
    lesson: 'Which tool fits a task depends on how its harness, environment and context work, so I advise colleagues on when to use Microsoft 365 Copilot and when to use Copilot CLI.',
    outcome: '20+ colleagues onboarded',
    links: [],
    featured: true,
  },
  {
    title: 'Department newsletters, built with GitHub Copilot CLI',
    kind: 'AI at work',
    context: 'US health system · 2025–',
    topics: ['ai-adoption', 'ai-systems'],
    summary:
      'Departments needed internal newsletters, monthly and half-yearly, one for each department. I build them with GitHub Copilot CLI, and they come out engaging and professional, close to what a designer would produce. Microsoft 365 Copilot was not the right tool: its harness is not built for repetitive work where I keep iterating on the same files and folders under Git version control. GitHub Copilot in VS Code, or Copilot CLI, is the better tool because of how its harness, environment and context work.',
    lesson: 'Without AI, we would not have thought of the task this way, and we would not have done it.',
    links: [],
    featured: true,
  },
  {
    title: 'Security comic strips for busy caregivers',
    kind: 'Security education',
    context: 'US health system · 2025',
    topics: ['security-communication', 'ai-adoption'],
    summary:
      'Busy caregivers needed to understand security topics by glancing at them for a minute or two. In early 2025, the image-generation tools we had were not good at placing text in images, so I created the comic panels image by image with Microsoft 365 Copilot’s built-in image generation, then learned Figma to place the dialogue accurately on each panel.',
    lesson: 'The strips had to work for a caregiver glancing at them for a minute or two. Where the image tools could not place the text, I did that part by hand in Figma.',
    links: [],
    featured: true,
  },
  {
    title: 'Product videos for an internal security platform',
    kind: 'Video',
    context: 'US health system · 2025',
    topics: ['security-communication', 'technical-marketing'],
    summary:
      'I scripted and produced product videos for an internal cybersecurity platform, from storyboard to motion graphics in Premiere Pro and After Effects.',
    links: [],
  },
  {
    title: 'Doubling a developer blog by writing for search intent',
    kind: 'Content growth',
    context: 'LoginRadius · 2021–2024',
    topics: ['technical-marketing'],
    summary:
      'I rebuilt the engineering blog’s editorial strategy around developer search intent and identity education, alongside messaging and positioning for the company’s customer identity (CIAM) platform.',
    outcome: '2× organic growth in six months',
    links: [{ label: 'My LoginRadius posts', href: 'https://www.loginradius.com/blog/author/raghunath-reddy' }],
    featured: true,
  },
  {
    title: 'An open-source guest-author program',
    kind: 'Developer community',
    context: 'LoginRadius · 2021–2024',
    topics: ['technical-marketing'],
    summary:
      'I ran the engineering blog as an open-source GitHub project with a paid guest-author program. Every post went through engineering review, and 144 merged pull requests on the repository trace the editorial work.',
    outcome: '30+ posts from 12+ external developers',
    links: [{ label: 'Repository', href: 'https://github.com/LoginRadius/engineering-portal' }],
  },
  {
    title: 'Ghostwritten eBooks on data privacy and passwordless login',
    kind: 'Ghostwriting',
    context: 'LoginRadius',
    topics: ['technical-marketing', 'security-communication'],
    summary:
      'I turned in-house expertise on data privacy and passwordless authentication into long-form eBooks for customer education. They were published under an executive’s name, so they are not linked here.',
    links: [],
  },
];
