---
title: Roadmap
---

# Roadmap

Outstanding work after the FormEngine → WorkflowEngine fork (commit `0efe811`). Priority roughly top-to-bottom.

> Content migration scope is tracked separately in [content-migration.md](content-migration.md).

## Done

- [x] ~~Replace homepage content.~~ **Phase 3** (`c3ac967` + polish `d21f07b…a27825e`). `main.json` rewritten: Hero (chips) → Logos → Supported Processes → Core Features (verbatim, 3-col FeaturesGridBlock) → Which Product? → Testimonials → Contact CTA.
- [x] ~~Fill `/features/`, `/server/`, `/downloads/`.~~ **Phase 3.** Features + Server via PageBlocks + JSON; Downloads hard-coded with real 20.0.8 data.
- [x] ~~Rewrite `/pricing/`.~~ **Phase 1** — route deleted entirely, 301 to optimajet.com.
- [x] ~~Wire up Bitrix24 form.~~ **Phase 3.** `ContactForm.tsx` is a real form posting to `/backend/lead/` → Netlify function → Bitrix24. Needs `BITRIX_URL` env var in Netlify to actually send leads.
- [x] ~~Replace logo.~~ **Phase 3.x.** Real WorkflowEngine brand SVG in `/public/logos/workflowengine.svg`; white text fills swapped to slate-900 for light nav.
- [x] ~~Clean orphan data files.~~ **Phase 1.**
- [x] ~~Remove GitHub / stargazers / open-source framing.~~ **Phase 1.5** (`5101f9c`). WorkflowEngine is closed-source.
- [x] ~~Light theme migration.~~ **Phase 2.**
- [x] ~~Purple → brand cyan-blue palette.~~ **Phase 3.x** (`a3ea922`).

## P0 — next up

- [ ] **Port blog (all 20 posts).** SEO-critical — legacy URLs must resolve at same slugs. Tracked in [content-migration.md](content-migration.md#phase-4--blog-p0-seo-critical). Until this lands, the hero "Why Use Workflow Engine" CTA points to `https://workflowengine.io/blog/...` (external); switch to internal `/blog/...` once the post is live.
- [ ] **Audit remaining pages in a real browser.** `/features/`, `/server/`, `/downloads/`, `/contacts/` were built but not walked through. Expect small light-theme edge cases (white text on white, weird spacing, broken gradient masks) similar to what was caught iteratively on home.

## P1 — cleanup

- [ ] **Regenerate `package-lock.json`.** Still references removed `@react-form-builder/*`, `@mui/*`, `@emotion/*` packages. Run a clean `npm install` on a healthy network.
- [ ] **Set `BITRIX_URL` (+ optional `BITRIX_ASSIGNED_BY_ID`) in Netlify.** Without it, `/backend/lead/` returns 500 and the contact form fails.
- [ ] **Prune dead FormEngine blocks / JSON references.** Dead links and orphan components still in the tree:
  - `components/FrameworkLogosBlock.tsx`, `HeroFrameworksBlock.tsx` — hrefs to `/react-form-components-library/<framework>/`.
  - `components/ComparisonTable.tsx`, `ComparisonTimeline.tsx`, `ComponentsTable.tsx`, `CodePreview.tsx`, `ArchitectureDiagram.tsx`, `DesignerTree.tsx`, `ChatGPTButton.tsx`, `FormDemoBlock.tsx`, `MUI*` / `Mantine*` / `Shadcn*` blocks (placeholders) — decide keep / repurpose / delete.
- [ ] **Curate customer logos.** `LogosBlock` hard-codes a 9-logo set of shared OptimaJet clients (Bosch, Engie, Philips, Nelnet, Dell, Acer, Santos, Ideagen, Novartis). The workflowengine.io live set adds Airbus, KPMG, Wolters Kluwer, ProcessMAP, Techlogix, Technocom, MediaOcean, GE Honda, Wine.Create. Needs SVG sourcing — or pick a shorter curated list.
- [ ] **`public/sitemap.xml`** — auto-generated at build time, but check for stale FormEngine URLs after next deploy.
- [ ] **`public/robots.txt`, `public/_redirects`, `public/_headers`** — audit for FormEngine leftovers.
- [ ] **Drop `__placeholder__` blog workaround** once the first real post lands. See [blog.md](../blog.md).

## P2 — nice to have

- [ ] **Remove unused components wholesale** after P0/P1 are done (many "MUI", "Mantine", "Shadcn", "Designer" blocks).
- [ ] **Kill unused form schemas** in `src/forms/` — most orphaned after the viewer removal in Phase 1.
- [ ] **Re-audit `src/lib/bir1706.ts`** — FormEngine demo schema, not referenced anywhere now; likely deletable.
- [ ] **Port `docs/deploy.md`** — still says `formengine.io` in examples and variable names.
