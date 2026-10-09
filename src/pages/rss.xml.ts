import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { loadRenderers } from 'astro:container';
import { getContainerRenderer as mdxRenderer } from '@astrojs/mdx/container-renderer';
import { render } from 'astro:content';
import PullQuote from '../components/essay/PullQuote.astro';
import Sidenote from '../components/essay/Sidenote.astro';
import { getPosts, postHref } from '../lib/posts';
import { profile } from '../data/profile';
import { topicBySlug } from '../data/topics';
import { site } from '../data/site';

/** Root-relative links and images must be absolute in a feed. */
const absolutize = (html: string, base: URL) =>
  html.replace(/(href|src)="\/(?!\/)/g, (_, attr) => `${attr}="${new URL('/', base).href}`);

/**
 * Feed readers ignore the site's CSS: drop style hooks and pull quotes that
 * repeat the text, and turn margin notes into inline parentheticals.
 */
const clean = (html: string) =>
  html
    .replace(/ data-astro-(cid-[a-z0-9]+|source-[a-z]+)(="[^"]*")?/g, '')
    .replace(/<aside class="pull-quote"[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/aside>/g, '')
    .replace(/<span class="ref"[^>]*><\/span><small class="note"[^>]*>([\s\S]*?)<\/small>/g, ' <small>($1)</small>');

export async function GET(context: APIContext) {
  const base = context.site!;
  const posts = await getPosts();
  const container = await AstroContainer.create({ renderers: await loadRenderers([mdxRenderer()]) });

  const items = await Promise.all(
    posts.map(async (post) => {
      const { Content } = await render(post);
      const html = await container.renderToString(Content, { props: { components: { PullQuote, Sidenote } } });
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: postHref(post),
        categories: post.data.topics.map((t) => topicBySlug(t).title),
        author: profile.name,
        content: absolutize(clean(html), base),
      };
    }),
  );

  return rss({
    title: `${profile.name} · Writing`,
    description: `Essays by ${profile.name} on AI adoption at work, how AI systems work, security communication and marketing technical products.`,
    site: base,
    items,
    customData: `<language>${site.lang}</language>`,
  });
}
