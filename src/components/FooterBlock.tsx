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
  icon: string; // emoji или svg/name
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
    <footer className="text-slate-700 py-12 px-4 sm:px-8 bg-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto">
        {/* 4 колонки со ссылками */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {columns.map((col, idx) => (
            <div key={idx}>
              {col.title && (
                <div className="font-bold text-slate-900 mb-4 uppercase tracking-wide text-lg">{col.title}</div>
              )}
              {col.links.length > 0 && (
                <ul className="space-y-2">
                  {col.links.map((link, lidx) => (
                    <li key={lidx}>
                      <a 
                        href={link.href} 
                        className="text-slate-600 hover:text-slate-900 transition-colors text-base flex items-center gap-2"
                        target={link.href.startsWith('http') && !link.href.startsWith('https://workflowengine.io/') ? '_blank' : '_self'}
                        rel={link.href.startsWith('http') && !link.href.startsWith('https://workflowengine.io/') ? 'noopener noreferrer' : undefined}
                      >
                        {link.text}
                        {link.badge && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
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
          <div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              {/* Логотип компании */}
              <div>
                <a 
                  href="https://optimajet.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block hover:opacity-80 transition-opacity"
                >
                  <img src={companyInfo.logo} alt="OptimaJet" className="h-8" />
                </a>
              </div>
              
              {/* Описание компании */}
              <p className="text-base text-slate-600 leading-relaxed max-w-4xl">
                {companyInfo.description}
              </p>

              {/* Контактная информация */}
              <div className="space-y-1 text-base text-slate-600">
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
        
        {/* Copyright и социальные сети */}
        <div className="flex justify-between items-center text-base text-slate-500 pt-8">
          <div>
            © 2023-{currentYear} Optimajet Limited. All rights reserved.
            <br />
            We ❤️ React
          </div>
          <div className="flex space-x-3">
            {socialLinks && socialLinks.map((s, idx) => (
              <a 
                key={idx} 
                href={s.href} 
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img src={s.icon} alt="" className="w-8 h-8 opacity-60 hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterBlock; 