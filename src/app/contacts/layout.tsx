import { Metadata } from 'next';
import { SITE_ORIGIN, SITE_NAME, DEFAULT_OG_IMAGE } from '@/utils/seo';

export const metadata: Metadata = {
  title: 'Contact Us - WorkflowEngine',
  description: 'Contact the WorkflowEngine team. We\'ll get back within 24 hours. Your information is kept confidential.',
  keywords: 'workflowengine contacts, support, sales',
  alternates: {
    canonical: `${SITE_ORIGIN}/contacts/`,
  },
  openGraph: {
    title: 'Contact Us - WorkflowEngine',
    description: 'Contact the WorkflowEngine team. We\'ll get back within 24 hours. Your information is kept confidential.',
    url: `${SITE_ORIGIN}/contacts/`,
    siteName: SITE_NAME,
    images: [{ ...DEFAULT_OG_IMAGE, alt: 'Contact WorkflowEngine' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - WorkflowEngine',
    description: 'Contact the WorkflowEngine team. We\'ll get back within 24 hours.',
    images: ['/images/og-image.png'],
  },
};

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
