import React from 'react';
import CodePreview from '../CodePreview';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  maxHeight?: string;
  showCopy?: boolean;
}

/**
 * Контентный компонент для блоков кода
 * Оборачивает существующий CodePreview с подсветкой синтаксиса
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'javascript',
  className = '',
  maxHeight,
  showCopy
}) => {
  return (
    <div className={`my-6 ${className}`}>
      <CodePreview
        code={code.trim()}
        language={language as any}
        maxHeight={maxHeight}
        showCopy={showCopy}
      />
    </div>
  );
};
