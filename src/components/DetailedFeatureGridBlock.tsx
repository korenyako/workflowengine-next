import React from "react";

interface Feature {
  icon: string; // emoji или путь к SVG
  title: string;
  text: string;
}

interface DetailedFeatureGridBlockProps {
  title: string;
  subtitle?: string;
  text?: string;
  features: Feature[];
  blockBg?: string;
}

const DetailedFeatureGridBlock: React.FC<DetailedFeatureGridBlockProps> = ({
  title,
  subtitle,
  text,
  features,
  blockBg,
}) => {
  // Определяем, светлый ли фон (для выбора цветов текста)
  const isLightBg = blockBg === '#ffffff' || blockBg === 'white';
  
  // Цвета для текста в зависимости от фона
  const titleColor = isLightBg ? 'text-gray-900' : 'text-white';
  const subtitleColor = 'text-blue-300';
  const textColor = isLightBg ? 'text-gray-600' : 'text-gray-300';
  const cardBg = isLightBg ? 'bg-gray-50' : 'bg-gray-800';
  const cardTitleColor = isLightBg ? 'text-gray-900' : 'text-white';
  const cardTextColor = isLightBg ? 'text-gray-600' : 'text-gray-300';

  return (
    <section className="py-16 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className={`font-bold mb-2 ${titleColor} whitespace-pre-wrap break-words`}>{title}</h2>
        {subtitle && <h3 className={`text-lg font-subtitle font-semibold mb-2 ${subtitleColor} whitespace-pre-wrap break-words`}>{subtitle}</h3>}
        {text && <p className={`text-lg ${textColor} whitespace-pre-wrap break-words`}>{text}</p>}
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, idx) => (
          <div key={idx} className={`${cardBg} rounded-xl p-8 flex flex-col items-center text-center h-full`}>
            {feature.icon.startsWith("/") ? (
              <img src={feature.icon} alt="" className="w-12 h-12 mb-4" />
            ) : (
              <span className="text-4xl mb-4">{feature.icon}</span>
            )}
            <h3 className={`font-semibold mb-2 ${cardTitleColor} whitespace-pre-wrap break-words`}>{feature.title}</h3>
            <p className={`${cardTextColor} whitespace-pre-wrap break-words`}>{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetailedFeatureGridBlock; 