import React from "react";
import Button from "./Button";

interface ImageTextBlockProps {
  title: string;
  text: string;
  image: {
    src: string;
    alt: string;
  };
  cta?: {
    text: string;
    href: string;
  };
  layout?: "image-left" | "image-right";
  blockBg?: string;
}

const ImageTextBlock: React.FC<ImageTextBlockProps> = ({
  title,
  text,
  image,
  cta,
  layout = "image-right",
  blockBg,
}) => {
  const isImageLeft = layout === "image-left";
  
  // Определяем, светлый ли фон (для выбора цветов текста)
  const isLightBg = blockBg === '#ffffff' || blockBg === 'white';
  
  // Цвета для текста в зависимости от фона
  const titleColor = isLightBg ? 'text-gray-900' : 'text-slate-900';
  const textColor = isLightBg ? 'text-gray-600' : 'text-slate-600';

  return (
    <section className="py-16 px-4 sm:px-8">
      <div className={`max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 ${isImageLeft ? "md:flex-row-reverse" : ""}`}>
        {/* Картинка */}
        <div className="flex-1 w-full flex justify-center">
          <img
            src={image.src}
            alt={image.alt}
            className="max-w-full h-auto rounded-xl object-contain"
          />
        </div>
        {/* Текст */}
        <div className="flex-1 w-full">
          <h2 className={`font-bold mb-4 ${titleColor} whitespace-pre-wrap break-words`}>{title}</h2>
          <p className={`text-lg mb-6 ${textColor} whitespace-pre-wrap break-words`}>{text}</p>
          {cta && (
                          <Button href={cta.href} variant="primary" size="lg">
                {cta.text}
              </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImageTextBlock; 