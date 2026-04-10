import React from "react";

interface ColumnItem {
  title: string;
  description: string;
  href?: string;
}

interface ColumnsBlockProps {
  title?: string;
  subtitle?: string;
  columns: ColumnItem[];
  blockBg?: string;
  maxColumns?: 2 | 3;
}

const ColumnsBlock: React.FC<ColumnsBlockProps> = ({
  title,
  subtitle,
  columns,
  blockBg,
  maxColumns = 3
}) => {
  // Определяем цвета текста на основе фона
  const isLightBg = blockBg === 'white' || blockBg === '#ffffff' || blockBg === '#f8fafc';
  const textColor = isLightBg ? 'text-gray-900' : 'text-white';
  const subtitleColor = 'text-blue-300';
  const descriptionColor = isLightBg ? 'text-gray-600' : 'text-gray-300';

  // Ограничиваем количество колонок
  const displayColumns = columns.slice(0, maxColumns);
  const gridCols = maxColumns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3';

  return (
    <section className="py-16 lg:py-24" style={{ backgroundColor: blockBg }}>
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
          </div>
        )}

        {/* Колонки */}
        <div className={`grid grid-cols-1 ${gridCols} gap-8 lg:gap-12`}>
          {displayColumns.map((column, index) => (
            <div key={index} className="group">
              {column.href ? (
                <a 
                  href={column.href} 
                  className="block h-full p-6 lg:p-8 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-lg"
                >
                  <div className="h-full flex flex-col">
                    <h3 className={`text-xl lg:text-2xl font-heading font-bold ${textColor} mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200`}>
                      {column.title}
                    </h3>
                    <p className={`text-base lg:text-lg ${descriptionColor} leading-relaxed flex-grow`}>
                      {column.description}
                    </p>
                    <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
                      <span className="text-sm font-medium">Подробнее</span>
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                      >
                        <path 
                          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              ) : (
                <div className="h-full p-6 lg:p-8 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="h-full flex flex-col">
                    <h3 className={`text-xl lg:text-2xl font-heading font-bold ${textColor} mb-4`}>
                      {column.title}
                    </h3>
                    <p className={`text-base lg:text-lg ${descriptionColor} leading-relaxed flex-grow`}>
                      {column.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ColumnsBlock; 