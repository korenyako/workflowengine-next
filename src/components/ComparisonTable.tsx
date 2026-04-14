'use client'

const comparisonData = [
  {
    feature: 'Setup time',
    formEngine: true,
    inHouse: false,
    formEngineText: 'Plug-and-play with modern React frameworks like Next.js or Remix',
    inHouseText: 'Weeks or months — architecture, UI system, state handling, tooling'
  },
  {
    feature: 'Cost',
    formEngine: true,
    inHouse: false,
    formEngineText: 'Transparent licensing, no per-user fees',
    inHouseText: 'Dev cost + UI library licenses + maintenance overhead'
  },
  {
    feature: 'Form builder UI',
    formEngine: true,
    inHouse: false,
    formEngineText: 'Ready-made visual editor with live preview and reusable field templates',
    inHouseText: 'Must be designed and built from scratch, including layout logic'
  },
  {
    feature: 'Custom logic',
    formEngine: true,
    inHouse: false,
    formEngineText: 'UI for defining actions, conditions, visibility, validation',
    inHouseText: 'You must write custom JS logic for every interaction'
  },
  {
    feature: 'Custom components',
    formEngine: true,
    inHouse: false,
    formEngineText: 'Easily integrate your own field types via config or code',
    inHouseText: 'Requires building extensibility system yourself'
  },
  {
    feature: 'Collaboration',
    formEngine: true,
    inHouse: false,
    formEngineText: 'Can be embedded into internal tools — access control handled by your app',
    inHouseText: 'No native collaboration — must implement team workflows and permissions manually'
  },
  {
    feature: 'Localization',
    formEngine: true,
    inHouse: false,
    formEngineText: 'Visual i18n editor for translating labels and descriptions',
    inHouseText: 'Manual implementation of i18n and translation tooling'
  },
  {
    feature: 'Schema portability',
    formEngine: true,
    inHouse: false,
    formEngineText: 'JSON schema output is fully portable and compatible across apps and environments',
    inHouseText: 'Often tightly coupled to app structure, difficult to reuse or move between systems'
  },
  {
    feature: 'Backend-driven support',
    formEngine: true,
    inHouse: false,
    formEngineText: 'Forms can be loaded, modified, or generated entirely from the backend',
    inHouseText: 'Most solutions are tightly bound to frontend logic and static structure'
  },
  {
    feature: 'Time to market',
    formEngine: true,
    inHouse: false,
    formEngineText: '2–3× faster — build, preview, and iterate directly in the browser',
    inHouseText: 'Long cycles — requires full UI/UX dev + syncing with backend logic'
  }
]

// Функция для рендеринга иконок
const renderIcon = (value: boolean) => {
  return value ? (
    <svg 
      className="w-6 h-6 text-green-400" 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M5 12l5 5l10 -10" />
    </svg>
  ) : (
    <svg 
      className="w-6 h-6 text-red-400" 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  )
}

export function ComparisonTable() {
  return (
    <section className="py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12">
                     <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
             Feature-by-Feature Comparison — Drag & Drop Form Designer
           </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            See how WorkflowEngine Designer compares to building forms from scratch or using other solutions
          </p>
        </div>

        {/* Таблица для десктопа */}
        <div className="hidden lg:block">
                     <div className="bg-white/5 rounded-lg overflow-hidden">
            {/* Заголовок таблицы */}
                         <div className="grid grid-cols-3">
              <div className="px-6 py-4">
                <h3 className="text-lg font-semibold text-slate-900">Feature</h3>
              </div>
                             <div className="px-6 py-4 bg-blue-500/10">
                 <h3 className="text-lg font-subtitle font-semibold text-blue-600">WorkflowEngine</h3>
               </div>
               <div className="px-6 py-4">
                 <h3 className="text-lg font-semibold text-slate-900">Other solutions</h3>
               </div>
            </div>

            {/* Строки данных */}
            {comparisonData.map((row, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-3 ${
                  index % 2 === 0 ? 'bg-white/5' : 'bg-white/2'
                }`}
              >
                                                  <div className="px-6 py-4">
                   <p className="text-slate-600 font-normal">{row.feature}</p>
                 </div>
                 <div className="px-6 py-4 bg-blue-500/5">
                  <div className="flex items-start gap-3">
                    {renderIcon(row.formEngine)}
                    <p className="text-slate-700 text-sm">{row.formEngineText}</p>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    {renderIcon(row.inHouse)}
                    <p className="text-slate-700 text-sm">{row.inHouseText}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Мобильная версия */}
        <div className="lg:hidden space-y-6">
          {comparisonData.map((row, index) => (
                         <div key={index} className="bg-white/5 rounded-lg p-4">
                             <h3 className="text-lg font-normal text-slate-900 mb-4">{row.feature}</h3>
              
              <div className="space-y-3">
                                 <div className="bg-blue-500/10 rounded-lg p-3">
                   <p className="text-sm font-medium text-blue-600 mb-1">WorkflowEngine</p>
                   <div className="flex items-start gap-2">
                     {renderIcon(row.formEngine)}
                     <p className="text-slate-700 text-sm">{row.formEngineText}</p>
                   </div>
                 </div>
                 
                 <div className="bg-white/5 rounded-lg p-3">
                   <p className="text-sm font-medium text-slate-600 mb-1">Other solutions</p>
                  <div className="flex items-start gap-2">
                    {renderIcon(row.inHouse)}
                    <p className="text-slate-700 text-sm">{row.inHouseText}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 