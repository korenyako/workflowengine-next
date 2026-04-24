import type { Metadata } from 'next'
import { DM_Sans, Inter, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { SITE_ORIGIN, SITE_NAME, DEFAULT_OG_IMAGE } from '@/utils/seo'
import GTMScript from '@/components/GTMScript'

const GTM_ID = 'GTM-PPS66XRX'

// Шрифты с next/font для оптимальной загрузки
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

const dmSans = DM_Sans({
  axes: ['opsz'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: 'WorkflowEngine - Workflow Automation Engine for .NET',
  description: 'WorkflowEngine is a lightweight, cross-platform workflow engine for .NET applications. Automate business processes with a visual designer.',
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      data-mantine-color-scheme="light"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'OptimaJet',
              url: SITE_ORIGIN,
              logo: `${SITE_ORIGIN}/logos/workflowengine.svg`,
              sameAs: [
                'https://www.linkedin.com/company/optimajet',
                'https://www.nuget.org/packages/OptimaJet.WorkflowEngine.Core',
                'https://www.trustpilot.com/review/optimajet.com',
                'https://www.g2.com/sellers/optimajet',
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900 antialiased font-sans" suppressHydrationWarning>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
        <GTMScript gtmId={GTM_ID} />
      </body>
    </html>
  )
}
