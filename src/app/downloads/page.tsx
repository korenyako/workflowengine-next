import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Downloads — Workflow Engine',
  description:
    'Download the latest Workflow Engine .NET / .NET Core build, Workflow Server, samples, and all NuGet packages.',
}

const LATEST_VERSION = '20.0.8'
const RELEASE_DATE = '2026-01-04'

const builds = [
  {
    name: 'Workflow Engine for .NET / .NET Core',
    version: LATEST_VERSION,
    date: RELEASE_DATE,
    href: 'https://workflowengine.io/downloads/net-core/',
    description: 'Cross-platform build targeting .NET Core 3.1+ and .NET 6 / 8 / 9.',
  },
  {
    name: '.NET Core Sample',
    version: LATEST_VERSION,
    date: RELEASE_DATE,
    href: 'https://workflowengine.io/downloads/net-core-sample/',
    description: 'Ready-to-run sample project demonstrating Workflow Engine integration.',
  },
  {
    name: 'Workflow Server',
    version: LATEST_VERSION,
    date: RELEASE_DATE,
    href: 'https://workflowengine.io/downloads/workflow-server/',
    description: 'Stand-alone REST-API application. Windows / Linux / macOS / Docker.',
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

export default function DownloadsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-semibold text-slate-900 mb-4 leading-snug">
            Downloads
          </h1>
          <h3 className="text-lg sm:text-xl text-blue-600 mb-8 font-subtitle font-semibold">
            Latest builds, samples, and packages
          </h3>
          <p className="text-xl text-slate-600">
            Current version: <span className="font-mono font-semibold text-slate-900">{LATEST_VERSION}</span> · released {RELEASE_DATE}
          </p>
        </div>
      </section>

      {/* Builds table */}
      <section className="py-12 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-lg font-subtitle font-semibold tracking-wide text-blue-600 mb-2">Binaries</h3>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900">Product downloads</h2>
          </div>
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-900 text-sm uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Version</th>
                  <th className="px-6 py-4">Released</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {builds.map((b) => (
                  <tr key={b.name} className="border-t border-slate-200">
                    <td className="px-6 py-5 align-top">
                      <div className="font-semibold text-slate-900">{b.name}</div>
                      <div className="text-sm text-slate-600 mt-1">{b.description}</div>
                    </td>
                    <td className="px-6 py-5 align-top font-mono text-slate-700">{b.version}</td>
                    <td className="px-6 py-5 align-top text-slate-700">{b.date}</td>
                    <td className="px-6 py-5 align-top text-right">
                      <a
                        href={b.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* NuGet */}
      <section className="py-12 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-lg font-subtitle font-semibold tracking-wide text-blue-600 mb-2">NuGet packages</h3>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900">Core library & providers</h2>
            <p className="text-lg text-slate-600 mt-4">
              All packages are published to{' '}
              <a
                href="https://www.nuget.org/profiles/OptimaJet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                nuget.org/profiles/OptimaJet
              </a>
              .
            </p>
          </div>
          <ul className="space-y-3">
            {nugetPackages.map((p) => (
              <li
                key={p.name}
                className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-6 py-4"
              >
                <div>
                  <code className="font-mono text-slate-900 font-semibold">{p.name}</code>
                  <div className="text-sm text-slate-600 mt-1">{p.purpose}</div>
                </div>
                <a
                  href={`https://www.nuget.org/packages/${p.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                >
                  View on NuGet →
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Designer npm */}
      <section className="py-12 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-lg font-subtitle font-semibold tracking-wide text-blue-600 mb-2">Designer</h3>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900">Designer frontend packages</h2>
            <p className="text-lg text-slate-600 mt-4">
              Embed the Workflow Designer directly in your web application.
            </p>
          </div>
          <ul className="space-y-3">
            {designerPackages.map((p) => (
              <li
                key={p.name}
                className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-6 py-4"
              >
                <div>
                  <code className="font-mono text-slate-900 font-semibold">{p.name}</code>
                  <div className="text-sm text-slate-600 mt-1">{p.purpose}</div>
                </div>
                <a
                  href={`https://www.npmjs.com/package/${p.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                >
                  View on npm →
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl lg:text-3xl font-heading font-bold text-slate-900 mb-4">
            Need an enterprise build or custom packaging?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Our team can help with licensing, installation, and long-term support.
          </p>
          <a
            href="/contacts/"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Sales
          </a>
        </div>
      </section>
    </>
  )
}
