import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  children: ReactNode;
  className?: string;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseClasses = 'rounded-lg px-6 py-3 font-display font-semibold transition-colors duration-200';
  
  const variants = {
    primary: 'bg-brand-primary text-white hover:bg-brand-hover',
    outline: 'border border-brand-primary text-brand-primary hover:bg-brand-light dark:hover:bg-white/10'
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
