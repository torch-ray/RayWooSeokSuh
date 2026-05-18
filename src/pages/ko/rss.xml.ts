import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPostsByLang, entrySlug, postUrl } from '../../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPostsByLang('ko');

  return rss({
    title: 'Ray Suh (한국어)',
    description: 'iOS, AI, CS — 작업하면서 정리하는 글들.',
    site: context.site ?? 'https://wooseok.dev',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.subtitle ?? '',
      pubDate: post.data.date,
      link: postUrl('ko', entrySlug(post)),
      categories: [post.data.category],
    })),
  });
}
