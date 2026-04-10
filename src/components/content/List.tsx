import React from 'react';

interface ListProps {
  items: React.ReactNode[];
  className?: string;
  ordered?: boolean;
}

/**
 * Контентный компонент для маркированных и нумерованных списков
 * Использует стили из globals.css для article-content
 */
export const List: React.FC<ListProps> = ({ items, className = '', ordered = false }) => {
  const ListTag = ordered ? 'ol' : 'ul';
  
  return (
    <ListTag className={`article-content ${className}`}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ListTag>
  );
};
