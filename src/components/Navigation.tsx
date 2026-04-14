'use client';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Window { dataLayer?: any[]; }
}

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from './Button';
import { getCachedStargazers } from '@/lib/stargazersCache';

interface NavLink {
  title: string;
  href: string;
  external?: boolean;
}

const navLinks: NavLink[] = [
  { title: 'Features', href: '/features' },
  { title: 'Workflow Server', href: '/server' },
  { title: 'Downloads', href: '/downloads' },
  { title: 'Pricing', href: 'https://optimajet.com/products/workflowengine/price/', external: true },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact Us', href: '/contacts' },
];

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const cached = getCachedStargazers();
  const stars = cached?.count ?? null;

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);


  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-[#0d1117] px-4 py-4 lg:px-8 z-50 border-b border-gray-800">
        <div className="flex items-center max-w-full">
          {/* Logo */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            <Link href="/" className="flex items-center">
              <img
                src="/logos/workflowengine.svg"
                alt="WorkflowEngine"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4 ml-8">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 rounded-lg transition-all duration-200 text-white hover:text-white hover:bg-gray-800"
                >
                  {link.title}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-blue-300 bg-gray-800'
                      : 'text-white hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {link.title}
                </Link>
              )
            )}
            <a
              href="https://workflowengine.io/documentation/"
              className="px-3 py-2 rounded-lg transition-all duration-200 text-white hover:text-white hover:bg-gray-800"
            >
              Documentation
            </a>
          </div>

          {/* Right side buttons */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8 ml-auto">
            <a
              href="https://github.com/optimajet/workflowengine"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              {stars !== null && (
                <span className="text-sm font-medium flex items-center">
                  <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
                  </svg>
                  {stars.toLocaleString('en-US')}
                </span>
              )}
            </a>
            <div className="flex items-center space-x-4">
              <Button variant="primary" size="sm" href="/downloads">
                Download
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden ml-auto">
            <button
              className="text-gray-300 hover:text-white transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#0d1117] z-40 lg:hidden pt-20 overflow-y-auto">
          <div className="px-4 py-4 space-y-4">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-white hover:bg-gray-800 rounded-lg"
                >
                  {link.title}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-white hover:bg-gray-800 rounded-lg"
                >
                  {link.title}
                </Link>
              )
            )}
            <a
              href="https://workflowengine.io/documentation/"
              className="block px-4 py-3 text-white hover:bg-gray-800 rounded-lg"
            >
              Documentation
            </a>
            <div className="pt-4 border-t border-gray-800">
              <Button variant="primary" size="md" href="/downloads" className="w-full">
                Download
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
