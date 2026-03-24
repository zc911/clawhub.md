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
import { cpSync, rmSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const root = fileURLToPath(new URL('..', import.meta.url));
const distClient = join(root, 'dist/client');
const distServer = join(root, 'dist/server');
const distOut = join(root, 'dist');

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

console.log('Done. Pages output ready at dist/');
