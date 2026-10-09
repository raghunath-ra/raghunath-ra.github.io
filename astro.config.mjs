// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/data/site.ts';
import { profile } from './src/data/profile.ts';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  // The blog moved to /writing, tags became the four topics, two topics were
  // renamed, research became a section of /work, and the first essay was retitled.
  redirects: {
    '/blog': '/writing/',
    '/blog/tags': '/topics/',
    '/topics/ai-safety': '/topics/ai-systems/',
    '/topics/security-communication': '/topics/cybersecurity-communication/',
    '/research': '/work/#research',
    '/writing/the-model-is-finishing-your-sentence': '/writing/what-a-language-model-learns-from-language/',
  },
  integrations: [
    mdx(),
    // /now/ only redirects to /about/ while profile.now is null, so leave it out then.
    sitemap({ filter: (page) => profile.now !== null || !page.endsWith('/now/') }),
  ],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
