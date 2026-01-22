'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CheckSquare, Moon, Sun, Menu } from 'lucide-react';
import { useThemeContext } from '@/components/providers/ThemeProvider';
import Button from '@/components/ui/Button';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useThemeContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const navLinks = [
    { href: '/', label: 'Dashboard' },
    { href: '/tasks', label: 'Tasks' },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--surface-elevated)]/95 backdrop-blur-md shadow-lg shadow-indigo-500/5">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <CheckSquare className="h-6 w-6 text-indigo-400" />
            <span className="text-xl font-bold">TaskFlow</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === link.href
                    ? 'bg-indigo-500/20 text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Button variant="icon" onClick={toggleTheme}>
              {resolvedTheme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <Button variant="icon" onClick={toggleTheme}>
              {resolvedTheme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-800/50 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  pathname === link.href
                    ? 'bg-indigo-500/20 text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
