---
title: Blog
---

# Blog

Article list + MDX content. **Currently empty** — structure preserved, content removed during fork.

## Pieces

| File | Role |
|------|------|
| [src/data/blog.ts](../src/data/blog.ts) | `blogPosts: BlogPost[]` (metadata), `BLOG_CATEGORIES`, helpers `getBlogPostBySlug`, `getBlogPostsByCategory`. |
| [src/content/blog/](../src/content/blog/) | MDX sources. File name = slug (`<slug>.mdx`). Empty. |
| [src/app/blog/page.tsx](../src/app/blog/page.tsx) | Index page; category filter + `BlogCard` grid. |
| [src/app/blog/[slug]/page.tsx](../src/app/blog/[slug]/page.tsx) | Post page; reads MDX file via `fs.readFileSync`, renders with `next-mdx-remote/rsc`. |
| [src/components/blog/](../src/components/blog/) | `BlogCard`, `BlogCategoryFilter`, `TableOfContents` (client-side ToC extractor). |

## Add a post

1. Append a `BlogPost` object to `blogPosts` in `src/data/blog.ts`. `slug` must be URL-safe and match the MDX filename. `category` must be one of `BLOG_CATEGORIES`.
2. Create `src/content/blog/<slug>.mdx` with article body (MDX — supports standard Markdown + JSX).
3. Drop cover image (optional) under `public/images/blog/<slug>/cover.webp` and set `cover: '/images/blog/<slug>/cover.webp'` on the metadata.

## Empty-blog build workaround

Next.js 16 `output: 'export'` refuses to build a dynamic route when `generateStaticParams()` returns `[]`. `generateStaticParams` therefore returns a sentinel `[{ slug: '__placeholder__' }]` when `blogPosts` is empty (rationale in [decisions.md](decisions.md)). The sentinel is dropped automatically once any real post is added. If you'd rather keep `out/` spotless before any post exists, delete the `blog/[slug]/` folder until the first post ships.

## MDX pipeline

Server-rendered via `next-mdx-remote/rsc` — MDX is transformed at build time, the post page is just a React Server Component. No runtime MDX compilation. No custom `<MDXRemote>` components map yet; add one via the `components` prop of `<MDXRemote>` if you need custom rendering (callouts, embeds, etc.).
