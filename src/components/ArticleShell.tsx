import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

export default function ArticleShell({
  title,
  children,
  textAlign = 'center',
  bottomPadding = 'pb-48',
  footerMargin = 'mt-16',
}: { title?: string; children: React.ReactNode; textAlign?: 'left' | 'center'; bottomPadding?: string; footerMargin?: string }) {
  return (
    <>
      {/* Навигация всегда отображается первой */}
      <Navigation />
      
      {/* Основной контент с отступом сверху для фиксированной навигации */}
      <main className="pt-16 min-h-screen">
        <section className="bg-transparent text-slate-900">
          <div className={`mx-auto max-w-6xl px-4 py-10 md:py-14 ${bottomPadding}`}>
            {title ? (
              <h1 className={`font-[Poppins] text-3xl md:text-4xl leading-tight mb-6 ${textAlign === 'center' ? 'text-center' : 'text-left'}`}>
                {title}
              </h1>
            ) : null}
            <div className={`article-content space-y-5 font-[Space Grotesk] text-lg lg:text-xl leading-8 ${textAlign === 'center' ? 'text-center' : 'text-left'}`}>
              {children}
            </div>
          </div>
        </section>
      </main>
      
      {/* Единый футер для всех страниц */}
      <div className={footerMargin}>
        <Footer />
      </div>
    </>
  );
}
