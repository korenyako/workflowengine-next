import React from 'react';

interface WhiteLabelIconProps {
  size?: number;
  className?: string;
}

const WhiteLabelIcon: React.FC<WhiteLabelIconProps> = ({ size = 24, className }) => (
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
    <g>
      <path id="Union" fill="url(#grad1)" fillRule="evenodd" d="M13.602651428571427 1.122468C13.058399999999999 -0.3742337142857143 10.941651428571427 -0.37421828571428567 10.3974 1.122469714285714L7.924114285714285 7.924028571428571 1.122545142857143 10.397331428571428c-1.4967 0.5442514285714285 -1.4966845714285713 2.6609828571428573 0.00000342857142857143 3.2052342857142855L7.924114285714285 16.07586857142857l2.4732857142857143 6.801617142857142c0.5442514285714285 1.4965714285714284 2.6609999999999996 1.4965714285714284 3.205251428571428 0l2.4732857142857143 -6.801617142857142 6.801548571428571 -2.473302857142857c1.496742857142857 -0.5442514285714285 1.496742857142857 -2.6609828571428573 0 -3.2052342857142855L16.075937142857143 7.924028571428571 13.602651428571427 1.122468Z" clipRule="evenodd" strokeWidth="1.7143"></path>
    </g>
  </svg>
);

export default WhiteLabelIcon; 