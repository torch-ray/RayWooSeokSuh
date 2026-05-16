// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://wooseok.dev',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [mdx(), sitemap(), react()],
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
});
