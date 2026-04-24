'use client';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Window { dataLayer?: any[]; }
}

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from './Button';

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
      <nav className="fixed top-0 left-0 w-full bg-white px-4 py-4 lg:px-8 z-50 border-b border-slate-200">
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
          <div className="hidden lg:flex lg:items-center lg:space-x-2 ml-8">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-full transition-colors duration-200 text-slate-700 hover:bg-slate-100"
                >
                  {link.title}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full transition-colors duration-200 text-slate-700 ${
                    isActive(link.href) ? 'bg-slate-100' : 'hover:bg-slate-100'
                  }`}
                >
                  {link.title}
                </Link>
              )
            )}
            <a
              href="https://workflowengine.io/documentation/"
              className="px-4 py-2 rounded-full transition-colors duration-200 text-slate-700 hover:bg-slate-100"
            >
              Documentation
            </a>
          </div>

          {/* Right side buttons */}
          <div className="hidden lg:flex lg:items-center ml-auto">
            <Button variant="primary" size="sm" href="/downloads">
              Download
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden ml-auto">
            <button
              className="text-slate-600 hover:text-slate-900 transition-colors duration-200"
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
        <div className="fixed inset-0 bg-white z-40 lg:hidden pt-20 overflow-y-auto">
          <div className="px-4 py-4 space-y-4">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-slate-800 hover:bg-slate-100 rounded-full"
                >
                  {link.title}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-slate-800 hover:bg-slate-100 rounded-full"
                >
                  {link.title}
                </Link>
              )
            )}
            <a
              href="https://workflowengine.io/documentation/"
              className="block px-4 py-3 text-slate-800 hover:bg-slate-100 rounded-full"
            >
              Documentation
            </a>
            <div className="pt-4 border-t border-slate-200">
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
