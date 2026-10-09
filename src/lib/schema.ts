/**
 * Structured data (JSON-LD). Every page carries the Person and WebSite nodes;
 * pages add their own (BlogPosting, BreadcrumbList, …) through Base's `schema`
 * prop. Nodes reference each other by `@id`, so the whole page is one graph.
 */
import { profile } from '../data/profile';
import { topics } from '../data/topics';
import { site } from '../data/site';

type Node = Record<string, unknown>;

export const ids = (base: URL | string) => ({
  person: new URL('/#person', base).href,
  website: new URL('/#website', base).href,
});

export function personNode(base: URL | string): Node {
  return {
    '@type': 'Person',
    '@id': ids(base).person,
    name: profile.name,
    url: new URL('/', base).href,
    jobTitle: profile.jobTitle,
    description: profile.seoDescription,
    knowsAbout: topics.map((t) => t.title),
    sameAs: Object.values(profile.links).filter(Boolean),
    homeLocation: { '@type': 'Place', name: profile.location },
  };
}

export function websiteNode(base: URL | string): Node {
  return {
    '@type': 'WebSite',
    '@id': ids(base).website,
    url: new URL('/', base).href,
    name: profile.name,
    description: profile.seoDescription,
    inLanguage: site.lang,
    author: { '@id': ids(base).person },
    publisher: { '@id': ids(base).person },
  };
}

export interface Crumb {
  name: string;
  href: string;
}

/** Home is added automatically as the first item. */
export function breadcrumbNode(base: URL | string, crumbs: Crumb[]): Node {
  const all = [{ name: 'Home', href: '/' }, ...crumbs];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: new URL(c.href, base).href,
    })),
  };
}

export function blogPostingNode(
  base: URL | string,
  post: {
    url: string;
    title: string;
    description: string;
    published: Date;
    modified?: Date;
    image: string;
    topics: string[];
    wordCount?: number;
  },
): Node {
  const url = new URL(post.url, base).href;
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    url,
    mainEntityOfPage: url,
    headline: post.title,
    description: post.description,
    datePublished: post.published.toISOString(),
    dateModified: (post.modified ?? post.published).toISOString(),
    image: new URL(post.image, base).href,
    inLanguage: site.lang,
    author: { '@type': 'Person', '@id': ids(base).person, name: profile.name, url: new URL('/about/', base).href },
    publisher: { '@id': ids(base).person },
    isPartOf: { '@id': ids(base).website },
    about: post.topics.map((name) => ({ '@type': 'Thing', name })),
    keywords: post.topics.join(', '),
    ...(post.wordCount ? { wordCount: post.wordCount } : {}),
  };
}

export const graph = (nodes: Node[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
