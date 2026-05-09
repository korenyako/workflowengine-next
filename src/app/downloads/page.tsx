import type { Metadata } from 'next'
import HeroBlock from '@/components/HeroBlock'
import ContactCTABlock from '@/components/ContactCTABlock'

export const metadata: Metadata = {
  title: 'Downloads — Workflow Engine',
  description:
    'Download the latest Workflow Engine .NET / .NET Core build, Workflow Server, samples, and all NuGet packages.',
}

const LATEST_VERSION = '21.0.0'

const ENGINE_ZIP_URL = `https://workflowengine.io/downloads/assets/workflow-engine-net-${LATEST_VERSION}.zip`
const SAMPLE_ZIP_URL = `https://workflowengine.io/downloads/assets/workflow-engine-netcore-samples-${LATEST_VERSION}.zip`
const GITHUB_URL = 'https://github.com/optimajet/WorkflowEngine.NET'

const corePackage = { name: 'WorkflowEngine.NETCore-Core' }

const providerPackages = [
  { name: 'WorkflowEngine.NETCore-ProviderForMSSQL', purpose: 'Microsoft SQL Server persistence' },
  { name: 'WorkflowEngine.NETCore-ProviderForPostgreSQL', purpose: 'PostgreSQL persistence' },
  { name: 'WorkflowEngine.NETCore-ProviderForOracle', purpose: 'Oracle persistence' },
  { name: 'WorkflowEngine.NETCore-ProviderForMySQL', purpose: 'MySQL persistence' },
  { name: 'WorkflowEngine.NETCore-ProviderForMongoDB', purpose: 'MongoDB persistence' },
]

const designerPackages = [
  { name: '@optimajet/workflow-designer', purpose: 'Vanilla JS build', sample: 'https://github.com/optimajet/workflow-designer-javascript-sample' },
  { name: '@optimajet/workflow-designer-react', purpose: 'React wrapper', sample: 'https://github.com/optimajet/workflow-designer-react-sample' },
  { name: '@optimajet/workflow-designer-angular', purpose: 'Angular wrapper', sample: 'https://github.com/optimajet/workflow-designer-angular-sample' },
]

const SectionHeader = ({ title, description }: { subtitle?: string; title: string; description?: React.ReactNode }) => (
  <div className="max-w-6xl mx-auto text-center mb-12 px-4 sm:px-8">
    <h2 className="text-4xl lg:text-5xl xl:text-6xl font-heading text-slate-900 mb-6">{title}</h2>
    {description && <p className="text-xl text-slate-600">{description}</p>}
  </div>
)

