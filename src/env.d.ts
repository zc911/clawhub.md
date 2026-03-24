/// <reference types="astro/client" />

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

interface Env {
  SKILL_CACHE: KVNamespace;
  GITHUB_TOKEN?: string;
}

declare namespace App {
  interface Locals extends Runtime {}
}
