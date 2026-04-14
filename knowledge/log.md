# Wiki change log

Chronological log of wiki updates. Newest entries on top.

## 2026-04-14 | Решения по content migration

Owner ответил на open questions в [plans/content-migration.md](plans/content-migration.md): DWKit остаётся в 3-way comparison, FormEngine-баннер убираем, блог портируем **весь** (SEO), Pricing/EULA/CSA — 301-редиректы на optimajet.com (как в legacy), тема светлая, типографика как есть. Фазы обновлены, блог выделен в отдельную P0-фазу.

## 2026-04-14 | Инвентарь workflowengine.io

Added [plans/content-migration.md](plans/content-migration.md) — scoping doc for migrating content from the live site (workflowengine.io). Sources: WebFetch of `/`, `/features/`, `/server/`, `/downloads/`, `/pricing/` (→ optimajet.com/products/workflowengine/price/), `/blog/`, plus `sitemap.xml` (dominated by Doxygen `/api-reference/...`). Linked from [INDEX.md](INDEX.md) and [plans/roadmap.md](plans/roadmap.md).

## 2026-04-14 init | Начальная компиляция вики

Created from: [README.md](../README.md), [CLAUDE.md](../CLAUDE.md), [package.json](../package.json), [next.config.ts](../next.config.ts), [netlify.toml](../netlify.toml), [docs/deploy.md](../docs/deploy.md), [src/app/](../src/app/) tree, [src/components/blocks.tsx](../src/components/blocks.tsx), [src/components/Navigation.tsx](../src/components/Navigation.tsx), [src/components/Footer.tsx](../src/components/Footer.tsx), [src/data/blog.ts](../src/data/blog.ts), [src/data/main.json](../src/data/main.json), [src/utils/seo.ts](../src/utils/seo.ts), [src/app/blog/[slug]/page.tsx](../src/app/blog/[slug]/page.tsx), git history (commit `0efe811` — initial scaffold), prior session's fork-from-FormEngine task notes.

7 articles: [architecture](architecture.md), [content-blocks](content-blocks.md), [routes](routes.md), [decisions](decisions.md), [blog](blog.md), [external-scripts](external-scripts.md), [domain/overview](domain/overview.md). 1 plan: [plans/roadmap](plans/roadmap.md).

No `database.md` — site has no DB.
