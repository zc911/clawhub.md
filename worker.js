// clawhub.md Cloudflare Worker
// Inline skill content and landing page at build time via bundling

import SKILL_EN from './skill-en.md';
import SKILL_ZH from './skill-zh.md';
import LANDING_HTML from './index.html';

function isHumanBrowser(request) {
  const ua = (request.headers.get('user-agent') || '').toLowerCase();
  const accept = (request.headers.get('accept') || '').toLowerCase();

  if (accept.includes('text/markdown') || accept.includes('text/plain')) {
    if (!accept.includes('text/html')) return false;
  }

  const browserPatterns = [
    'mozilla', 'chrome', 'safari', 'firefox', 'edge', 'opera', 'msie', 'trident', 'webkit',
  ];
  const agentPatterns = [
    'curl', 'wget', 'httpie', 'python-requests', 'node-fetch',
    'axios', 'got/', 'undici', 'openclaw', 'clawd', 'agent',
    'bot', 'gpt', 'claude', 'anthropic', 'openai',
    'fetch', 'http-client', 'aiohttp', 'scrapy',
  ];

  for (const p of agentPatterns) { if (ua.includes(p)) return false; }
  for (const p of browserPatterns) { if (ua.includes(p)) return true; }
  if (!ua || ua.length < 5) return false;
  if (accept.includes('text/html')) return true;
  return false;
}

function getLanguage(request, url) {
  const langParam = url.searchParams.get('lang');
  if (langParam) return langParam.startsWith('zh') ? 'zh' : 'en';

  const acceptLang = (request.headers.get('accept-language') || '').toLowerCase();
  if (acceptLang.startsWith('zh') || acceptLang.includes('zh-cn') || acceptLang.includes('zh-tw')) {
    return 'zh';
  }
  return 'en';
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Health check
    if (pathname === '/health') {
      return new Response('ok', { headers: { 'Content-Type': 'text/plain' } });
    }

    // English markdown
    if (pathname === '/en' || pathname === '/en/') {
      return new Response(SKILL_EN, {
        headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'X-Content-Language': 'en' },
      });
    }

    // Chinese markdown
    if (pathname === '/zh' || pathname === '/zh/') {
      return new Response(SKILL_ZH, {
        headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'X-Content-Language': 'zh' },
      });
    }

    // Raw markdown (always markdown, for agents)
    if (pathname === '/raw' || pathname === '/raw/') {
      const lang = getLanguage(request, url);
      const skill = lang === 'zh' ? SKILL_ZH : SKILL_EN;
      return new Response(skill, {
        headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'X-Content-Language': lang },
      });
    }

    // Root — smart routing
    if (pathname === '/' || pathname === '') {
      const lang = getLanguage(request, url);

      if (isHumanBrowser(request)) {
        return new Response(LANDING_HTML, {
          headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Content-Language': lang },
        });
      } else {
        const skill = lang === 'zh' ? SKILL_ZH : SKILL_EN;
        return new Response(skill, {
          headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'X-Content-Language': lang },
        });
      }
    }

    // 404
    return new Response('Not found', { status: 404, headers: { 'Content-Type': 'text/plain' } });
  },
};
