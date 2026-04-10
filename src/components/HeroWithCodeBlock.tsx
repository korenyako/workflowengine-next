import React from "react";
import Button from "./Button";
import CodePreview from "./CodePreview";
import { getCachedStargazers } from "@/lib/stargazersCache";

interface HeroWithCodeBlockProps {
  title: string;
  description: string;
  badge?: string;
  cta?: {
    text: string;
    href: string;
  };
  code: string;
  blockBg?: string;
  anchor?: string;
  // Optional explicit target for the anchor (e.g. "_parent") — kept optional so existing pages are unaffected
  anchorTarget?: string;
  hideStarButton?: boolean;
}

const HeroWithCodeBlock: React.FC<HeroWithCodeBlockProps> = ({
  title,
  description,
  badge,
  cta,
  code,
  blockBg,
  anchor,
  anchorTarget,
  hideStarButton,
}) => {
  // Version is available immediately from build-time import (no flash)
  const cached = getCachedStargazers();
  const version = cached?.latestVersion || "7.5.0";

  // Функция для выделения ключевых слов (закомментирована для будущего использования)
  const highlightKeywords = (text: string, keywords: string[]) => {
    let result = text;
    keywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      result = result.replace(regex, '<mark>$1</mark>');
    });
    return result;
  };

  return (
    <section className="relative py-8 lg:py-12 px-4 sm:px-8" style={{ backgroundColor: blockBg }}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Бейдж с кнопкой Install */}
        {badge && cta && (
          <div className="flex items-center justify-center mb-8">
            {/* Десктопная версия - горизонтальный бейдж */}
            <a 
              href="https://www.npmjs.com/package/@react-form-builder/core" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center bg-gray-800/50 rounded-full hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer"
            >
              <span className="flex items-center text-white text-base px-6">
                <img src="/icons/npmjs.svg" alt="" className="w-10 h-10 mr-4" loading="lazy" />
                <span>
                  WorkflowEngine Core Free Open-Source React Form Library {version}
                </span>
              </span>
              <div className="flex items-center text-gray-800 bg-gradient-to-r from-blue-300 to-purple-300 hover:from-blue-400 hover:to-purple-400 px-6 py-3 text-base font-semibold rounded-full transition-all duration-200">
                <img src="/icons/arrow-right.svg" alt="" className="w-4 h-4 mr-1" />
                {cta.text}
              </div>
            </a>

            {/* Мобильная версия - прямоугольный блок */}
            <a
              href="https://www.npmjs.com/package/@react-form-builder/core"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden w-full max-w-sm bg-gray-800/50 rounded-xl p-4 hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-start text-white text-sm mb-4 text-left">
                <img src="/icons/npmjs.svg" alt="" className="w-10 h-10 mr-3 flex-shrink-0 mt-0.5" loading="lazy" />
                <span>
                  WorkflowEngine Core Free Open-Source React Form Library {version}
                </span>
              </div>
              <div className="flex items-center justify-center text-gray-800 bg-gradient-to-r from-blue-300 to-purple-300 hover:from-blue-400 hover:to-purple-400 px-6 py-3 text-base font-semibold rounded-lg transition-all duration-200">
                <img src="/icons/arrow-right.svg" alt="" className="w-4 h-4 mr-1" />
                {cta.text}
              </div>
            </a>
          </div>
        )}
        
        {(() => {
          // Compute href: treat leading '/' as path, otherwise a fragment
          const linkHref = anchor ? (anchor.startsWith('/') ? anchor : `#${anchor}`) : '#free';
          // Use explicit anchorTarget prop when provided; otherwise no target attribute
          const linkTarget = (typeof anchorTarget === 'string' && anchorTarget.length) ? anchorTarget : undefined;
          return (
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-semibold text-white mb-4 leading-snug whitespace-pre-wrap break-words"
              style={{ wordBreak: 'keep-all' }}
            >
              <a
                href={linkHref}
                target={linkTarget}
                className="hover:text-blue-300 transition-colors duration-200"
                style={{ textDecoration: 'none' }}
              >
                {title.replace(/\s+for\s+/g, ' for\u00A0')}
              </a>
              {/* Для будущего использования с выделением:
                  dangerouslySetInnerHTML={{ __html: highlightKeywords(title, ['Open Source']) }}
              */}
            </h1>
          );
        })()}
        <h3 className="text-lg sm:text-xl text-blue-300 mb-8 lg:mb-12 font-subtitle font-semibold whitespace-pre-wrap break-words">
          {description}
        </h3>
        
        {/* Блок кода с кнопкой Star us */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-none">
          <div className="relative w-full max-w-full text-left">
            <CodePreview
              code={code}
              language="bash" variant="hero"
            />
          </div>

          {!hideStarButton && (
            <Button href="https://github.com/optimajet/workflowengine" variant="primary" size="lg" className="whitespace-nowrap w-full sm:w-auto" target="_blank">
              <img src="/icons/github.svg" alt="" className="w-5 h-5 mr-2 brightness-0" />
              Star us on GitHub
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroWithCodeBlock; 
