import React from 'react';

interface LibraryIconProps {
  size?: number;
  className?: string;
}

const LibraryIcon: React.FC<LibraryIconProps> = ({ size = 24, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ width: '100%', height: '100%' }}
  >
    <defs>
      <linearGradient id="libraryGradient" x1="0" y1="12" x2="24" y2="12" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA" />
        <stop offset="1" stopColor="#C084FC" />
      </linearGradient>
    </defs>
    <g>
      <path 
        id="Subtract" 
        fill="url(#libraryGradient)" 
        fillRule="evenodd" 
        d="M2.571428571428571 0C1.151268 0 0 1.151268 0 2.571428571428571v2.357142857142857h24V2.571428571428571c0 -1.4201605714285714 -1.1513142857142855 -2.571428571428571 -2.571428571428571 -2.571428571428571h-18.857142857142858ZM0 14.356937142857142V7.071428571428571h10.928571428571429v7.285508571428571H0Zm0 2.142857142857143V21.428571428571427c0 1.4201142857142857 1.151268 2.571428571428571 2.571428571428571 2.571428571428571h8.357142857142856V16.499794285714284H0Zm13.071428571428571 0V24H21.428571428571427c1.4201142857142857 0 2.571428571428571 -1.1513142857142855 2.571428571428571 -2.571428571428571V16.499794285714284H13.071428571428571Zm10.928571428571429 -2.142857142857143V7.071428571428571H13.071428571428571v7.285508571428571H24Z" 
        clipRule="evenodd" 
        strokeWidth="1.7143"
      />
    </g>
  </svg>
);

export default LibraryIcon; 