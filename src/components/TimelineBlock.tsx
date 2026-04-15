'use client'

type Stage = {
  name: string
  cost: string
  span: number
  start: number
  ready?: boolean
  time?: string
}

type TimelineBlockProps = {
  title: string
  subtitle: string
  stages: Stage[]
  color: 'gray' | 'blue'
  timelinePoints?: number
  timeUnit?: 'month' | 'week'
}

function TimelineBlock({ title, subtitle, stages, color, timelinePoints = 10, timeUnit = 'month' }: TimelineBlockProps) {
  const getCardStyles = (stage: Stage) => {
    if (color === 'blue' && stage.start < 2) {
      return 'bg-blue-300 rounded-lg p-2 sm:p-3 flex flex-col justify-center h-44'
    }
    if (color === 'blue' && stage.ready) {
      return 'bg-gradient-to-r from-[#93d8ff] to-[#85afff] rounded-lg p-2 sm:p-3 flex flex-col justify-center h-44'
    }
    if (color === 'blue' && stage.start >= 2) {
      return 'bg-blue-300 rounded-lg p-2 sm:p-3 flex flex-col justify-center h-44'
    }
    return 'bg-slate-100 rounded-lg p-2 sm:p-3 flex flex-col justify-center h-44'
  }

  const getTextStyles = () => {
    if (color === 'blue') {
      return 'text-[#1e2939] font-medium'
    }
    return 'text-slate-900'
  }

  const getTitleColor = () => {
    return 'text-slate-900'
  }

  return (
    <div className="mb-16">
      <div className="max-w-6xl mx-auto mb-4">
        <div className="flex justify-between items-center">
          <h3 className={`text-lg font-subtitle font-semibold tracking-wide ${getTitleColor()}`}>
            {title}
          </h3>
          <p className="text-lg lg:text-xl leading-normal text-slate-600">{subtitle}</p>
        </div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto relative">
        <svg className="absolute bottom-0 left-0 w-full h-[40px] z-0">
          <line
            x1="0"
            y1="20"
            x2="100%"
            y2="20"
            stroke="white"
            strokeWidth="4"
          />
          {(() => {
            // Создаем массив позиций для кружочков на основе границ карточек
            const positions = new Set<number>();
            
            // Добавляем начальные позиции карточек
            stages.forEach(stage => {
              positions.add(stage.start);
              positions.add(stage.start + stage.span);
            });
            
            // max-w-6xl = 1152px, max-w-7xl = 1280px
            // Разница = 128px, по 64px с каждой стороны
            const contentWidth = 1152;
            const containerWidth = 1280;
            const offset = (containerWidth - contentWidth) / 2; // 64px
            
                         return Array.from(positions).sort((a, b) => a - b).map((position, index) => {
               // Позиция в процентах от общей ширины grid (10 колонок)
               const gridPosition = position / 10; // Делим на 10 колонок
               const contentX = gridPosition * contentWidth;
               const svgX = ((contentX + offset) / containerWidth) * 100;
               
               // Подсчитываем количество завершенных этапов до этой позиции
               const completedStages = stages.filter(stage => stage.start + stage.span <= position).length;
               
               // Пропускаем кружочки с нулем и кружочек 4 в первом таймлайне (WorkflowEngine)
               if (completedStages === 0 || (color === 'blue' && completedStages === 4)) {
                 return null;
               }
               
               return (
                 <g key={index}>
                   <circle cx={`${svgX}%`} cy="20" r="12" fill="white" />
                   <text
                     x={`${svgX}%`}
                     y="21"
                     textAnchor="middle"
                     dominantBaseline="middle"
                     fill="#0f172a"
                     fontSize="12"
                     fontWeight="bold"
                   >
                     {completedStages}
                   </text>
                 </g>
               )
             });
          })()}
        </svg>

        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-10 gap-1 pb-[40px]">
          {stages.map((stage, index) => (
            <div
              key={index}
              className={getCardStyles(stage)}
              style={{
                gridColumn: `${stage.start + 1} / span ${stage.span}`,
              }}
            >
              {stage.ready ? (
                <div className={`w-full text-left font-semibold text-base ${getTextStyles()}`}>Ready to use!</div>
              ) : (
                <div className="flex flex-col justify-between h-full">
                  <div className={`text-sm leading-tight ${getTextStyles()}`}>
                    {stage.name}
                  </div>
                  <div className="mt-auto">
                    <div className={`text-base sm:text-lg ${getTextStyles()}`}>
                      {stage.cost}
                    </div>
                    <div className={`text-sm mt-1 ${getTextStyles()}`}>
                      {stage.time || `${stage.span} ${stage.span === 1 ? timeUnit : timeUnit === 'week' ? 'weeks' : 'months'}`}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TimelineBlock;