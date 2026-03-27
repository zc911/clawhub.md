import type { APIRoute } from 'astro';
import { getExperts, getExpert } from '@/data/bundles';
import { generateExpertMarkdown } from '@/utils/expertMarkdown';

export const prerender = true;

export function getStaticPaths() {
  return getExperts().map(e => ({ params: { slug: e.slug } }));
}

export const GET: APIRoute = ({ params }) => {
  const expert = getExpert(params.slug!);
  if (!expert) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(generateExpertMarkdown(expert), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
