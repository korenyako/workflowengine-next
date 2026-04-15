# Wiki change log

Chronological log of wiki updates. Newest entries on top.

## 2026-04-15 | Phase 3.x: iterative homepage polish

Серия небольших коммитов по итогам визуального review главной:

- **Core Features** на home — заменил `DetailedFeatureGridBlock` (2 колонки, карточки с фоном) на `FeaturesGridBlock` (3 колонки × 2 ряда, без фоновых карточек, иконки по центру). Контент 6 фич — **verbatim с workflowengine.io** (включая intro-параграф про SQL/NoSQL провайдеры). Тайтл «Core Features» теперь `uppercase tracking-wide`, размер `text-3xl/4xl/5xl` (было `text-8xl` hero-scale). Commit `d21f07b`.
- **LogosBlock** градиентные маски слева/справа: жёстко `from-white` (было условие `isLightBg ? white : '#0d1117'`, но `blockBg` не передавался → получался тёмный `#0d1117` на светлом фоне). Commit `1ab7605`.
- **Hero H1**: глобальные `h1/h2/h3 @apply` правила из [globals.css](../src/styles/globals.css) удалены — они клэмпили размер тайтла, споря с utility-классами. H1 в [HeroBlock](../src/components/HeroBlock.tsx) поднят с `text-5xl→text-8xl` до `text-5xl→text-8xl` (финально, после двух итераций по размеру), `font-bold`, `leading-tight`. Контейнер `max-w-4xl` → `max-w-5xl` чтобы контент не был зажат по ширине. Commits `fc7bb4c`, `1af7926`.
- **Hero CTA**: одна кнопка «Why Use Workflow Engine» вместо Download + See Features. Ведёт на `https://workflowengine.io/blog/why-use-a-workflow-engine/` (внешняя ссылка — пост пока не портирован; в Phase 4 переключим на внутренний `/blog/why-use-a-workflow-engine/`). Commit `be4c4f9`, `58afffe`.
- **Hero chips**: subtitle-строка «HTML5 Designer · Customizable · Parallel Branching · Versioning» вынесена в массив `chips: string[]` и рендерится пилюлями (`bg-blue-50 text-blue-700`, без рамки). В `HeroBlock` добавлен optional проп `chips`; при его наличии `subtitle` не рендерится. Не-hero-страницы (`/features/`, `/server/`) используют обычный `subtitle` — прежнее поведение сохранено. Commit `1af7926`, `beea599`.
- **Бренд-палитра**: pastel `blue-300 → purple-300` градиент FormEngine-эпохи заменён в 9 компонентах на фирменный cyan-blue `#93d8ff → #85afff` (взят из [public/icons/layers.svg](../public/icons/layers.svg)). Hover тёмная вариация `#7dc3f4 → #6e99ec`. Commit `a3ea922`.
- **Кнопки без градиента**: по требованию убран градиент именно с кнопок (иконки, бейджи, badges градиент сохранили). `Button.tsx` primary → `bg-[#93d8ff] hover:bg-[#7dc3f4]` сплошной, `text-gray-900`. Также пропатчены `HeroWithCodeBlock` badge-CTA и `ComponentsTable` Documentation-CTA. Commit `3cf6bb6`.
- **Secondary button → outlined**: `border border-[#93d8ff] bg-transparent text-slate-900`, на hover заливается тем же `#93d8ff` (визуально стекается с primary). Commit `7d1e46d`.
- **Fix «Failed to fetch»**: hero CTA через `<Link>` с дефолтным prefetch пытался префетчить статический slug которого нет в `generateStaticParams` → dev-HMR крашился. Решение: `prefetch={false}` в [Button.tsx](../src/components/Button.tsx) для всех внутренних ссылок (префетч не критичен в static export) + CTA переключена на внешний URL до Phase 4. Commit `58afffe`.
- **Логотип**: реальный WorkflowEngine бренд-SVG загружен пользователем в `public/logos/workflowengine.svg`. 13 `fill="white"` в тексте wordmark заменены на `fill="#0f172a"` (slate-900) — стандарт для light nav. Commit `a27825e`.

## 2026-04-14 | Phase 3: launch-minimum content

Контент с workflowengine.io портирован в блочную систему.

**Homepage ([src/data/main.json](../src/data/main.json)):** полностью переписана. HeroBlock + LogosBlock + «Supported Workflow Processes» (3 use-case cards) + «Core Features» (6 cards) + ProductsGridBlock («Which Product Do I Need?» с WE / Workflow Server / DWKit) + CustomerTestimonialsBlock (ProcessMAP, Innovum, Wine.Create) + ContactCTABlock. Все FormEngine-упоминания (open-source, MIT, GitHub, @react-form-builder) ушли.

