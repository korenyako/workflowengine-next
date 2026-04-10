import React from 'react';

interface JsonImportExportIconProps {
  size?: number;
  className?: string;
}

const JsonImportExportIcon: React.FC<JsonImportExportIconProps> = ({ size = 24, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 40 40" 
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
      <path id="Union" fill="url(#grad1)" fillRule="evenodd" d="M35.247 4.39c1.004 -1.004 1.004 -2.632 0 -3.636 -1.004 -1.004 -2.632 -1.004 -3.636 0L26.091 6.273 22.766 2.948c-0.368 -0.368 -0.921 -0.478 -1.401 -0.279 -0.48 0.199 -0.78 0.68 -0.78 1.18v10.286c0 0.71 0.576 1.286 1.286 1.286h10.286c0.52 0 0.989 -0.313 1.188 -0.794 0.199 -0.48 0.089 -1.033 -0.279 -1.401l-3.325 -3.325 5.519 -5.519ZM13.234 33.052l-3.325 -3.325 -5.519 5.519c-1.004 1.004 -2.632 1.004 -3.636 0 -1.004 -1.004 -1.004 -2.632 0 -3.636l5.519 -5.519 -3.325 -3.325c-0.368 -0.368 -0.478 -0.921 -0.279 -1.401 0.199 -0.48 0.68 -0.78 1.18 -0.78h10.286c0.71 0 1.286 0.576 1.286 1.286v10.286c0 0.52 -0.313 0.989 -0.794 1.188 -0.48 0.199 -1.033 0.089 -1.401 -0.279Z" clipRule="evenodd" strokeWidth="2.571"></path>
    </g>
  </svg>
);

export default JsonImportExportIcon; 