import React, { JSX } from 'react';

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5;
  children: React.ReactNode;
  className?: string;
}

/**
 * Контентный компонент для заголовков
 * Использует стили из globals.css для article-content
 * H1-H2: Poppins, белый цвет
 * H3-H5: Space Grotesk, голубой цвет (#93c5fd)
 */
export const Heading: React.FC<HeadingProps> = ({ level, children, className = '' }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Tag className={`article-content ${className}`}>
      {children}
    </Tag>
  );
};
