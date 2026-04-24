'use client';

import React, { useState } from "react";

interface FooterLink {
  text: string;
  href: string;
  badge?: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  icon: string;
  href: string;
}

interface FooterBlockProps {
  columns: FooterColumn[];
  socialLinks?: SocialLink[];
  logo?: string;
  copyright?: string;
  companyInfo?: {
    logo: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    location: string;
  };
}

const FooterBlock: React.FC<FooterBlockProps> = ({ columns, socialLinks, logo, copyright, companyInfo }) => {
  const [copied, setCopied] = useState(false);
  const currentYear = new Date().getFullYear();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };
  return (
    <footer className="text-slate-700 pt-24 pb-12 px-4 sm:px-8 bg-[#F1F5F9] rounded-t-[40px] lg:rounded-t-[48px] mx-4 sm:mx-6 lg:mx-8 mt-4 lg:mt-6">
      <div className="max-w-6xl mx-auto">
        {/* 4 колонки со ссылками */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {columns.map((col, idx) => (
            <div key={idx}>
              {col.title && (
                <div className="text-sm uppercase tracking-[0.2em] font-mono font-medium text-[#4286F4] mb-4">{col.title}</div>
              )}
              {col.links.length > 0 && (
                <ul className="space-y-2">
                  {col.links.map((link, lidx) => (
                    <li key={lidx}>
                      <a 
                        href={link.href} 
                        className="text-slate-900 hover:text-[#4286F4] transition-colors text-base flex items-center gap-2"
                        target={link.href.startsWith('http') && !link.href.startsWith('https://workflowengine.io/') ? '_blank' : '_self'}
                        rel={link.href.startsWith('http') && !link.href.startsWith('https://workflowengine.io/') ? 'noopener noreferrer' : undefined}
                      >
                        {link.text}
                        {link.badge && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#4286F4]/15 text-[#4286F4]">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        
        {/* Блок Optimajet на 100% ширины */}
        {companyInfo && (
          <div className="border-b border-slate-300 pb-8">
            <div className="space-y-4">
              {/* Логотип + соцсети */}
              <div className="flex items-center justify-between gap-4">
                <a
                  href="https://optimajet.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:opacity-80 transition-opacity"
                >
                  <img src={companyInfo.logo} alt="OptimaJet" className="h-8" />
                </a>
                {socialLinks && socialLinks.length > 0 && (
                  <div className="flex items-center gap-3">
                    {socialLinks.map((s, idx) => (
                      <a
                        key={idx}
                        href={s.href}
                        className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.icon}
                      >
                        <img src={s.icon} alt="" className="w-8 h-8" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Описание компании */}
              <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
                {companyInfo.description}
              </p>

              {/* Контактная информация */}
              <div className="space-y-1 text-sm text-slate-600">
                <p>{companyInfo.address}</p>
                <p>{companyInfo.phone}</p>
                <p className="flex items-center gap-2">
                  {companyInfo.email}
                  <button
                    onClick={() => copyToClipboard(companyInfo.email)}
                    className="text-slate-500 hover:text-slate-900 transition-all duration-200 cursor-pointer"
                    title="Copy email"
                  >
                    {copied ? (
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </p>
                <p>{companyInfo.location}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Copyright + legal links */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 text-sm text-slate-500 pt-8">
          <div>© {currentYear} Optimajet Limited. All rights reserved.</div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a
              href="https://optimajet.com/products/workflowengine/eula/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors"
            >
              License Agreement
            </a>
            <a
              href="https://optimajet.com/products/workflowengine/csa/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors"
            >
              Customer Support Agreement
            </a>
            <a
              href="https://workflowengine.io/agreements/policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterBlock; 