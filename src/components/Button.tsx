import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline-white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
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
    'inline-flex items-center justify-center font-semibold rounded-full transition-colors duration-200';

  const getVariantClasses = () => {
    if (variant === 'primary') {
      return 'text-white bg-[#4286F4] hover:bg-[#2e6ad4]';
    }
    if (variant === 'outline-white') {
      return 'border-2 border-white text-slate-900 hover:bg-white hover:text-gray-900';
    }
    if (variant === 'secondary') {
      return 'border-2 border-[#4286F4] text-[#4286F4] bg-transparent hover:bg-[#4286F4] hover:text-white';
    }
    return '';
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-3 text-lg',
    xl: 'px-12 py-5 text-2xl',
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
      <Link href={href} className={classes} prefetch={false}>
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
