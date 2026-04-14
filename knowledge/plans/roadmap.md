---
title: Roadmap
---

# Roadmap

Outstanding work after the FormEngine → WorkflowEngine fork (commit `0efe811`). Priority roughly top-to-bottom.

> Content migration scope is tracked separately in [content-migration.md](content-migration.md).

## P0 — must do before launch

- [ ] **Replace homepage content.** `src/data/main.json` still has FormEngine copy, CTA links to deleted routes (`/ai-form-builder`, `/react-form-library`, GitHub to `optimajet/workflowengine` is fine), npm install commands (`@react-form-builder/core`), and a dangling `StarsWall` block entry. Rewrite the JSON for WorkflowEngine messaging.
- [ ] **Fill `/features/`, `/server/`, `/downloads/`.** Currently placeholder heroes only ([routes.md](../routes.md)).
- [ ] **Rewrite `/pricing/`.** Layout metadata and page heading were updated, but `Pricing` component + `pricing-faq.json` + `components-fast-qr/google-map/rich-text/signature` npm snippets in `app/pricing/page.tsx:63-84` still FormEngine-flavored.
- [ ] **Wire up Bitrix24 form** in [ContactForm.tsx](../../src/components/ContactForm.tsx) — currently renders `<p>Contact form placeholder — coming soon</p>`. Pattern documented in [external-scripts.md](../external-scripts.md#approved-patterns).
- [ ] **Replace logo.** `/public/logos/workflowengine.svg` is still the FormEngine logo file (renamed during fork). Swap to the real WorkflowEngine brand asset.

## P1 — cleanup

- [ ] **Regenerate `package-lock.json`.** Still references removed `@react-form-builder/*`, `@mui/*`, `@emotion/*` packages. Run a clean `npm install` (session's npm had a transient SSL issue — retry on a healthy network).
- [ ] **Prune dead content references.** Blocks/data that still link to deleted routes:
  - `components/FrameworkLogosBlock.tsx` + `HeroFrameworksBlock.tsx` — all `hrefs` to `/react-form-components-library/<framework>/`
  - `components/Footer.tsx` RESOURCES column still has FormEngine-specific entries
  - ~~`src/data/core.json`, `designer.json`, `core-mantine.json`, `core-mui.json`, `core-shadcn.json`, `rsuite.json`, `rsuite-page.json`, `comparisons.ts`, `comparison-pages.ts`, `libraries.ts` — **no route consumes these**~~ **Done 2026-04-14 (Phase 1).**
  - `components/ComparisonTable.tsx`, `ComparisonTimeline.tsx`, `ComponentsTable.tsx`, `CodePreview.tsx`, `ArchitectureDiagram.tsx`, `DesignerTree.tsx`, `ChatGPTButton.tsx`, `FormDemoBlock.tsx` (placeholder), `MUI*`/`Mantine*`/`Shadcn*` blocks (placeholders) — decide keep/repurpose/delete.
- [ ] **Clean homepage JSON** of orphaned block types (`StarsWall`, `FormDemoBlock`) once the new design is in.
- [ ] **`public/sitemap.xml`** currently auto-generated but from old route set; will self-heal on next build. Verify after route work lands.
- [ ] **`public/robots.txt`, `public/_redirects`, `public/_headers`** may contain FormEngine URLs — audit.
- [ ] **Drop `__placeholder__` blog workaround** once a real post exists, OR delete `src/app/blog/[slug]/` entirely until first post. See [blog.md](../blog.md) and [decisions.md](../decisions.md#4-placeholder-slug-for-empty-blog).

## P2 — nice to have

- [ ] **Remove unused components wholesale** after P0/P1 are done (many "MUI", "Mantine", "Shadcn", "Designer" blocks).
- [ ] **Kill unused form schemas** in `src/forms/` (contact.json, demo-*.json) — most orphaned after the viewer removal.
- [ ] **Re-audit `src/lib/bir1706.ts`, `src/lib/stargazersCache.ts`** — `bir1706` was a FormEngine demo schema; `stargazersCache` reads `public/stargazers.json` which is still populated for `optimajet/workflowengine` (stars are shown in `Navigation.tsx`).
- [ ] **Port `docs/deploy.md`** copy from `formengine.io` → `workflowengine.io` (still says `formengine.io` in examples and variable names).
