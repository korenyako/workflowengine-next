---
title: Blog
---

# Blog

31 постов, портированных 1:1 с workflowengine.io (`2026-04-30`). Слаги совпадают с легаси-URL — каждый `/blog/<slug>/` старого сайта резолвится в тот же путь у нас. Это критично для SEO: ~90% входящего трафика идёт в `/blog/`.

## Pieces

| File | Role |
|------|------|
| [src/content/blog/](../src/content/blog/) | MDX-источники + **frontmatter** = единственный источник правды. Имя файла = slug. 31 файл. |
| [src/lib/blog-manifest.ts](../src/lib/blog-manifest.ts) | Build-time сканирует `src/content/blog/`, парсит frontmatter через `gray-matter`, экспортирует `blogPosts: BlogPost[]`, `BLOG_CATEGORIES`, helpers `getBlogPostBySlug`, `getBlogPostsByCategory`. Кэшируется на уровне модуля (один read на build). |
| [src/app/blog/page.tsx](../src/app/blog/page.tsx) | Index page; `BlogCard` grid в порядке `order`. |
| [src/app/blog/[slug]/page.tsx](../src/app/blog/[slug]/page.tsx) | Post page; читает MDX через `fs.readFileSync`, рендерит body через `next-mdx-remote/rsc` (frontmatter уже распарсен манифестом, не дублируется). |
| [src/components/blog/](../src/components/blog/) | `BlogCard`, `BlogCategoryFilter`, `TableOfContents` (client-side ToC extractor). |
| [public/images/blog/<slug>/](../public/images/blog/) | Обложки + inline-картинки, скачаны с `workflowengine.io/blog/assets/...` и перевешены на per-slug папки. |

`src/data/blog.ts` **удалён** (`2026-05-12`). Метаданные мигрировали в YAML-frontmatter каждого `.mdx` файла. Единый источник правды; редактирование через [Decap CMS](./../docs/blog-cms.md) (admin UI на `/admin/`) или прямое правка файла.

## BlogPost shape

```ts
interface BlogPost {
  slug: string
  title: string
  description: string
  date?: string         // optional — у легаси-постов даты нет
  dateLabel?: 'Published' | 'Updated'
  author?: { name: string; title?: string }   // optional, default 'Optimajet Team' для портированных
  category: string
  tags: string[]
  cover?: string
  readingTime: string
  keywords?: string
  order: number         // required — курируемый порядок отображения на /blog/ index
}
```

### `order` — почему required

У большинства легаси-постов нет `date`, поэтому date-desc сортировка не сработает. `order` (1..31 для текущих, дальше — новый автор сам выбирает позицию) даёт детерминированный порядок без отдельного индекса-файла. Меньше = раньше на `/blog/`.

Если будущие посты будут с реальными датами — можно перейти на гибрид: `date` desc для датированных + `order` для legacy-fallback. Сейчас просто `posts.sort((a,b) => a.order - b.order)`.

`date` опциональна: на источнике (workflowengine.io) ни в HTML, ни в `<meta>`, ни в sitemap нет дат публикации. Рендеринг ([BlogCard](../src/components/blog/BlogCard.tsx) + [post page](../src/app/blog/[slug]/page.tsx)) обёрнут в conditional. Когда (если) даты восстановятся, их можно проставить во frontmatter без изменения компонентов.

`author` тоже опциональна, но у всех 31 портированного поста выставлено `{ name: 'Optimajet Team' }` (на источнике автор не указан, это дефолт от имени бренда). Рендеринг автора тоже conditional — если поле снимут, просто не покажется.

`description` поддерживает многоабзацный режим — абзацы разделяются `\n\n`. На post-странице рендерятся все абзацы (`description.split('\n\n').map(...)` → `<p>` каждый); на карточке `/blog/` индекса показывается только первый. Используется в `how-to-choose-the-right-embedded-workflow-automation-tool` где 2 интро-абзаца подняты из тела в subtitle.

## Cover vs inline image (важно)

