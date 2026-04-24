import React, { useState } from "react";
import Button from "./Button";
import CodePreview from "./CodePreview";

interface HeroFlowProps {
  title: string;
  description: string;
  badge?: string;
  cta?: {
    text: string;
    href: string;
  };
  code: string;
  blockBg?: string;
}

const HeroFlow: React.FC<HeroFlowProps> = ({
  title,
  description,
  badge,
  cta,
  code,
  blockBg,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Сбрасываем через 2 секунды
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section className="relative py-8 lg:py-12 px-4 sm:px-8" style={{ backgroundColor: blockBg }}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Бейдж с кнопкой Install */}
        {badge && cta && (
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center bg-white rounded-full">
              <span className="flex items-center text-slate-900 text-base px-6 py-2">
                <img src="/icons/command-line.svg" alt="" className="w-6 h-6 mr-4" />
                {badge}
              </span>
              <Button href={cta.href} variant="primary" size="md" className="!rounded-full" target="_blank">
                <img src="/icons/arrow-right.svg" alt="" className="w-4 h-4 mr-1" />
                {cta.text}
              </Button>
            </div>
          </div>
        )}
        
        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading text-slate-900 mb-4 leading-snug whitespace-pre-wrap break-words" style={{ wordBreak: 'keep-all' }}>
          {title.replace(/\s+for\s+/g, ' for\u00A0')}
        </h1>
        <h3 className="text-lg sm:text-xl text-blue-600 mb-8 lg:mb-12 font-subtitle font-semibold whitespace-pre-wrap break-words">
          {description}
        </h3>
        
        {/* Блок кода с кнопкой Star us */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-none">
          <div className="relative w-full max-w-full">
            <CodePreview
              code={code}
              language="javascript"
            />
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroFlow;