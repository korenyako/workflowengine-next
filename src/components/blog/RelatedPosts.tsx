import Link from 'next/link'
import { blogPosts, type BlogPost } from '@/lib/blog-manifest'

interface Props {
  currentSlug: string
  topics?: string[]
  limit?: number
}

interface ScoredPost {
  post: BlogPost
  score: number
}

function findRelated(currentSlug: string, currentTopics: string[], limit: number): BlogPost[] {
  const candidates: ScoredPost[] = []
  for (const p of blogPosts) {
    if (p.slug === currentSlug) continue
    if (!p.topics || p.topics.length === 0) continue
    const score = p.topics.filter((t) => currentTopics.includes(t)).length
    if (score === 0) continue
    candidates.push({ post: p, score })
  }
  candidates.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return a.post.order - b.post.order
  })
  return candidates.slice(0, limit).map((c) => c.post)
}

export default function RelatedPosts({ currentSlug, topics, limit = 3 }: Props) {
  if (!topics || topics.length === 0) return null
  const related = findRelated(currentSlug, topics, limit)
  if (related.length === 0) return null

  return (
    <aside className="mt-16 pt-10 border-t border-slate-200">
      <h2 className="text-2xl font-heading text-slate-900 mb-8">
        Related articles
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {related.map((p) => {
          const excerpt = p.description?.split('\n\n')[0]
          return (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}/`}
              className="block group rounded-xl border border-slate-200 p-5 transition-colors hover:border-[#4286F4]"
            >
              <h3 className="font-heading text-base text-slate-900 leading-snug mb-2 group-hover:text-[#4286F4] transition-colors">
                {p.title}
              </h3>
              {excerpt && (
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {excerpt}
                </p>
              )}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
