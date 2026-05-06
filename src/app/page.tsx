import { Metadata } from 'next';
import Blocks from '@/components/blocks';
import { SITE_ORIGIN, SITE_NAME, DEFAULT_OG_IMAGE } from '@/utils/seo';

export const metadata: Metadata = {
  title: 'WorkflowEngine - Workflow Automation Engine for .NET',
  description: 'WorkflowEngine is a lightweight, cross-platform workflow engine for .NET. Design, automate, and manage business processes with a visual designer and flexible API.',
  keywords: 'workflow engine, .NET, business process, automation, BPM, workflow designer',
  alternates: {
    canonical: `${SITE_ORIGIN}/`,
  },
  openGraph: {
    title: 'WorkflowEngine - Workflow Automation Engine for .NET',
    description: 'Lightweight, cross-platform workflow engine for .NET. Visual designer and flexible API for business process automation.',
    url: `${SITE_ORIGIN}/`,
    siteName: SITE_NAME,
    images: [DEFAULT_OG_IMAGE],
    type: 'website',
  },
};

export default function Home() {
  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'WorkflowEngine',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    url: SITE_ORIGIN,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <Blocks revealOnScroll />
    </>
  );
}
