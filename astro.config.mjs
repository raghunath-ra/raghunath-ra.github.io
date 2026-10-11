// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/data/site.ts';
import { profile } from './src/data/profile.ts';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  // Old addresses: the blog moved to /writing, tags became the four topics, two
  // topics were renamed, research became a section of /work, and an essay was
  // retitled (its old address points to /writing/ until the essay is published).
  redirects: {
    '/blog': '/writing/',
    '/blog/tags': '/topics/',
    '/topics/ai-safety': '/topics/ai-systems/',
    '/topics/security-communication': '/topics/cybersecurity-communication/',
    '/research': '/work/#research',
    '/writing/the-model-is-finishing-your-sentence': '/writing/',
  },
  integrations: [
    mdx(),
    // /now/ redirects to /about/ whenever profile.now is unset (the same check
    // as src/pages/now.astro), so leave it out then.
    sitemap({ filter: (page) => Boolean(profile.now) || !page.endsWith('/now/') }),
  ],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
