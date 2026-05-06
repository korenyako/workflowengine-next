import type { Metadata } from 'next'
import PageBlocks from '@/components/PageBlocks'
import blocks from '@/data/features.json'

export const metadata: Metadata = {
  title: 'Workflow Engine Features — OptimaJet WorkflowEngine',
  description:
    'HTML5 Designer, versioning, parallel branches, BPMN 2.0, timers, localization, multi-database support. Everything Workflow Engine can do.',
}

export default function FeaturesPage() {
  return <PageBlocks blocks={blocks} revealOnScroll />
}
