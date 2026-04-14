import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline-white';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  isLightBg?: boolean;
  target?: '_blank' | '_self';
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  disabled = false,
  target = '_self',
  icon,
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200';

  const getVariantClasses = () => {
    if (variant === 'primary') {
      return 'text-gray-800 bg-gradient-to-r from-blue-300 to-purple-300 hover:from-blue-400 hover:to-purple-400';
    }
    if (variant === 'outline-white') {
      return 'border border-white text-slate-900 hover:bg-white hover:text-gray-900';
    }
    if (variant === 'secondary') {
      return 'border border-gray-300 text-slate-900 hover:bg-white hover:text-gray-900';
    }
    return '';
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const classes = `${baseClasses} ${getVariantClasses()} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  const content = (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http');

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
};

export default Button;
