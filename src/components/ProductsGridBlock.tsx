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

const normalizeHref = (href?: string): string => {
  if (!href) return "#";
  if (!href.startsWith("/") || href === "/" || href.includes("#") || href.includes("?") || href.endsWith("/")) {
    return href;
  }
  return href + "/";
};

const ProductsGridBlock: React.FC<ProductsGridBlockProps> = ({
  title,
  description,
  products,
}) => {
  return (
    <section className="py-12 lg:py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl lg:text-5xl xl:text-6xl font-heading text-slate-900 mb-6 whitespace-pre-wrap break-words">{title}</h2>
        <p className="text-xl text-slate-600 max-w-4xl mx-auto whitespace-pre-wrap break-words">{description}</p>
      </div>

      <div className={`-mx-4 sm:-mx-8 grid grid-cols-1 ${products.length <= 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-6 lg:gap-8`}>
        {products.map((product, idx) => {
          const href = normalizeHref(product.href);

          return (
            <Link
              key={idx}
              href={href}
              className="group border-2 border-slate-200 hover:bg-slate-100 hover:border-slate-100 text-[#4286F4] no-underline rounded-3xl p-10 lg:p-12 xl:p-16 flex flex-col transition-colors duration-200 cursor-pointer"
            >
              {product.icon && product.icon.startsWith('/') && (
                <img src={product.icon} alt="" className="w-20 h-20 lg:w-24 lg:h-24 mb-8" />
              )}

              <h3 className="text-3xl lg:text-4xl xl:text-5xl font-heading mb-6 whitespace-pre-line break-words text-[#4286F4]">
                {product.title}
              </h3>

              <p className="text-lg lg:text-xl xl:text-2xl text-slate-700 leading-relaxed whitespace-pre-wrap break-words">
                {product.description}
              </p>

              {product.whyChoose && (
                <div className="mt-8 flex items-start gap-2 text-base lg:text-lg text-slate-600">
                  <ArrowRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#4286F4]" aria-hidden />
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
