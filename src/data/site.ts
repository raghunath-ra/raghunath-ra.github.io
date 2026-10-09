/**
 * SITE CONFIG: settings that are about the website, not about you.
 *
 * `SITE_URL` is the single source of the site's address. `astro.config.mjs`
 * reads it, and canonical URLs, Open Graph tags, JSON-LD, the sitemap,
 * robots.txt and the RSS feed all derive from it. To move to a custom domain,
 * change it here (see "Custom domain" in README.md).
 */
export const SITE_URL = 'https://raghunath-ra.github.io';

export const site = {
  url: SITE_URL,
  repo: 'https://github.com/raghunath-ra/raghunath-ra.github.io',
  lang: 'en',
  locale: 'en_US',
  /**
   * Google Search Console "HTML tag" verification. Paste only the token from
   * `<meta name="google-site-verification" content="TOKEN">`. Empty = no tag.
   */
  googleSiteVerification: '',
};
