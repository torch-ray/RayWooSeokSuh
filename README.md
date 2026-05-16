# RayWooSeokSuh

Personal site (wooseok.dev) — blog and career page. Built with Astro.

## Develop

```bash
pnpm install
pnpm dev
```

Open <http://localhost:4321>.

## Build

```bash
pnpm astro check
pnpm build
```

## Add a post

Drop a file into `src/content/posts/`:

```mdx
---
title: "Post title"
subtitle: "Optional subtitle"
date: 2026-05-20
category: ios   # ios | ai | cs | career | notes
tags: [swiftui, animation]
draft: false
---

Post body in MDX...
```

## Update career facts

Edit `src/data/profile.ts`. The sidebar and About page read from this module.

## Deploy

Pushes to `main` deploy to Vercel automatically.

## Structure

- `src/pages/` — routes
- `src/layouts/` — page shells
- `src/components/` — UI building blocks
- `src/content/posts/` — writing (MDX)
- `src/data/profile.ts` — career data
- `src/styles/global.css` — Tailwind v4 theme tokens + base styles
- `src/content.config.ts` — content collection schema

## Tech

Astro 6 (content layer API), Tailwind v4, MDX, Vercel hosting, Vercel Web Analytics, Shiki code highlight, system fonts (SF Pro / SF Mono).

## License

Code: MIT. Content: All rights reserved.
