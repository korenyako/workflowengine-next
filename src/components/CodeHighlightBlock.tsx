import React from "react";
import CodePreview from "./CodePreview";

interface CodeHighlightBlockProps {
  title: string;
  text?: string;
  code: string;
  language?: string; // "json", "ts", "js", "bash", и т.д.
  layout?: "code-left" | "code-right";
  blockBg?: string;
}

const CodeHighlightBlock: React.FC<CodeHighlightBlockProps> = ({
  title,
  text,
  code,
  language = "bash",
  layout = "code-left",
  blockBg,
}) => {
  const isCodeLeft = layout === "code-left";
  
  // Определяем, светлый ли фон (для выбора цветов текста)
  const isLightBg = blockBg === '#ffffff' || blockBg === 'white';
  
  // Цвета для текста в зависимости от фона
  const titleColor = isLightBg ? 'text-gray-900' : 'text-slate-900';
  const textColor = isLightBg ? 'text-gray-600' : 'text-slate-600';

  return (
    <section className="py-16 px-4 sm:px-8" style={{ backgroundColor: blockBg }}>
      <div className="max-w-6xl mx-auto">
        <div className={`flex flex-col lg:flex-row items-start gap-12 ${!isCodeLeft ? "lg:flex-row-reverse" : ""}`}>
          {/* Колонка с кодом */}
          <div className="flex-1 w-full">
            <CodePreview
              code={code}
              language={language as any}
            />
          </div>
          {/* Колонка с текстом */}
          <div className="flex-1 w-full">
            <h2 className={`font-bold mb-4 ${titleColor} whitespace-pre-wrap break-words`}>{title}</h2>
            {text && <p className={`text-lg ${textColor} whitespace-pre-wrap break-words`}>{text}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeHighlightBlock; 
