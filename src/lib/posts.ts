import { getCollection, type CollectionEntry } from 'astro:content';
import type { TopicSlug } from '../data/topics';

export type Post = CollectionEntry<'writing'>;

/** Published essays, newest first. Drafts are included only in `astro dev`. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('writing', ({ data }) => import.meta.env.DEV || !data.draft);
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
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
