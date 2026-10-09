import type { APIContext } from 'astro';
import { renderCard, pngResponse, clip } from '../../../lib/og';
import { getPosts, type Post } from '../../../lib/posts';
import { topicBySlug } from '../../../data/topics';

/** One social card per essay. Drafts get none in production because getPosts() skips them. */
export async function getStaticPaths() {
  const posts = await getPosts();
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export async function GET({ props }: APIContext<{ post: Post }>) {
  const { post } = props;
  return pngResponse(
    await renderCard({
      kicker: `Essay · ${topicBySlug(post.data.topics[0]).short}`,
      title: post.data.title,
      subtitle: clip(post.data.description, 150),
    }),
  );
}
