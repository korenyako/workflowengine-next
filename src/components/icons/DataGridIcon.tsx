import React from 'react';

interface DataGridIconProps {
  size?: number;
  className?: string;
}

const DataGridIcon: React.FC<DataGridIconProps> = ({ size = 24, className }) => (
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
    <path fill="url(#grad1)" fillRule="evenodd" d="M2.571428571428571 0C1.151268 0 0 1.151268 0 2.571428571428571v2.357142857142857h24V2.571428571428571c0 -1.4201605714285714 -1.1513142857142855 -2.571428571428571 -2.571428571428571 -2.571428571428571h-18.857142857142858ZM0 7.071428571428571h6.642857142857142V24H2.571428571428571C1.151268 24 0 22.848685714285715 0 21.428571428571427V7.071428571428571Zm8.785714285714285 8.571428571428571V24H21.428571428571427c1.4201142857142857 0 2.571428571428571 -1.1513142857142855 2.571428571428571 -2.571428571428571V15.642857142857142H8.785714285714285ZM24 13.5H8.785714285714285v-6.428571428571428H24v6.428571428571428Z" clipRule="evenodd" strokeWidth="1.7143"></path>
  </svg>
);

export default DataGridIcon; 