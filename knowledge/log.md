# Wiki change log

Chronological log of wiki updates. Newest entries on top.

## 2026-05-15 | Topics taxonomy + Related posts

Добавлен controlled vocabulary `topics: string[]` во frontmatter блог-постов (9 топиков, 1-4 на пост) и блок «Related articles» внизу каждой статьи. Цель — внутренняя перелинковка для SEO; категорий (Engineering = 17 постов) для этого слишком мало granularity.

**Контент-аудит:** прогнал Explore-агент по всем 32 .mdx (читал заголовок + description + первые ~500 слов тела). Агент предложил 8-10 кластеров, я переименовал под SEO-friendly слуги и слил пары с большим overlap'ом (`tool-selection` + `alternatives-comparison` → `workflow-engine-comparisons`; `industry-applications` → `case-studies` по подсказке пользователя). Финальные 9 топиков и mapping → таблица в [blog.md#topics-taxonomy](blog.md#topics-taxonomy-для-related-posts).

**Что добавилось:**

- `topics?: string[]` в [BlogPost type](../src/lib/blog-manifest.ts) (опционально для совместимости — посты без него просто не имеют related-блока).
- [RelatedPosts.tsx](../src/components/blog/RelatedPosts.tsx) — server-component, алгоритм top-3 по `|intersection(currentTopics, otherTopics)|` с тiebreaker по `order`. Если score 0 — пост не показывается (никакого random-fallback'а; для SEO лучше пусто).
- Поле `topics` в [Decap config.yml](../public/admin/config.yml) — `widget: select, multiple: true, options: [...]` (drop-down с фиксированным списком, `min: 1, max: 4`).
- CSS-блок `.related-posts*` в [globals.css](../src/styles/globals.css) — текстовый список 3 ссылок (заголовок + 1 абзац description), без обложек чтобы не конкурировать с CTA.
- Backfill-скрипт прописал `topics:` во все 32 .mdx, удалён после прогона (как и migrate-script — однократный).

**Slug-конвенция:** общие топики без префикса (`bpm-implementation`, `low-code`, `parallel-workflows`); конкретные продукты — с префиксом (`workflow-server`, `workflow-designer`). Расширять список = синхронно править `config.yml`, `knowledge/blog.md`, и (опц.) frontmatter существующих постов.

## 2026-05-12 | Decap CMS на `/admin/`

Подключён [Decap CMS](https://decapcms.org) как UI-редактор для блога. Авторы (включая нон-технических) теперь могут создавать, редактировать и удалять посты через `/admin/` без правки кода. CMS читает/пишет напрямую в `src/content/blog/*.mdx` через YAML-frontmatter — никакой БД или бекенда. Полная инструкция — [docs/blog-cms.md](../docs/blog-cms.md).

**Что добавилось:**

- [public/admin/index.html](../public/admin/index.html) — точка входа, грузит Decap CMS с CDN (`unpkg.com/decap-cms@^3.8.0`).
- [public/admin/config.yml](../public/admin/config.yml) — collection-схема для блога: 13 полей (frontmatter + body), backend-stub `git-gateway`, `local_backend: true` для dev-режима. Per-slug media folder `public/images/blog/{{slug}}/` (повторяет существующую раскладку 31 поста).
- [docs/blog-cms.md](../docs/blog-cms.md) — usage-гайд: dev-flow (`npx decap-server` + `next dev`), frontmatter-schema для прямой правки файлов, ограничения, **outline для перехода на prod-auth** (Netlify Identity / GitHub OAuth) — реализовать перед запуском сайта в прод.

**Что пришлось доработать в манифесте:**

- В [blog-manifest.ts](../src/lib/blog-manifest.ts) `blogPosts` теперь Proxy, который на каждом доступе вызывает `readAllPosts()`. В prod-сборке `readAllPosts()` кэшируется (`CACHE_ENABLED = NODE_ENV === 'production'`), в dev — re-читает с диска. Без этого dev-сервер не видел CMS-изменения после первого рендера `/blog/` (модуль-уровневая `const` фриз). С Proxy — изменения через CMS видны на `/blog/` мгновенно без перезапуска `next dev`.

**Что НЕ сделано (намеренно):**

- Prod-auth не настроен. `local_backend: true` работает только на localhost. Перед деплоем нужен один из путей в [docs/blog-cms.md#production-auth-phase-2--not-yet-implemented](../docs/blog-cms.md#production-auth-phase-2--not-yet-implemented).
- Авто-инкремент `order`. Поле required, но автор сам выбирает следующее число (current max = 31).
- MDX-preview в редакторе. Отключён (`editor: preview: false`) — Decap-renderer не совпадает с `next-mdx-remote/rsc` пайплайном, превью был бы misleading.
- Очистка `public/images/blog/<slug>/` при удалении поста. Decap удаляет только `.mdx`-файл, картинки остаются — chistить вручную.

**Тестирование выполнено через decap-server HTTP API** (имитация CMS-клиента; полноценный браузерный smoke не прогонял):
- `info` → server-info OK
- `entriesByFolder` → видит все 31 пост с распарсенным frontmatter
- `persistEntry` (create) → пишет новый `.mdx`, манифест подхватывает, `/blog/` показывает 32
- `persistEntry` (update) → переписывает frontmatter + body чисто
- `persistMedia` → загружает картинку в `public/images/blog/<slug>/`
- `deleteFile` → удаляет файл; манифест в dev сразу подхватывает (32 → 31)

## 2026-05-12 | Blog: миграция метаданных в MDX frontmatter

`src/data/blog.ts` удалён. Все 31 поста получили YAML-frontmatter в `.mdx` — теперь это единственный источник правды по метаданным. Новый модуль [src/lib/blog-manifest.ts](../src/lib/blog-manifest.ts) сканирует `src/content/blog/` через `gray-matter` и экспортирует `blogPosts`, `BLOG_CATEGORIES`, `getBlogPostBySlug`, `getBlogPostsByCategory` (тот же API, что раньше у `blog.ts`). Импорты в [src/app/blog/page.tsx](../src/app/blog/page.tsx), [src/app/blog/[slug]/page.tsx](../src/app/blog/[slug]/page.tsx), [src/components/blog/BlogCard.tsx](../src/components/blog/BlogCard.tsx) переключены с `@/data/blog` на `@/lib/blog-manifest`.

**Что добавилось:**

- Новое required-поле `order: number` во frontmatter и в `BlogPost`-shape. Нужно потому, что у легаси-постов нет `date` → date-desc сортировка не работает; `order` (1..31 для текущих) даёт детерминированный порядок без отдельного индекс-файла. Подробнее в [blog.md](blog.md#order--почему-required).
- Зависимость `gray-matter` в `package.json` (build-time парсинг).
- Гoтча про MDX-рендер: `MDXRemote` сам frontmatter не стрипает — `[slug]/page.tsx` теперь явно отделяет `body` через `matter(source).content` перед передачей в `<MDXRemote>`. Без этого YAML отрендерился бы как видимый текст в начале статьи (поймал и поправил сразу же).

**Что сделано для подготовки к [Decap CMS](../docs/blog-cms.md):**

- Frontmatter-as-source-of-truth — обязательное условие для Decap (он читает/пишет только frontmatter, не отдельные TS-файлы).
- Поле `description` поддерживает многоабзацный режим (`\n\n`) через YAML folded-scalar (`>-`) с пустыми строками между параграфами; round-trip через `gray-matter` сохраняет `\n\n` корректно (проверено).

[blog.md](blog.md) полностью переписан под новую архитектуру.

## 2026-05-09 | Domain overview: product taxonomy + naming conventions

Существенно обновил [domain/overview.md](domain/overview.md) под текущее состояние сайта и продукта.

**Что добавилось:**

- Раздел **Naming conventions** — фиксирует разницу между «Workflow Engine» (продукт), «workflow engine» (категория) и «WorkflowEngine» (код-контекст). Правило «by Optimajet на первом упоминании» — приведено в соответствие с уже применённой брендинг-итерацией по `main.json`/`features.json` и с тем, как это сформулировано в [public/llms.txt](../public/llms.txt).
- Раздел **Product family** — таблица четырёх членов семейства (Workflow Engine base, Community Edition, NEO, Server) + HTML5 Designer как UI-компонент, общий для всех. До этого в overview была только одна общая фраза «.NET workflow automation engine», без таксономии. Latest stable version: 21.0.0.
- Раздел **Site routes (current state)** — таблица фактического статуса страниц. Старая версия описывала почти всё как «Stub», что давно устарело: `/`, `/features/`, `/server/`, `/downloads/`, `/contacts/` все live; `/blog/` живой со спринт-индексом из 31 поста; `/agreements/policy/` добавлена; `/pricing/` редирект на optimajet.com.
- Раздел **Relationship to FormEngine** уточнён продуктовой стороной — связка идёт через NEO Forms Plugin, это единственный продуктовый мост между двумя сайтами. Маркетинговые предупреждения (no MIT badges, no community-CTA, FormEngine-era artifacts) сохранены.
- Ссылки на [public/llms.txt](../public/llms.txt) + [public/llms-full.txt](../public/llms-full.txt) добавлены в раздел Owner / vendor — это публичный AI-facing источник правды по стандарту [llmstxt.org](https://llmstxt.org). Внутренний knowledge wiki и публичный llms.txt теперь дублируют ключевую информацию (продуктовая таксономия, naming) — это сделано умышленно: первый для меня (LLM) при работе с кодом, второй для внешних AI-краулеров. Если будем менять продуктовую таксономию — синхронизировать оба файла.

## 2026-05-06 | Scroll-reveal: тюнинг тайминга

После раскатки на `/`, `/features/`, `/server/` пользователь сообщил, что с дефолтным `0.6s ease + translateY(24px)` секции «всплывают слишком быстро, почти статика». Поменял на `0.9s cubic-bezier(0.16, 1, 0.3, 1) + translateY(40px)` — snappy ease-out-quart («Stripe/Linear»-кривая, быстрый старт → затухающий финиш). Документ [scroll-reveal-pattern.md](scroll-reveal-pattern.md) дополнен таблицей тюнинг-рукояток (длительность, амплитуда, кривая, rootMargin, threshold) с указаниями где крутить и какой эффект.

## 2026-05-06 | Scroll-reveal: имплементация на `/`, `/features/`, `/server/`

Паттерн постепенного появления блоков при скролле (opacity 0→1 + translateY(24px), 600ms ease) — раскатан на marketing-страницах. Документ [scroll-reveal-pattern.md](scroll-reveal-pattern.md) переведён из «справочник на будущее» в «как сделано».

**Что добавилось:**

- Компонент [Reveal.tsx](../src/components/Reveal.tsx) — клиентский wrapper с `IntersectionObserver` (one-shot, `unobserve` после first hit). Учитывает `prefers-reduced-motion`.
- CSS-секция «Scroll-reveal» в [globals.css](../src/styles/globals.css) — гейт через `html[data-reveal-ready]`, атрибут ставится inline-скриптом в `<head>` до paint'а ([layout.tsx](../src/app/layout.tsx)). Без JS контент остаётся видимым (graceful degradation).
- Опциональный prop `revealOnScroll?: boolean` в обоих block-registry: [blocks.tsx](../src/components/blocks.tsx) (главная) и [PageBlocks.tsx](../src/components/PageBlocks.tsx) (sub-страницы). Hero (i === 0) исключён из обёртки — он во вьюпорте на загрузке, анимация дала бы только flash.
- Включён на `/`, `/features/`, `/server/`. НЕ включён на `/contacts/`, `/downloads/`, `/blog/` (transactional / list-views).

**Подводный камень (зафиксирован в [scroll-reveal-pattern.md](scroll-reveal-pattern.md#гочи-overflow-x-hidden-на-ancestor--transform-на-детях))**: оба block-wrapper'а имели `overflow-x-hidden`. По CSS-спеке `overflow-x: hidden` промотирует `overflow-y` в `auto`; нижний блок с `transform: translateY(24px)` создавал реальный overflow → двойной скроллбар. Фикс: `overflow-x-clip` (не создаёт scrolling box).

## 2026-05-04 | /server/: Overview-секция с видео + новый блок CenteredVideoBlock

- Новый блок [CenteredVideoBlock.tsx](../src/components/CenteredVideoBlock.tsx) — портирован из `../formengine-next` (использовался там на `/core/` под "No advanced React skills required"). Адаптирован под бренд: цвета `#4286F4` / `slate-900` / `slate-600`, eyebrow uppercase + mono (как в `CenteredImageBlock`), `<iframe>` YouTube вместо `<img>`. Убран `GradientButton` и `isLightBg`-ветка — на workflowengine-сайте только light-mode.
- Зарегистрирован в обоих registry: [blocks.tsx](../src/components/blocks.tsx) и [PageBlocks.tsx](../src/components/PageBlocks.tsx). Регистр: 12 → 13 блоков.
- Добавлена секция в [server.json](../src/data/server.json) — после Hero, до "Why Workflow Server". Контент перенесён со старого workflowengine.io/server/ ("Overview" / "deploy into your infrastructure" / "REST API" / "microservices-based architecture"). CTA: Download → /downloads/, View Documentation → workflowengine.io/documentation/. Видео: `GbNA77uZdbs` (Workflow Server overview с канала [@optimajet](https://www.youtube.com/@optimajet/videos)).

## 2026-05-02 | Blog: типографика, обложки, карточки — итерация polish

Серия мелких правок по блогу после визуального ревью с пользователем.

**Типографика статей** ([globals.css](../src/styles/globals.css), `.article-content`):

- **Синий — только для ссылок.** В `.article-content` синий цвет (`#4286F4` бренд) теперь только на `<a>`. h1-h5 → `slate-900`. List bullet `•` и numbered `::marker` → `slate-400`. Blockquote `border-left` → `slate-300`. Раньше h3/h4/h5 + bullets + marker + blockquote-border все были `#2563eb` (Tailwind blue-600), что не совпадало с брендом и делало h3 визуально неотличимым от ссылки.
- **Brand alignment.** Ссылки переведены с `#2563eb` / `#1d4ed8` на `#4286F4` / `#2e6ad4` — бренд из CLAUDE.md / [decisions.md](decisions.md).
- **Заголовки унифицированы.** Общий блок `:is(h1,h2,h3,h4,h5)` задаёт font-family / color / `letter-spacing -0.02em` / `line-height 1.2`. Уровни различаются только размером + весом + margin. Шкала: 32/28/22/18/18 (h4=h5 по запросу — h5 в постах не встречается, h4 — 1 раз). Раньше было 5 разных line-height (1.1/1.15/1.3), 2 letter-spacing (-0.02em / -0.01em), 5 уникальных margin-паттернов.
- **Веса в теле статьи.** `<p>` и `<li>`: 300 → 400 (читаемее на длинных параграфах). `<a>`: 700 (видимое выделение ссылок на фоне 400 body). Заголовки h1-h3 — 800, h4-h5 — 600.
- **Hero post-страницы.** [page.tsx:105](../src/app/blog/[slug]/page.tsx#L105) — снят `font-light`, `text-slate-600` → `text-slate-700`. Контраст hero ↔ body больше.
- **Удалены dead-классы** из globals.css: `.text-link-tag` + hover, `.text-link-tag-mono` + hover, `.code-highlight`, `.highlight-keyword`, `.code-copy-button`, `.code-block:hover .code-copy-button`, `.custom-scrollbar*` (8 правил), `.hljs`, глобальный `mark`. Подтверждено grep'ом — нигде в `src/` не использовались. CSS-файл: 492 → 360 строк (−27%).

**Cover / inline images — новая семантика:**

- **`cover` теперь только для карточки на `/blog/` + OG/Twitter превью.** На post-странице обложка больше не рендерится — убран блок `{post.cover && <img>}` из [page.tsx](../src/app/blog/[slug]/page.tsx). Раньше cover дублировался с inline-картинкой первой строки тела (cover в hero + inline в начале статьи = одна и та же картинка дважды на странице).
- **Inline-картинка в начале MDX тела** служит lead-image для post-страницы. У 8 постов есть такая картинка (унаследовано с легаси-сайта), у остальных 23 нет — у них post-страница начинается сразу с h2.
- **Для 8 постов с inline-картинкой** `cover` указывает на тот же файл что и inline (`cover: '/images/blog/<slug>/<inline-name>'`). Раньше cover был отдельный `preview.png`/`preview.jpg`/etc., но визуально identical с inline — пользователь решил консолидировать на один файл. Orphan-файлы `preview.*` остались на диске (~5MB) — их можно почистить отдельно.

**BlogCard на индексе** ([BlogCard.tsx](../src/components/blog/BlogCard.tsx)):

- Добавлен рендер `description` под заголовком: `<p className="text-base text-slate-600 leading-relaxed mb-3">{post.description.split('\n\n')[0]}</p>`. Без `line-clamp` — описание показывается целиком (самые длинные у `how-to-speed-up-...` и `optimajet-vs-nintex-pros-and-cons` — по 5-6 строк).
- **Multi-paragraph description: только первый абзац на карточках.** Описание разделяется на абзацы по `\n\n`. Карточка показывает первый, post-страница — все (см. [page.tsx:105-109](../src/app/blog/[slug]/page.tsx#L105-L109), `description.split('\n\n').map(...)`). Полезно когда description вмещает поднятый из тела subtitle (см. ниже про `how-to-choose-...`).

**MDX edits per-post** (контент-фиксы):

- **Дубликаты заголовков** убраны: `# H1` в начале тела дублировал `<h1>{post.title}</h1>` из page.tsx hero. Убраны в [how-to-choose-the-right-embedded-workflow-automation-tool.mdx](../src/content/blog/how-to-choose-the-right-embedded-workflow-automation-tool.mdx), [workflow-designer-customization.mdx](../src/content/blog/workflow-designer-customization.mdx), [workflow-server-designer-integration.mdx](../src/content/blog/workflow-server-designer-integration.mdx). Корень — на легаси-сайте у этих 3 постов h1 был дубликатом и в hero, и в `.article-container` (у остальных постов h1 был только в hero). Конвертер копирует всё из article-container, поэтому дубль приехал в MDX.
- **how-to-choose-the-right-...** — особый случай: 2 интро-абзаца («Using the course payment process…» + «Any developer in an enterprise environment…») подняты из тела в `description` через `\n\n`-разделитель. На post-странице оба абзаца рендерятся как subtitle; в карточке показывается только первый. Внутри MDX: H1 удалён, секция «Choose the right workflow automation tool» (h2 + paragraph) тоже удалена — дублировала title и поднятый subtitle. Оставшийся explanatory текст про критерии Use Case / BPMN под новым h2 «Comparison criteria».
- **parallel-approval-without-branches.mdx** — у блока «The process of buying online courses must be automated» сняты markdown-blockquote-маркеры (`>`). На легаси-сайте этот блок не был оформлен как цитата; в нашей рендере `.article-content blockquote` рисовал голубую рамку слева — выглядело некорректно.

**Author** добавлен 31 посту: `author: { name: 'Optimajet Team' }` в [blog.ts](../src/data/blog.ts). На легаси-сайте автора не было — это дефолт от имени бренда. Рендеринг даты/автора в [page.tsx](../src/app/blog/[slug]/page.tsx) и [BlogCard](../src/components/blog/BlogCard.tsx) обёрнут в conditional (`post.author && ...`, `formattedDate && ...`) — даты по-прежнему отсутствуют.

---

**Вторая итерация (того же дня) — после первого коммита:**

**Подсветка кода в постах** — подключён `rehype-highlight` (npm-зависимость) в [page.tsx](../src/app/blog/[slug]/page.tsx) через `MDXRemote.options.mdxOptions.rehypePlugins`. Build-time: парсит fenced-блоки с `language-csharp`/`language-xml`/etc., добавляет hljs-классы (`hljs-keyword`, `hljs-string`, `hljs-comment` и т.д.) на `<span>`-токены. Тема `highlight.js/styles/stackoverflow-dark.css` импортирована в этой же page.tsx (загружается только на блог-страницах). Поддерживает все языки, в которых писал легаси-блог (csharp, xml, kotlin, bash, json, и т.д.).

**Стили code-блоков переписаны** ([globals.css](../src/styles/globals.css)):
- Раньше: `.hljs` правило задавало bg/padding/radius на `<code class="hljs">` (внутри `<pre>`).
- Теперь: `<pre>` — внешняя «карточка» (slate-900 bg, `border-radius: 12px`, `padding: 20px 24px`, `margin: 32px 0`, `white-space: pre-wrap`, `overflow-wrap: anywhere`). `<code class="hljs">` внутри — прозрачный фон, без своего radius/padding, `display: block`, моноширинный 14px / line-height 1.6. Переход на pre-wrap убирает горизонтальный скролл — длинные строки переносятся по словам, очень длинные токены (URL) ломаются принудительно.

**Inline lead-images добавлены оставшимся 23 постам** — теперь все 31 пост имеют `![<title>](<cover>)` первой строкой MDX-тела. Делал скриптом [add-inline-images.js](../../we-blog-html/converter/add-inline-images.js) в tmp-конвертере, парсил slug+title+cover из blog.ts. У 8 постов inline уже был — пропустил.

**`how-to-choose-the-right-...` — preview.jpg → preview.png.** Пользователь заменил файл, обновлены ссылки в blog.ts (cover) и MDX (inline). Старый jpg удалён.

**Blockquote для списков клиентов в `workflow-industries`.** 9 строк `**Our clients:** ...` обёрнуты в markdown blockquote (`>`-prefix) для визуального выделения. У 8 строк `>`-prefix добавлен в начало; одна (Real Estate) была частью предыдущего абзаца — вынесена в отдельный абзац (текст не менялся, только структура). См. [knowledge/blog.md](blog.md#cover-vs-inline-image-важно) — теперь `blockquote` используется в 2 местах: цитата OAI в `workflow-server-goes-openapi` и Our clients строки в `workflow-industries`.

**Заголовочная иерархия — 11 фиксов структурной разметки** (текст не менялся):
- `new-release-of-the-workflow-server-3-0:18` — `#### [link]` CTA → обычный параграф (h4 у нас 18px, body 20px — было визуально меньше body, выглядело сломанно).
- `does-it-make-sense-to-build-...:43` — `**You will spend a lot of time on maintenance**` → `### ...` (соседние секции `###`).
- `how-to-choose-...` × 4 — `**Camunda tables**`, `**Workflow Engine tables**`, `**Process abstractions in Camunda**`, `**Process abstractions in Workflow Engine**` под `### Basic abstractions...` → `#### h4`.
- `parallel-branches-continued` × 4 — `**Commands:**`, `**Root Process**`, `**Sub-process "RollBack"**`, `**Sub-process "FastApprove"**` под `## Create a Scheme` → `### h3`. У `**Commands:**` убрано двоеточие.

**Blockquote отступ** — добавлено `.article-content blockquote p:last-child { margin-bottom: 0 }`. Раньше у `<p>` внутри blockquote был `margin-bottom: 32px` (от общего `.article-content p` правила), что давало ~32px пустоты под текстом цитаты, поверх собственного 16px padding'а blockquote.

## 2026-04-30 | Phase 4: блог портирован целиком (31 пост из workflowengine.io)

**SEO-критичная миграция** — пользователь обозначил, что в `/blog/` уходит ~90% входящего трафика. Все 31 пост (план фиксировал 20 на `2026-04-14`, реальное число оказалось 31) портированы 1:1 со старого сайта; **слаги сохранены**, пути `/blog/<slug>/` соответствуют легаси.

**Конвейер миграции** (одноразовый, инструменты сложены в `C:/Users/Green/AppData/Local/Temp/we-blog-html/`):

1. `curl` тащит сырой HTML каждой страницы `/blog/<slug>/` → 31 файл.
2. `convert.js` (cheerio + turndown) парсит `<div.article-container>`, конвертит body в Markdown, кладёт в `src/content/blog/<slug>.mdx`. Метаданные (title, description, og:image, reading-time) собираются в `posts.json`.
3. `generate-blog-ts.js` мапит `posts.json` + ручной category-словарь в [src/data/blog.ts](../src/data/blog.ts).
4. `download-images.js` скачивает 76 изображений (covers + inline) в `public/images/blog/<slug>/`.

**Подводные камни MDX (next-mdx-remote v6, MDX v3):**

- `style="text-align: left"` в табличных ячейках → `style` prop ждёт объект, не строку. Решение в конвертере: `articleEl.find('[style]').removeAttr('style')` перед turndown.
- `xlink:href` на SVG `<use>` → JSX не парсит `:` в имени атрибута. Решение: переименовываем все namespaced-атрибуты, отбрасывая префикс (`xlink:href` → `href`, работает во всех современных браузерах).
- Markdown emphasis-маркеры (`*`, `_`, `~`, `[`, `]`) внутри inline-HTML (table cells) MDX парсит как разметку → `Expected closing tag </td>`. Решение: walk text-nodes внутри `<table>` и заменяем эти символы на HTML-entities (`&#42;` и т.д.).
- Карты «remote URL → local path» некорректно работают, когда у двух постов одинаковое имя файла обложки (`machines.jpg` пересекается у `workflow-solutions` и `why-developers-never-use-state-machines`). Map переключён на ключ по local-path — каждое целевое расположение скачивается независимо, даже при совпадающем удалённом URL.

**Структурные изменения в проекте:**

- [src/data/blog.ts](../src/data/blog.ts): `date` и `author` помечены `optional` в `BlogPost` — у легаси-постов нет ни даты, ни автора (на старом сайте они не отображались, в HTML/sitemap отсутствуют). Шаг 2 в knowledge/blog.md.
- [src/components/blog/BlogCard.tsx](../src/components/blog/BlogCard.tsx) + [src/app/blog/[slug]/page.tsx](../src/app/blog/[slug]/page.tsx): рендеринг даты и автора обёрнут в conditional — если поля отсутствуют, целые секции скрываются. `openGraph` метаданные тоже conditionally дёргают `publishedTime`/`authors`.
- Sentinel-слаг `__placeholder__` больше не генерится — `blogPosts.length > 0`, fallback в `generateStaticParams` не срабатывает.
- Build: 39 страниц (8 базовых + 31 блог-пост). Лимит 14s на dev-машине.

**Категории расставлены вручную в `generate-blog-ts.js`** по содержанию:
- **Case Study** (3): `workflow-engine-for-{bpm-software,ehs-management-software,regulatory-management}`.
- **Engineering** (17): технические how-to, сравнения, внутренности (parallel branches, designer customization/integration, performance, code quality, vs state machine, state-machines critique, и т.д.).
- **Product** (11): обзоры/релизы/бизнес-фрейминг (server overview, low-code platform, BPM/BRMS guides, why use a workflow engine).
- `Open Source` остаётся в `BLOG_CATEGORIES` пустым — фильтр-кнопка отрендерится, но ничего не покажет; не критично.

**Что НЕ перенесено и нужно ловить руками:**
- Даты публикации — у легаси-сайта их нет. Если найдутся в Wayback Machine или в Drupal-бэкапе OptimaJet, подставить в `blog.ts` для каждого поста + выставить `dateLabel`.
- Автор — никаких имён на источнике; постится от имени бренда. Если будет выбран дефолт (например, «OptimaJet Team»), добавить в `blog.ts` к каждой записи или обернуть в фолбэк в [page.tsx](../src/app/blog/[slug]/page.tsx).
- Highlight.js — code-блоки рендерятся как plain `<pre><code>`. На старом сайте была подсветка; не реализована в этой версии (`MDXRemote` без `components` map). Out of scope.
- В одной таблице (`workflow-solutions`) inline-SVG для plus/minus использовал `<use xlink:href="#plus">` со ссылкой на `<svg id="plus">` в первой ячейке — после переноса SVG-ссылка может не разрешаться в некоторых браузерах из-за того, что MDX-рендер оборачивает таблицу в shadow-боксы. Проверить визуально после деплоя.

**Файлы-артефакты (вне репо):** `C:/Users/Green/AppData/Local/Temp/we-blog-html/` (сырой HTML 31 поста + конвертер). Хранить ровно до подтверждения деплоя; потом можно удалить.

## 2026-04-29 | Post-fork cleanup: удалили ~50 неиспользуемых компонентов и legacy-ассеты

**Большая чистка** (commit `7398b44`, 122 файла, −21670/+3 строк). Сайт изначально был форком `formengine-next`, и за месяц переписывания страниц накопилось много блоков/ассетов, никем не используемых. Удалили всё — `formengine-next` остаётся source-of-truth, любой блок можно портировать обратно при необходимости.

**Что удалили:**

- **Компоненты** (~50 файлов): 4 orphan-блока без регистрации (`CenteredProcessBlock`, `CompanyInfoBlock`, `FormDemoBlock`, `TimelineBlock`, `HeroFlow`), 14 form-builder-domain стабов (MUI/Mantine/Shadcn install/usage/docs, `MuiFormDemoBlock`, `BundleSizeTableBlock`, `ComponentsTable`, `FrameworkLogosBlock`, `HeroFrameworksBlock`, `ArchitectureBlock`+`ArchitectureDiagram`, `DesignerTree`), 24 generic-design-блока, не используемых ни в одном текущем JSON (`HeroWithCodeBlock`, `HeroImageBlock`, `CenteredCodeBlock`/`Video`/`Images`/`AI`+`ChatGPTButton`, `LargeCenteredImageBlock`, `TwoColumnFeatureBlock`/`FullImage`/`Detailed`, `ImageTextBlock`, `IconTitleTextBlock`, `CodeHighlightBlock`, `CodePreview`, `ProcessPreview`, `CallToActionBlock`, `TestimonialsBlock`, `TrustpilotTestimonialsBlock`, `FAQBlock`, `BadgeGridBlock`, `RatingCTABlock`, `ComparisonTimeline`, `ColumnsBlock`), вся папка `src/components/content/` (MDX-обвязка, ни одного импортёра).
- **Папки целиком**: `src/forms/` (18 legacy form-схем, ~480KB), `public/ads-images/` (9 баннеров), `public/comparison/`, `public/react-form-builder-library/`, `public/images/blog/` (3 FormEngine-обложки).
- **Утилиты**: `src/lib/bir1706.ts` (32KB demo-схема FormEngine, никем не импортирована — папка `src/lib/` теперь не существует), 3 orphan CSS-файла (`ArchitectureBlock.module.css`, `designer-tree.css`, `demo-components.css`).
- **Ассеты**: 24 FormEngine-картинки в `public/images/` (form-scan, react-form-builder, screenshots, components, logic, validation и т.д.), 5 неиспользуемых лого (`formengine.svg`, `formengine-black.svg`, `formbuilder.svg`, `tech/netcore.svg`, `trustpilot-star.svg`), 1 фото `eugene-kouroptev.jpg`.

**Registry в `blocks.tsx` и `PageBlocks.tsx`** ужалась с ~33 блоков до **12** — ровно тех типов, что реально используются в `main.json`/`features.json`/`server.json`: `HeroBlock`, `CenteredImageBlock`, `FeaturesGridBlock`, `DetailedFeatureGridBlock`, `ProductsGridBlock`, `LogosBlock`, `ContactCTABlock`, `CustomerStoryBlock`, `CompatibilityBlock`, `CustomerTestimonialsBlock`, `ReviewsStripBlock`, `DesignerScreenshotBlock`. Плюс служебные `Footer`/`Navigation`/`Button`/`ContactForm`/`ReviewChip` — итого 25 `.tsx` в `src/components/`.

**Подхвачено в вики:** `architecture.md` (структура каталогов: убрал `lib/`, `forms/`, `scripts/`, обновил счётчик компонентов), `content-blocks.md` (registry список + инструкция «добавить новый блок»), `decisions.md` (§6 form-viewer placeholders помечен resolved; §8 — palette теперь `#4286F4`, не `#93d8ff→#85afff`), `roadmap.md` (P1 «Prune dead blocks» + P2 «Remove unused / Kill schemas / bir1706» отмечены done), `CLAUDE.md` (структура каталогов и §3-§4 правила обновлены под новое состояние).

## 2026-04-25 | /features и /server переписаны под общий паттерн + новые блоки

**Большая ревизия страниц `/features` и `/server`** — обе приведены к единому паттерну: `HeroBlock` → серия `FeaturesGridBlock` с/без `surface: "card"` → `CenteredImageBlock` для секций со схемами → `CompatibilityBlock` (только `/features`) → `ContactCTABlock`. Убрана старая каша из `TwoColumnDetailedFeaturesBlock` (плотная 2×N сетка, плохо читалась — пользователь жаловался). Контент берётся со старого workflowengine.io.

**Новые блоки:**

- [CustomerStoryBlock](../src/components/CustomerStoryBlock.tsx) — split-card 50/50 (текст + фото) для customer stories. Принимает `eyebrow`, `logo` + `logoAlt`, `title`, `metrics[]`, `image`, `imageAlt`, `href`, `linkText`, `imageSide: 'left' | 'right'`. Анимированная стрелка в Read-story ссылке (chevron→arrow + translate-x на hover через `group`). Используется на главной для B.F. Saul и LKS Next.
- [CompatibilityBlock](../src/components/CompatibilityBlock.tsx) — eyebrow/eyebrowLogo + title + description + ряды tech-логотипов. На `/features` показывает .NET runtime + 8 БД (MSSQL, MongoDB, Redis, Azure Cosmos, MySQL, Azure SQL, Oracle, PostgreSQL). Per-logo `maxH?: number` и `small?: boolean` для разных пропорций брендов (text-логотипы типа Oracle/Redis/MySQL ужимаются). `eyebrowLogo?: string` рендерит картинку вместо текстового eyebrow — используем для крупного фиолетового .NET-логотипа.

**FeaturesGridBlock** ([src/components/FeaturesGridBlock.tsx](../src/components/FeaturesGridBlock.tsx)) — массово прокачан:

- `columns: 2 | 3 | 4` — управляет grid-cols (раньше всегда 3); 2 нужен для секций с 2 крупными карточками (Two APIs, Integration Options, Benefits).
- `image?: string` + `imageAlt?: string` — рендерит картинку под сеткой карточек (используется в HTML5 Visual Designer на `/features` со схемой `scheme.png`).
- На уровне Feature: `href?: string` делает карточку кликабельной (с `group hover:bg-slate-200`); `linkText?: string` рендерит «{linkText} →» внизу карточки с анимированной стрелкой (тот же паттерн, что в CustomerStoryBlock).
- Inline-HTML в `text` — если паттерн `/<\/?[a-z][^>]*>/i` находит теги, рендерится через `dangerouslySetInnerHTML` со стилизованными `<a>` (синие, underline). Использовано в Integration Options / Designer integration для расстановки ссылок по тексту, как на старом сайте.
- Добавлены 14 иконок: `users`, `database`, `server`, `shield`, `rotate-ccw`, `terminal`, `headset`, `zap`, `infinity`, `rocket`, `clock`, `monitor`, `webhook`. Для всех новых иконок — палитра `ICON_COLORS` с ротацией (blue/orange/purple/emerald/pink/amber).

**DetailedFeatureGridBlock** ([src/components/DetailedFeatureGridBlock.tsx](../src/components/DetailedFeatureGridBlock.tsx)) — табы переведены в горизонтальный layout (раньше вертикальный список слева). Каждый таб подкрашивается своим цветом из `TAB_COLORS`/`TAB_BG_TINTS` (blue/orange/purple), и активный таб мэтчит цвет с карточкой «What's In It For Me?» (`TAB_BG_TINTS[activeTab]`). В testimonial-блоке ниже: лого компании заменил аватар (`testimonial.logo` рендерится в подписи вместо `testimonial.photo`); цитата увеличена до `text-2xl lg:text-3xl font-semibold`; ширина выровнена с остальными секциями (`max-w-5xl` → `max-w-6xl`).

**ContactCTABlock** ([src/components/ContactCTABlock.tsx](../src/components/ContactCTABlock.tsx)) — инвертирован под бренд: фон `bg-[#4286F4]`, тексты белые, кнопка `secondary` с override на белый контур+текст. Notch-эффект с футером (см. предыдущая запись 2026-04-17) сохраняется.

**FooterBlock** ([src/components/FooterBlock.tsx](../src/components/FooterBlock.tsx)) — фон `bg-[#ECF3FE]` (синеватый), `pt-24 pb-12` чтобы дать воздух под notch-стыком; ссылки в меню `text-slate-900 hover:text-[#4286F4]` (раньше slate-600); social-иконки перенесены в первую строку белой карточки (рядом с лого Optimajet); добавлены 3 legal-ссылки (License Agreement, Customer Support Agreement, Privacy Policy) справа от копирайта; копирайт упрощён до текущего года и `text-sm`.

**DesignerScreenshotBlock** — добавлена возможность `surface: "card"` (рендерится в slate-100 обёртке через `PageBlocks`/`blocks` дисптчер); внутренний контейнер сменил `border-2 border-slate-200 overflow-hidden` на `bg-white p-4 sm:p-6 lg:p-12` — белая карточка с воздушным padding'ом вокруг скриншота, без рамки.

**Logo darkening** — testimonial и customer-story логотипы получили `[filter:brightness(0)_saturate(0)]` (превращает в чёрные силуэты), потому что винайл-цветные SVG-логотипы (winecreate `#9CA3AF` gray, lks-next white-text) теряются на slate-100 фоне. Для PNG-логотипов с собственным цветным bg (bfsaul.png) фильтр оставляет проблемы — это known limitation, opt-out пока не сделан, есть `keepColor` flag в `CompatibilityBlock` (нужно перенести в общий паттерн при следующей итерации).

**Прогрессивные горизонтальные отступы карточек** — `mx-4 sm:mx-12 lg:mx-16 xl:mx-32 2xl:mx-64` применены синхронно в 4 местах: [blocks.tsx](../src/components/blocks.tsx) (card-обёртка home), [PageBlocks.tsx](../src/components/PageBlocks.tsx) (card-обёртка остальных страниц), [ContactCTABlock](../src/components/ContactCTABlock.tsx), [FooterBlock](../src/components/FooterBlock.tsx). На 1920px-мониторе боковые поля 256px вместо прежних 32px. Все 4 места обязаны иметь одинаковые `mx-*` значения, иначе ContactCTA↔Footer notch-стык поедет горизонтально.

## 2026-04-17 | ContactCTABlock ↔ Footer: бесшовная стыковка

[ContactCTABlock.tsx](../src/components/ContactCTABlock.tsx): секции убраны нижние скругления (`rounded-[40px]` → `rounded-t-[40px] lg:rounded-t-[48px]`) и добавлен маркер `data-merge-footer`. В [globals.css](../src/styles/globals.css) — глобальное правило `body:has(section[data-merge-footer]) > footer` обнуляет у Footer `margin-top` и верхние радиусы через `!important`. Две плитки (бежевая CTA и светлая Footer-обёртка) теперь образуют одну слитую форму с закруглённым верхом и плоским стыком — приём тот же, что в CodePreview tabs+code (`rounded-t-lg` + `rounded-b-lg`), только в направлении снизу-вверх.

На страницах без CTA (`/contacts`, `/blog`, `/downloads`) `:has()` не сработает — Footer сохранит свой обычный `rounded-t-[40px]` и `mt-4`. `!important` нужен из-за того, что Tailwind-утилиты на самом Footer имеют specificity `0,1,0`, а селектор `body:has(...) > footer` — ниже.

## 2026-04-17 | Eyebrow: tracking 0.1em → 0.2em + фикс базовой типографики в @layer base

Увеличено межбуквенное на eyebrow-метках: `tracking-widest` (0.1em) → `tracking-[0.2em]`. Обновлены 5 компонентов: [LogosBlock](../src/components/LogosBlock.tsx), [DetailedFeatureGridBlock](../src/components/DetailedFeatureGridBlock.tsx), [FeaturesGridBlock](../src/components/FeaturesGridBlock.tsx), [CustomerTestimonialsBlock](../src/components/CustomerTestimonialsBlock.tsx), [ReviewsStripBlock](../src/components/ReviewsStripBlock.tsx). Канон в [design-rules.md](design-rules.md) приведён в соответствие.

**Подводный камень Tailwind v4.** Первый заход не сработал: DevTools показывал `letter-spacing: -0.28px` (то есть `-0.02em` при 14px), несмотря на `tracking-[0.2em]` в классах. Причина — в [globals.css:36](../src/styles/globals.css) правило `h1..h6 { letter-spacing: -0.02em }` лежало вне cascade-layers. В Tailwind v4 unlayered-CSS всегда бьёт утилиты (независимо от specificity), поэтому утилита проигрывала тег-селектору. Фикс — завернул базовую heading-типографику в `@layer base`. Теперь утилиты `tracking-*`/`leading-*`/`font-*` на h1–h6 работают как ожидается, а дефолт `-0.02em` сохраняется там, где явных утилит нет. Общее правило: любая базовая типографика в `globals.css`, поверх которой может потребоваться утилита, должна быть в `@layer base`.

## 2026-04-16 | Border: единая толщина 2px

Новое правило: если элементу нужен контур — всегда `border-2` (2px). Tailwind default `border` (1px) — не использовать. Распространяется на всё: кнопки secondary, карточки, инпуты, бейджи, таблицы.

Sed-прогон `border` → `border-2` по всем `.tsx`/`.ts` в `src/` (с word boundary, чтобы не задеть `border-slate-*`, `border-collapse` и т.д.): Button secondary/outline-white, ArchitectureDiagram, BlogCategoryFilter, CenteredImagesBlock, ColumnsBlock, ContactForm, CustomerTestimonialsBlock nav-arrows, FormDemoBlock, HeroImageBlock, Mantine/MUI blocks, ProductsGridBlock badges, RatingCTABlock, ReviewsStripBlock, TestimonialsBlock, PropsTable (тоже 2px — единая норма), downloads/page.tsx.

Правило зафиксировано в [design-rules.md §3](design-rules.md) + чек-лист пункт 10. Build `npm run build` зелёный.

## 2026-04-16 | Nav: pill-shape + активный без смены цвета текста

[Navigation.tsx](../src/components/Navigation.tsx): навигационные ссылки приведены к единому pill-style:

- `rounded-lg` → `rounded-full` (desktop + mobile, все ссылки включая external и Documentation).
- Активная ссылка: было `text-[#4286F4] bg-slate-100` → стало только `bg-slate-100`, цвет текста остаётся `text-slate-700` как у неактивных. Визуально активная = как hover-ed, но sticky — обычный паттерн для rounded-pill nav (pencil.dev / Jitter / Deel).
- `transition-all` → `transition-colors` (нам не нужно анимировать всё, достаточно цвет фона).
- `space-x-4` → `space-x-2`, `px-3 py-2` → `px-4 py-2` — чуть плотнее набор и просторнее внутри pill, лучше читается.

## 2026-04-16 | FeaturesGrid: карточки + цветные иконки

[FeaturesGridBlock.tsx](../src/components/FeaturesGridBlock.tsx) (Core Features на главной) — каждая фича обернута в `bg-slate-100 rounded-3xl p-8`, иконки получили ротацию цвета по индексу:

```ts
const ICON_COLORS = [
  'text-[#4286F4]',  // brand blue
  'text-[#F97316]',  // orange-500
  'text-[#A855F7]',  // purple-500
  'text-[#10B981]',  // emerald-500
  'text-[#EC4899]',  // pink-500
  'text-[#F59E0B]',  // amber-500
];
```

Секция остаётся flat (не card), но теперь внутри неё — grid из слейт-карточек на белом фоне. Это инверсия ритма: card-слайды — слейт-слаб с white-картами внутри, FeaturesGrid — white-section со slate-картами. «Вдох» между card-слайдами сохраняется.

Gap между карточками `gap-8` → `gap-6` — визуально плотнее, сетка читается единой. Build `npm run build` зелёный.

## 2026-04-16 | Eyebrow: DM Sans → mono, wider tracking

Eyebrow-роль (метка-подпись над h2: «Use cases», «What customers say», «Trusted by global organizations») переключена с DM Sans на JetBrains Mono для терминал-стиля:

- `font-subtitle font-semibold` → `font-mono font-medium`
- `tracking-wide` (0.025em) → `tracking-widest` (0.1em) — заметный шаг шире
- `text-sm` + `uppercase` + `text-[#4286F4]` сохранены

Затронуто 4 live-блока: [LogosBlock](../src/components/LogosBlock.tsx), [DetailedFeatureGridBlock](../src/components/DetailedFeatureGridBlock.tsx), [FeaturesGridBlock](../src/components/FeaturesGridBlock.tsx), [CustomerTestimonialsBlock](../src/components/CustomerTestimonialsBlock.tsx). Legacy-блоки с `font-subtitle font-semibold` без `text-sm uppercase` (subtitle в традиционном смысле — `text-lg text-blue-600` над крупными блоками) не трогались — это другая роль.

Обновлена таблица type scale в [design-rules.md §0](design-rules.md). Build `npm run build` зелёный.

## 2026-04-16 | Brand blue: `#93d8ff` → `#4286F4`

Основной синий сайта унифицирован на `#4286F4` (Google-like blue, RGB 66/134/244). Прежний стек (light cyan `#93d8ff`, Tailwind `blue-600`/`-700`/`-50`/`-100`) сведён к одному токену с derived-оттенками:

| Роль | Было | Стало |
|-|-|-|
| Primary button bg | `#93d8ff` + `text-gray-900` | `#4286F4` + `text-white` (контраст) |
| Primary hover | `#7dc3f4` | `#2e6ad4` (darker) |
| Secondary outlined | `border-[#93d8ff] text-slate-900` | `border-[#4286F4] text-[#4286F4]` |
| Eyebrow / subtitle / icon / link | `text-blue-600` | `text-[#4286F4]` |
| Hover link | `text-blue-700` | `text-[#2e6ad4]` |
| Chip / tint bg | `bg-blue-50` / `bg-blue-100` | `bg-[#4286F4]/10` / `bg-[#4286F4]/15` |
| Focus ring (ContactForm input) | `focus:ring-blue-600/20` | `focus:ring-[#4286F4]/20` |

**Файлы (live):** [Button.tsx](../src/components/Button.tsx), [HeroBlock.tsx](../src/components/HeroBlock.tsx) (chips + subtitle), [DetailedFeatureGridBlock.tsx](../src/components/DetailedFeatureGridBlock.tsx), [FeaturesGridBlock.tsx](../src/components/FeaturesGridBlock.tsx), [TwoColumnDetailedFeaturesBlock.tsx](../src/components/TwoColumnDetailedFeaturesBlock.tsx), [LogosBlock.tsx](../src/components/LogosBlock.tsx), [CustomerTestimonialsBlock.tsx](../src/components/CustomerTestimonialsBlock.tsx), [ContactCTABlock.tsx](../src/components/ContactCTABlock.tsx), [Navigation.tsx](../src/components/Navigation.tsx) (active state), [FooterBlock.tsx](../src/components/FooterBlock.tsx) (nav-badge), [ContactForm.tsx](../src/components/ContactForm.tsx) (submit + input focus), [BlogCategoryFilter.tsx](../src/components/blog/BlogCategoryFilter.tsx), [app/downloads/page.tsx](../src/app/downloads/page.tsx) (CTA + links + eyebrows), [app/blog/page.tsx](../src/app/blog/page.tsx).

**globals.css:** `.text-link-tag`, `.text-link-tag-mono`, глобальные ссылки — все `rgb(37 99 235)` → `rgb(66 134 244)`, `rgb(29 78 216)` → `rgb(46 106 212)`, rgba-альфа-варианты обновлены.

**Градиенты `from-[#93d8ff] to-[#85afff]`:** встречаются только в легаси-блоках (CenteredImage/Code/Video/AI/LargeCentered, HeroWithCodeBlock, BundleSizeTableBlock, ComparisonTimeline) — не в live JSON. Оставлены до первого использования или удаления самих блоков.

Build `npm run build` зелёный (9 страниц).

## 2026-04-16 | Футер: слайд-карточка с верхними радиусами

Футер [FooterBlock.tsx](../src/components/FooterBlock.tsx) приведён к визуальному языку слайдов:

- Bg `bg-slate-50 border-t border-slate-200` → `bg-slate-100` (совпадает со слайдами; `border-t` убран — граница теперь через контраст фонов, §3).
- `rounded-t-[40px] lg:rounded-t-[48px]` — только верхние углы, нижние прилипают к нижнему краю экрана без радиуса.
- Боковые поля `mx-4 sm:mx-6 lg:mx-8` — как у card-блоков, оставляют полосы белого страничного фона по краям.
- `mt-6 lg:mt-8` — тот же вертикальный ритм, что между card-блоками.

Внутренняя карточка компании (`bg-white rounded-3xl`) теперь контрастирует с slate-100 родителем, как и внутренние карточки в card-блоках (§9).

Правило зафиксировано как расширение §7 в [design-rules.md](../knowledge/design-rules.md).

## 2026-04-16 | Слайд-карточки: контентные блоки как rounded-surfaces

Главная перестроена по паттерну pencil.dev / Jitter / Kit / Mintlify / Deel: контентные блоки — крупные rounded-карточки на белом фоне страницы, чередуются с плоскими секциями.

**Механика (wrapper-level):**
- В [blocks.tsx](../src/components/blocks.tsx) и [PageBlocks.tsx](../src/components/PageBlocks.tsx) выпилена функция `getBlockBackgroundColor` и заменена на проверку `props.surface === 'card'`.
- Card-блок оборачивается в `<div className="mx-4 sm:mx-6 lg:mx-8 my-6 lg:my-8 bg-slate-100 rounded-[40px] lg:rounded-[48px] overflow-hidden">`.
- Block-компоненты не трогались — их внутренний `<section className="py-16 px-4 sm:px-8">` работает как inner padding внутри карточки.
- Заодно почищены `blockBg`-ветки (legacy полноэкранного фона) — остался только fallback на `style={{ backgroundColor }}` для flat-блоков, если проп задан.

**Главная, переведена 4 блока ([main.json](../src/data/main.json)):**
- `DetailedFeatureGridBlock` (Use cases) — card
- `ProductsGridBlock` (Which Product) — card
- `CustomerTestimonialsBlock` (What customers say) — card
- `ContactCTABlock` — card

Плоскими остались: `HeroBlock` (full-bleed), `LogosBlock` (strip), `FeaturesGridBlock` (Core Features — «вдох» между card-ами).

**Card-in-card фикс:** внутренние карточки в `DetailedFeatureGridBlock` и `ProductsGridBlock` были `bg-slate-100 rounded-3xl` → сливались бы с родительским слайдом. Переведены на `bg-white rounded-3xl`. Правило зафиксировано в чек-листе дизайн-ревью (§9).

**ContactCTABlock:** ранее внутри себя держал `<div bg-slate-100 rounded-3xl>` — теперь это делает внешняя обёртка. Внутри осталась только flex-раскладка иконка/текст/кнопка.

**Правило зафиксировано** в [design-rules.md §7 Слайд-карточки](../knowledge/design-rules.md). Радиус `rounded-[40px] lg:rounded-[48px]` (крупнее чем `rounded-3xl`=24px) — главная визуальная подпись слайдов. Цвет слайда `bg-slate-100` (#F1F5F9), может потом перейти в warm beige токен.

Build `npm run build` зелёный.

## 2026-04-16 | Иконки: переход на lucide-react + удаление легаси-блоков

**Подход к иконкам:**
- Установлен `lucide-react` ([package.json](../package.json)).
- **Прямой импорт** в каждом блоке без централизованной обёртки — вместо прежнего `<Icon name=.../>` из `src/lib/icons.tsx` (удалён).
- **Stroke-width:** `1.5` для чипов в Hero, `2` для всех остальных иконок (feature-карточки, кнопки).
- Для data-driven блоков в каждом блоке держится локальный `Record<string, LucideIcon>` — маппинг строковых имён из JSON в lucide-компоненты.

**Live-блоки переведены на lucide:**
- [HeroBlock.tsx](../src/components/HeroBlock.tsx): чипы (`mouse-pointer`, `settings-2`, `git-branch`, `history`) — `strokeWidth={1.5}`.
- [DetailedFeatureGridBlock.tsx](../src/components/DetailedFeatureGridBlock.tsx): 7 иконок (`file-pen`, `database`, `layers`, `rocket`, `clock`, `server`, `monitor`) — `strokeWidth={2}`.
- [FeaturesGridBlock.tsx](../src/components/FeaturesGridBlock.tsx): 6 иконок Core Features — удалён большой switch над 25 React-обёртками.
- [TwoColumnDetailedFeaturesBlock.tsx](../src/components/TwoColumnDetailedFeaturesBlock.tsx): 12 иконок (включая `git-fork`, `shield`, `webhook`, `languages`, `code-xml`).

**Данные JSON** ([main.json](../src/data/main.json), [features.json](../src/data/features.json), [server.json](../src/data/server.json)): все `/icons/*.svg`-пути и эмодзи заменены на kebab-case-имена lucide-иконок.

**Удалено:**
- [src/lib/icons.tsx](../src/lib/icons.tsx) — централизованный wrapper (~35 иконок в REGISTRY).
- [src/components/icons/](../src/components/icons/) — ~35 React-обёрток над SVG-иконками FormEngine.
- Папка [public/icons/](../public/icons/) почищена с 75 SVG до 3 (остались только бренд-иконки соцсетей: `youtube.svg`, `twitter.svg`, `linkedin.svg` — их не поставляет lucide в последних версиях).

**Удалены легаси FormEngine-блоки** (не использовались в live JSON, зависели от удалённых иконок):
- `HowToUseBlock.tsx`, `TrainingFilesBlock.tsx`, `WorkflowEngineComponentsBlock.tsx`, `ComponentsTableBlock.tsx`.
- Каскадно (они импортили `WorkflowEngineComponentsBlock`): `ShadcnComponentsListBlock.tsx`, `MUIComponentsListBlock.tsx`, `MantineComponentsListBlock.tsx`.
- Зарегистрированные записи убраны из [blocks.tsx](../src/components/blocks.tsx) и [PageBlocks.tsx](../src/components/PageBlocks.tsx).

**Бренд-иконки соцсетей — исключение:** lucide-react >= 0.400 удалил `Youtube`/`Twitter`/`Linkedin` (в пользу нейтральных UI-иконок). Для бренд-марок в [FooterBlock.tsx](../src/components/FooterBlock.tsx) оставлены `<img src="/icons/*.svg">` — это brand identity, не UI-иконки. Правило: **UI-иконки идут через lucide, бренд-иконки могут оставаться как SVG.**

Build `npm run build` зелёный (9 статичных страниц).

## 2026-04-16 | Type scale: унификация текстовых стилей на главной

Разобрал главную по всем блокам — насчитал 5 разных размеров h2 (от browser-default до `text-3xl lg:text-4xl`), 4 варианта body-текста, параллельную цветовую гамму `text-gray-*` ⟷ `text-slate-*` через мёртвую ветку `isLightBg`, несколько мест с `tracking-wide`/`uppercase` поверх `.font-heading` (нейтрализуются cascade layers, но мусорят markup). В [design-rules.md §0](../knowledge/design-rules.md) зафиксирована единая type-scale из 7 ролей (Display/Section/Card/Eyebrow/Lead/Body/Meta).

**Применено на главной (7 блоков):**

- [HeroBlock](../src/components/HeroBlock.tsx) — убран `leading-tight` с h1 (дублирует `.font-heading` lh 1.1).
- [LogosBlock](../src/components/LogosBlock.tsx) — subtitle приведён к eyebrow-роли (`text-sm uppercase tracking-wide`), убрано ветвление `isLightBg`.
- [DetailedFeatureGridBlock](../src/components/DetailedFeatureGridBlock.tsx) — добавлен размер h2 (`text-4xl lg:text-5xl xl:text-6xl`) и card h3 (`text-2xl lg:text-3xl`); субтайтл переставлен над h2 как eyebrow; убрано ветвление.
- [FeaturesGridBlock](../src/components/FeaturesGridBlock.tsx) — убраны `uppercase tracking-wide` с h2; карточные h3 перешли из «синий label `text-base`» в Card-role (`text-2xl lg:text-3xl`, slate-900); субтайтл → eyebrow.
- [ProductsGridBlock](../src/components/ProductsGridBlock.tsx) — удалён inline `style={{ fontSize: '2rem' }}` и `tracking-wide` на card h3; размеры через Tailwind; `bg-white/50 : bg-slate-100` сведены к `bg-slate-100`.
- [CustomerTestimonialsBlock](../src/components/CustomerTestimonialsBlock.tsx) — subtitle → eyebrow; имя/должность перестали быть «жирный синий», теперь `text-slate-900 font-semibold` + meta `text-slate-500`; quote-SVG был `fill="white"` (невидим на белом) → `#cbd5e1`.
- [ContactCTABlock](../src/components/ContactCTABlock.tsx) — **ликвидирована единственная тёмная секция** `#101828` с нечитаемым `text-slate-900` текстом и градиентным heading. Переделано в `bg-slate-100 rounded-3xl` карточку со светлым контрастом, иконка → `text-blue-600`. Сайт теперь полностью light-theme без исключений.

Все `isLightBg` ветвления удалены в 6 блоках — сайт только светлый, tailwind `text-gray-*` сведён к `text-slate-*`. Build `npm run build` зелёный.

## 2026-04-16 | Design-rules sweep: применение правил к live-компонентам

Проход по всему сайту с приведением в соответствие дизайн-правилам ([design-rules.md](design-rules.md)). Билд `npm run build` зелёный.

**Кнопки → pill-shape и брендовый цвет:**
- [Button.tsx](../src/components/Button.tsx): `rounded-lg` → `rounded-full`, `transition-all` → `transition-colors`.
- [app/downloads/page.tsx](../src/app/downloads/page.tsx): три inline-кнопки `bg-blue-600 rounded-lg` → `bg-[#93d8ff] text-gray-900 rounded-full hover:bg-[#7dc3f4]`.
- [ContactForm.tsx](../src/components/ContactForm.tsx): submit-кнопка приведена к брендовому primary + pill.
- [BlogCategoryFilter.tsx](../src/components/blog/BlogCategoryFilter.tsx): фильтр-чипы → `rounded-full`, активный заменён на `bg-blue-100 text-blue-700` (убран border вместе с bg).

**Убраны тени (§1):**
- [HeroBlock.tsx](../src/components/HeroBlock.tsx): chips убран `shadow-sm` + `border`, возвращён паттерн `bg-blue-50 text-blue-700`.
- [BadgeGridBlock.tsx](../src/components/BadgeGridBlock.tsx): `hover:shadow-lg hover:scale-105` × 2 → `hover:opacity-80` + убран border в палитре.
- [ColumnsBlock.tsx](../src/components/ColumnsBlock.tsx): `hover:shadow-lg` → `hover:opacity-80`.
- [ProductsGridBlock.tsx](../src/components/ProductsGridBlock.tsx): `hover:scale-105 hover:shadow-lg` → `hover:opacity-80`.
- [RatingCTABlock.tsx](../src/components/RatingCTABlock.tsx): `hover:shadow-lg` × 2 → `hover:opacity-80`; `border-2` → `border`.

**Убраны hover-трансформы (§2):**
- `group-hover:translate-x-1` на SVG-стрелках удалено в 8 компонентах ([CenteredImage/Code/Video/AI/LargeCentered]Block, TwoColumnFeatureBlock, WorkflowEngineComponentsBlock, ColumnsBlock).
- [BlogCard.tsx](../src/components/blog/BlogCard.tsx): `group-hover:scale-105` на превью → `group-hover:opacity-80`.

**Убраны bg+border конфликты (§3):**
- [FooterBlock.tsx](../src/components/FooterBlock.tsx): карточка Optimajet `bg-white + border` → `bg-white rounded-3xl` (контраст с `bg-slate-50` футера).
- [ContactForm.tsx](../src/components/ContactForm.tsx): форма `bg-white + border` → `bg-slate-50` без бордера; success/error-карточки приведены к чистому bg.
- [BadgeGridBlock.tsx](../src/components/BadgeGridBlock.tsx): `bg-gray-50 border-gray-200` → `bg-gray-50`.
- [app/downloads/page.tsx](../src/app/downloads/page.tsx): карточка таблицы и списки — убран `bg-white` (страница уже белая), border остался как единственная граница.

**Скругление §5 (rounded-2xl/3xl):**
- Карточки в DetailedFeatureGridBlock, TwoColumnDetailedFeaturesBlock, ProductsGridBlock, BadgeGridBlock, ColumnsBlock: `rounded-xl/lg` → `rounded-3xl`.
- Обложки блога ([BlogCard](../src/components/blog/BlogCard.tsx), [blog/[slug]](../src/app/blog/[slug]/page.tsx)) — cover теперь `rounded-3xl`.

**Чистка `font-bold`/`font-semibold` поверх heading (§0):**
- Доведены до `font-heading` h2/h3 в DetailedFeatureGridBlock, TwoColumnDetailedFeaturesBlock, ProductsGridBlock, CustomerTestimonialsBlock, ContactCTABlock, BadgeGridBlock.

**Не тронуто (осознанно):**
- `font-semibold` на `.font-subtitle` — subtitle token отдельный, вес дивергирует.
- `font-bold` на div-ах (column titles футера и т.п.) — не heading-элементы, §0 не применяется.
- Nav-links (`rounded-lg` + hover:bg) — это не кнопки, §4 не применяется.
- ArchitectureDiagram, ComponentsTable, CodePreview, ProcessPreview, HeroWithCodeBlock, FrameworkLogosBlock, HeroFrameworksBlock, TimelineBlock, ChatGPTButton, формовьюеры (FormDemoBlock, MuiFormDemoBlock, MUIBasicUsageBlock, MantineBasicUsageBlock) — **не используются в live JSON/страницах**, легаси FormEngine; приведутся при подключении или удалятся.
- Инпут в ContactForm (`bg-white + border-slate-300`) — частный случай §3: форма теперь `bg-slate-50`, контраст минимален → border сохранён.

## 2026-04-16 | Типографика: swap на DM Sans (pencil.dev) + Inter

Поменяли типографический стек по референсу pencil.dev для заголовков; body-шрифт оставлен Inter (отступление от pencil.dev, у них Rubik Light):

- **Заголовки:** Poppins → **DM Sans** (opsz axis, `next/font/google`). Инвариант: `font-weight: 600`, `letter-spacing: -0.02em`, `line-height: 1.1`. Правило вынесено в `h1–h6` и `.font-heading` в [globals.css](../src/styles/globals.css).
- **Body:** **Inter** (без изменений).
- **Subtitle:** Space Grotesk → **DM Sans** (та же семья что и заголовки; токен `fontFamily.subtitle` оставлен для будущей дивергенции).
- **JetBrains Mono** — оставлен для кода.

Обновлены: [layout.tsx](../src/app/layout.tsx), [tailwind.config.ts](../tailwind.config.ts), [globals.css](../src/styles/globals.css) (включая article-content h1–h5 и .flow-container), [designer-tree.css](../src/styles/designer-tree.css), [ArchitectureBlock.module.css](../src/styles/ArchitectureBlock.module.css).

Component sweep: удалены `font-bold`/`font-extrabold`/`font-semibold` рядом с `font-heading` во всех .tsx — вес теперь держит сам класс `.font-heading` (600). 35 файлов.

Правило зафиксировано в [design-rules.md §0 Типографика](design-rules.md).

## 2026-04-16 | Design rules зафиксированы

Создан [design-rules.md](design-rules.md) — свод визуальных правил сайта. Главный инвариант: граница элемента создаётся одним способом — либо контуром, либо контрастом фонов.

Правила:
- никаких теней (ни `shadow-*`, ни `drop-shadow-*`); единственное исключение — focus-ring для `:focus-visible` (a11y);
- hover/active/disabled — только через прозрачность/затемнение/высветление; никаких `scale`/`translate`/`shadow`;
- есть `bg-*` → нельзя `border-*`; прозрачный элемент → контур допустим;
- инпуты: контур появляется, только если контраст фона инпута и окружения недостаточен;
- hairline-разделители секций — разрешены (трактуются как типографика, не border);
- кнопки плоские, без градиентов, **pill-shape** (`rounded-full`): primary с фоном (`bg-[#93d8ff]`), secondary контурная (`border` + `bg-transparent`);
- все секции/блоки/карточки/медиа — со скруглёнными углами (временно `rounded-2xl` / `rounded-3xl`, точные пропорции TBD);
- медиа — контур разрешён.

Открытые вопросы (focus-ring, active/disabled через прозрачность, hairlines, медиа) закрыты предварительно «да», с корректировкой при появлении реальных кейсов.

Обновлён [INDEX.md](INDEX.md) — добавлена ссылка на design-rules в секцию «Решения».

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
