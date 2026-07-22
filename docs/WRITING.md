# Writing playbook

How posts get written on this site. Read `../CLAUDE.md` first for the stack and repo rules. This file is the voice + workflow.

## The shape of a post

Every post is a **translation pair**: one file in `src/content/posts/en/<slug>.mdx` and one in `src/content/posts/ko/<slug>.mdx`, **sharing the same slug**. The slug is the filename. English is the default; Korean is reached via the toggle. A post may exist in only one language — the toggle then only shows for posts whose sibling exists (`siblingExists` handles this) — but the standing convention here is **write both**.

Reading time is computed from the **English** body and shown identically on both language pages (`getReadingTimeMinutes` in `src/lib/posts.ts`). So the EN version should always exist.

### Frontmatter (schema enforced by `src/content.config.ts`)

```mdx
---
title: "Post title"
subtitle: "One-line subtitle, ends with a period."
date: 2026-07-17          # publish date — ASK THE OWNER for today's date; the
                          #   session clock is often stale. Do not guess.
category: ios             # one of: ios | ai | cs | career | notes
tags: [swift, concurrency]
draft: false              # optional; drafts are excluded from build
---
```

`title` / `subtitle` are language-specific (translate them). `date`, `category`, `tags` match across the pair.

## Voice — this is the important part

### Korean posts: flat prose, `~다`

- **No section headings in the body.** Korean posts run as continuous paragraphs. The only `###` heading is the final **`### References`** (or `### Sources`).
- **Declarative `~다` form**, not 경어체 (`~습니다`). Direct, essayistic.
- One clear thesis per post, stated early, paid off at the end. The closing line should land.
- Inline code/technical terms in backticks. Emphasis with `*...*` (italic) and `**...**` (bold) sparingly.
- English technical terms stay in English (`actor`, `open addressing`, `probing`, `load factor`) — don't force Korean calques.

### English posts: sectioned, natural — not a translation

- **Use `###` section headings** (typically 4–5). The English version is *structured*, the Korean is *flowing*. This asymmetry is intentional and established.
- **Write the English fresh in English**, matching the Korean's meaning and argument but with English idiom and rhythm. Do **not** translate the Korean literally. Titles especially: find the natural English line, not a gloss (e.g. KO "발표도 결국 버리는 일이었다" → EN "Giving the talk was also about dropping frames"; KO "해시 테이블의 주인공은 빈칸이다" → EN "The empty slots are the point").
- Same references, adapted.

### Both

- Technical accuracy is non-negotiable. The owner will fact-check hard and has caught real errors — verify claims (formulas, API behavior, what Swift actually does) before asserting. When Apple's internal implementation isn't publicly confirmed, hedge honestly ("this family of algorithm", "believed to").
- `### References` at the end: real sources, markdown links. Primary sources (Apple docs, papers) over blog roundups where possible.
- Category labels render mixed-case (`iOS`, not `IOS`) — the label map handles it; don't uppercase category text in components.

## The workflow (how the owner and Claude actually collaborate)

The owner brings raw material — sometimes a full draft, sometimes a rough mental dump to ping-pong on. Then:

1. **Fact-check + surface issues.** If the draft has wrong or fuzzy technical content, say so plainly with the correction. The owner *wants* the pushback.
2. **Write the Korean draft** in the house style (flat, `~다`), and **show it in chat for review — do not create the file yet.** For deeper topics this is several ping-pong rounds; the owner refines wording and technical framing.
3. When the Korean is approved, **ask for today's date** if not given, then:
   - write `src/content/posts/ko/<slug>.mdx`
   - write the English sibling `src/content/posts/en/<slug>.mdx` (fresh English, sectioned)
   - `pnpm astro check` + `pnpm build` (must pass)
   - commit + push (pre-authorized for this repo)
4. Report the new routes and how the home feed / "Browse by topic" changes (new category appears automatically, etc.).

Small wording tweaks after publish: apply to the Korean as asked, and **mirror the equivalent change in the English** for consistency (same intent, not literal), then rebuild + push.

## Images

- Put source images in `src/assets/` with descriptive names (e.g. `techday-2026-talk.png`).
- In MDX, optimize via `astro:assets`:

  ```mdx
  import { Image } from 'astro:assets';
  import photo from '../../../assets/my-photo.png';   // ../../../ from src/content/posts/{en,ko}/

  <figure>
    <Image src={photo} alt="descriptive alt" />
    <figcaption>Caption.</figcaption>
  </figure>
  ```

  `PostLayout.astro`'s `prose-content` styles `figure` / `figcaption` / `img` (rounded, centered caption). `sharp` must be installed (it is; see CLAUDE.md) or the build fails.
- **Photos of real events/people:** publish only what's safe on a public, indexed site — the owner's own face is their call; avoid other people's identifiable frontal faces, confidential slides, and anything a company policy would restrict. Flag it and let the owner confirm before publishing; don't assume.

## Current posts (as of last update, for tone reference)

iOS: `cvpixelbuffer-and-cmtime`, `drop-frames-save-the-screen`, `vision-coordinate-flip`, `diffable-data-source-hashable`
AI: `the-harnesses-that-will-disappear`, `llm-scaling-and-world-models`
CS: `hash-table-empty-slots`
Career: `talk-is-dropping-frames`

The iOS posts form a loose on-device-vision / Swift-internals thread; read a couple before writing a new one to match cadence and depth.
