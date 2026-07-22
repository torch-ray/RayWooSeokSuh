# RayWooSeokSuh — wooseok.dev

Personal site for **Ray WooSeok Suh** (iOS engineer). Blog-first, English default with a Korean toggle, Apple-leaning minimal design. Built with Astro, deployed to Vercel.

**Live:** https://ray-woo-seok-suh.vercel.app · **Repo:** github.com/torch-ray/RayWooSeokSuh (public)

> If you're a fresh Claude session picking this up: read this file, then `docs/WRITING.md` before writing or editing any post. The conventions below are load-bearing — the site's whole voice depends on them.

---

## Stack (and version gotchas — these bit us, don't relearn them)

- **Astro 6** + **TypeScript (strict)** + **MDX** content. Package manager: **pnpm**.
- **Content: Astro 6 content layer API.** Config lives at `src/content.config.ts` (dot, not `src/content/config/`). Collections use a `glob` loader. The legacy `type: 'content'` API is **removed** in Astro 6 — do not use it.
  - Entries expose `entry.id` (the slug incl. lang prefix), **not** `entry.slug`.
  - Render with `import { render } from 'astro:content'; const { Content } = await render(entry);` — **not** `entry.render()`.
- **Tailwind v4** via `@tailwindcss/vite` (not `@astrojs/tailwind`, which no longer exists). Theme tokens are defined in **CSS `@theme`** inside `src/styles/global.css`, not a `tailwind.config.*` file.
- **View Transitions**: the component is `ClientRouter` from `astro:transitions` (renamed from `ViewTransitions`).
- **Dark mode** is `prefers-color-scheme` (media-query) based — there is **no `.dark` class**. In raw CSS use `@media (prefers-color-scheme: dark)`, not `html.dark`.
- **`sharp` is a direct dependency** (`package.json`). It must stay there: pnpm does not link Astro's transitive sharp into `node_modules/sharp`, and without it `astro:assets` image optimization fails the build (`MissingSharp`). If image builds ever break, `pnpm add sharp`.
- Fonts are **system** (SF Pro / SF Mono) — no web fonts. Analytics: `@vercel/analytics` (enable in the Vercel dashboard).

## Commands

```bash
pnpm install
pnpm dev                 # http://localhost:4321
pnpm astro check         # type-check — must be clean (0 errors; ~9 z-deprecation hints are expected noise)
pnpm build               # must exit 0; catches schema + image errors
```

Always run `pnpm astro check` **and** `pnpm build` before committing. Green build is the gate.

## Deploy & git

- Vercel auto-deploys on push to `main`. No adapter (fully static).
- **Git author MUST be the personal identity**, already set as repo-local config: `torch-ray` / `ddarjae@naver.com`. The machine's global git config is a work email — do not commit with it. Verify with `git config --local --get user.email`. (Vercel Hobby blocks deploys from commit authors without repo access; the personal email is what's authorized. The repo is public, which is also what lets Hobby deploy it.)
- **Commit + push policy for this repo:** committing and pushing per task/change is pre-authorized by the owner — you don't need to ask each time. Still off-limits without explicit say-so: creating branches, force-push, history rewrites, worktrees. Work directly on `main`.
- Commit messages: conventional-ish (`feat(...)`, `fix(...)`, `post: ...`). No Claude/AI co-author trailer has been used here; match existing history.

## Layout of the code

```
src/
  content.config.ts          # posts collection schema + CATEGORIES + CATEGORY_LABELS
  content/posts/en/*.mdx      # English posts
  content/posts/ko/*.mdx      # Korean posts (same slug = translation pair)
  data/profile.ts            # ALL career facts (name, role, lede, now, previously,
                             #   education, projects, elsewhere, email) — single source of truth
  lib/posts.ts               # helpers: entryLang, entrySlug, postUrl, categoryUrl,
                             #   rssUrl, langHomeUrl, getPostsByLang, siblingExists,
                             #   getReadingTimeMinutes  (LANGS=['en','ko'], DEFAULT_LANG='en')
  layouts/BaseLayout.astro   # <head>, OG/Twitter meta, hreflang, ClientRouter, skip-link
  layouts/PostLayout.astro   # post chrome + prose-content styles (incl. figure/figcaption/img)
  components/                # SiteNav, Sidebar, PostList, LangToggle
  pages/                     # index, writing, about, 404, posts/[...slug], categories/[category], rss.xml.ts
  pages/ko/                  # Korean mirrors: index, writing, posts/[...slug], categories/[category], rss.xml.ts
  assets/                    # images optimized via astro:assets (e.g. talk photos)
  styles/global.css          # Tailwind v4 @theme tokens + base
```

Two data sources, everything else is derived:
- **Career facts** → edit `src/data/profile.ts` only. Sidebar + About read from it. (About is English-only.)
- **Writing** → drop an `.mdx` into `src/content/posts/{en,ko}/`.

## Site behavior worth knowing

- **`/` (home)** = left sidebar (identity facts) + right "Writing" list (recent **5**) + a **"Browse by topic"** row (categories that have posts, with counts) . When >5 posts exist a **"View all writing →"** links to `/writing/`.
- **`/writing/`** = full post list, no sidebar. **`/about/`** = long-form, English only.
- **i18n**: English is default (no path prefix). Korean lives under **`/ko/...`**. There is **no auto-detect** — language changes only via the **`LangToggle`** (a per-page control). About/404/Sidebar/Nav stay English; only the writing surfaces + post bodies are bilingual.
- **Categories**: `ios · ai · cs · career · notes` (schema enum). Labels: iOS, AI, CS, Career, Notes. Empty categories are hidden from "Browse by topic".
- **Wordmark** is `rs` (top-left, links home). Site name in `<title>`/OG is `Ray Suh`. Favicon is `rs`.
- **No visitor counter** — deliberate decision (not the modern norm; would read as inflated on a small blog). Do not add one without the owner asking. Page views live only in Vercel Web Analytics (dashboard-only; not shown on-site; cannot be reconstructed retroactively).

## Writing posts

The post-writing playbook — bilingual pairing, category choice, frontmatter, the Korean vs English style rules, the draft→review→publish workflow, and images — is in **`docs/WRITING.md`**. Read it before touching content.
