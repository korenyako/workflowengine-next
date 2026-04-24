import Link from 'next/link'
import type { BlogPost } from '@/data/blog'

interface BlogCardProps {
  post: BlogPost
  size?: 'large' | 'small'
}

export default function BlogCard({ post, size = 'small' }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="group block"
    >
      {post.cover && (
        <div className={`overflow-hidden rounded-3xl mb-4 ${size === 'large' ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
          />
        </div>
      )}
      <h2 className={`font-heading text-slate-900 mb-2  ${
        size === 'large' ? 'text-2xl lg:text-3xl' : 'text-lg lg:text-xl'
      }`}>
        {post.title}
      </h2>
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <span>{post.dateLabel || 'Published'}</span>
        <time dateTime={post.date}>{formattedDate}</time>
        <span>&middot;</span>
        <span>{post.readingTime}</span>
      </div>
    </Link>
  )
}
