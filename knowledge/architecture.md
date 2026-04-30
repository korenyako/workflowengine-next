---
title: Architecture
---

# Architecture

Marketing site for OptimaJet WorkflowEngine. Static-exported Next.js 16 app. **No backend, no DB, no API routes.**

## Stack

- **Next.js 16** (App Router) in **static export mode** (`output: 'export'` in [next.config.ts](../next.config.ts))
- **React 19**, **TypeScript 5.9**, `@/*` → `./src/*`
- **Tailwind CSS 4** (PostCSS plugin, config in [tailwind.config.ts](../tailwind.config.ts))
- **Framer Motion** for animations
- **@xyflow/react** + **dagre** for architecture diagrams
- **highlight.js** for code syntax highlighting
- **next-mdx-remote** for blog MDX rendering (server-side, RSC)
- **next-sitemap** + **js-beautify** run after `next build` to produce `sitemap.xml` and pretty-print HTML

See [package.json](../package.json) for full deps list.

## Directory layout

```
src/
├── app/            # App Router pages — each folder = URL
├── components/     # ~25 React components — block-based page sections + Footer/Nav/Button helpers
├── content/blog/   # Blog MDX sources (currently empty)
├── data/           # JSON/TS content for pages (main.json, features.json, server.json, blog.ts)
├── styles/         # globals.css
└── utils/seo.ts    # SITE_ORIGIN, SITE_NAME, DEFAULT_OG_IMAGE
public/             # Static assets, sitemap.xml, robots.txt, _redirects, _headers
netlify/            # Netlify functions (lead proxy)
docs/deploy.md      # Full deploy guide (Docker + Nginx, standalone, direct copy)
```

## Build pipeline

`npm run build` chains three steps:
1. `next build` — produces `out/` with HTML/CSS/JS
2. `next-sitemap` — generates `out/sitemap.xml` (config: [next-sitemap.config.js](../next-sitemap.config.js); reads git log for `lastmod`)
3. `html-beautify` — pretty-prints all `out/**/*.html` in place

## Deployment

Primary target: **Netlify** (auto-build on push, uses `public/_redirects`, `public/_headers`, `netlify.toml`). Alternative targets documented in [docs/deploy.md](../docs/deploy.md): Nginx+Docker, Node standalone, direct rsync.

No env vars required for build. `scripts/fetch-stargazers.mjs` uses an optional `GITHUB_TOKEN`.

## Content model

Pages are assembled from **blocks** driven by JSON. See [content-blocks.md](content-blocks.md).

## Why static export

- Cheap (any static host), fast (pre-built HTML), reliable (no server to break).
- **Trade-off:** no API routes, no server-side form handling, no middleware. External services used instead (Bitrix24 for contact form, GTM for analytics). See [external-scripts.md](external-scripts.md).
- Any dynamic route must have `generateStaticParams()` — see [blog.md](blog.md) for the empty-blog workaround.