**Features page ([src/data/features.json](../src/data/features.json) + [src/app/features/page.tsx](../src/app/features/page.tsx)):** 11 feature-блоков в `TwoColumnDetailedFeaturesBlock` (5+6). Сгруппированы: Designer / Core Components / Versioning / Parallel / Timers в левой колонке; XML I/O / Localization / Compatibility / BPMN 2.0 / Integration / Security в правой.

**Server page ([src/data/server.json](../src/data/server.json) + [src/app/server/page.tsx](../src/app/server/page.tsx)):** Hero + «Why Workflow Server» (4 benefit-cards) + двухколоночный блок Workflow API / Callback API + системные требования (OS / DB / hardware / app modes) + CTA.

**Downloads page ([src/app/downloads/page.tsx](../src/app/downloads/page.tsx)):** hard-coded page (не через block-систему — таблицы). Hero с текущей версией `20.0.8` (2026-01-04). Таблица 3 продуктов (.NET Core build, Sample, Workflow Server). Список из 6 NuGet-пакетов (Core + 5 DB providers) с прямыми ссылками на nuget.org. Список 3 Designer npm-пакетов (vanilla/React/Angular). Contact CTA в конце.

**ContactForm ([src/components/ContactForm.tsx](../src/components/ContactForm.tsx)):** плейсхолдер заменён на реальную форму. Поля first_name / last_name / email / phone / company / job_title / details — POST на `/backend/lead/` (Netlify 301 → Netlify Function [netlify/functions/lead.ts](../netlify/functions/lead.ts), которая шлёт лид в Bitrix24 CRM). Форма сама валидирует required-поля, показывает состояния submitting / success / error. **Для работы в проде нужен env-var `BITRIX_URL` + опциональный `BITRIX_ASSIGNED_BY_ID`** в Netlify. В `netlify/functions/lead.ts` поправлены строки, где оставались «Formengine.io» / «formengine.io». Удалён неиспользуемый `src/styles/contacts.css`.

**Logos:** оставлены существующие 9 SVG (Bosch, Engie, Philips, Nelnet, Dell, Acer, Santos, Ideagen, Novartis) — это общие клиенты OptimaJet, из них Dell и Nelnet явно подтверждены на workflowengine.io. Полный список с workflowengine.io (KPMG, Airbus, Wolters Kluwer, ProcessMAP и т.д.) требует источения SVG — отложено.

**Что осталось:** блог (все 20 постов — Phase 4), аудит роутов sitemap/robots, логотип WorkflowEngine (сейчас stopgap `formengine-black.svg`), курация логотипов под exact workflowengine.io-список.

## 2026-04-14 | Phase 2: светлая тема (commit `4a303ed`)

Свапнули dark→light палитру по всему проекту. Типографика не тронута (Inter / Poppins / Space Grotesk / JetBrains Mono).

**Class swap (sed по src/):**
- `bg-slate-900` / `bg-gray-900` / `bg-[#0d1117]` → `bg-white`
- `bg-slate-800/50` / `bg-gray-800/50` → `bg-slate-50` / `bg-slate-100`
- `bg-gray-700` → `bg-slate-200`
- `text-white` → `text-slate-900`
- `text-gray-{100,200,300,400}` → `text-slate-{800,700,600,500}`
- `text-blue-300` (accent) → `text-blue-600`
- `hover:bg-gray-800` → `hover:bg-slate-100`
- `border-gray-800` → `border-slate-200`

**По-ручному:**
- `globals.css` — body bg/color, links, .article-content (заголовки, параграфы, blockquote, list bullets) — всё под light bg.
- `layout.tsx` — `data-mantine-color-scheme="light"`, `bg-white text-slate-900` на body.
- `Navigation.tsx` — белый nav, slate-текст, blue-600 для активного, slate-100 для hover. Документация-линк синхронизирован с другими nav-ссылками.
- `FooterBlock.tsx` — slate-50 фон с верхним border, slate-текст, белая карточка для company info; убраны `brightness-0 invert` с соц-иконок (теперь рендерятся в своих цветах).
- `HeroWithCodeBlock.tsx` — бейдж стал универсальным (берёт `cta.href`), убран npm-package-link.
- `HeroFlow.tsx` — бейдж теперь bg-white вместо тёмного.

**Намеренно оставили тёмным:** декоративные виджеты внутри Hero/CenteredAI блоков (`bg-[#0d1117]`) и code-blocks (`bg-zinc-900`) — это конвенциональное оформление кода даже на светлой странице.

**Логотип:** в Navigation был референс на `/logos/workflowengine.svg`, но файл отсутствовал на диске (404). Скопировал `formengine-black.svg` → `workflowengine.svg` как stopgap, чтобы что-то рендерилось на новой светлой шапке. Заменить на настоящий бренд-ассет.

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
