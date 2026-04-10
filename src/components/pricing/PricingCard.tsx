'use client'

import Button from '@/components/Button'

type Feature = {
  label: string
  value: boolean | string
}

type Props = {
  name: string
  price: string
  description: string
  features: Feature[]
  cta: string
  showDetails: boolean
  onToggleDetails?: () => void
}

export function PricingCard({ name, price, description, features, cta, showDetails, onToggleDetails }: Props) {
  // Показываем только первые 3 фичи, если детали скрыты
  const visibleFeatures = showDetails ? features : features.slice(0, 3)

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 flex flex-col shadow-md w-full h-full">
      <div className="flex-shrink-0">
        <h3 className="text-xl font-subtitle font-semibold text-blue-300 mb-4">{name}</h3>
        <div className="flex items-start gap-2 mb-1">
          <span className="text-3xl font-bold">{price.replace(/\/year|\/one-time/g, '')}</span>
          {(price.includes('/year') || price.includes('/one-time')) && (
            <span className="text-sm font-body text-gray-400">
              {price.includes('/year') ? '/year' : '/one-time'}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-400 mb-4 min-h-[3rem]">{description}</p>
      </div>
      
      <div className="flex-1 min-h-0">
        <ul className="space-y-2 mb-8 text-sm">
          {visibleFeatures.map((feature) => (
            <li key={feature.label} className="flex items-center gap-2">
              {feature.value === true ? (
                <span className="text-green-400">✓</span>
              ) : feature.value === false ? (
                <span className="text-gray-500">✗</span>
              ) : (
                <span className="text-blue-400">{feature.value}</span>
              )}
              <span className={feature.value === false ? 'text-gray-500' : ''}>
                {feature.label}
              </span>
            </li>
          ))}
          {!showDetails && features.length > 3 && (
            <li className="text-gray-400 text-sm">
              <button 
                onClick={onToggleDetails}
                className="text-blue-300 hover:text-blue-200 transition-colors duration-200 cursor-pointer"
              >
                +{features.length - 3} more features
              </button>
            </li>
          )}
        </ul>
      </div>
      
      <div className="flex-shrink-0">
        <Button variant="primary" size="md" className="w-full">
          {cta}
        </Button>
      </div>
    </div>
  )
}
  