/**
 * TOPICS: the four themes the site is organized around.
 *
 * Each one gets a hub page at /topics/<slug>/, a card on the home page, and is
 * the only valid value for an essay's `topics` frontmatter (see
 * src/content.config.ts). Case studies, research and "published elsewhere"
 * items reference topics by slug. The order here is the order on the site:
 * current practice first.
 *
 * `stance` is the opening of the hub page. It is written in the first person
 * and holds only what the owner has said or done: the themes as he set them,
 * his own account of the work, and facts from his career. Where his view on a
 * topic has not been given, the stance states the facts and stops; it does not
 * argue a position for him.
 */

export const TOPIC_SLUGS = ['ai-adoption', 'ai-systems', 'security-communication', 'technical-marketing'] as const;
export type TopicSlug = (typeof TOPIC_SLUGS)[number];

export interface Topic {
  slug: TopicSlug;
  /** Full name, used for headings and page titles. */
  title: string;
  /** Short label for chips and breadcrumbs. */
  short: string;
  /** The question the topic keeps asking. Shown large on the hub page. */
  question: string;
  /** One-sentence position, shown on cards and in meta descriptions. */
  thesis: string;
  /** Opening paragraphs of the hub page. */
  stance: string[];
}

export const topics: Topic[] = [
  {
    slug: 'ai-adoption',
    title: 'AI adoption at work',
    short: 'AI adoption',
    question: 'How do you get a team to build with AI, rather than only try it?',
    thesis:
      'Which AI tool fits a piece of work depends on how its harness, environment and context work; when a task works once, I turn it into a skill that colleagues can run.',
    stance: [
      'I help colleagues at a US health system use AI in their work. I have set up more than twenty of them with VS Code, GitHub Copilot, Python and Node.js, and I advise on when to use Microsoft 365 Copilot and when to use GitHub Copilot CLI.',
      'The department newsletters are my example. There was a need for internal newsletters, monthly and half-yearly, one for each department, and I build them with GitHub Copilot CLI; they come out engaging and professional, close to what a designer would produce. Microsoft 365 Copilot does not work for this, because its harness is not built for repetitive work where I keep iterating on the same files and folders under Git version control. GitHub Copilot in VS Code, or GitHub Copilot CLI, is the better tool because of how its harness, environment and context work. Without AI, we would not have thought of the task this way, and we would not have done it.',
      'When a task works in Copilot CLI, I transcribe it into a durable skill in the Agent Skills format, so that I can distribute it to colleagues and they can run it. We have used these skills for PowerPoint presentations, HR headcount analysis and governance, risk and compliance (GRC) work.',
      'I write about getting a team to build with AI rather than only try it.',
    ],
  },
  {
    slug: 'ai-systems',
    title: 'How AI systems work',
    short: 'AI systems',
    question: 'What happens between your prompt and the answer, and how do you keep an agent accountable?',
    thesis:
      'A lot of AI engineering today is harness engineering, the deterministic software around the model, and context engineering, which gives the model the specifics of your situation inside a limited context window.',
    stance: [
      'This is how I explain it. A language model takes your text, breaks it into tokens and turns those tokens into numbers. The numbers go through the transformer: attention works out how the words relate to each other, and the feed-forward layers are where most of what the model learned is believed to be stored. Most of it is matrix multiplication. At the end, the model picks a likely next token, then does it again. Text in, numbers, math, text out.',
      'On its own, a model produces text and cannot act on anything outside the conversation. Tool calling lets it ask for actions. The harness, the deterministic software around the model, runs it in loops, hands big tasks to sub-agents and manages its context. Context engineering is how you give a model with general knowledge the specifics of your business, inside a context window that is always limited. Much of the AI engineering work today is harness engineering and context engineering.',
      'Once you build agentic systems on top of that, the questions are about control. How much of the system is deterministic, and how much needs the model’s probabilistic output? Which decisions can only a human approve? How do you prove what an agent did? That takes evidence, end-to-end traces like the ones we rely on in application performance management, and audit logs. Without them, you cannot claim enterprise-grade reliability or accountability.',
      'I learned this hands-on: a transformer written from scratch, small models fine-tuned on Kaggle, a one-off red-teaming exercise in 2025, and now a trial project for an internal use case at work, where part of what I am testing is which models and sub-agents respond better to a task.',
    ],
  },
  {
    slug: 'security-communication',
    title: 'Security communication',
    short: 'Security comms',
    question: 'How do you make security understandable to executives and non-experts?',
    thesis:
      'Most enterprises treat cyber awareness as a drill; I believe in a careful, thoughtfully designed skills survey, with training completion requested by role, skill level and necessity.',
    stance: [
      'I work in cybersecurity at a US health system, where the work involves security engineers, network teams, caregivers and senior leadership. Part of it is turning dense security program detail into briefings that lay out risks, dependencies and decisions for senior leadership.',
      'The other part is the people who do not work in security. In early 2025 there was a need for comic strips on cybersecurity topics, so that busy caregivers could understand them by glancing at them for a minute or two. The image generation tools we had were not good at placing text in images, so I created the panels image by image with Microsoft 365 Copilot’s built-in image generation, then learned Figma to place the dialogue accurately on each panel. That way we delivered comic strips that teach security topics to internal users in an engaging way. I have also scripted and produced videos for an internal security platform.',
      'Most enterprises treat cyber awareness as a drill; they keep pushing training and phishing drills. Phishing drills are okay, but pushing training only overburdens people. What I believe in is a careful, thoughtfully designed skills survey, and requesting training completion based on role, skill level and necessity.',
      'For traditionally run awareness programs, this is much harder to do. The people with those responsibilities will keep doing what they have been doing: declaring October cyber awareness month, conducting some fun events, and pushing some emails, sessions and trainings. I am surprised that people do not put more thought into the structural thinking I am trying to champion.',
      'I write about making security understandable to executives and non-experts.',
    ],
  },
  {
    slug: 'technical-marketing',
    title: 'Marketing technical products',
    short: 'Technical marketing',
    question: 'How do you market technical products, such as AI, security and developer tools?',
    thesis:
      'When marketing security products, we need to understand the pain points very clearly, and the solution we propose should clearly show its technical value.',
    stance: [
      'Before security, I worked in content and product marketing for cloud, identity and security companies. At LoginRadius I shaped the messaging and positioning for a customer identity platform, explaining identity, authentication and data privacy to developers and the people who buy for them.',
      'I rebuilt the LoginRadius engineering blog’s editorial strategy around what developers search for, and organic traffic doubled in six months. I ran the blog as an open-source project on GitHub, with outside developers as paid authors and our engineers as reviewers.',
      'When marketing security products, we need to understand the pain points very clearly, and the solution we propose should clearly show its technical value. Testimonials are important, and so is showing how the product works and how it solves a specific pain point.',
      'We should be very selective about the language we use, which can gain trust as well as lose it if we get it wrong. For example, are you targeting the enterprise buyer or a startup, or are you selling a product where the influencer is different from the buying decision maker? Then you have to plan whom you target at which stage of the marketing funnel, although you don’t have to be too strict about the boundaries within the funnel itself.',
      'Creating interest in your product, or gaining attention, is the easier part; building trust is key to a purchase decision, or even a proof-of-concept (PoC) decision. Technical products are complex, and buyers are usually skeptical about unproven players promising something good. This is also a reason why bigger deal values often go to known vendors, or where top executives have personal relationships with the vendor.',
      'I have more experience in marketing technical products to technical buyers. Sometimes a technical product has a buyer persona in a traditional enterprise, where the marketing dynamics are different; this is not an area of strong expertise for me, but I can adapt.',
      'I write about marketing technical products: AI, security and developer tools.',
    ],
  },
];

export const topicBySlug = (slug: TopicSlug): Topic => {
  const topic = topics.find((t) => t.slug === slug);
  if (!topic) throw new Error(`Unknown topic: ${slug}`);
  return topic;
};

export const topicHref = (slug: TopicSlug) => `/topics/${slug}/`;
