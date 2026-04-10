import React from 'react';

interface BundleRow {
  name: string;
  description: string;
  raw: number;
  gzip: number;
  highlighted?: boolean;
}

interface WhyItMattersItem {
  text: string;
}

interface BundleSizeTableBlockProps {
  title?: string;
  caption?: string;
  bundles?: BundleRow[];
  whyItMatters?: WhyItMattersItem[];
  blockBg?: string;
}

const defaultBundles: BundleRow[] = [
  {
    name: 'WorkflowEngine Core',
    description: 'WorkflowEngine Core + MUI',
    raw: 618.80,
    gzip: 188.54,
    highlighted: true,
  },
  {
    name: 'React JSON Schema Form',
    description: 'RJSF + MUI',
    raw: 721.54,
    gzip: 231.62,
  },
  {
    name: 'SurveyJS',
    description: 'survey-react + MUI',
    raw: 1470,
    gzip: 391.72,
  },
];

const defaultWhyItMatters: WhyItMattersItem[] = [
  { text: 'Better Lighthouse scores' },
  { text: 'Faster route transitions' },
  { text: 'Lower JS cost on mobile' },
];

const BundleSizeTableBlock: React.FC<BundleSizeTableBlockProps> = ({
  title = 'WorkflowEngine Core - Smaller Bundle, Faster Apps',
  caption = 'Bundle sizes are approximate and depend on build config, tree-shaking, and selected features.',
  bundles = defaultBundles,
  whyItMatters = defaultWhyItMatters,
  blockBg,
}) => {
  const maxGzip = Math.max(...bundles.map(b => b.gzip));

  return (
    <section className="py-16 lg:py-24 px-4 sm:px-8" style={{ backgroundColor: blockBg }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-white mb-4 text-center">
          {title}
        </h2>
        <p className="text-lg lg:text-xl text-gray-200 text-center mb-12 max-w-5xl mx-auto">
          WorkflowEngine Core is a lightweight React form library with tree-shaking support for MUI components. At just 188 KB (with MUI), it&apos;s significantly smaller than alternatives like SurveyJS (391 KB) and React JSON Schema Form (231 KB). Reduce your bundle size without sacrificing dynamic form capabilities.
        </p>

        <div className="flex flex-col gap-8">
          {/* Bar chart */}
          <div className="w-full space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between text-sm font-semibold text-gray-400 uppercase tracking-wider">
              <span>Library</span>
              <div className="flex gap-8">
                <span className="w-24 text-right">Raw</span>
                <span className="w-24 text-right">Gzip</span>
              </div>
            </div>

            {bundles.map((bundle) => {
              const barPercent = (bundle.gzip / maxGzip) * 100;

              return (
                <div key={bundle.name}>
                  {/* Label row */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-semibold ${bundle.highlighted ? 'text-white' : 'text-gray-400'}`}>
                      {bundle.name}
                    </span>
                    <div className="flex gap-8">
                      <span className={`w-24 text-right font-mono text-sm ${bundle.highlighted ? 'font-semibold text-purple-400' : 'text-gray-400'}`}>
                        {bundle.raw.toFixed(2)} KB
                      </span>
                      <span className={`w-24 text-right font-mono text-sm ${bundle.highlighted ? 'font-semibold text-purple-400' : 'text-gray-400'}`}>
                        {bundle.gzip.toFixed(2)} KB
                      </span>
                    </div>
                  </div>

                  {/* Thick bar */}
                  <div className="relative h-10 bg-gray-700/50 rounded-lg overflow-hidden">
                    <div
                      className={`absolute inset-y-0 left-0 rounded-lg transition-all duration-500 ${
                        bundle.highlighted
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                          : 'bg-gradient-to-r from-slate-700 to-slate-600'
                      }`}
                      style={{ width: `${barPercent}%` }}
                    />
                    {/* Description inside bar */}
                    <div className="absolute inset-0 flex items-center px-4">
                      <span className={`text-sm truncate ${barPercent > 30 ? 'text-white' : 'text-gray-400'}`}>
                        {bundle.description}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Caption */}
            <p className="mt-2 text-sm text-gray-500">
              {caption}
            </p>
          </div>

          {/* Why it matters — below */}
          <div className="w-full">
            <div className="rounded-xl bg-gray-800/40 p-6 text-center">
              <h3 className="text-blue-300 text-base font-subtitle font-semibold tracking-wide mb-5">
                Why it matters
              </h3>
              <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                {whyItMatters.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300 text-lg leading-snug">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BundleSizeTableBlock;
