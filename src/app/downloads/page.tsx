import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Downloads — WorkflowEngine',
  description: 'Download WorkflowEngine packages, Workflow Server, and related tools.',
}

export default function DownloadsPage() {
  return (
    <div className="py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-semibold text-white mb-4">
          Downloads
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8">
          This page is under construction. Download links will be available soon.
        </p>
      </div>
    </div>
  )
}
