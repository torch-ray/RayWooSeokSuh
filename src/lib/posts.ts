import { getCollection, type CollectionEntry } from 'astro:content';

export type PostLang = 'en' | 'ko';
export const LANGS = ['en', 'ko'] as const satisfies readonly PostLang[];
export const DEFAULT_LANG: PostLang = 'en';

/** "en/the-harnesses" → "en" */
export function entryLang(entry: CollectionEntry<'posts'>): PostLang {
  return entry.id.split('/')[0] as PostLang;
}

/** "en/the-harnesses" → "the-harnesses" */
export function entrySlug(entry: CollectionEntry<'posts'>): string {
  return entry.id.split('/').slice(1).join('/');
}

/** Build the public URL for a post by lang + slug. */
export function postUrl(lang: PostLang, slug: string): string {
  return lang === DEFAULT_LANG ? `/posts/${slug}/` : `/${lang}/posts/${slug}/`;
}

/** Build the public URL for the language root (post list home). */
export function langHomeUrl(lang: PostLang): string {
  return lang === DEFAULT_LANG ? '/' : `/${lang}/`;
}

/** Build the public URL for a category page in the given lang. */
export function categoryUrl(lang: PostLang, category: string): string {
  return lang === DEFAULT_LANG ? `/categories/${category}/` : `/${lang}/categories/${category}/`;
}

/** Build the public URL for the RSS feed in the given lang. */
export function rssUrl(lang: PostLang): string {
  return lang === DEFAULT_LANG ? '/rss.xml' : `/${lang}/rss.xml`;
}

/** Get all non-draft posts for a given language, newest first. */
export async function getPostsByLang(lang: PostLang) {
  const all = await getCollection('posts', ({ data }) => !data.draft);
  return all
    .filter((p) => entryLang(p) === lang)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Whether a sibling translation exists for the given slug in the other lang. */
export async function siblingExists(slug: string, otherLang: PostLang): Promise<boolean> {
  const all = await getCollection('posts', ({ data }) => !data.draft);
  return all.some((p) => entryLang(p) === otherLang && entrySlug(p) === slug);
}
