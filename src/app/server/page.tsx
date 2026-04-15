import type { Metadata } from 'next'
import PageBlocks from '@/components/PageBlocks'
import blocks from '@/data/server.json'

export const metadata: Metadata = {
  title: 'Workflow Server — Cross-platform Workflow Backend',
  description:
    'Ready-to-use Workflow Engine application with a REST API. Deploy to Windows, Linux, macOS, or Docker and integrate with any system.',
}

export default function ServerPage() {
  return <PageBlocks blocks={blocks} />
}
