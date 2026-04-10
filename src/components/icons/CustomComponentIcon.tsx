import React from 'react';

interface CustomComponentIconProps {
  size?: number;
  className?: string;
}

const CustomComponentIcon: React.FC<CustomComponentIconProps> = ({ size = 24, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ width: '100%', height: '100%', display: 'block' }}
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#60A5FA', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#C084FC', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <g>
      <path id="Union" fill="url(#grad1)" fillRule="evenodd" d="M1.846 0h6.462c1.02 0 1.846 0.826 1.846 1.846v6.462c0 1.02 -0.826 1.846 -1.846 1.846H1.846C0.826 10.154 0 9.328 0 8.308V1.846C0 0.826 0.826 0 1.846 0Zm13.846 13.846h6.462c1.02 0 1.846 0.826 1.846 1.846v6.462c0 1.02 -0.826 1.846 -1.846 1.846h-6.462c-1.02 0 -1.846 -0.826 -1.846 -1.846v-6.462c0 -1.02 0.826 -1.846 1.846 -1.846Zm-7.385 0H1.846C0.826 13.846 0 14.673 0 15.692v6.462C0 23.173 0.826 24 1.846 24h6.462c1.02 0 1.846 -0.827 1.846 -1.846v-6.462c0 -1.019 -0.826 -1.846 -1.846 -1.846ZM18.447 0c0.71 0 1.286 0.576 1.286 1.286v2.97h2.97c0.71 0 1.286 0.576 1.286 1.286 0 0.71 -0.576 1.286 -1.286 1.286h-2.97v2.97c0 0.71 -0.576 1.286 -1.286 1.286 -0.71 0 -1.286 -0.576 -1.286 -1.286v-2.97h-2.97c-0.71 0 -1.286 -0.576 -1.286 -1.286 0 -0.71 0.576 -1.286 1.286 -1.286h2.97V1.286C17.161 0.576 17.737 0 18.447 0Z" clipRule="evenodd" strokeWidth="1.714"></path>
    </g>
  </svg>
);

export default CustomComponentIcon; 