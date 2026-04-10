import { Metadata } from 'next';
import { SITE_ORIGIN, SITE_NAME, DEFAULT_OG_IMAGE } from '@/utils/seo';

export const metadata: Metadata = {
  title: 'WorkflowEngine Pricing — Flexible Plans for Workflow Automation',
  description: 'WorkflowEngine pricing plans for every project size. From community edition to enterprise solutions with premium support.',
  keywords: 'workflowengine pricing, workflow engine license, BPM pricing, workflow automation plans',
  alternates: {
    canonical: `${SITE_ORIGIN}/pricing/`,
  },
  openGraph: {
    url: `${SITE_ORIGIN}/pricing/`,
    siteName: SITE_NAME,
    images: [DEFAULT_OG_IMAGE],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og-image.png'],
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