`cover` рендерится в **двух местах**:
- thumbnail на карточке `/blog/` индекса ([BlogCard](../src/components/blog/BlogCard.tsx)),
- `og:image` / `twitter:image` для шаринга в соцсетях ([page.tsx generateMetadata](../src/app/blog/[slug]/page.tsx)).

На post-странице **cover не рендерится** — мы убрали `<img src={post.cover}>` из hero (`2026-05-02`), потому что у 8 постов с inline-картинкой первой строкой тела это создавало дубль (та же картинка дважды на одной странице — в hero и сразу под ней в начале статьи).

Если у поста есть **inline-картинка** в первой строке MDX — она служит lead-image на post-странице. Для этих 8 постов `cover` указывает на тот же файл что и inline (визуально одна картинка: на карточке индекса как thumbnail, на post-странице как первая картинка статьи). У остальных 23 постов inline-картинки нет — post-страница начинается сразу с h2 после meta-строки.

## Add a post

Через [Decap CMS](./../docs/blog-cms.md) на `/admin/` (рекомендуется для нон-технических авторов) **или** напрямую в файлы:

1. Создать `src/content/blog/<slug>.mdx`. Имя файла = `slug`. Frontmatter обязательно — schema из [blog-manifest.ts](../src/lib/blog-manifest.ts):

   ```yaml
   ---
   slug: my-new-post
   title: My New Post
   description: One-paragraph subtitle.
   category: Engineering   # one of Product, Engineering, Case Study, Open Source
   tags: []
   readingTime: 5 minutes
   order: 32               # next available — больше любого существующего, чтобы новый пост попал в конец /blog/
   cover: /images/blog/my-new-post/cover.webp
   author:
     name: Optimajet Team
   ---
   ```

2. Body — MDX (standard Markdown + JSX). **Не начинай тело с `# Title`** — заголовок уже рендерит [page.tsx](../src/app/blog/[slug]/page.tsx) в hero, в теле он будет дубликатом.

3. Cover: положить картинку в `public/images/blog/<slug>/cover.webp`, прописать `cover: /images/blog/<slug>/cover.webp` во frontmatter. Lead-картинка (опционально) — добавить `![alt](/images/blog/<slug>/cover.webp)` первой строкой MDX-тела (та же картинка: на карточке индекса как thumbnail, в теле статьи как lead).

## Categories

`BLOG_CATEGORIES`: `All`, `Product`, `Engineering`, `Case Study`, `Open Source`. Текущее распределение портированных постов:

- **Case Study** (3) — посты с префиксом «Case Study:» в заголовке.
- **Engineering** (17) — технические how-to, comparisons, внутренности (parallel branches, designer customization, performance, code quality).
- **Product** (11) — обзоры, релизы, бизнес-фрейминг (server overview, low-code platform, BPM/BRMS guides).
- **Open Source** — пусто, никто из 31 поста не подходит. Кнопка фильтра отрендерится, но покажет пустую сетку. Можно убрать категорию из массива, если хочется почистить UI.

## Topics taxonomy (для related-posts)

Категории слишком широкие чтобы строить осмысленные «Related articles» (Engineering = 17 постов). Поэтому **отдельный controlled vocabulary** в поле `topics: string[]` во frontmatter — 1-4 топика на пост из фиксированного списка из 9 значений. Внедрено `2026-05-15` после контент-аудита всех 32 постов (см. также Decap-select в [config.yml](../public/admin/config.yml)).

| topic slug | label в Decap | посты |
|------------|---------------|-------|
| `workflow-engine-basics` | Workflow Engine basics | 8 |
| `workflow-engine-comparisons` | Workflow engine comparisons (vs Camunda, Nintex, WWF, ...) | 9 |
| `bpm-implementation` | BPM implementation | 8 |
| `workflow-server` | Workflow Server | 7 |
| `api-and-microservices` | API & microservices | 5 |
| `case-studies` | Case studies | 4 |
| `low-code` | Low-code | 4 |
| `parallel-workflows` | Parallel workflows | 3 |
| `workflow-designer` | Workflow Designer | 3 |

`tags` vs `topics` — разные:
- `tags` — free-form keywords (для будущего `<meta name="keywords">` или фильтрации). Сейчас не рендерится.
- `topics` — controlled vocabulary, **только из списка выше**. Драйвит [RelatedPosts.tsx](../src/components/blog/RelatedPosts.tsx) внизу каждого поста.

