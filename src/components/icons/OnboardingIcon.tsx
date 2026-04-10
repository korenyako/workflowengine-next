import React from 'react';

interface OnboardingIconProps {
  size?: number;
  className?: string;
}

const OnboardingIcon: React.FC<OnboardingIconProps> = ({ size = 24, className }) => (
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
      <path id="Subtract" fill="url(#grad1)" fillRule="evenodd" d="M2.5 0.857C1.118 0.857 0 1.975 0 3.357v13.005C0 17.744 1.118 18.857 2.5 18.857h6.902l-0.917 2.564h-1.625c-0.71 0 -1.286 0.576 -1.286 1.286s0.576 1.286 1.286 1.286h10.286c0.71 0 1.286 -0.576 1.286 -1.286s-0.576 -1.286 -1.286 -1.286h-1.625L14.6 18.857h6.902C22.882 18.857 24 17.744 24 16.362V3.357C24 1.975 22.882 0.857 21.5 0.857H2.5Zm11.195 3.923c0.674 0.225 1.038 0.953 0.813 1.626l-2.571 7.714c-0.225 0.674 -0.953 1.038 -1.626 0.813 -0.674 -0.225 -1.038 -0.953 -0.813 -1.626l2.571 -7.714c0.225 -0.674 0.953 -1.038 1.626 -0.813ZM8.551 8.691c0.539 -0.462 0.602 -1.274 0.139 -1.813 -0.462 -0.539 -1.274 -0.602 -1.813 -0.139l-3 2.571c-0.287 0.246 -0.452 0.607 -0.449 0.985 0.003 0.378 0.172 0.737 0.463 0.979l2.571 2.143c0.546 0.455 1.356 0.381 1.811 -0.165 0.455 -0.546 0.381 -1.356 -0.165 -1.811l-1.403 -1.169 1.845 -1.581Zm8.986 -1.535c-0.545 -0.455 -1.356 -0.381 -1.811 0.165 -0.455 0.546 -0.381 1.356 0.165 1.811l1.403 1.169 -1.845 1.581c-0.539 0.462 -0.602 1.274 -0.139 1.813 0.462 0.539 1.274 0.602 1.813 0.139l3.000 -2.571c0.287 -0.246 0.452 -0.607 0.449 -0.985 -0.003 -0.378 -0.172 -0.737 -0.463 -0.979l-2.571 -2.143Z" clipRule="evenodd" strokeWidth="1.714"></path>
    </g>
  </svg>
);

export default OnboardingIcon; 