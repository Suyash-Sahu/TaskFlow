import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Task Management Dashboard",
  description:
    "A modern, production-ready task management application built with Next.js 15+",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('theme');
                  let theme = stored;
                  if (stored) {
                    try {
                      theme = JSON.parse(stored);
                    } catch {
                      theme = stored;
                    }
                  }
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const effectiveTheme = (theme && theme !== 'system' && theme !== 'null') ? theme : systemTheme;
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(effectiveTheme);
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        <ThemeProvider>
          <ToastProvider>
            <div className="flex min-h-screen flex-col">
              
              {/* Header */}
              <Navbar />

              {/* ✅ GLOBAL PAGE BREATHING SPACE */}
              <main className="flex-1 w-full pt-12 pb-16">
                {children}
              </main>

              {/* Footer */}
              <Footer />

            </div>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
