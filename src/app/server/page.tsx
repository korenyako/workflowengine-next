import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Workflow Server',
  description: 'Learn about Workflow Server — a ready-to-use workflow management application.',
}

export default function ServerPage() {
  return (
    <div className="py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-semibold text-white mb-4">
          Workflow Server
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8">
          This page is under construction. Check back soon for details about Workflow Server.
        </p>
      </div>
    </div>
  )
}
