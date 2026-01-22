'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass';
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = false, ...props }, ref) => {
    const variants = {
      default: 'bg-[var(--surface)] border border-[var(--border)] shadow-sm',
      elevated: 'bg-[var(--surface-elevated)] border border-[var(--border)] shadow-lg',
      glass: 'bg-[var(--surface)]/80 backdrop-blur-md border border-[var(--border)]/50 shadow-md',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg transition-all duration-200 overflow-hidden',
          variants[variant],
          hover && 'hover:shadow-lg hover:-translate-y-1 cursor-pointer',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export default Card;

