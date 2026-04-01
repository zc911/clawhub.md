import type { APIRoute } from 'astro';
import { loadExperts, findExpert } from '@/lib/loadExperts';
import { generateExpertMarkdown } from '@/utils/expertMarkdown';

export const prerender = true;

export async function getStaticPaths() {
  const experts = await loadExperts();
  return experts.map(e => ({ params: { slug: e.slug } }));
}

export const GET: APIRoute = async ({ params }) => {
  const experts = await loadExperts();
  const expert = findExpert(experts, params.slug!);
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
