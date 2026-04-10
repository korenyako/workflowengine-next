import React from "react";

interface ChatGPTButtonProps {
  placeholder?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
}

const ChatGPTButton: React.FC<ChatGPTButtonProps> = ({
  placeholder = "Спросите что-нибудь...",
  onClick,
  href,
  className = "",
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <div className="relative inline-block group w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 group-hover:bg-white rounded-full p-0.5 transition-colors duration-200">
          <div className="bg-[#0d1117] rounded-full h-full w-full"></div>
        </div>
        <button
          onClick={handleClick}
          className="relative w-full bg-transparent border-0 rounded-full px-4 py-3 flex items-center justify-between transition-all duration-200 group"
        >
        {/* Левая часть - плюс и текст */}
        <div className="flex items-center gap-3 flex-1">
          {/* Плюс с tooltip */}
          <div className="relative group/plus">
            <div className="w-9 h-9 flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 cursor-pointer rounded-full">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path 
                  d="M12 5v14M5 12h14" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {/* Tooltip для плюса */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded-md opacity-0 group-hover/plus:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Add files and more<span className="text-gray-400 ml-1">/</span>
            </div>
          </div>
          
          {/* Текст placeholder */}
          <span className="text-gray-300 text-lg flex-1 text-left">
            {placeholder}
          </span>
        </div>
        
        {/* Правая часть - иконки */}
        <div className="flex items-center gap-2">
          {/* Микрофон с tooltip */}
          <div className="relative group/mic">
            <div className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path 
                  d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M19 10v2a7 7 0 0 1-14 0v-2" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <line 
                  x1="12" 
                  y1="19" 
                  x2="12" 
                  y2="23" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <line 
                  x1="8" 
                  y1="23" 
                  x2="16" 
                  y2="23" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {/* Tooltip "Dictate" */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black text-white text-xs rounded-md opacity-0 group-hover/mic:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Dictate
            </div>
          </div>
          
          {/* Звуковые волны с tooltip */}
          <div className="relative group/sound">
            <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path d="M2 10v3"/>
                <path d="M6 6v11"/>
                <path d="M10 3v18"/>
                <path d="M14 8v7"/>
                <path d="M18 5v13"/>
                <path d="M22 10v3"/>
              </svg>
            </div>
            {/* Tooltip для звуковых волн */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black text-white text-xs rounded-md opacity-0 group-hover/sound:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Use voice mode
            </div>
          </div>
        </div>
        </button>
      </div>
      
      {/* Disclaimer текст */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-400">
          ChatGPT can make mistakes. Check important info.{" "}
          <a 
            href="https://chatgpt.com/g/g-68c155ab35808191b59f11872461251c-react-form-builder?model=gpt-5-thinking"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-300 transition-colors duration-200"
          >
            See Cookie Preferences.
          </a>
        </p>
      </div>
    </div>
  );
};

export default ChatGPTButton;