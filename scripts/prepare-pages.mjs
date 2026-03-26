/**
 * Post-build: convert @astrojs/cloudflare Workers output to Cloudflare Pages format.
 *
 * @astrojs/cloudflare v13 outputs:
 *   dist/client/  — static assets
 *   dist/server/  — Worker entry (entry.mjs + chunks/)
 *
 * Cloudflare Pages Advanced Mode needs:
 *   dist/          — static assets at root
 *   dist/_worker.js — single bundled Worker file
 */

import { build as esbuild } from 'esbuild';
import { cpSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const root = fileURLToPath(new URL('..', import.meta.url));
const distClient = join(root, 'dist/client');
const distServer = join(root, 'dist/server');
const distOut = join(root, 'dist');

try {
  // 1. Bundle dist/server/entry.mjs → dist/_worker.js
  console.log('Bundling Worker...');
  await esbuild({
    entryPoints: [join(distServer, 'entry.mjs')],
    outfile: join(distOut, '_worker.js'),
    bundle: true,
    format: 'esm',
    platform: 'browser', // Cloudflare Workers uses browser-like globals
    conditions: ['workerd', 'worker', 'browser'],
    external: ['cloudflare:*', '__STATIC_CONTENT_MANIFEST', 'node:*'],
    minify: true,
    logLevel: 'info',
  });

  // 2. Move static assets from dist/client/* → dist/*
  console.log('Moving static assets...');
  cpSync(distClient, distOut, { recursive: true });
  rmSync(distClient, { recursive: true, force: true });
  rmSync(distServer, { recursive: true, force: true });

  // 3. Remove .wrangler/deploy/config.json — it points to dist/server/wrangler.json
  // which no longer exists. Without it, Pages uses dist/_worker.js directly.
  const wranglerDeploy = join(root, '.wrangler');
  rmSync(wranglerDeploy, { recursive: true, force: true });

  // 4. Generate _routes.json — static assets bypass the Worker entirely.
  //    Without this, _worker.js intercepts ALL requests including /_astro/*.css
  //    and fails to serve them (redirects to /404 instead).
  const routes = {
    version: 1,
    include: ['/*'],
    exclude: ['/_astro/*', '/favicon.svg', '/skills/*'],
  };
  writeFileSync(join(distOut, '_routes.json'), JSON.stringify(routes, null, 2));
  console.log('Generated _routes.json');

  console.log('Done. Pages output ready at dist/');
} catch (err) {
  console.error('prepare-pages failed:', err);
  process.exit(1);
}
