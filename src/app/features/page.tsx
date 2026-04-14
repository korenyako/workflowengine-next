import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WorkflowEngine Features',
  description: 'Explore the features of WorkflowEngine — a powerful workflow automation engine.',
}

export default function FeaturesPage() {
  return (
    <div className="py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-semibold text-slate-900 mb-4">
          WorkflowEngine Features
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 mb-8">
          This page is under construction. Check back soon for a full feature overview.
        </p>
      </div>
    </div>
  )
}
