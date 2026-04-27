import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Product {
  icon: string;
  title: string;
  description: string;
  whyChoose?: string;
  href?: string;
}

interface ProductsGridBlockProps {
  title: string;
  description: string;
  products: Product[];
  blockBg?: string;
}

const ProductsGridBlock: React.FC<ProductsGridBlockProps> = ({
  title,
  description,
  products,
}) => {
  // Функция для определения бейджа на основе названия продукта
  const getProductBadge = (productTitle: string) => {
    if (productTitle.includes('React Form Library')) {
      return { text: 'Core', color: 'border-2 border-gray-300 text-slate-900' };
    } else if (productTitle.includes('React Form Components Library')) {
      return { text: 'Components', color: 'border-2 border-gray-300 text-slate-900' };
    } else if (productTitle.includes('React Form Builder Library')) {
      return { text: 'Form Builder', color: 'bg-gradient-to-r from-[#93d8ff] to-[#85afff] text-gray-900' };
    }
    return null;
  };

  return (
    <section className="py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl lg:text-5xl xl:text-6xl font-heading text-slate-900 mb-6 whitespace-pre-wrap break-words">{title}</h2>
        <p className="text-xl text-slate-600 max-w-4xl mx-auto whitespace-pre-wrap break-words">{description}</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product, idx) => {
          const badge = getProductBadge(product.title);

          return (
            <Link
              key={idx}
              href={product.href && product.href.startsWith('/') && product.href !== '/' && !product.href.includes('#') && !product.href.includes('?') && !product.href.endsWith('/') ? product.href + '/' : (product.href || '#')}
              className="flex flex-col h-full transition-opacity duration-200 hover:opacity-80 cursor-pointer"
            >
              <div className="bg-white rounded-3xl p-8 flex flex-col items-center text-center flex-1 relative z-10">
                {badge && (
                  <div className={`mb-6 px-4 py-2 rounded-full text-base font-semibold ${badge.color}`}>
                    {badge.text}
                  </div>
                )}

                {product.icon && product.icon.startsWith('/') && (
                  <img src={product.icon} alt="" className="w-20 h-20 mb-4" />
                )}

                <h3 className="text-2xl lg:text-3xl font-heading text-slate-900 mb-3 whitespace-pre-line break-words">
                  {product.title
                    .replace('React Form Library', 'React\nForm Library')
                    .replace('React Form Builder Library', 'React\nForm Builder\nLibrary')
                    .replace('React Form Components Library', 'React Form\nComponents Library')
                  }
                </h3>

                <p className="text-lg text-slate-600 whitespace-pre-wrap break-words">{product.description}</p>
              </div>

              {product.whyChoose && (
                <div className="bg-[#4286F4]/10 text-slate-900 font-normal rounded-2xl -mt-8 pt-12 pb-4 px-5 text-sm leading-relaxed relative z-0 flex items-start gap-2 text-left">
                  <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#4286F4]" aria-hidden />
                  <span>{product.whyChoose}</span>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ProductsGridBlock; 