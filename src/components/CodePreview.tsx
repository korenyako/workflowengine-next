"use client";
import React, { useState } from 'react';
import SyntaxHighlighter from "@/components/syntax-highlighter/SyntaxHighlighter";
import type {HlJsSyntaxHighlighterProps} from "@/components/syntax-highlighter/HlJsSyntaxHighlighter";

declare global {
  interface Window { dataLayer?: any[] }
}

const NextJsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" fill="currentColor"/>
  </svg>
);

const RemixIcon = () => (
  <svg width="16" height="16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.511 18.508c.216 2.773.216 4.073.216 5.492H15.31c0-.309.006-.592.011-.878.018-.892.036-1.821-.109-3.698-.19-2.747-1.374-3.358-3.55-3.358H1.574v-5h10.396c2.748 0 4.122-.835 4.122-3.049 0-1.946-1.374-3.125-4.122-3.125H1.573V0h11.541c6.221 0 9.313 2.938 9.313 7.632 0 3.511-2.176 5.8-5.114 6.182 2.48.497 3.93 1.909 4.198 4.694ZM1.573 24v-3.727h6.784c1.133 0 1.379.84 1.379 1.342V24Z" fill="currentColor"/>
  </svg>
);

const ReactIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278z" fill="currentColor"/>
  </svg>
);

const getIcon = (name: string) => {
  switch (name) {
    case 'Next.js': return <NextJsIcon/>;
    case 'Remix': return <RemixIcon/>;
    case 'React': return <ReactIcon/>;
    default: return null;
  }
};

interface Tab { name: string; code?: string }

interface CodePreviewProps {
  code: string;
  language: HlJsSyntaxHighlighterProps['language'];
  tabs?: Tab[];
  className?: string;
  variant?: string;
  maxHeight?: string;
  showCopy?: boolean;
}

const CodePreview: React.FC<CodePreviewProps> = ({ code, language, tabs, className = '', maxHeight, showCopy = true }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    const currentCode = getCurrentCode();
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const getCurrentCode = () => (tabs && tabs[activeTab]?.code) ? tabs[activeTab].code! : code;

  const handleCodeBlockClick = async () => {
    const currentCode = getCurrentCode();
    if (typeof window !== 'undefined' && window.dataLayer) {
      if (currentCode.includes('@react-form-builder/components-material-ui')) window.dataLayer.push({event: 'mui_install'});
      else if (currentCode.includes('@react-form-builder/components-mantine')) window.dataLayer.push({event: 'mantine_install'});
      else if (currentCode.includes('@react-form-builder/components-shadcn-ui')) window.dataLayer.push({event: 'shadcn_install'});
      else if (currentCode.includes('npm i @react-form-builder/core')) window.dataLayer.push({event: 'core_install'});
      else if (currentCode.includes('npm i @react-form-builder/designer')) window.dataLayer.push({event: 'designer_install'});
      else if (currentCode.includes('npm install @react-form-builder/components-rsuite')) window.dataLayer.push({event: 'component_install'});
    }
    await copyToClipboard();
  };

  const currentCode = getCurrentCode();
  const isNpmCommand = /^\s*(?:\$?\s*)?npm\s/i.test(currentCode || "");

  return (
    <div className={`w-full ${className}`}>
      {tabs && tabs.length > 0 && (
        <div className="flex items-start bg-zinc-800 rounded-t-lg">
          {tabs.map((tab, index) => (
            <button
              key={tab.name + index}
              onClick={(e) => { e.stopPropagation(); setActiveTab(index); }}
              className={`px-4 py-3 text-base font-medium transition-colors duration-200 cursor-pointer flex items-center gap-2 border-b-2 ${
                index === activeTab
                  ? `text-blue-300 bg-zinc-900 border-blue-300 ${index === 0 ? 'rounded-tl-lg' : ''}`
                  : `text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700 border-transparent ${index === 0 ? 'rounded-tl-lg' : ''}`
              }`}
            >
              {getIcon(tab.name)}
              {tab.name}
            </button>
          ))}
        </div>
      )}

      <div
        className={`bg-[#0f172a] ${maxHeight ? 'overflow-hidden relative' : 'overflow-visible flex items-start'} [&_.token]:!bg-transparent [&_span]:!bg-transparent code-block ${showCopy ? 'cursor-pointer' : ''} ${
          tabs && tabs.length > 0 ? 'rounded-b-lg' : 'rounded-lg'
        }`}
        style={maxHeight ? { height: maxHeight } : undefined}
        onClick={showCopy ? handleCodeBlockClick : undefined}
      >
        {/* Copy button - absolutely positioned when maxHeight is set */}
        {showCopy && maxHeight && (
          <button
            onClick={(e) => { e.stopPropagation(); handleCodeBlockClick(); }}
            className="p-2 text-zinc-400 hover:text-white transition-all duration-200 z-10 code-copy-button cursor-pointer absolute top-3 right-3 bg-[#0f172a] rounded"
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
        )}

        {isNpmCommand ? (
          <pre
            style={{
              margin: 0,
              padding: maxHeight ? '1rem 3.5rem 1rem 1rem' : '0.875rem 1rem',
              fontSize: '16px',
              lineHeight: '1.6',
              backgroundColor: 'transparent',
              borderRadius: 0,
              overflow: maxHeight ? 'auto' : 'visible',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              overflowWrap: 'anywhere',
              fontFamily: '"JetBrains Mono", monospace !important',
              scrollbarWidth: 'thin',
              scrollbarColor: '#475569 #0f172a',
              ...(maxHeight ? { height: '100%', overflowY: 'auto' as const } : {}),
            }}
            className={`custom-scrollbar code-with-slash-break ${maxHeight ? '' : 'flex-1'}`}
          >
            {currentCode}
          </pre>
        ) : (
          <SyntaxHighlighter
            language={language}
            style={{
              margin: 0,
              padding: maxHeight ? '1rem 3.5rem 1rem 1rem' : '0.875rem 1rem',
              fontSize: '16px',
              lineHeight: '1.6',
              backgroundColor: 'transparent',
              borderRadius: 0,
              overflow: maxHeight ? 'auto' : 'visible',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              overflowWrap: 'anywhere',
              fontFamily: '"JetBrains Mono", monospace !important',
              scrollbarWidth: 'thin',
              scrollbarColor: '#475569 #0f172a',
              ...(maxHeight ? { height: '100%', overflowY: 'auto' as const } : {}),
            }}
            className={`custom-scrollbar code-with-slash-break ${maxHeight ? '' : 'flex-1'}`}
          >
            {currentCode}
          </SyntaxHighlighter>
        )}

        {/* Gradient overlay at bottom when maxHeight is set */}
        {maxHeight && (
          <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent, #0f172a)',
            }}
          />
        )}

        {/* Copy button - flex item when no maxHeight */}
        {showCopy && !maxHeight && (
          <button
            onClick={(e) => { e.stopPropagation(); handleCodeBlockClick(); }}
            className="p-2 text-zinc-400 hover:text-white transition-all duration-200 z-10 code-copy-button cursor-pointer flex-shrink-0 mr-4"
            style={{ marginTop: '6px' }}
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
        )}
      </div>
    </div>
  );
};

export default CodePreview;
