import type { Metadata } from 'next'
import HeroBlock from '@/components/HeroBlock'
import ContactCTABlock from '@/components/ContactCTABlock'

export const metadata: Metadata = {
  title: 'Downloads — Workflow Engine',
  description:
    'Download the latest Workflow Engine .NET / .NET Core build, Workflow Server, samples, and all NuGet packages.',
}

const LATEST_VERSION = '21.0.0'
const RELEASE_DATE = '24/04/2026'

const builds = [
  {
    name: 'WorkflowEngine .NET Core',
    href: `https://workflowengine.io/downloads/assets/workflow-engine-net-${LATEST_VERSION}.zip`,
    description: 'Built for .NET Standard 2.0 — runs on .NET Core 2.1, 3.1, .NET 6/8/9, and .NET Framework 4.6.2+.',
  },
  {
    name: '.NET Core Sample',
    href: `https://workflowengine.io/downloads/assets/workflow-engine-netcore-samples-${LATEST_VERSION}.zip`,
    description: 'Ready-to-run sample project demonstrating Workflow Engine integration. Visual Studio 2019+.',
  },
]

const nugetPackages = [
  { name: 'WorkflowEngine.NETCore-Core', purpose: 'Core library' },
  { name: 'WorkflowEngine.NETCore-ProviderForMSSQL', purpose: 'Microsoft SQL Server persistence' },
  { name: 'WorkflowEngine.NETCore-ProviderForPostgreSQL', purpose: 'PostgreSQL persistence' },
  { name: 'WorkflowEngine.NETCore-ProviderForOracle', purpose: 'Oracle persistence' },
  { name: 'WorkflowEngine.NETCore-ProviderForMySQL', purpose: 'MySQL persistence' },
  { name: 'WorkflowEngine.NETCore-ProviderForMongoDB', purpose: 'MongoDB persistence' },
]

const designerPackages = [
  { name: '@optimajet/workflow-designer', purpose: 'Vanilla JS build' },
  { name: '@optimajet/workflow-designer-react', purpose: 'React wrapper' },
  { name: '@optimajet/workflow-designer-angular', purpose: 'Angular wrapper' },
]

const SectionHeader = ({ subtitle, title, description }: { subtitle: string; title: string; description?: React.ReactNode }) => (
  <div className="max-w-6xl mx-auto text-center mb-12">
    <h3 className="text-sm uppercase tracking-[0.2em] font-mono font-medium text-[#4286F4] mb-4">{subtitle}</h3>
    <h2 className="text-4xl lg:text-5xl xl:text-6xl font-heading text-slate-900 mb-6">{title}</h2>
    {description && <p className="text-xl text-slate-600">{description}</p>}
  </div>
)

const PackageCard = ({ name, purpose, registry, registryUrl, packageUrl }: {
  name: string
  purpose: string
  registry: string
  registryUrl: string
  packageUrl: string
}) => (
  <a
    href={packageUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="group bg-slate-100 hover:bg-slate-200 transition-colors duration-200 rounded-3xl p-6 flex items-center justify-between gap-4"
  >
    <div className="min-w-0 flex-1">
      <span className="text-slate-900 font-semibold text-base break-all">{name}</span>
      <div className="text-sm text-slate-600 mt-1">{purpose}</div>
    </div>
    <span className="text-sm font-semibold text-[#4286F4] flex-shrink-0 inline-flex items-center gap-1">
      View on {registry}
      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
    </span>
  </a>
)

export default function DownloadsPage() {
  return (
    <>
      <HeroBlock
        title="Downloads"
        description={
          <>
            Latest builds, samples, and packages.
            <br />
            Current version: <span className="font-mono font-semibold text-slate-900">{LATEST_VERSION}</span> · released {RELEASE_DATE}
          </>
        }
      />

      {/* Binaries */}
      <section className="py-16 px-4 sm:px-8">
        <SectionHeader
          subtitle="Binaries"
          title="Product downloads"
          description="Pick a build and grab the installer."
        />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {builds.map((b) => (
            <div
              key={b.name}
              className="bg-slate-100 rounded-3xl p-8 flex flex-col h-full"
            >
              <h3 className="text-2xl font-heading text-slate-900 mb-3">{b.name}</h3>
              <p className="text-base text-slate-600 mb-6 flex-grow">{b.description}</p>
              <div className="flex items-baseline gap-3 mb-6 text-sm">
                <span className="font-semibold text-slate-900">v{LATEST_VERSION}</span>
                <span className="text-slate-500">released {RELEASE_DATE}</span>
              </div>
              <a
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#4286F4] hover:bg-[#2e6ad4] text-white font-semibold rounded-full transition-colors duration-200"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* NuGet */}
      <section className="py-16 px-4 sm:px-8">
        <SectionHeader
          subtitle="NuGet packages"
          title="Core library & providers"
          description={
            <>
              All packages are published to{' '}
              <a
                href="https://www.nuget.org/profiles/OptimaJet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4286F4] hover:text-[#2e6ad4] underline underline-offset-4 decoration-[#4286F4]/30 hover:decoration-[#4286F4] transition-colors"
              >
                nuget.org/profiles/OptimaJet
              </a>
              .
            </>
          }
        />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {nugetPackages.map((p) => (
            <PackageCard
              key={p.name}
              name={p.name}
              purpose={p.purpose}
              registry="NuGet"
              registryUrl="https://www.nuget.org/"
              packageUrl={`https://www.nuget.org/packages/${p.name}`}
            />
          ))}
        </div>
      </section>

      {/* Designer npm */}
      <section className="py-16 px-4 sm:px-8">
        <SectionHeader
          subtitle="Designer"
          title="Designer frontend packages"
          description="Embed the Workflow Designer directly in your web application."
        />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {designerPackages.map((p) => (
            <PackageCard
              key={p.name}
              name={p.name}
              purpose={p.purpose}
              registry="npm"
              registryUrl="https://www.npmjs.com/"
              packageUrl={`https://www.npmjs.com/package/${p.name}`}
            />
          ))}
        </div>
      </section>

      {/* Source code */}
      <section className="py-16 px-4 sm:px-8">
        <SectionHeader
          subtitle="Source code"
          title="Browse the repository"
          description="Source, samples, and release tags live on GitHub."
        />
        <div className="max-w-6xl mx-auto">
          <a
            href="https://github.com/optimajet/WorkflowEngine.NET"
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-slate-100 hover:bg-slate-200 transition-colors duration-200 rounded-3xl p-8 flex items-center justify-between gap-6"
          >
            <div className="min-w-0">
              <div className="text-slate-900 font-semibold text-lg">optimajet/WorkflowEngine.NET</div>
              <div className="text-sm text-slate-600 mt-1">github.com</div>
            </div>
            <span className="text-sm font-semibold text-[#4286F4] flex-shrink-0 inline-flex items-center gap-1">
              View on GitHub
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </span>
          </a>
        </div>
      </section>

      <ContactCTABlock
        title="Need an enterprise build?"
        description="Our team can help with licensing, custom packaging, and long-term support."
        buttonText="Contact Sales"
        buttonHref="/contacts/"
      />
    </>
  )
}
