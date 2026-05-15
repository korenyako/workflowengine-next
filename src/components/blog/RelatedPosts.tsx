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
    <aside className="related-posts">
      <h2 className="related-posts__heading">Related articles</h2>
      <ul className="related-posts__list">
        {related.map((p) => (
          <li key={p.slug} className="related-posts__item">
            <Link href={`/blog/${p.slug}/`} className="related-posts__link">
              <span className="related-posts__title">{p.title}</span>
              {p.description && (
                <span className="related-posts__excerpt">
                  {p.description.split('\n\n')[0]}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
