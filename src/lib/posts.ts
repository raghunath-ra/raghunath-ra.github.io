import { getCollection, type CollectionEntry } from 'astro:content';
import type { TopicSlug } from '../data/topics';

export type Post = CollectionEntry<'writing'>;

/** Text that marks an unfinished draft: notes and outline placeholders addressed to the owner. */
const OWNER_MARKERS = [/Note for Raghunath/, /\byours to (?:write|add|choose)\b/i, /\bin your own (?:words|terms)\b/i];

/** Published essays, newest first. Drafts are included only in `astro dev`. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('writing', ({ data }) => import.meta.env.DEV || !data.draft);
  // Notes and outline placeholders left for the owner must never reach the live site.
  const unfinished = posts.flatMap((p) => {
    const marker = p.data.draft ? undefined : OWNER_MARKERS.find((m) => m.test(p.body ?? ''));
    return marker ? [`${p.id} (matches ${marker})`] : [];
  });
  if (unfinished.length) {
    throw new Error(`Replace or remove the notes left for the owner before publishing: ${unfinished.join(', ')}`);
  }
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export const postsOnTopic = (posts: Post[], topic: TopicSlug) => posts.filter((p) => p.data.topics.includes(topic));

export const postHref = (post: Post) => `/writing/${post.id}/`;

/** Minutes to read at ~220 wpm, ignoring code, markup and MDX imports. */
export function readingTime(body = ''): number {
  const text = body
    .replace(/^import .*$/gm, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_>`\[\]()!-]/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
