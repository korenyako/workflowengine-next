---
title: Routes
---

# Routes

All routes are statically exported. Each URL corresponds to a folder under [src/app/](../src/app/).

| Route | Source | Status |
|-------|--------|--------|
| `/` | [app/page.tsx](../src/app/page.tsx) | Renders `main.json` via `<Blocks />`. Content still FormEngine-flavored. |
| `/features/` | [app/features/page.tsx](../src/app/features/page.tsx) | **Stub** — placeholder hero only |
| `/server/` | [app/server/page.tsx](../src/app/server/page.tsx) | **Stub** — placeholder hero only |
| `/downloads/` | [app/downloads/page.tsx](../src/app/downloads/page.tsx) | **Stub** — placeholder hero only |
| `/pricing/` | [app/pricing/page.tsx](../src/app/pricing/page.tsx) + `layout.tsx` | Live, renders FormEngine pricing — needs WorkflowEngine rewrite |
| `/contacts/` | [app/contacts/page.tsx](../src/app/contacts/page.tsx) + `layout.tsx` | Live; Bitrix24 form currently stubbed. See [external-scripts.md](external-scripts.md) |
| `/blog/` | [app/blog/page.tsx](../src/app/blog/page.tsx) | Blog index; reads `src/data/blog.ts` (currently empty array) |
| `/blog/[slug]/` | [app/blog/[slug]/page.tsx](../src/app/blog/[slug]/page.tsx) | Dynamic; emits `/blog/__placeholder__/` while empty (see [decisions.md](decisions.md)) |
| `/404` | [app/not-found.tsx](../src/app/not-found.tsx) | Standard not-found |

## Navigation

[components/Navigation.tsx](../src/components/Navigation.tsx) lists: Features, Workflow Server, Downloads, Pricing, Blog, Contact Us + external Documentation link. "Download" CTA points to `/downloads`. Old dropdown menus (Core / Components / Form Builder / Developers / Documentation) were flattened to simple links during the fork.

## Footer

[components/Footer.tsx](../src/components/Footer.tsx) has four columns: PRODUCTS (new WE routes), DEVELOPERS, RESOURCES, COMPANY. Docs links point to `https://workflowengine.io/documentation/` (external).

## Removed during fork

Deleted and not replaced: `/react-form-library`, `/react-form-builder-library`, `/react-form-components-library[/*]`, `/ai-form-builder`, `/comparison/[slug]`, `/custom-components`, `/demos`, `/developers[/success-story]`, `/lightweight-react-json-schema-form-builder-library-for-{mantine,mui,shadcn-ui}`, `/contacts2`. Dead links to these still exist in `FrameworkLogosBlock`, `HeroFrameworksBlock`, and `src/data/main.json` — cleanup tracked in [plans/roadmap.md](plans/roadmap.md).
