'use client';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--border)] 
                        bg-[var(--background)]
                        backdrop-blur-sm">
      <div className="container mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-secondary)]">
            © {new Date().getFullYear()}{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              TaskFlow
            </span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
