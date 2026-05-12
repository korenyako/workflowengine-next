import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date?: string
  dateLabel?: 'Published' | 'Updated'
  author?: {
    name: string
    title?: string
  }
  category: string
  tags: string[]
  cover?: string
  readingTime: string
  keywords?: string
  /**
   * Curated display order on /blog/ index. Smaller = earlier.
   * Required because most legacy posts have no `date`, so date-desc
   * sort is not viable. Set in MDX frontmatter.
   */
  order: number
}

export const BLOG_CATEGORIES = [
  'All',
  'Product',
  'Engineering',
  'Case Study',
  'Open Source',
] as const

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'blog')

// Cache only in production. In dev we re-read on every call so Decap CMS
// edits (create/update/delete via /admin/) show up immediately on /blog/
// without restarting the dev server.
const CACHE_ENABLED = process.env.NODE_ENV === 'production'
let cache: BlogPost[] | null = null

function readAllPosts(): BlogPost[] {
  if (CACHE_ENABLED && cache) return cache

  const entries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
  const posts: BlogPost[] = []

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.mdx')) continue
    const filePath = path.join(CONTENT_DIR, entry.name)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(raw)
    const slug = (data.slug as string) || entry.name.replace(/\.mdx$/, '')

    posts.push({
      slug,
      title: data.title as string,
      description: data.description as string,
      date: data.date as string | undefined,
      dateLabel: data.dateLabel as BlogPost['dateLabel'],
      author: data.author as BlogPost['author'],
      category: data.category as string,
      tags: (data.tags as string[]) ?? [],
      cover: data.cover as string | undefined,
      readingTime: data.readingTime as string,
      keywords: data.keywords as string | undefined,
      order: typeof data.order === 'number' ? data.order : Number.MAX_SAFE_INTEGER,
    })
  }

  posts.sort((a, b) => a.order - b.order)
  cache = posts
  return posts
}

// `blogPosts` is a Proxy that re-invokes readAllPosts() on each property
// access. In production the underlying readAllPosts() is cached (see
// CACHE_ENABLED above) so the proxy adds no cost. In dev each access re-
// reads from disk, so edits made via Decap CMS at /admin/ show up on
// /blog/ immediately without restarting the dev server.
export const blogPosts: BlogPost[] = new Proxy([] as BlogPost[], {
  get(_target, prop, receiver) {
    return Reflect.get(readAllPosts(), prop, receiver)
  },
  has(_target, prop) {
    return Reflect.has(readAllPosts(), prop)
  },
  ownKeys() {
    return Reflect.ownKeys(readAllPosts())
  },
  getOwnPropertyDescriptor(_target, prop) {
    return Reflect.getOwnPropertyDescriptor(readAllPosts(), prop)
  },
})

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return readAllPosts().find((post) => post.slug === slug)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  const posts = readAllPosts()
  if (category === 'All') return posts
  return posts.filter((post) => post.category === category)
}
