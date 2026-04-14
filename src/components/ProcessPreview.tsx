'use client';

import React, { useState } from 'react';
import { SyntaxHighlighter } from "@/components/syntax-highlighter/SyntaxHighlighter";

// SVG иконки для табов
const ImageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" fill="currentColor"/>
  </svg>
);

const JsonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4zm-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z" fill="currentColor"/>
  </svg>
);

const FormIcon = () => (
  <svg width="16" height="16" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M217.999 5C217.999 42.0525 185.766 72.0903 146.003 72.0918H105.5V103.848H218C218 140.901 187.779 170.938 150.5 170.938H105.5V251H38V72.0918C38 35.1866 67.9801 5.24463 105.054 5.00586V5.15625C105.904 5.10251 106.757 5.0621 107.615 5.03613H107.682C108.452 5.01346 109.226 5 110.002 5H217.999Z" fill="currentColor"/>
  </svg>
);

// Функция для получения иконки по имени
const getIcon = (name: string) => {
  switch (name) {
    case 'Image':
      return <ImageIcon />;
    case 'JSON':
      return <JsonIcon />;
    case 'Form':
    case 'WorkflowEngine':
      return <FormIcon />;
    default:
      return null;
  }
};

interface Tab {
  name: string;
  type: 'image' | 'code' | 'form';
  content?: string; // для кода
  imageSrc?: string; // для изображений
}

interface ProcessPreviewProps {
  tabs: Tab[];
  className?: string;
}

const ProcessPreview: React.FC<ProcessPreviewProps> = ({
  tabs,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [imageHeight, setImageHeight] = useState<number | null>(null);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    setImageHeight(img.naturalHeight);
  };

  // Функция копирования кода
  const copyToClipboard = async () => {
    const currentTab = getCurrentTab();
    if (currentTab.type === 'code' && currentTab.content) {
      try {
        await navigator.clipboard.writeText(currentTab.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    }
  };

  const getCurrentTab = () => {
    return tabs[activeTab];
  };

  const renderTabContent = () => {
    const currentTab = getCurrentTab();

    if (currentTab.type === 'image' && currentTab.imageSrc) {
      return (
        <div className="bg-zinc-900 rounded-b-lg overflow-hidden">
          <img
            src={currentTab.imageSrc}
            alt={currentTab.name}
            className="w-full h-auto object-contain"
            onLoad={handleImageLoad}
          />
        </div>
      );
    }

    if (currentTab.type === 'code' && currentTab.content) {
      const tabHeight = imageHeight ? `${imageHeight}px` : '500px';
      return (
        <div className="bg-zinc-900 overflow-hidden [&_.token]:!bg-transparent [&_span]:!bg-transparent relative code-block rounded-b-lg" style={{ height: tabHeight }}>
          {/* Кнопка копирования */}
          <button
            onClick={copyToClipboard}
            className="absolute top-3 right-3 p-2 text-zinc-400 hover:text-slate-900 transition-all duration-200 z-10 code-copy-button cursor-pointer"
            title="Copy code"
          >
            {copied ? (
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
          <SyntaxHighlighter
            language='json'
            style={{
              margin: 0,
              padding: '1rem',
              paddingRight: '3.5rem',
              fontSize: '16px',
              lineHeight: '1.6',
              backgroundColor: '#0f172a',
              borderRadius: '0 0 8px 8px',
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              fontFamily: '"JetBrains Mono", monospace !important',
              height: '100%',
              overflowY: 'auto',
              scrollbarWidth: 'thin',
              scrollbarColor: '#475569 #0f172a',
            }}
            className="custom-scrollbar code-with-slash-break"
          >
            {currentTab.content}
          </SyntaxHighlighter>
        </div>
      );
    }

    if (currentTab.type === 'form') {
      const tabHeight = imageHeight ? `${imageHeight}px` : '500px';
      return (
        <div className="rounded-b-lg overflow-hidden p-4 custom-scrollbar flex items-center justify-center text-slate-500" style={{ backgroundColor: '#111827', height: tabHeight, overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#475569 #0f172a' }}>
          Demo placeholder
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Табы */}
      {tabs && tabs.length > 0 && (
        <div className="flex items-center bg-zinc-800 rounded-t-lg">
          {tabs.map((tab, index) => (
            <button
              key={tab.name}
              onClick={() => handleTabClick(index)}
              className={`px-4 py-3 text-base font-medium transition-colors duration-200 cursor-pointer flex items-center gap-2 border-b-2 ${
                index === activeTab
                  ? `text-blue-600 bg-zinc-900 border-blue-300 ${index === 0 ? 'rounded-tl-lg' : ''}`
                  : `text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700 border-transparent ${index === 0 ? 'rounded-tl-lg' : ''}`
              }`}
            >
              {getIcon(tab.name)}
              {tab.name}
            </button>
          ))}
        </div>
      )}

      {/* Контент табов */}
      {renderTabContent()}
    </div>
  );
};

export default ProcessPreview;
