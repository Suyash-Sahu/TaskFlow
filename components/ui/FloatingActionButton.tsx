'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingActionButtonProps {
  href: string;
  label?: string;
  className?: string;
}

export default function FloatingActionButton({
  href,
  label = 'New Task',
  className,
}: FloatingActionButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'flex items-center gap-2',
        'bg-[var(--primary)] text-white',
        'px-6 py-4 rounded-full shadow-lg',
        'hover:bg-[var(--primary-hover)]',
        'transition-all duration-200',
        'hover:scale-110 hover:shadow-xl',
        'focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2',
        className
      )}
      aria-label={label}
    >
      <Plus className="h-5 w-5" />
      <span className="font-medium hidden sm:inline">{label}</span>
    </Link>
  );
}

