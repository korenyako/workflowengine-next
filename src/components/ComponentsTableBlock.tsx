import React from 'react';
import { ComponentsTable } from './ComponentsTable';

interface ComponentsTableBlockProps {
  showHeader?: boolean;
  showFooter?: boolean;
}

export function ComponentsTableBlock({ showHeader = true, showFooter = true }: ComponentsTableBlockProps) {
  return (
    <ComponentsTable showHeader={showHeader} showFooter={showFooter} />
  );
} 