import { Metadata } from 'next';
import { SITE_ORIGIN, SITE_NAME, DEFAULT_OG_IMAGE } from '@/utils/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy — WorkflowEngine',
  description: 'How OptimaJet Limited collects, uses, and protects personal information on the WorkflowEngine site and services.',
  alternates: {
    canonical: `${SITE_ORIGIN}/agreements/policy/`,
  },
  openGraph: {
    title: 'Privacy Policy — WorkflowEngine',
    description: 'How OptimaJet Limited collects, uses, and protects personal information.',
    url: `${SITE_ORIGIN}/agreements/policy/`,
    siteName: SITE_NAME,
    images: [DEFAULT_OG_IMAGE],
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
