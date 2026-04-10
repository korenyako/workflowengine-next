import React from "react";
import CodePreview from "./CodePreview";
import ContainerIcon from './icons/ContainerIcon';
import RepeaterIcon from './icons/RepeaterIcon';
import QrCodeIcon from './icons/QrCodeIcon';
import GoogleMapIcon from './icons/GoogleMapIcon';
import RichTextEditorIcon from './icons/RichTextEditorIcon';
import SignatureIcon from './icons/SignatureIcon';
import DataGridIcon from './icons/DataGridIcon';

interface ChipItem {
  label: string;
  url: string;
}

interface WorkflowEngineComponent {
  name: string;
  description?: string;
  chips?: ChipItem[];
  documentationUrl: string;
  icon?: string | React.ComponentType<{ size?: number }>;
  npmCommand?: string;
  showIcon?: boolean;
}

interface WorkflowEngineComponentsBlockProps {
  title?: string;
  subtitle?: string;
  description?: string;
  components: WorkflowEngineComponent[];
  blockBg?: string;
  extraBottomPadding?: boolean;
  anchor?: string;
}

const WorkflowEngineComponentsBlock: React.FC<WorkflowEngineComponentsBlockProps> = ({
  title,
  subtitle,
  description,
  components,
  blockBg,
  extraBottomPadding,
  anchor
}) => {
  // Определяем цвета текста на основе фона
  const isLightBg = blockBg === 'white' || blockBg === '#ffffff' || blockBg === '#f8fafc';
  const textColor = isLightBg ? 'text-gray-900' : 'text-white';
  const subtitleColor = 'text-blue-300';
  const descriptionColor = isLightBg ? 'text-gray-600' : 'text-gray-300';

  // CSS для градиентного текста
  const gradientTextStyle = {
    background: 'linear-gradient(to right, #93d8ff, #85afff)',
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    backgroundClip: 'text' as const,
  };

  // Раньше маппились пути на RemixIcon. Теперь используем напрямую SVG из /public/icons или React-компоненты.

  // Функция для получения React компонента иконки по имени
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ size?: number }> } = {
      'ContainerIcon': ContainerIcon,
      'RepeaterIcon': RepeaterIcon,
      'QrCodeIcon': QrCodeIcon,
      'GoogleMapIcon': GoogleMapIcon,
      'RichTextEditorIcon': RichTextEditorIcon,
      'SignatureIcon': SignatureIcon,
      'DataGridIcon': DataGridIcon,
    };
    return iconMap[iconName];
  };

  // Функция для получения класса контейнера в зависимости от размера иконки
  const getIconContainerClass = (size: number) => {
    switch (size) {
      case 16: return 'w-4 h-4';
      case 24: return 'w-6 h-6';
      case 32: return 'w-8 h-8';
      case 48: return 'w-12 h-12';
      default: return 'w-6 h-6';
    }
  };

  // Определяем количество колонок в зависимости от количества компонентов
  const getGridCols = () => {
    if (components.length <= 2) {
      return 'grid-cols-1 md:grid-cols-2';
    } else if (components.length === 3) {
      return 'grid-cols-1 md:grid-cols-3';
    } else {
      return 'grid-cols-1 md:grid-cols-2';
    }
  };

  return (
    <section 
      className={`py-8 lg:py-12 ${extraBottomPadding ? 'pb-16 lg:pb-24' : ''}`} 
      style={{ 
        backgroundColor: blockBg,
        ...(anchor ? { scrollMarginTop: '100px' } : {})
      }}
      id={anchor}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Заголовок секции */}
        {(title || subtitle) && (
          <div className="text-center mb-12 lg:mb-16">
            {subtitle && (
              <h3 className={`text-lg font-subtitle font-semibold tracking-wide ${subtitleColor} mb-4`}>
                {subtitle}
              </h3>
            )}
            {title && (
              <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-heading font-bold ${textColor} mb-6`}>
                {title}
              </h2>
            )}
            {description && (
              <p className={`text-lg lg:text-xl ${descriptionColor} max-w-4xl mx-auto leading-relaxed`}>
                {description}
              </p>
            )}
          </div>
        )}

                 {/* Компоненты */}
                   <div className={`grid ${getGridCols()} gap-8`}>
           {components.map((component, index) => (
             <div key={index} className="group">
                               <div id={`component-${component.name.toLowerCase().replace(/\s+/g, '-')}`} className={`block h-full p-6 lg:p-8 rounded-xl ${isLightBg ? 'bg-white/50' : 'bg-gray-800/50'}`} style={{ scrollMarginTop: '100px' }}>
                <div className="h-full flex flex-col">
                  {/* Заголовок с иконкой */}
                  <div className="flex items-center gap-3 mb-4">
                    {/* Иконка компонента */}
                    {component.icon && (
                      <div className="flex-shrink-0">
                        {typeof component.icon === 'string' ? (
                          component.icon.startsWith("/") ? (
                <img src={component.icon} alt="" className="w-6 h-6" />
                          ) : getIconComponent(component.icon) ? (
                            <div className="w-6 h-6">
                              {React.createElement(getIconComponent(component.icon) as React.ComponentType<any>, { size: 20 })}
                            </div>
                          ) : (
                            <span className="text-2xl">{component.icon}</span>
                          )
                        ) : (
                          <div className="w-6 h-6">
                            {React.createElement(component.icon as React.ComponentType<any>, { size: 20 })}
                          </div>
                        )}
                      </div>
                    )}
                    <h3 className={`text-base font-subtitle font-semibold tracking-wide text-blue-300 whitespace-pre-wrap break-words`}>
                      {component.name}
                    </h3>
                  </div>
                  {/* Description - render as chips, bullet list, or plain text */}
                  {component.chips ? (
                    <div className="flex flex-wrap gap-2 flex-grow mt-2 mb-6 items-start content-start">
                      {component.chips.map((chip, idx) => (
                        <a
                          key={idx}
                          href={chip.url}
                          {...(chip.url.startsWith('https://workflowengine.io/') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                          className={`px-3 py-2 rounded-md text-base font-mono transition-colors ${
                            isLightBg
                              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              : 'bg-gray-700/50 text-blue-300 hover:bg-gray-600/50 hover:text-blue-200'
                          }`}
                        >
                          {chip.label}
                        </a>
                      ))}
                    </div>
                  ) : component.description?.includes('•') ? (
                    <ul className={`text-base lg:text-lg ${isLightBg ? 'text-gray-600' : 'text-gray-300'} leading-relaxed flex-grow space-y-1`}>
                      {component.description.split('\n').map((line, idx) => {
                        const trimmed = line.trim();
                        if (trimmed.startsWith('•')) {
                          return (
                            <li key={idx} className="flex">
                              <span className="mr-2 flex-shrink-0">•</span>
                              <span>{trimmed.substring(1).trim()}</span>
                            </li>
                          );
                        }
                        return trimmed ? <li key={idx}>{trimmed}</li> : null;
                      })}
                    </ul>
                  ) : component.description ? (
                    <p className={`text-base lg:text-lg ${isLightBg ? 'text-gray-600' : 'text-gray-300'} leading-relaxed flex-grow whitespace-pre-line`}>
                      {component.description}
                    </p>
                  ) : null}
                  
                  {/* Команда npm, если есть */}
                  {component.npmCommand && (
                      <div className="mt-4">
                        <CodePreview
                          code={component.npmCommand}
                          language="bash"
                        />
                      </div>
                  )}
                                                        <div className="mt-6 flex items-center gap-4 group">
                     <a
                       href={component.documentationUrl}
                       {...(component.documentationUrl?.startsWith('https://workflowengine.io/') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                       className="flex items-center gap-4 hover:opacity-80 transition-opacity duration-200 group"
                     >
                       {/* Градиентная кнопка с иконкой */}
                       {(component.showIcon !== false) && (
                         <div className="w-12 h-12 bg-gradient-to-r from-[#93d8ff] to-[#85afff] rounded-lg flex items-center justify-center flex-shrink-0">
                           <img 
                             src="/icons/documentation.svg" 
                             alt="" 
                             className="w-6 h-6"
                           />
                         </div>
                       )}
                       
                       {/* Текстовый блок */}
                       <div className="flex flex-col justify-center min-h-[52px]">
                         <div className="text-white font-body font-semibold text-xl mb-1">Documentation</div>
                         <div className="text-blue-300 hover:text-blue-200 transition-colors duration-200 flex items-center gap-2 text-lg">
                           {component.name}
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-all duration-200 group-hover:translate-x-1">
                             {/* Стрелка влево (по умолчанию) */}
                             <path 
                               d="m8.25 4.5 7.5 7.5-7.5 7.5" 
                               stroke="currentColor" 
                               strokeWidth="2" 
                               strokeLinecap="round" 
                               strokeLinejoin="round"
                               className="transition-opacity duration-200 group-hover:opacity-0"
                             />
                             {/* Стрелка вправо (при наведении) */}
                             <path 
                               d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" 
                               stroke="currentColor" 
                               strokeWidth="2" 
                               strokeLinecap="round" 
                               strokeLinejoin="round"
                               className="transition-opacity duration-200 opacity-0 group-hover:opacity-100 absolute"
                             />
                           </svg>
                         </div>
                       </div>
                     </a>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowEngineComponentsBlock; 