### Как работают «Related articles»

[RelatedPosts.tsx](../src/components/blog/RelatedPosts.tsx) — server-component на конце статьи. Алгоритм:

1. Для каждого другого поста: `score = |intersection(currentPost.topics, otherPost.topics)|`
2. Отбросить посты со score 0 (нет ни одного общего топика — не релевантны)
3. Сортировка: score desc, потом order asc (как тiebreaker — «более курируемые» сначала)
4. Top 3

Если у поста нет `topics` (пустой массив или undefined) — блок не рендерится вообще (`return null`). Для SEO лучше не показать ничего, чем показать рандом.

**Расширение списка топиков:** добавить новый topic = три места синхронно:
1. `options:` в [config.yml](../public/admin/config.yml) (поле `topics`)
2. Эта таблица в knowledge/blog.md
3. (Опционально) указать существующим постам через Decap UI или прямую правку frontmatter

Slug-конвенция: kebab-case, без `workflow-` префикса для общих топиков, **с** префиксом для топиков о конкретном продукте (`workflow-server`, `workflow-designer`).

## MDX pipeline

Server-rendered via `next-mdx-remote/rsc` — MDX is transformed at build time, the post page is just a React Server Component. No runtime MDX compilation. No custom `<MDXRemote>` components map yet; add one via the `components` prop of `<MDXRemote>` if you need custom rendering (callouts, embeds, code highlighting, etc.).

**Подключённые плагины:**

- `rehype-highlight` (с `detect: true`) — подсветка синтаксиса в fenced-блоках (auto-determine для блоков без `language-X`).
- `remark-gfm` — GFM-возможности: таблицы (`|...|`), ~~strikethrough~~, task-lists (`- [ ]`), autolinks, footnotes. **Без него таблицы рендерятся как plain text с пайпами** (`2026-05-13` поймали на новом посте `data-api-vs-rpc-api-in-workflow-engine-neo`).

Inline `<code>` (backticks внутри текста) стилизуется как pill-бейдж — CSS-правило `.article-content :not(pre) > code` в [globals.css](../src/styles/globals.css). `:not(pre)` важно — иначе зацепит и code-блоки внутри `<pre>` где работает highlight.js.

Frontmatter парсится дважды (это не оптимально, но просто): один раз в [blog-manifest.ts](../src/lib/blog-manifest.ts) для метаданных, второй — в [post page](../src/app/blog/[slug]/page.tsx) через `matter(...).content` чтобы **отделить body от frontmatter** перед `MDXRemote`. **`MDXRemote` сам frontmatter не стрипает** — без `matter(...)` YAML отрендерился бы как видимый текст в начале статьи (мы это поймали и поправили `2026-05-12` сразу после миграции).

## Inline HTML внутри MDX — гайдлайн

В исходном HTML легаси-постов встречаются `<table>` и inline-SVG. Они пробрасываются в MDX без конверсии в markdown-таблицы. Будь осторожен:

- **`style="..."` атрибуты не работают** — JSX-парсер MDX ждёт объект. Удалять или конвертить в `style={{...}}`.
- **`xlink:href` на SVG `<use>`** — `:` в имени атрибута ломает JSX. Использовать non-namespaced `href` (работает во всех modern-браузерах).
- **Markdown-emphasis в text-nodes** — `*`, `_`, `~`, `[`, `]` внутри inline-HTML (особенно `<td>*</td>`) MDX парсит как разметку. Заменять на HTML-entities (`&#42;` и т.д.) при добавлении HTML руками.

## Empty-blog build workaround (исторический)

Раньше, когда `blogPosts` был пуст, `generateStaticParams` в [page.tsx](../src/app/blog/[slug]/page.tsx) возвращал sentinel `[{ slug: '__placeholder__' }]`, чтобы `output: 'export'` не падал на пустом dynamic-route. Сейчас в `blogPosts` 31 запись — sentinel не срабатывает. Код-фолбэк оставлен как защита на случай, если все посты будут удалены.
