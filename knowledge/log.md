# Wiki change log

Chronological log of wiki updates. Newest entries on top.

## 2026-04-14 | Удалены GitHub и stargazers (WorkflowEngine не опенсорс)

WorkflowEngine — коммерческий закрытый продукт (в отличие от FormEngine Core). Убрали всю опенсорс-инфраструктуру:

- Удалены файлы: `.github/workflows/stargazers.yml`, `scripts/fetch-stargazers.mjs`, `src/lib/stargazersCache.ts`, `public/stargazers.json`. Пустые директории `.github/`, `scripts/` удалены.
- `package.json`: убран скрипт `fetch:stars`.
- `Navigation.tsx`: убраны GitHub-иконка + счётчик звёзд из top-right (осталась только кнопка Download).
- `Footer.tsx`: из socialLinks удалены `github.svg` и `devto.svg` (dev.to — тоже опенсорс-платформа), остались youtube/twitter/linkedin. Из DEVELOPERS убрана ссылка "Community" (GitHub Discussions). Из RESOURCES убрана "WorkflowEngine Core MIT License".
- `layout.tsx`: из JSON-LD `sameAs` убран GitHub URL.
- `HeroWithCodeBlock.tsx`: убран импорт stargazersCache, снят GitHub/npm-бейдж с версией, снята кнопка "Star us on GitHub". Теперь бейдж универсальный — берёт текст из `props.badge` и CTA-линк из `props.cta.href`.
- `HeroFlow.tsx`: убрана кнопка "Star us on GitHub".
- `MUIDocsSupportBlock.tsx`, `MantineDocsSupportBlock.tsx`, `ShadcnDocsSupportBlock.tsx`: убран inline-линк на GitHub repository.

**Не трогали:** `src/data/main.json` (всё ещё FormEngine-копия с open-source / MIT / GitHub) — перепишется целиком в Phase 3. `src/components/ComponentsTable.tsx` (мёртвый, не рендерится) — аналогично.

## 2026-04-14 | Phase 1 исполнен (commit `06169a3`)

- 301-редиректы в `public/_redirects`: `/pricing/`, `/agreements/eula/`, `/agreements/csa/` → optimajet.com.
- Удалён маршрут `src/app/pricing/` и все `src/components/pricing/*` компоненты. Навигация/футер теперь линкуют Pricing на optimajet.com напрямую.
- Удалены orphan data-файлы: `core.json`, `designer.json`, `core-mui.json`, `core-mantine.json`, `core-shadcn.json`, `rsuite.json`, `rsuite-page.json`, `pricing-faq.json`, `comparisons.ts`, `comparison-pages.ts`, `libraries.ts`. В `src/data/` остались только `blog.ts` и `main.json`.
- `.github/workflows/stargazers.yml`: `TARGET_REPO` → `optimajet/workflowengine` (было `formengine`), 6-часовой cron закомментирован пока идёт активная разработка (чтобы не захламлял историю). Оставлен `workflow_dispatch` для ручного запуска.

Соответствующие пункты P1 в [plans/roadmap.md](plans/roadmap.md) теперь закрыты; главное, что осталось для лаунча, — контент в main.json, стабы `/features/`, `/server/`, `/downloads/`, светлая тема, форма Bitrix24, блог (все 20 постов).

## 2026-04-14 | Решения по content migration

Owner ответил на open questions в [plans/content-migration.md](plans/content-migration.md): DWKit остаётся в 3-way comparison, FormEngine-баннер убираем, блог портируем **весь** (SEO), Pricing/EULA/CSA — 301-редиректы на optimajet.com (как в legacy), тема светлая, типографика как есть. Фазы обновлены, блог выделен в отдельную P0-фазу.

## 2026-04-14 | Инвентарь workflowengine.io

Added [plans/content-migration.md](plans/content-migration.md) — scoping doc for migrating content from the live site (workflowengine.io). Sources: WebFetch of `/`, `/features/`, `/server/`, `/downloads/`, `/pricing/` (→ optimajet.com/products/workflowengine/price/), `/blog/`, plus `sitemap.xml` (dominated by Doxygen `/api-reference/...`). Linked from [INDEX.md](INDEX.md) and [plans/roadmap.md](plans/roadmap.md).

## 2026-04-14 init | Начальная компиляция вики

Created from: [README.md](../README.md), [CLAUDE.md](../CLAUDE.md), [package.json](../package.json), [next.config.ts](../next.config.ts), [netlify.toml](../netlify.toml), [docs/deploy.md](../docs/deploy.md), [src/app/](../src/app/) tree, [src/components/blocks.tsx](../src/components/blocks.tsx), [src/components/Navigation.tsx](../src/components/Navigation.tsx), [src/components/Footer.tsx](../src/components/Footer.tsx), [src/data/blog.ts](../src/data/blog.ts), [src/data/main.json](../src/data/main.json), [src/utils/seo.ts](../src/utils/seo.ts), [src/app/blog/[slug]/page.tsx](../src/app/blog/[slug]/page.tsx), git history (commit `0efe811` — initial scaffold), prior session's fork-from-FormEngine task notes.

7 articles: [architecture](architecture.md), [content-blocks](content-blocks.md), [routes](routes.md), [decisions](decisions.md), [blog](blog.md), [external-scripts](external-scripts.md), [domain/overview](domain/overview.md). 1 plan: [plans/roadmap](plans/roadmap.md).

No `database.md` — site has no DB.
