import React from 'react';

interface LayoutControlsIconProps {
  size?: number;
  className?: string;
}

const LayoutControlsIcon: React.FC<LayoutControlsIconProps> = ({ size = 24, className }) => (
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
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#60A5FA', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#C084FC', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path d="M3.915 3.18c0 -1.62159375 1.31840625 -2.94 2.94 -2.94h10.29c1.62159375 0 2.94 1.31840625 2.94 2.94v17.64c0 1.62159375 -1.31840625 2.94 -2.94 2.94H6.855c-1.62159375 0 -2.94 -1.31840625 -2.94 -2.94V3.18Zm9.555 17.64c0 -1.13160625 -1.225 -1.8388625 -2.205 -1.27305625 -0.45481875 0.2625875 -0.735 0.747875 -0.735 1.27305625 0 1.13160625 1.225 1.8388625 2.205 1.27305625 0.45481875 -0.2625875 0.735 -0.747875 0.735 -1.27305625Zm3.675 -17.64H6.855v14.7h10.29V3.18Z" fill="url(#grad1)" strokeWidth="0.0625"></path>
  </svg>
);

export default LayoutControlsIcon; 