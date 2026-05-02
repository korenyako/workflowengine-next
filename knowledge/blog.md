---
title: Blog
---

# Blog

31 постов, портированных 1:1 с workflowengine.io (`2026-04-30`). Слаги совпадают с легаси-URL — каждый `/blog/<slug>/` старого сайта резолвится в тот же путь у нас. Это критично для SEO: ~90% входящего трафика идёт в `/blog/`.

## Pieces

| File | Role |
|------|------|
| [src/data/blog.ts](../src/data/blog.ts) | `blogPosts: BlogPost[]` (метаданные 31 поста), `BLOG_CATEGORIES`, helpers `getBlogPostBySlug`, `getBlogPostsByCategory`. |
| [src/content/blog/](../src/content/blog/) | MDX-источники. Имя файла = slug (`<slug>.mdx`). 31 файл. |
| [src/app/blog/page.tsx](../src/app/blog/page.tsx) | Index page; category filter + `BlogCard` grid. |
| [src/app/blog/[slug]/page.tsx](../src/app/blog/[slug]/page.tsx) | Post page; читает MDX через `fs.readFileSync`, рендерит `next-mdx-remote/rsc`. |
| [src/components/blog/](../src/components/blog/) | `BlogCard`, `BlogCategoryFilter`, `TableOfContents` (client-side ToC extractor). |
| [public/images/blog/<slug>/](../public/images/blog/) | Обложки + inline-картинки, скачаны с `workflowengine.io/blog/assets/...` и перевешены на per-slug папки. |

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
}
```

`date` опциональна: на источнике (workflowengine.io) ни в HTML, ни в `<meta>`, ни в sitemap нет дат публикации. Рендеринг ([BlogCard](../src/components/blog/BlogCard.tsx) + [post page](../src/app/blog/[slug]/page.tsx)) обёрнут в conditional. Когда (если) даты восстановятся, их можно проставить в `blog.ts` без изменения компонентов.

`author` тоже опциональна, но у всех 31 портированного поста выставлено `{ name: 'Optimajet Team' }` (на источнике автор не указан, это дефолт от имени бренда). Рендеринг автора тоже conditional — если поле снимут, просто не покажется.

`description` поддерживает многоабзацный режим — абзацы разделяются `\n\n`. На post-странице рендерятся все абзацы (`description.split('\n\n').map(...)` → `<p>` каждый); на карточке `/blog/` индекса показывается только первый. Используется в `how-to-choose-the-right-embedded-workflow-automation-tool` где 2 интро-абзаца подняты из тела в subtitle.

## Cover vs inline image (важно)

`cover` рендерится в **двух местах**:
- thumbnail на карточке `/blog/` индекса ([BlogCard](../src/components/blog/BlogCard.tsx)),
- `og:image` / `twitter:image` для шаринга в соцсетях ([page.tsx generateMetadata](../src/app/blog/[slug]/page.tsx)).

На post-странице **cover не рендерится** — мы убрали `<img src={post.cover}>` из hero (`2026-05-02`), потому что у 8 постов с inline-картинкой первой строкой тела это создавало дубль (та же картинка дважды на одной странице — в hero и сразу под ней в начале статьи).

Если у поста есть **inline-картинка** в первой строке MDX — она служит lead-image на post-странице. Для этих 8 постов `cover` указывает на тот же файл что и inline (визуально одна картинка: на карточке индекса как thumbnail, на post-странице как первая картинка статьи). У остальных 23 постов inline-картинки нет — post-страница начинается сразу с h2 после meta-строки.

## Add a post

1. Append a `BlogPost` object to `blogPosts` in `src/data/blog.ts`. `slug` must be URL-safe and match the MDX filename. `category` must be one of `BLOG_CATEGORIES`.
2. Create `src/content/blog/<slug>.mdx` with article body (MDX — supports standard Markdown + JSX). **Не начинай тело с `# Title`** — заголовок поста уже рендерит [page.tsx](../src/app/blog/[slug]/page.tsx) в hero, в теле он будет дубликатом.
3. Drop cover image under `public/images/blog/<slug>/cover.webp` and set `cover: '/images/blog/<slug>/cover.webp'` on the metadata. Если хочешь lead-картинку в начале статьи — добавь `![alt](/images/blog/<slug>/cover.webp)` первой строкой MDX (та же картинка как и в `cover` — она появится на карточке индекса как thumbnail и в теле статьи как lead).

## Categories

`BLOG_CATEGORIES`: `All`, `Product`, `Engineering`, `Case Study`, `Open Source`. Текущее распределение портированных постов:

- **Case Study** (3) — посты с префиксом «Case Study:» в заголовке.
- **Engineering** (17) — технические how-to, comparisons, внутренности (parallel branches, designer customization, performance, code quality).
- **Product** (11) — обзоры, релизы, бизнес-фрейминг (server overview, low-code platform, BPM/BRMS guides).
- **Open Source** — пусто, никто из 31 поста не подходит. Кнопка фильтра отрендерится, но покажет пустую сетку. Можно убрать категорию из массива, если хочется почистить UI.

## MDX pipeline

Server-rendered via `next-mdx-remote/rsc` — MDX is transformed at build time, the post page is just a React Server Component. No runtime MDX compilation. No custom `<MDXRemote>` components map yet; add one via the `components` prop of `<MDXRemote>` if you need custom rendering (callouts, embeds, code highlighting, etc.).

**Code-блоки сейчас рендерятся как plain `<pre><code>`** — без подсветки синтаксиса. `highlight.js` есть в `package.json`, но в эту версию ещё не подключён к MDX-пайплайну. На легаси-сайте была подсветка; включить через `rehype-highlight` или `rehype-prism-plus` (см. `MDXRemote.options.mdxOptions.rehypePlugins`).

## Inline HTML внутри MDX — гайдлайн

В исходном HTML легаси-постов встречаются `<table>` и inline-SVG. Они пробрасываются в MDX без конверсии в markdown-таблицы. Будь осторожен:

- **`style="..."` атрибуты не работают** — JSX-парсер MDX ждёт объект. Удалять или конвертить в `style={{...}}`.
- **`xlink:href` на SVG `<use>`** — `:` в имени атрибута ломает JSX. Использовать non-namespaced `href` (работает во всех modern-браузерах).
- **Markdown-emphasis в text-nodes** — `*`, `_`, `~`, `[`, `]` внутри inline-HTML (особенно `<td>*</td>`) MDX парсит как разметку. Заменять на HTML-entities (`&#42;` и т.д.) при добавлении HTML руками.

## Empty-blog build workaround (исторический)

Раньше, когда `blogPosts` был пуст, `generateStaticParams` в [page.tsx](../src/app/blog/[slug]/page.tsx) возвращал sentinel `[{ slug: '__placeholder__' }]`, чтобы `output: 'export'` не падал на пустом dynamic-route. Сейчас в `blogPosts` 31 запись — sentinel не срабатывает. Код-фолбэк оставлен как защита на случай, если все посты будут удалены.
