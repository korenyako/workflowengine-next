# WorkflowEngine Website (Next.js)

Marketing site for [OptimaJet WorkflowEngine](https://workflowengine.io) — .NET workflow automation engine.

**Live site:** https://workflowengine.io (deploy pending)

## Quick Start

```bash
npm install        # Install dependencies
npm run dev        # http://localhost:3000
npm run build      # Static export → /out
npm run lint       # ESLint
```

## Stack

Next.js 16 (App Router, **static export**) · React 19 · TypeScript 5.9 · Tailwind CSS 4 · Framer Motion · highlight.js · next-mdx-remote (blog).

## Structure

- `src/app/` — page routes (`/`, `/features/`, `/server/`, `/downloads/`, `/contacts/`, `/blog/`, `/agreements/policy/`)
- `src/components/` — block components + shared UI (Navigation, Footer, ContactForm…)
- `src/data/` — `main.json`, `features.json`, `server.json`, `blog.ts` (JSON-driven block content)
- `src/content/blog/` — MDX post bodies
- `public/` — static assets, sitemap, robots, `_redirects`, `_headers`
- `netlify/` — Netlify Function for contact-form lead proxy → Bitrix24

## More info

- [CLAUDE.md](CLAUDE.md) — project conventions and critical rules for AI assistants
- [knowledge/INDEX.md](knowledge/INDEX.md) — full wiki (architecture, routes, blog pipeline, decisions)
- [STATUS.md](STATUS.md) — current status snapshot

Forked from [`formengine-next`](../formengine-next); no upstream sync.
