import React from 'react';

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Контентный компонент для обычного текста/абзацев
 * Использует стили из globals.css для article-content
 */
export const Text: React.FC<TextProps> = ({ children, className = '' }) => {
  return (
    <p className={`article-content ${className}`}>
      {children}
    </p>
  );
};
