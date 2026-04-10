import React from 'react';

interface DragDropEditorIconProps {
  size?: number;
  className?: string;
}

const DragDropEditorIcon: React.FC<DragDropEditorIconProps> = ({ size = 24, className }) => (
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
      <linearGradient id="dragDropGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#60A5FA', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#C084FC', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <g>
      <path id="Union" fill="url(#dragDropGradient)" fillRule="evenodd" d="M5.644 0.25c0.617 -0.166 1.252 0.201 1.417 0.818l0.692 2.581c0.166 0.617 -0.201 1.252 -0.818 1.417 -0.617 0.166 -1.252 -0.201 -1.417 -0.818l-0.692 -2.581c-0.166 -0.617 0.201 -1.252 0.818 -1.417ZM0.11 5.793c-0.166 0.617 0.201 1.252 0.818 1.417l2.581 0.692c0.617 0.166 1.252 -0.201 1.417 -0.818 0.166 -0.617 -0.201 -1.252 -0.818 -1.417L1.527 5.975c-0.617 -0.166 -1.252 0.201 -1.417 0.818ZM6.899 8.825c-0.403 -1.207 0.745 -2.354 1.952 -1.952l10.984 3.664c1.42 0.473 1.402 2.488 -0.026 2.936l-3.127 0.982 4.166 4.166c0.602 0.602 0.602 1.579 0 2.182 -0.602 0.602 -1.579 0.602 -2.182 0l-4.175 -4.175 -0.991 3.155c-0.448 1.428 -2.462 1.446 -2.936 0.026L6.899 8.825ZM3.188 13.508c-0.452 0.452 -1.184 0.452 -1.636 0 -0.452 -0.452 -0.452 -1.184 0 -1.636l1.889 -1.889c0.452 -0.452 1.184 -0.452 1.636 0 0.452 0.452 0.452 1.184 0 1.636L3.188 13.508Zm9.967 -10.169c0.452 -0.452 0.452 -1.184 0 -1.636 -0.452 -0.452 -1.184 -0.452 -1.636 0L9.629 3.591c-0.452 0.452 -0.452 1.184 0 1.636 0.452 0.452 1.184 0.452 1.636 0l1.889 -1.889Z" clipRule="evenodd" strokeWidth="1.542"></path>
    </g>
  </svg>
);

export default DragDropEditorIcon; 