import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TOPIC_SLUGS } from './data/topics';

const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/[^_]*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    /** One or two sentences. Used as the dek, in lists, RSS, meta descriptions and the social card. */
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    /** One or more of the site's four topics. The first is the essay's primary topic. */
    topics: z.array(z.enum(TOPIC_SLUGS)).min(1),
    /** Force the table of contents on or off. By default it appears when an essay has 3+ sections. */
    toc: z.boolean().optional(),
    /** Drafts render in `npm run dev` but are excluded from builds, RSS, the sitemap and OG images. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing };
