export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string // ISO date string
  dateLabel?: 'Published' | 'Updated' // default: 'Published'
  author: {
    name: string
    title?: string
  }
  category: string
  tags: string[]
  cover?: string // path to cover image
  readingTime: string // e.g. "8 min read"
  keywords?: string
}

export const BLOG_CATEGORIES = [
  'All',
  'Product',
  'Engineering',
  'Case Study',
  'Open Source',
] as const

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]

export const blogPosts: BlogPost[] = []

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  if (category === 'All') return blogPosts
  return blogPosts.filter((post) => post.category === category)
}
