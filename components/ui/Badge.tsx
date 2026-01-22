'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { getPriorityColor, getStatusColor } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'status' | 'priority' | 'default';
  type?: string;
  size?: 'sm' | 'md';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', type, size = 'sm', children, ...props }, ref) => {
    const getColor = () => {
      if (variant === 'status' && type) {
        return getStatusColor(type);
      }
      if (variant === 'priority' && type) {
        return getPriorityColor(type);
      }
      return 'bg-gray-500';
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-medium text-white',
          getColor(),
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;

