import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { blogPosts, getBlogPostBySlug } from '@/data/blog'
import TableOfContents from '@/components/blog/TableOfContents'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'blog')

export const dynamicParams = false

export async function generateStaticParams() {
  // Next.js with `output: export` requires at least one static param for dynamic routes.
  // When there are no blog posts, emit a placeholder that will never be linked.
  if (blogPosts.length === 0) {
    return [{ slug: '__placeholder__' }]
  }
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = getBlogPostBySlug(slug)
    if (!post) return {}
    return {
      title: `${post.title} — WorkflowEngine Blog`,
      description: post.description,
      keywords: post.keywords,
      alternates: { canonical: `https://workflowengine.io/blog/${post.slug}/` },
      openGraph: {
        title: `${post.title} — WorkflowEngine Blog`,
        description: post.description,
        url: `https://workflowengine.io/blog/${post.slug}/`,
        siteName: 'WorkflowEngine',
        type: 'article',
        publishedTime: post.date,
        authors: [post.author.name],
        images: [
          {
            url: post.cover || '/images/og-image.png',
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
        images: [post.cover || '/images/og-image.png'],
      },
    }
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) notFound()

  const source = fs.readFileSync(filePath, 'utf-8')

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <section className="bg-transparent text-slate-800 px-4 sm:px-8 py-10 md:py-14">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-slate-500">
          <Link href="/blog/" className="hover:text-slate-600 transition-colors">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-500">{post.title}</span>
        </nav>

        {/* Hero + Content + ToC */}
        <div className="flex gap-12">
          <div className="flex-1 min-w-0">
            {/* Hero */}
            <div className="mb-16">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading tracking-tight mb-4">
                {post.title}
              </h1>
              <p className="text-2xl text-slate-600 mb-8 leading-relaxed font-light">{post.description}</p>
              <div className="flex items-center gap-3 text-base text-slate-500">
                <span className="text-slate-600">{post.author.name}</span>
                {post.author.title && (
                  <>
                    <span>&middot;</span>
                    <span>{post.author.title}</span>
                  </>
                )}
                <span>&middot;</span>
                <span>{post.dateLabel || 'Published'}</span>
                <time dateTime={post.date}>{formattedDate}</time>
                <span>&middot;</span>
                <span>{post.readingTime}</span>
              </div>
            </div>

            {/* Cover */}
            {post.cover && (
              <img
                src={post.cover}
                alt={post.title}
                className="w-full object-cover rounded-3xl mb-12 max-h-[480px]"
              />
            )}

            {/* Article */}
            <article
              data-blog-content
              className="article-content"
            >
              <MDXRemote source={source} />
            </article>
          </div>

          {/* Table of Contents — right sidebar */}
          <aside className="w-64 flex-shrink-0 hidden xl:block">
            <TableOfContents />
          </aside>
        </div>

        <div className="mt-10 mb-10">
          <div className="w-[30%] border-t border-slate-200"></div>
        </div>
      </div>
    </section>
  )
}
