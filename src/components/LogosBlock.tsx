import React from "react";

interface LogosBlockProps {
  subtitle?: string;
  description?: string;
  blockBg?: string;
}

const LogosBlock: React.FC<LogosBlockProps> = ({
  subtitle = "Trusted by global organizations",
  description = "Leading companies choose WorkflowEngine for their form solutions",
  blockBg,
}) => {
  // Определяем, светлый ли фон (для выбора цветов текста)
  const isLightBg = blockBg === '#ffffff' || blockBg === 'white';
  
  // Цвета для текста в зависимости от фона
  const subtitleColor = 'text-blue-600'; // Всегда синий для subtitle
  const descriptionColor = isLightBg ? 'text-gray-600' : 'text-slate-600';

  const logos = [
    "/logos/bosch.svg",
    "/logos/engie.svg", 
    "/logos/philips.svg",
    "/logos/nelnet.svg",
    "/logos/dell.svg",
    "/logos/acer.svg",
    "/logos/santos.svg",
    "/logos/ideagen.svg",
    "/logos/novartis.svg"
  ];

  return (
    <section className="pb-8 lg:pb-12">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-6 lg:mb-8">
          {subtitle && (
            <h3 className={`text-lg font-subtitle font-semibold tracking-wide ${subtitleColor} mb-4 whitespace-pre-wrap break-words`}>
              {subtitle}
            </h3>
          )}
          {description && (
            <p className={`text-lg lg:text-xl ${descriptionColor} whitespace-pre-wrap break-words`}>
              {description}
            </p>
          )}
        </div>

        {/* Логотипы */}
        <div className="relative overflow-hidden">
          {/* Градиентная маска слева */}
          <div className={`absolute left-0 top-0 w-20 h-full z-10 ${isLightBg ? 'bg-gradient-to-r from-white to-transparent' : 'bg-gradient-to-r from-[#0d1117] to-transparent'}`}></div>
          {/* Градиентная маска справа */}
          <div className={`absolute right-0 top-0 w-20 h-full z-10 ${isLightBg ? 'bg-gradient-to-l from-white to-transparent' : 'bg-gradient-to-l from-[#0d1117] to-transparent'}`}></div>
          
          <div className="flex items-center gap-6 lg:gap-8 xl:gap-12 animate-scroll">
            {/* Первый набор логотипов */}
            {logos.map((logo, index) => (
              <div 
                key={index}
                className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
              >
                <img
                  src={logo}
                  alt=""
                  className="max-h-8 lg:max-h-12 w-auto transition-all duration-300"
                />
              </div>
            ))}
            {/* Дублируем логотипы для бесшовной анимации */}
            {logos.map((logo, index) => (
              <div 
                key={`duplicate-${index}`}
                className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
              >
                <img
                  src={logo}
                  alt=""
                  className="max-h-8 lg:max-h-12 w-auto transition-all duration-300"
                />
              </div>
            ))}
            {/* Третий набор для более плавной анимации */}
            {logos.map((logo, index) => (
              <div 
                key={`duplicate2-${index}`}
                className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
              >
                <img
                  src={logo}
                  alt=""
                  className="max-h-8 lg:max-h-12 w-auto transition-all duration-300"
                />
              </div>
            ))}
            {/* Четвертый набор для бесшовной анимации */}
            {logos.map((logo, index) => (
              <div 
                key={`duplicate3-${index}`}
                className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
              >
                <img
                  src={logo}
                  alt=""
                  className="max-h-8 lg:max-h-12 w-auto transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogosBlock; 