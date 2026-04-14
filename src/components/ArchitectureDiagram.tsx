import React, { useState } from "react";

// Объявление типа для dataLayer
declare global {
  interface Window {
    dataLayer?: any[];
  }
}

const ArchitectureDiagram: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("npm i @react-form-builder/core");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Сбрасываем через 2 секунды
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Новая функция для обработки клика на весь блок кода
  const handleCodeBlockClick = async () => {
    // Отправляем событие в dataLayer при клике на блок
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({'event': 'core_install'});
    }
    
    // Также копируем текст
    await copyToClipboard();
  };

  const handleButtonClick = (buttonName: string) => {
    console.log(`Clicked: ${buttonName}`);
  };

  return (
    <section className="py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-4">
            WorkflowEngine Architecture
          </h2>
          <p className="text-lg lg:text-xl text-slate-600">
            Modular design with clear separation of concerns
          </p>
        </div>

        {/* Контейнер для диаграммы */}
        <div className="relative w-full h-96 sm:h-[500px] lg:h-[600px]">
          {/* SVG с стрелками */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 800 600"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Стрелка к API */}
            <line
              x1="400"
              y1="300"
              x2="600"
              y2="150"
              stroke="#6B7280"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            
            {/* Стрелка к Form Renderer */}
            <line
              x1="400"
              y1="300"
              x2="600"
              y2="450"
              stroke="#6B7280"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            
            {/* Стрелка к Validation */}
            <line
              x1="400"
              y1="300"
              x2="200"
              y2="450"
              stroke="#6B7280"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            
            {/* Стрелка к Localization */}
            <line
              x1="400"
              y1="300"
              x2="200"
              y2="150"
              stroke="#6B7280"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />

            {/* Определение стрелки */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="#6B7280"
                />
              </marker>
            </defs>
          </svg>

          {/* Центральный блок с кодом */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div 
              className="relative w-full max-w-full cursor-pointer"
              onClick={handleCodeBlockClick}
            >
              <pre className="bg-white text-left rounded-lg px-4 sm:px-8 py-4 overflow-x-auto text-sm sm:text-lg font-mono flex items-center border border-slate-300 w-full max-w-full">
                <code className="pr-12 break-all">
                  <span style={{ color: '#81D4FA' }}>$</span>
                  <span style={{ color: '#BEF264' }}> npm i @react-form-builder/core</span>
                </code>
              </pre>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Предотвращаем всплытие события
                  copyToClipboard();
                }}
                className="absolute top-1/2 -translate-y-1/2 right-6 text-slate-500 hover:text-slate-900 transition-all duration-200 cursor-pointer"
                title={isCopied ? "Copied!" : "Copy to clipboard"}
              >
                {isCopied ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                    <path d="M3 12L9 18L21 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                    <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5M11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* API for component metadata - справа сверху */}
          <button
            onClick={() => handleButtonClick("API for component metadata")}
            className="absolute top-8 right-4 sm:top-12 sm:right-8 lg:top-16 lg:right-16 bg-slate-100 hover:bg-indigo-700 text-slate-900 px-4 py-3 rounded-lg transition-all duration-200 border border-slate-300 hover:border-indigo-600 text-sm sm:text-base font-medium max-w-48 text-center"
          >
            API for component metadata
          </button>

          {/* Form renderer (FormViewer) - справа снизу */}
          <button
            onClick={() => handleButtonClick("Form renderer (FormViewer)")}
            className="absolute bottom-8 right-4 sm:bottom-12 sm:right-8 lg:bottom-16 lg:right-16 bg-slate-100 hover:bg-indigo-700 text-slate-900 px-4 py-3 rounded-lg transition-all duration-200 border border-slate-300 hover:border-indigo-600 text-sm sm:text-base font-medium max-w-48 text-center"
          >
            Form renderer (FormViewer)
          </button>

          {/* Validation - слева снизу */}
          <button
            onClick={() => handleButtonClick("Validation")}
            className="absolute bottom-8 left-4 sm:bottom-12 sm:left-8 lg:bottom-16 lg:left-16 bg-slate-100 hover:bg-indigo-700 text-slate-900 px-4 py-3 rounded-lg transition-all duration-200 border border-slate-300 hover:border-indigo-600 text-sm sm:text-base font-medium max-w-48 text-center"
          >
            Validation
          </button>

          {/* Localization - слева сверху */}
          <button
            onClick={() => handleButtonClick("Localization")}
            className="absolute top-8 left-4 sm:top-12 sm:left-8 lg:top-16 lg:left-16 bg-slate-100 hover:bg-indigo-700 text-slate-900 px-4 py-3 rounded-lg transition-all duration-200 border border-slate-300 hover:border-indigo-600 text-sm sm:text-base font-medium max-w-48 text-center"
          >
            Localization
          </button>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureDiagram; 