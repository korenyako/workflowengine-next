import React from "react";
import Button from "./Button";

interface TwoColumnFeatureFullImageBlockProps {
  title: string;
  subtitle?: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  ctaButtons?: Array<{
    text: string;
    href: string;
    variant?: "primary" | "secondary";
  }>;
  blockBg?: string;
}

const TwoColumnFeatureFullImageBlock: React.FC<TwoColumnFeatureFullImageBlockProps> = ({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  imagePosition = "left",
  ctaButtons = [],
  blockBg,
}) => {
  const isImageLeft = imagePosition === "left";
  
  // Определяем, светлый ли фон (для выбора цветов текста)
  const isLightBg = blockBg === '#ffffff' || blockBg === 'white';
  
  // Цвета для текста в зависимости от фона
  const titleColor = isLightBg ? 'text-gray-900' : 'text-slate-900';
  const subtitleColor = 'text-blue-600'; // Всегда синий для subtitle
  const textColor = isLightBg ? 'text-gray-600' : 'text-slate-600';

  return (
    <section className="py-16 px-4 sm:px-8">
      <div className={`max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 ${isImageLeft ? "lg:flex-row-reverse" : ""}`}>
        {/* Картинка */}
        <div className="flex-1 w-full flex justify-center">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="max-w-full h-auto rounded-xl object-contain"
          />
        </div>
        
        {/* Текст */}
        <div className="flex-1 w-full">
          <span className="inline-block bg-blue-600/20 text-blue-600 text-xs font-semibold rounded-full px-4 py-1 mb-4">
            {subtitle}
          </span>
          <h3 className="text-lg font-subtitle font-semibold text-blue-600 mb-4 whitespace-pre-wrap break-words">{subtitle}</h3>
          <h2 className="font-heading text-slate-900 mb-4 whitespace-pre-wrap break-words">{title}</h2>
          <p className={`text-lg mb-6 ${textColor} whitespace-pre-wrap break-words`}>{description}</p>
          
          {/* Кнопки */}
          {ctaButtons.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4">
              {ctaButtons.map((button, index) => (
                <Button
                  key={index}
                  href={button.href}
                  variant={button.variant || "primary"}
                  size="lg"
                >
                  {button.text}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Блок кода */}
      <div className="max-w-6xl mx-auto mt-12">
        <pre className="bg-slate-100 text-green-400 rounded-lg p-4 mt-8 font-mono text-sm sm:text-base overflow-x-auto w-full max-w-full">
          <code className="break-all">
            {`// Example code block
const formConfig = {
  fields: [
    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      validation: {
        required: true,
        minLength: 2
      }
    }
  ]
};`}
          </code>
        </pre>
      </div>
    </section>
  );
};

export default TwoColumnFeatureFullImageBlock; 