const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Load skill files
const skillEn = fs.readFileSync(path.join(__dirname, 'skill-en.md'), 'utf-8');
const skillZh = fs.readFileSync(path.join(__dirname, 'skill-zh.md'), 'utf-8');
const landingHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');

// Detect if the request is from a browser (human) or an agent
function isHumanBrowser(req) {
  const ua = (req.headers['user-agent'] || '').toLowerCase();
  const accept = (req.headers['accept'] || '').toLowerCase();

  // If explicitly requesting markdown, it's an agent
  if (accept.includes('text/markdown') || accept.includes('text/plain')) {
    // But only if it's NOT also requesting text/html (browsers do both)
    if (!accept.includes('text/html')) {
      return false;
    }
  }

  // Common browser user-agents
  const browserPatterns = [
    'mozilla', 'chrome', 'safari', 'firefox', 'edge', 'opera',
    'msie', 'trident', 'webkit',
  ];

  // Common agent/bot patterns
  const agentPatterns = [
    'curl', 'wget', 'httpie', 'python-requests', 'node-fetch',
    'axios', 'got/', 'undici', 'openclaw', 'clawd', 'agent',
    'bot', 'gpt', 'claude', 'anthropic', 'openai',
    'fetch', 'http-client', 'aiohttp', 'scrapy',
  ];

  // Check agent patterns first
  for (const pattern of agentPatterns) {
    if (ua.includes(pattern)) return false;
  }

  // Check browser patterns
  for (const pattern of browserPatterns) {
    if (ua.includes(pattern)) return true;
  }

  // No user-agent or unrecognized → treat as agent
  if (!ua || ua.length < 5) return false;

  // Default: if Accept includes text/html, probably a browser
  if (accept.includes('text/html')) return true;

  return false;
}

// Detect preferred language (zh or en)
function getLanguage(req) {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // Query param override: ?lang=zh or ?lang=en
  const langParam = url.searchParams.get('lang');
  if (langParam) {
    return langParam.startsWith('zh') ? 'zh' : 'en';
  }

  // Accept-Language header
  const acceptLang = (req.headers['accept-language'] || '').toLowerCase();
  if (acceptLang.startsWith('zh') || acceptLang.includes('zh-cn') || acceptLang.includes('zh-tw')) {
    return 'zh';
  }

  return 'en';
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // Health check
  if (pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
    return;
  }

  // Direct access to specific language versions
  if (pathname === '/en' || pathname === '/en/') {
    res.writeHead(200, {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Content-Language': 'en',
    });
    res.end(skillEn);
    return;
  }

  if (pathname === '/zh' || pathname === '/zh/') {
    res.writeHead(200, {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Content-Language': 'zh',
    });
    res.end(skillZh);
    return;
  }

  // Raw markdown endpoint (always returns markdown, for agents)
  if (pathname === '/raw' || pathname === '/raw/') {
    const lang = getLanguage(req);
    const skill = lang === 'zh' ? skillZh : skillEn;
    res.writeHead(200, {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Content-Language': lang,
    });
    res.end(skill);
    return;
  }

  // Root path — smart routing
  if (pathname === '/' || pathname === '') {
    const lang = getLanguage(req);

    if (isHumanBrowser(req)) {
      // Human → serve HTML landing page
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Content-Language': lang,
      });
      res.end(landingHtml);
    } else {
      // Agent → serve markdown directly
      const skill = lang === 'zh' ? skillZh : skillEn;
      res.writeHead(200, {
        'Content-Type': 'text/markdown; charset=utf-8',
        'X-Content-Language': lang,
      });
      res.end(skill);
    }
    return;
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`clawhub.md server running on port ${PORT}`);
  console.log(`  Human visit:  http://localhost:${PORT}/`);
  console.log(`  Agent visit:  curl http://localhost:${PORT}/`);
  console.log(`  English:      http://localhost:${PORT}/en`);
  console.log(`  Chinese:      http://localhost:${PORT}/zh`);
  console.log(`  Raw markdown: http://localhost:${PORT}/raw`);
});
