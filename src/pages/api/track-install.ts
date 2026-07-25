export const prerender = false;

import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

interface CloudflareEnv {
  SKILL_CACHE?: {
    get(key: string): Promise<string | null>;
    put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
  };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { slug } = body;

    if (!slug || typeof slug !== 'string' || slug.length > 128) {
      return new Response(JSON.stringify({ error: 'slug required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const typedEnv = env as unknown as CloudflareEnv;
    const kv = typedEnv.SKILL_CACHE;

    if (!kv) {
      return new Response(JSON.stringify({ tracked: false, reason: 'no kv' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const dailyKey = `analytics:install:daily:${date}:${slug}`;
    const totalKey = `analytics:install:total:${slug}`;

    const [currentDaily, currentTotal] = await Promise.all([
      kv.get(dailyKey),
      kv.get(totalKey),
    ]);

    const dailyCount = (currentDaily ? parseInt(currentDaily) : 0) + 1;
    const totalCount = (currentTotal ? parseInt(currentTotal) : 0) + 1;

    await Promise.all([
      kv.put(dailyKey, dailyCount.toString()),
      kv.put(totalKey, totalCount.toString()),
    ]);

    return new Response(JSON.stringify({ tracked: true, daily: dailyCount, total: totalCount }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('track-install error:', err);
    return new Response(JSON.stringify({ error: 'internal' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ error: 'method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
};
