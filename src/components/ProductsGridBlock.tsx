import React from "react";
import Link from "next/link";
import LibraryIcon from "./icons/LibraryIcon";
import ComponentsIcon from "./icons/ComponentsIcon";
import DragDropEditorIcon from "./icons/DragDropEditorIcon";

interface Product {
  icon: string; // путь к SVG иконке или имя React компонента
  title: string;
  description: string;
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
  blockBg,
}) => {
  // Определяем, светлый ли фон
  const isLightBg = blockBg === '#ffffff' || blockBg === 'white';
  
  // Цвета для текста в зависимости от фона
  const titleColor = isLightBg ? 'text-gray-900' : 'text-slate-900';
  const descriptionColor = isLightBg ? 'text-gray-600' : 'text-slate-600';
  const cardBg = isLightBg ? 'bg-white/50' : 'bg-slate-100'; // Полупрозрачный фон как в FAQ
  const cardTitleColor = isLightBg ? 'text-gray-900' : 'text-slate-900';
  const cardTextColor = isLightBg ? 'text-gray-600' : 'text-slate-600';

  // Функция для определения бейджа на основе названия продукта
  const getProductBadge = (productTitle: string) => {
    if (productTitle.includes('React Form Library')) {
      return { text: 'Core', color: 'border border-gray-300 text-slate-900' };
    } else if (productTitle.includes('React Form Components Library')) {
      return { text: 'Components', color: 'border border-gray-300 text-slate-900' };
    } else if (productTitle.includes('React Form Builder Library')) {
      return { text: 'Form Builder', color: 'bg-gradient-to-r from-blue-300 to-purple-300 text-gray-900' };
    }
    return null;
  };

  return (
    <section className="py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className={`text-3xl lg:text-4xl font-bold mb-6 ${titleColor} whitespace-pre-wrap break-words`}>{title}</h2>
        <p className={`text-lg lg:text-xl max-w-4xl mx-auto ${descriptionColor} whitespace-pre-wrap break-words`}>{description}</p>
      </div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product, idx) => {
          const badge = getProductBadge(product.title);
          
          return (
            <Link
              key={idx}
              href={product.href && product.href.startsWith('/') && product.href !== '/' && !product.href.includes('#') && !product.href.includes('?') && !product.href.endsWith('/') ? product.href + '/' : (product.href || '#')}
              className={`${cardBg} rounded-xl p-8 flex flex-col items-center text-center h-full transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer`}
            >
              {/* Бейдж продукта */}
              {badge && (
                <div className={`mb-6 px-4 py-2 rounded-full text-base font-semibold ${badge.color}`}>
                  {badge.text}
                </div>
              )}
              
              {/* Иконка продукта - скрыта */}
              {/* <div className="mb-6 w-12 h-12">
                {product.icon === 'LibraryIcon' && <LibraryIcon size={48} />}
                {product.icon === 'ComponentsIcon' && <ComponentsIcon size={48} />}
                {product.icon === 'DragDropEditorIcon' && <DragDropEditorIcon size={48} />}
                {!product.icon.startsWith('/') && !['LibraryIcon', 'ComponentsIcon', 'DragDropEditorIcon'].includes(product.icon) && (
                  <img src={product.icon} alt="" className="w-12 h-12" style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(246deg) brightness(104%) contrast(97%)' }} />
                )}
              </div> */}
              
              {/* Название продукта */}
              <h3 
                className="font-heading font-semibold tracking-wide mb-4 whitespace-pre-line break-words text-slate-900"
                style={{ fontSize: '2rem' }} // Увеличил с 1.5rem до 2rem
              >
                {product.title
                  .replace('React Form Library', 'React\nForm Library')
                  .replace('React Form Builder Library', 'React\nForm Builder\nLibrary')
                  .replace('React Form Components Library', 'React Form\nComponents Library')
                }
              </h3>
              
              {/* Описание продукта */}
              <p className={`text-lg lg:text-xl ${isLightBg ? 'text-gray-600' : 'text-slate-600'} whitespace-pre-wrap break-words leading-normal`}>{product.description}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ProductsGridBlock; 