const PackageCard = ({ name, purpose, registry, packageUrl }: {
  name: string
  purpose: string
  registry: string
  packageUrl: string
}) => (
  <a
    href={packageUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="group bg-slate-100 hover:bg-slate-200 transition-colors duration-200 rounded-3xl p-8 lg:p-10 flex flex-col gap-5"
  >
    <div>
      <div className="text-slate-900 font-semibold text-lg lg:text-xl break-all">{name}</div>
      <div className="text-base text-slate-600 mt-2">{purpose}</div>
    </div>
    <span className="self-start inline-flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-[#4286F4] text-[#4286F4] group-hover:bg-[#4286F4] group-hover:text-white rounded-full font-semibold text-base transition-colors duration-200">
      <svg className="w-5 h-5" viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g transform="translate(0,6)">
          <path d="M374.424959,454.856991 C327.675805,454.856991 289.772801,416.950177 289.772801,370.196324 C289.772801,323.463635 327.675805,285.535656 374.424959,285.535656 C421.174113,285.535656 459.077116,323.463635 459.077116,370.196324 C459.077116,416.950177 421.174113,454.856991 374.424959,454.856991 M205.565067,260.814741 C176.33891,260.814741 152.657469,237.109754 152.657469,207.901824 C152.657469,178.672728 176.33891,154.988907 205.565067,154.988907 C234.791225,154.988907 258.472666,178.672728 258.472666,207.901824 C258.472666,237.109754 234.791225,260.814741 205.565067,260.814741 M378.170817,95.6417786 L236.886365,95.6417786 C164.889705,95.6417786 106.479717,154.057639 106.479717,226.082702 L106.479717,367.360191 C106.479717,439.40642 164.889705,497.77995 236.886365,497.77995 L378.170817,497.77995 C450.209803,497.77995 508.577466,439.40642 508.577466,367.360191 L508.577466,226.082702 C508.577466,154.057639 450.209803,95.6417786 378.170817,95.6417786" />
          <path d="M84.6521577,46.0115787 C84.6521577,69.3990881 65.6900744,88.3419125 42.3260788,88.3419125 C18.9409203,88.3419125 0,69.3990881 0,46.0115787 C0,22.6452344 18.9409203,3.68124485 42.3260788,3.68124485 C65.6900744,3.68124485 84.6521577,22.6452344 84.6521577,46.0115787" />
        </g>
      </svg>
      {registry}
    </span>
  </a>
)

export default function DownloadsPage() {
  return (
    <>
      <HeroBlock title="Downloads" />

      {/* Workflow Engine — consolidated card */}
      <section className="pb-16">
        <div className="bg-slate-100 rounded-3xl p-10 sm:p-16 text-center mx-4 sm:mx-12 lg:mx-16 xl:mx-32 2xl:mx-64">
          <img
            src="/logos/workflowengine-square.svg"
            alt=""
            className="w-20 h-20 mx-auto mb-6"
          />
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-heading text-slate-900 mb-6">
            Workflow Engine v{LATEST_VERSION}
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-6xl mx-auto">
            Here you can download the Workflow Engine by Optimajet Limited to be integrated into your project as a library. This version is intended for{' '}
            <a
              href="https://docs.microsoft.com/en-us/dotnet/standard/net-standard?tabs=net-standard-2-0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4286F4] hover:text-[#2e6ad4] underline underline-offset-4 decoration-[#4286F4]/30 hover:decoration-[#4286F4] transition-colors"
            >
              .NET Standard 2.0
            </a>
            . With each release, major or minor, Workflow Engine is thoroughly tested and we guarantee its compatibility with .NET Core 2.1, .NET Core 3.1, .NET Framework 4.6.2 and .NET 6.0.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 text-base font-semibold">
            <a
              href={ENGINE_ZIP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#4286F4] text-[#4286F4] hover:bg-[#4286F4] hover:text-white rounded-full transition-colors duration-200"
            >
              Download .zip
            </a>
            <a
              href={`https://www.nuget.org/packages/${corePackage.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#4286F4] text-[#4286F4] hover:bg-[#4286F4] hover:text-white rounded-full transition-colors duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <g transform="translate(0,6)">
                  <path d="M374.424959,454.856991 C327.675805,454.856991 289.772801,416.950177 289.772801,370.196324 C289.772801,323.463635 327.675805,285.535656 374.424959,285.535656 C421.174113,285.535656 459.077116,323.463635 459.077116,370.196324 C459.077116,416.950177 421.174113,454.856991 374.424959,454.856991 M205.565067,260.814741 C176.33891,260.814741 152.657469,237.109754 152.657469,207.901824 C152.657469,178.672728 176.33891,154.988907 205.565067,154.988907 C234.791225,154.988907 258.472666,178.672728 258.472666,207.901824 C258.472666,237.109754 234.791225,260.814741 205.565067,260.814741 M378.170817,95.6417786 L236.886365,95.6417786 C164.889705,95.6417786 106.479717,154.057639 106.479717,226.082702 L106.479717,367.360191 C106.479717,439.40642 164.889705,497.77995 236.886365,497.77995 L378.170817,497.77995 C450.209803,497.77995 508.577466,439.40642 508.577466,367.360191 L508.577466,226.082702 C508.577466,154.057639 450.209803,95.6417786 378.170817,95.6417786" />
                  <path d="M84.6521577,46.0115787 C84.6521577,69.3990881 65.6900744,88.3419125 42.3260788,88.3419125 C18.9409203,88.3419125 0,69.3990881 0,46.0115787 C0,22.6452344 18.9409203,3.68124485 42.3260788,3.68124485 C65.6900744,3.68124485 84.6521577,22.6452344 84.6521577,46.0115787" />
                </g>
              </svg>
              NuGet
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#4286F4] text-[#4286F4] hover:bg-[#4286F4] hover:text-white rounded-full transition-colors duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Sample (on page background, not inside the Engine card) */}
      <section id="samples" className="pb-16 px-4 sm:px-8 text-center scroll-mt-24">
        <p className="text-lg text-slate-600 mb-5 max-w-6xl mx-auto">
          Looking for an integration sample? Ready-to-run ASP.NET Core MVC project (Visual Studio 2019+).
        </p>
        <a
          href={SAMPLE_ZIP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-7 py-3.5 border-2 border-[#4286F4] text-[#4286F4] hover:bg-[#4286F4] hover:text-white font-semibold rounded-full transition-colors duration-200 text-base"
        >
          Download .NET Core Sample .zip
        </a>
      </section>

      {/* Workflow Server */}
      <section className="py-16">
        <div className="bg-slate-100 rounded-3xl p-10 sm:p-16 text-center mx-4 sm:mx-12 lg:mx-16 xl:mx-32 2xl:mx-64">
          <img
            src="/logos/workflowserver-square.svg"
            alt=""
            className="w-20 h-20 mx-auto mb-6"
          />
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-heading text-slate-900 mb-6">
            Workflow Server
          </h2>
          <p className="text-xl text-slate-600 max-w-6xl mx-auto">
            If you have a microservice architecture and you need an admin panel to manage your workflows, please, have a look at{' '}
            <a
              href="/server/"
              className="text-[#4286F4] hover:text-[#2e6ad4] underline underline-offset-4 decoration-[#4286F4]/30 hover:decoration-[#4286F4] transition-colors"
            >
              Workflow Server
            </a>
            , which is a standalone application with an ability to be integrated via a REST API and works under Windows, Linux, and macOS.
          </p>
        </div>
      </section>

      {/* Workflow Engine Designer */}
      <section className="py-16">
        <SectionHeader
          title="Workflow Engine Designer"
          description={
            <>
              The Workflow Engine Designer is not delivered as a NuGet package — it ships as three NPM wrappers.
              <br />
              <a
                href="/documentation/main-terms/designer/#frontend"
                className="text-[#4286F4] hover:text-[#2e6ad4] underline underline-offset-4 decoration-[#4286F4]/30 hover:decoration-[#4286F4] transition-colors"
              >
                Read how to connect it here
              </a>
              .
            </>
          }
        />
        <div className="mx-4 sm:mx-12 lg:mx-16 xl:mx-32 2xl:mx-64 grid grid-cols-1 md:grid-cols-3 gap-6">
            {designerPackages.map((p) => (
              <div key={p.name} className="group/card bg-slate-100 rounded-3xl p-8 lg:p-10 flex flex-col gap-5">
                <div>
                  <div className="text-slate-900 font-semibold text-lg lg:text-xl break-all">{p.name.replace(/^@optimajet\//, '')}</div>
                  <div className="text-base text-slate-600 mt-2">{p.purpose}</div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`https://www.npmjs.com/package/${p.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-[#4286F4] text-[#4286F4] hover:bg-[#4286F4] hover:text-white rounded-full font-semibold text-base transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0H1.763zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113L5.13 5.323z" />
                    </svg>
                    npm
                  </a>
                  <a
                    href={p.sample}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-[#4286F4] text-[#4286F4] hover:bg-[#4286F4] hover:text-white rounded-full font-semibold text-base transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Database Providers */}
      <section className="py-16">
        <SectionHeader
          title="Database Providers"
          description={
            <>
              Persistence providers for the Workflow Engine — pick the one matching your storage.
              <br />
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
        <div className="mx-4 sm:mx-12 lg:mx-16 xl:mx-32 2xl:mx-64 grid grid-cols-1 md:grid-cols-2 gap-6">
          {providerPackages.map((p) => (
            <PackageCard
              key={p.name}
              name={p.name}
              purpose={p.purpose}
              registry="NuGet"
              packageUrl={`https://www.nuget.org/packages/${p.name}`}
            />
          ))}
        </div>
      </section>

      <div className="mx-4 sm:mx-12 lg:mx-16 xl:mx-32 2xl:mx-64">
        <ContactCTABlock
          title="Need an enterprise build?"
          description="Our team can help with licensing, custom packaging, and long-term support."
          buttonText="Contact Sales"
          buttonHref="/contacts/"
        />
      </div>
    </>
  )
}
