import type { APIContext } from 'astro';
import { renderCard, pngResponse } from '../../../lib/og';
import { topics, type Topic } from '../../../data/topics';

export function getStaticPaths() {
  return topics.map((topic) => ({ params: { topic: topic.slug }, props: { topic } }));
}

export async function GET({ props }: APIContext<{ topic: Topic }>) {
  const { topic } = props;
  return pngResponse(await renderCard({ kicker: 'Topic', title: topic.title, subtitle: topic.question }));
}
