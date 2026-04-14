import React from "react";
import DownloadIcon from "./icons/DownloadIcon";
import Button from "./Button";
import LlmsTxtIcon from "./icons/LlmsTxtIcon";
import LlmsFullTxtIcon from "./icons/LlmsFullTxtIcon";

interface TrainingFile {
  name: string;
  description: string;
  features: string[];
  documentationUrl: string;
  icon: string | React.ComponentType<{ size?: number }>;
}

interface TrainingFilesBlockProps {
  title?: string;
  subtitle?: string;
  description?: string;
  files: TrainingFile[];
  blockBg?: string;
}

const TrainingFilesBlock: React.FC<TrainingFilesBlockProps> = ({
  title,
  subtitle,
  description,
  files,
  blockBg,
}) => {
  // CSS для градиентного текста
  const gradientTextStyle = {
    background: 'linear-gradient(to right, #93d8ff, #85afff)',
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    backgroundClip: 'text' as const,
  };

  // Раньше здесь маппились пути на RemixIcon классы. Теперь используем напрямую SVG из /public/icons или React-компоненты.

  // Функция для получения React компонента иконки по имени
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ size?: number }> } = {
      'LlmsTxtIcon': LlmsTxtIcon,
      'LlmsFullTxtIcon': LlmsFullTxtIcon,
    };
    return iconMap[iconName];
  };

  // Определяем цвета текста на основе фона
  const isLightBg = blockBg === 'white' || blockBg === '#ffffff' || blockBg === '#f8fafc';
  const textColor = isLightBg ? 'text-gray-900' : 'text-slate-900';
  const subtitleColor = 'text-blue-600';
  const descriptionColor = isLightBg ? 'text-gray-600' : 'text-slate-600';

  return (
    <section 
      className="py-4 lg:py-6" 
      style={{ backgroundColor: blockBg }}
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

        {/* Файлы */}
        <div className={`grid gap-8 ${files.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
          {files.map((file, index) => (
            <div key={index} className="group">
              <div className={`block h-full p-6 lg:p-8 rounded-xl ${isLightBg ? 'bg-white/50' : 'bg-slate-100'}`}>
                <div className="h-full flex flex-col">
                  {/* Заголовок с иконкой */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-shrink-0">
                      {typeof file.icon === 'string' ? (
                        file.icon.startsWith("/") ? (
                          <img src={file.icon} alt="" className="w-6 h-6" />
                        ) : getIconComponent(file.icon) ? (
                          <div className="w-8 h-8">
                            {React.createElement(getIconComponent(file.icon)!, { size: 32 })}
                          </div>
                        ) : (
                          <span className="text-2xl">{file.icon}</span>
                        )
                      ) : (
                        <div className="w-8 h-8">
                          {React.createElement(file.icon, { size: 32 })}
                        </div>
                      )}
                    </div>
                    <h3 className={`text-base font-subtitle font-semibold tracking-wide text-blue-600 whitespace-pre-wrap break-words`}>
                      {file.name}
                    </h3>
                  </div>
                  
                  {/* Описание */}
                  <p className={`text-base lg:text-lg ${isLightBg ? 'text-gray-600' : 'text-slate-600'} leading-relaxed mb-4`}>
                    {file.description}
                  </p>
                  
                  {/* Список функций */}
                  <ul className={`text-base lg:text-lg ${isLightBg ? 'text-gray-600' : 'text-slate-600'} leading-relaxed flex-grow mb-6`}>
                    {file.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="mb-2 flex items-start">
                        <span className="text-slate-500 mr-2 mt-1">•</span>
                        <span dangerouslySetInnerHTML={{ __html: feature }} />
                      </li>
                    ))}
                  </ul>
                  
                  {/* Кнопка загрузки */}
                  <div className="mt-auto">
                    <Button
                      href={`https://workflowengine.io/documentation/${file.name}`}
                      variant="primary"
                      size="lg"
                      icon={<DownloadIcon className="w-5 h-5" />}
                    >
                      Download {file.name}
                    </Button>
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

export default TrainingFilesBlock;
