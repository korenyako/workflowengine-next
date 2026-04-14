import type { Metadata } from 'next'
import { blogPosts, BLOG_CATEGORIES } from '@/data/blog'
import BlogCard from '@/components/blog/BlogCard'
import BlogCategoryFilter from '@/components/blog/BlogCategoryFilter'

export const metadata: Metadata = {
  title: 'Blog — WorkflowEngine',
  description:
    'Articles, tutorials, and insights about WorkflowEngine — workflow automation for .NET from the OptimaJet team.',
  keywords:
    'workflowengine blog, workflow automation, .NET workflow engine, BPM articles',
  alternates: { canonical: 'https://workflowengine.io/blog/' },
  openGraph: {
    title: 'Blog — WorkflowEngine',
    description:
      'Articles, tutorials, and insights about WorkflowEngine — workflow automation for .NET.',
    url: 'https://workflowengine.io/blog/',
    siteName: 'WorkflowEngine',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WorkflowEngine Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — WorkflowEngine',
    description:
      'Articles, tutorials, and insights about WorkflowEngine — workflow automation for .NET.',
    images: ['/images/og-image.png'],
  },
}

export default function BlogIndex() {
  return (
    <section className="bg-transparent text-slate-800 px-4 sm:px-8">
      <div className="mx-auto max-w-6xl py-10 md:py-14">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-semibold text-slate-900 mb-4">
            Blog
          </h1>
          <p className="text-xl lg:text-2xl font-subtitle font-semibold tracking-wide text-blue-600">
            Releases, integrations, and developer insights
          </p>
        </div>

        {/* Posts grid — 2 columns */}
        <div className="grid gap-x-8 gap-y-24 sm:grid-cols-2">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} size="large" />
          ))}
        </div>

        {blogPosts.length === 0 && (
          <p className="text-center text-slate-500 py-20 text-lg">
            No posts yet. Stay tuned!
          </p>
        )}
      </div>
      <div className="h-24"></div>
    </section>
  )
}
