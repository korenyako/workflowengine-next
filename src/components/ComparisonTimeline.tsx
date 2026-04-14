'use client'

export function ComparisonTimeline() {
  const timelinePoints = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

  const inHouseStages = [
    { name: 'Research APIs', cost: '$10,000', span: 1, start: 0 },
    { name: 'Design UX/UI', cost: '$10,000', span: 1, start: 1 },
    { name: 'Develop frontend', cost: '$20,000', span: 2, start: 2 },
    { name: 'Develop backend', cost: '$50,000', span: 2, start: 4 },
    { name: 'Build oAuth & mapping', cost: '$50,000', span: 2, start: 6 },
    { name: 'Troubleshoot & maintain APIs', cost: '$10,000', span: 1, start: 8 },
  ]

  const designerStages = [
    { name: 'Choose components & install', cost: '$0', span: 1, start: 0 },
    { name: 'Build & publish with Designer', cost: '$0', span: 1, start: 1 },
    { name: 'Ready to use!', cost: '', span: 7, start: 2, ready: true },
  ]

  return (
    <section className="pt-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Building integrations in-house?<br />Think twice.
            </h2>
          </div>
        </div>

        {/* In-house Development Row */}
        <div className="max-w-6xl mx-auto">
          <div className="mb-0">
                          <div className="flex justify-between items-center mb-4">
                <h3 className="text-slate-900 text-lg font-subtitle font-semibold tracking-wide">In-house Development</h3>
              <p className="text-lg lg:text-xl leading-normal text-slate-600">~9 months / ~$150,000</p>
            </div>
            <div className="grid grid-cols-9 gap-1">
              {inHouseStages.map((stage, index) => (
                                  <div
                    key={index}
                    className="bg-slate-100 rounded-lg p-2 sm:p-3 flex flex-col justify-center h-32"
                    style={{
                      gridColumn: `${stage.start + 1} / span ${stage.span}`,
                    }}
                  >
                  <div className="text-slate-900 text-sm font-normal leading-tight">
                    {stage.name}
                  </div>
                  <div className="text-slate-900 text-base sm:text-lg font-normal mt-1">
                    {stage.cost}
                  </div>
                  <div className="text-slate-900 text-sm font-normal mt-1">
                    {stage.span} {stage.span === 1 ? 'month' : 'months'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

                 {/* SVG Timeline - между двумя строками */}
         <div className="mb-0">
           <div className="relative -mt-8" style={{height: '80px'}}>
             {/* SVG Timeline */}
             <svg width="100%" height="80" className="absolute top-0 left-0">
               {/* Линия */}
               <line 
                 x1="0" 
                 y1="30" 
                 x2="100%" 
                 y2="30" 
                 stroke="white" 
                 strokeWidth="4"
               />
               {/* Кружочки */}
               
               {/* Кружочки с цифрами */}
               {timelinePoints.map((point, index) => {
                 // Выравниваем кружки относительно max-w-6xl контента
                 // max-w-6xl = 1152px, max-w-7xl = 1280px
                 // Разница = 128px, по 64px с каждой стороны
                 // Позиция в процентах от max-w-7xl
                 const contentWidth = 1152;
                 const containerWidth = 1280;
                 const offset = (containerWidth - contentWidth) / 2; // 64px
                 const contentX = (index + 1) / 9 * contentWidth;
                 const svgX = ((contentX + offset) / containerWidth) * 100;
                 
                 return (
                   <g key={point}>
                     <circle
                       cx={`${svgX}%`}
                       cy="30"
                       r="12"
                       fill="white"
                     />
                     <text
                       x={`${svgX}%`}
                       y="31"
                       textAnchor="middle"
                       dominantBaseline="middle"
                       fill="#0f172a"
                       fontSize="12"
                       fontWeight="bold"
                     >
                       {point}
                     </text>
                   </g>
                 );
               })}
             </svg>
           </div>
         </div>

        {/* WorkflowEngine Designer Row */}
        <div className="max-w-6xl mx-auto">
          <div className="mb-0">
            <div className="grid grid-cols-9 gap-1 -mt-12">
              {designerStages.map((stage, index) => (
                <div
                  key={index}
                  className={`rounded-lg p-2 sm:p-3 flex flex-col justify-center h-32 ${
                    stage.ready
                      ? 'bg-gradient-to-l from-purple-300 to-blue-300 text-gray-800'
                      : 'bg-blue-300'
                  }`}
                  style={{
                    gridColumn: `${stage.start + 1} / span ${stage.span}`,
                  }}
                >
                  {stage.ready ? (
                    <div className="w-full text-left font-semibold">Ready to use!</div>
                  ) : (
                    <>
                      <div className="text-gray-800 text-sm font-normal leading-tight">
                        {stage.name}
                      </div>
                      <div className="text-gray-800 text-base sm:text-lg font-normal mt-1">
                        {stage.cost}
                      </div>
                      <div className="text-gray-800 text-sm font-normal mt-1">
                        {stage.span} {stage.span === 1 ? 'month' : 'months'}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4">
              <h3 className="text-blue-600 text-lg font-subtitle font-semibold tracking-wide">WorkflowEngine Designer</h3>
              <p className="text-lg lg:text-xl leading-normal text-slate-600">~2 months / from $0</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 