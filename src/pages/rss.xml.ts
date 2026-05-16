import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  return rss({
    title: 'wooseok.dev',
    description: 'Writing on iOS, AI, CS, and the things I am figuring out along the way.',
    site: context.site ?? 'https://wooseok.dev',
    items: posts
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((post) => ({
        title: post.data.title,
        description: post.data.subtitle ?? '',
        pubDate: post.data.date,
        link: `/posts/${post.id}/`,
        categories: [post.data.category],
      })),
  });
}
