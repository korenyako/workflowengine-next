'use client'

import Button from '../Button'
import React, { useState } from 'react'
import PaymentOptions from './PaymentOptions'

// Компонент для иконки с тултипом
const InfoIcon = ({ tooltip, id, activeTooltip, setActiveTooltip }: { 
  tooltip: string
  id: string
  activeTooltip: string | null
  setActiveTooltip: (id: string | null) => void
}) => {
  const showTooltip = activeTooltip === id

  // Обработчик клика вне тултипа
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Element
    if (!target.closest('.info-icon-container')) {
      setActiveTooltip(null)
    }
  }

  // Добавляем и удаляем обработчик клика вне тултипа
  React.useEffect(() => {
    if (showTooltip) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showTooltip])

  return (
    <div className="relative inline-block info-icon-container" style={{ zIndex: 100 }}>
      <button
        className="text-gray-400 hover:text-gray-300 transition-colors cursor-pointer ml-1"
        onClick={(e) => {
          e.stopPropagation()
          setActiveTooltip(showTooltip ? null : id)
        }}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      </button>
      {showTooltip && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-4 py-3 bg-white text-gray-800 text-sm rounded-lg shadow-lg z-50 border border-gray-200" style={{ maxWidth: '500px', minWidth: '400px' }}>
          {tooltip}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white"></div>
        </div>
      )}
    </div>
  )
}

const subscriptionPlans = [
  {
    name: 'Online',
    price: 'FREE',
    description: 'Create forms online for free. Render them with the open-source WorkflowEngine Core.',
    cta: 'Build Form',
    features: [
      { label: 'Drag & Drop Form Designer', value: 'Online' },
      { label: 'Drag & Drop Form Designer UI customization', value: false },
      { label: 'Form localization languages', value: '∞' },
      { label: 'Number of domains', value: '∞' },
      { label: 'Wildcard (subdomain)', value: '∞' },
      { label: 'Form Renderer from JSON schema', value: '∞' },
      { label: 'Form Renderer by code', value: '∞' },
      { label: 'Ability to add custom components', value: true },
      { label: 'React Form Component library', value: true },
      { label: 'Repeater component', value: true },
      { label: 'Handwritten e-sign component', value: false },
      { label: 'QR Code component', value: false },
      { label: 'Rich Text Editor component', value: false },
      { label: 'Data Grid component', value: false },
      { label: 'Google Maps component', value: false },
      { label: 'Allowed for use within Public Web Application/SaaS', value: false },
      { label: 'Allowed for embedding and resale within your own products (OEM)', value: false },
      { label: 'Free updates period', value: true },
      { label: 'Provides source code', value: true },
    ],
  },
  {
    name: 'StartUp',
    price: '$899/year',
    description: 'Internal commercial use',
    tooltip: 'Use within internal apps and websites under your company perimeter',
    cta: 'Subscribe',
    href: 'https://buy.stripe.com/8x2bJ28xW4QY0i13ou7bW0L',
    features: [
      { label: 'Drag & Drop Form Designer', value: 'On-Premise' },
      { label: 'Drag & Drop Form Designer UI customization', value: false },
      { label: 'Form localization languages', value: '1' },
      { label: 'Number of domains', value: '1' },
      { label: 'Wildcard (subdomain)', value: false },
      { label: 'Form Renderer from JSON schema', value: true },
      { label: 'Form Renderer by code', value: true },
      { label: 'Ability to add custom components', value: true },
      { label: 'React Form Component library', value: true },
      { label: 'Repeater component', value: false },
      { label: 'Handwritten e-sign component', value: false },
      { label: 'QR Code component', value: false },
      { label: 'Rich Text Editor component', value: false },
      { label: 'Data Grid component', value: false },
      { label: 'Google Maps component', value: false },
      { label: 'Allowed for use within Public Web Application/SaaS', value: false },
      { label: 'Allowed for embedding and resale within your own products (OEM)', value: false },
      { label: 'Free updates period', value: 'Annual subscription' },
      { label: 'Provides source code', value: false },
    ],
  },
  {
    name: 'Business',
    price: '$1,499/year',
    description: 'Internal commercial use',
    tooltip: 'Use within internal apps and websites under your company perimeter',
    cta: 'Subscribe',
    href: 'https://buy.stripe.com/7sY6oIcOc1EMc0J4sy7bW0J',
    features: [
      { label: 'Drag & Drop Form Designer', value: 'On-Premise' },
      { label: 'Drag & Drop Form Designer UI customization', value: true },
      { label: 'Form localization languages', value: '3' },
      { label: 'Number of domains', value: '3' },
      { label: 'Wildcard (subdomain)', value: '∞' },
      { label: 'Form Renderer from JSON schema', value: true },
      { label: 'Form Renderer by code', value: true },
      { label: 'Ability to add custom components', value: true },
      { label: 'React Form Component library', value: true },
      { label: 'Repeater component', value: false },
      { label: 'Handwritten e-sign component', value: true },
      { label: 'QR Code component', value: true },
      { label: 'Rich Text Editor component', value: true },
      { label: 'Data Grid component', value: false },
      { label: 'Google Maps component', value: true },
      { label: 'Allowed for use within Public Web Application/SaaS', value: false },
      { label: 'Allowed for embedding and resale within your own products (OEM)', value: false },
      { label: 'Free updates period', value: 'Annual subscription' },
      { label: 'Provides source code', value: false },
    ],
  },
  {
    name: 'Enterprise',
    price: '$3,499/year',
    description: 'Public Web Application/SaaS',
    tooltip: 'Allowed in public SaaS or web applications with external users',
    cta: 'Subscribe',
    href: 'https://buy.stripe.com/00w8wQaG497e6Gpf7c7bW0N',
    features: [
      { label: 'Drag & Drop Form Designer', value: 'On-Premise' },
      { label: 'Drag & Drop Form Designer UI customization', value: true },
      { label: 'Form localization languages', value: '5' },
      { label: 'Number of domains', value: '5' },
      { label: 'Wildcard (subdomain)', value: '∞' },
      { label: 'Form Renderer from JSON schema', value: true },
      { label: 'Form Renderer by code', value: true },
      { label: 'Ability to add custom components', value: true },
      { label: 'React Form Component library', value: true },
      { label: 'Repeater component', value: true },
      { label: 'Handwritten e-sign component', value: true },
      { label: 'QR Code component', value: true },
      { label: 'Rich Text Editor component', value: true },
      { label: 'Data Grid component', value: true },
      { label: 'Google Maps component', value: true },
      { label: 'Allowed for use within Public Web Application/SaaS', value: true },
      { label: 'Allowed for embedding and resale within your own products (OEM)', value: false },
      { label: 'Free updates period', value: 'Annual subscription' },
      { label: 'Provides source code', value: false },
    ],
  },
  {
    name: 'Custom',
    price: 'Personal Case',
    description: 'Custom/OEM',
    tooltip: 'Custom use case. Includes OEM resale rights, branding, and licensing terms on request',
    cta: 'Contact us',
    features: [
      { label: 'Drag & Drop Form Designer', value: 'On-Premise' },
      { label: 'Drag & Drop Form Designer UI customization', value: true },
      { label: 'Form localization languages', value: true },
      { label: 'Number of domains', value: true },
      { label: 'Wildcard (subdomain)', value: true },
      { label: 'Form Renderer from JSON schema', value: true },
      { label: 'Form Renderer by code', value: true },
      { label: 'Ability to add custom components', value: true },
      { label: 'React Form Component library', value: true },
      { label: 'Repeater component', value: true },
      { label: 'Handwritten e-sign component', value: true },
      { label: 'QR Code component', value: true },
      { label: 'Rich Text Editor component', value: true },
      { label: 'Data Grid component', value: true },
      { label: 'Google Maps component', value: true },
      { label: 'Allowed for use within Public Web Application/SaaS', value: true },
      { label: 'Allowed for embedding and resale within your own products (OEM)', value: true },
      { label: 'Free updates period', value: 'Optional' },
      { label: 'Provides source code', value: true },
    ],
  },
]

const perpetualPlans = [
  {
    name: 'Online',
    price: 'FREE',
    description: 'Create forms online for free. Render them with the open-source WorkflowEngine Core.',
    cta: 'Build Form',
    features: [
      { label: 'Drag & Drop Form Designer', value: 'Online' },
      { label: 'Drag & Drop Form Designer UI customization', value: false },
      { label: 'Form localization languages', value: '∞' },
      { label: 'Number of domains', value: '∞' },
      { label: 'Wildcard (subdomain)', value: '∞' },
      { label: 'Form Renderer from JSON schema', value: '∞' },
      { label: 'Form Renderer by code', value: '∞' },
      { label: 'Ability to add custom components', value: true },
      { label: 'React Form Component library', value: true },
      { label: 'Repeater component', value: true },
      { label: 'Handwritten e-sign component', value: false },
      { label: 'QR Code component', value: false },
      { label: 'Rich Text Editor component', value: false },
      { label: 'Data Grid component', value: false },
      { label: 'Google Maps component', value: false },
      { label: 'Allowed for use within Public Web Application/SaaS', value: false },
      { label: 'Allowed for embedding and resale within your own products (OEM)', value: false },
      { label: 'Free updates period', value: true },
      { label: 'Provides source code', value: true },
    ],
  },
  {
    name: 'StartUp',
    price: '$1,299',
    description: 'Internal commercial use',
    tooltip: 'Use within internal apps and websites under your company perimeter',
    cta: 'Buy now',
    href: 'https://buy.stripe.com/cNibJ26pO3MU2q9aQW7bW0M',
    features: [
      { label: 'Drag & Drop Form Designer', value: 'On-Premise' },
      { label: 'Drag & Drop Form Designer UI customization', value: true },
      { label: 'Form localization languages', value: '1' },
      { label: 'Number of domains', value: '1' },
      { label: 'Wildcard (subdomain)', value: false },
      { label: 'Form Renderer from JSON schema', value: true },
      { label: 'Form Renderer by code', value: true },
      { label: 'Ability to add custom components', value: true },
      { label: 'React Form Component library', value: true },
      { label: 'Repeater component', value: false },
      { label: 'Handwritten e-sign component', value: false },
      { label: 'QR Code component', value: false },
      { label: 'Rich Text Editor component', value: false },
      { label: 'Data Grid component', value: false },
      { label: 'Google Maps component', value: false },
      { label: 'Allowed for use within Public Web Application/SaaS', value: false },
      { label: 'Allowed for embedding and resale within your own products (OEM)', value: false },
      { label: 'Free updates period', value: '6 month' },
      { label: 'Provides source code', value: false },
    ],
  },
  {
    name: 'Business',
    price: '$2,999',
    description: 'Internal commercial use',
    tooltip: 'Use within internal apps and websites under your company perimeter',
    cta: 'Buy now',
    href: 'https://buy.stripe.com/fZu14o7tSdnu6Gpf7c7bW0K',
    features: [
      { label: 'Drag & Drop Form Designer', value: 'On-Premise' },
      { label: 'Drag & Drop Form Designer UI customization', value: true },
      { label: 'Form localization languages', value: '3' },
      { label: 'Number of domains', value: '3' },
      { label: 'Wildcard (subdomain)', value: '∞' },
      { label: 'Form Renderer from JSON schema', value: true },
      { label: 'Form Renderer by code', value: true },
      { label: 'Ability to add custom components', value: true },
      { label: 'React Form Component library', value: true },
      { label: 'Repeater component', value: false },
      { label: 'Handwritten e-sign component', value: true },
      { label: 'QR Code component', value: true },
      { label: 'Rich Text Editor component', value: true },
      { label: 'Google Maps component', value: true },
      { label: 'Allowed for use within Public Web Application/SaaS', value: false },
      { label: 'Allowed for embedding and resale within your own products (OEM)', value: false },
      { label: 'Free updates period', value: '1 year' },
      { label: 'Provides source code', value: false },
    ],
  },
  {
    name: 'Enterprise',
    price: '$5,999',
    description: 'Public Web Application/SaaS',
    tooltip: 'Allowed in public SaaS or web applications with external users',
    cta: 'Buy now',
    href: 'https://buy.stripe.com/7sYcN615ugzG4yh8IO7bW0I',
    features: [
      { label: 'Drag & Drop Form Designer', value: 'On-Premise' },
      { label: 'Drag & Drop Form Designer UI customization', value: true },
      { label: 'Form localization languages', value: '∞' },
      { label: 'Number of domains', value: '∞' },
      { label: 'Wildcard (subdomain)', value: '∞' },
      { label: 'Form Renderer from JSON schema', value: true },
      { label: 'Form Renderer by code', value: true },
      { label: 'Ability to add custom components', value: true },
      { label: 'React Form Component library', value: true },
      { label: 'Repeater component', value: true },
      { label: 'Handwritten e-sign component', value: true },
      { label: 'QR Code component', value: true },
      { label: 'Rich Text Editor component', value: true },
      { label: 'Data Grid component', value: true },
      { label: 'Google Maps component', value: true },
      { label: 'Allowed for use within Public Web Application/SaaS', value: true },
      { label: 'Allowed for embedding and resale within your own products (OEM)', value: false },
      { label: 'Free updates period', value: '1 year' },
      { label: 'Provides source code', value: '1-Year Access to Source Code' },
    ],
  },
  {
    name: 'Custom',
    price: 'Personal Case',
    description: 'Custom/OEM',
    tooltip: 'Custom use case. Includes OEM resale rights, branding, and licensing terms on request',
    cta: 'Contact us',
    features: [
      { label: 'Drag & Drop Form Designer', value: 'On-Premise' },
      { label: 'Drag & Drop Form Designer UI customization', value: true },
      { label: 'Form localization languages', value: true },
      { label: 'Number of domains', value: true },
      { label: 'Wildcard (subdomain)', value: true },
      { label: 'Form Renderer from JSON schema', value: true },
      { label: 'Form Renderer by code', value: true },
      { label: 'Ability to add custom components', value: true },
      { label: 'React Form Component library', value: true },
      { label: 'Repeater component', value: true },
      { label: 'Handwritten e-sign component', value: true },
      { label: 'QR Code component', value: true },
      { label: 'Rich Text Editor component', value: true },
      { label: 'Data Grid component', value: true },
      { label: 'Google Maps component', value: true },
      { label: 'Allowed for use within Public Web Application/SaaS', value: true },
      { label: 'Allowed for embedding and resale within your own products (OEM)', value: true },
      { label: 'Free updates period', value: 'Optional' },
      { label: 'Provides source code', value: true },
    ],
  },
]

type Props = {
  planType: 'subscription' | 'perpetual'
}

export function PricingTable({ planType }: Props) {
  const plans = planType === 'subscription' ? subscriptionPlans : perpetualPlans
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  // Получаем все уникальные фичи из всех планов
  const allFeatures = plans.reduce((acc, plan) => {
    plan.features.forEach(feature => {
      if (!acc.find(f => f.label === feature.label)) {
        acc.push(feature)
      }
    })
    return acc
  }, [] as typeof plans[0]['features'])

  // Функция для отображения значения фичи
  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <svg 
          className="w-6 h-6 text-green-400 mx-auto" 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M5 12l5 5l10 -10" />
        </svg>
      ) : (
        <svg 
          className="w-6 h-6 text-red-400 mx-auto" 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      )
    }
    if (value === '∞') {
      return (
        <svg 
          className="w-6 h-6 text-blue-300 mx-auto" 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M9.828 9.172a4 4 0 1 0 0 5.656a10 10 0 0 0 2.172 -2.828a10 10 0 0 1 2.172 -2.828a4 4 0 1 1 0 5.656a10 10 0 0 1 -2.172 -2.828a10 10 0 0 0 -2.172 -2.828" />
        </svg>
      )
    }
    return <span className="text-gray-300 text-sm">{value}</span>
  }

  // Функция для получения значения фичи для конкретного плана
  const getFeatureValue = (plan: typeof plans[0], featureLabel: string) => {
    const feature = plan.features.find(f => f.label === featureLabel)
    return feature ? feature.value : false
  }

  return (
    <div className="overflow-x-auto w-full">
      {/* Шапка таблицы */}
      <div className="grid grid-cols-[minmax(250px,auto)_repeat(5,minmax(180px,1fr))] border-b border-gray-700 pb-8">
        <div className="p-4 font-subtitle text-gray-300 font-medium w-auto min-w-[250px]">
          <PaymentOptions />
          {/* Stripe Logo под Payment Options */}
          <div className="mt-8 flex justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="54 36 360.02 149.84" className="w-20 h-10">
              <g>
                <path fill="#635BFF" d="M414,113.4c0-25.6-12.4-45.8-36.1-45.8c-23.8,0-38.2,20.2-38.2,45.6c0,30.1,17,45.3,41.4,45.3   c11.9,0,20.9-2.7,27.7-6.5v-20c-6.8,3.4-14.6,5.5-24.5,5.5c-9.7,0-18.3-3.4-19.4-15.2h48.9C413.8,121,414,115.8,414,113.4z    M364.6,103.9c0-11.3,6.9-16,13.2-16c6.1,0,12.6,4.7,12.6,16H364.6z"/>
                <path fill="#635BFF" d="M301.1,67.6c-9.8,0-16.1,4.6-19.6,7.8l-1.3-6.2h-22v116.6l25-5.3l0.1-28.3c3.6,2.6,8.9,6.3,17.7,6.3   c17.9,0,34.2-14.4,34.2-46.1C335.1,83.4,318.6,67.6,301.1,67.6z M295.1,136.5c-5.9,0-9.4-2.1-11.8-4.7l-0.1-37.1   c2.6-2.9,6.2-4.9,11.9-4.9c9.1,0,15.4,10.2,15.4,23.3C310.5,126.5,304.3,136.5,295.1,136.5z"/>
                <polygon fill="#635BFF" points="223.8,61.7 248.9,56.3 248.9,36 223.8,41.3"/>
                <rect x="223.8" y="69.3" fill="#635BFF" width="25.1" height="87.5"/>
                <path fill="#635BFF" d="M196.9,76.7l-1.6-7.4h-21.6v87.5h25V97.5c5.9-7.7,15.9-6.3,19-5.2v-23C214.5,68.1,202.8,65.9,196.9,76.7z"/>
                <path fill="#635BFF" d="M146.9,47.6l-24.4,5.2l-0.1,80.1c0,14.8,11.1,25.7,25.9,25.7c8.2,0,14.2-1.5,17.5-3.3V135   c-3.2,1.3-19,5.9-19-8.9V90.6h19V69.3h-19L146.9,47.6z"/>
                <path fill="#635BFF" d="M79.3,94.7c0-3.9,3.2-5.4,8.5-5.4c7.6,0,17.2,2.3,24.8,6.4V72.2c-8.3-3.3-16.5-4.6-24.8-4.6   C67.5,67.6,54,78.2,54,95.9c0,27.6,38,23.2,38,35.1c0,4.6-4,6.1-9.6,6.1c-8.3,0-18.9-3.4-27.3-8v23.8c9.3,4,18.7,5.7,27.3,5.7   c20.8,0,35.1-10.3,35.1-28.2C117.4,100.6,79.3,105.9,79.3,94.7z"/>
              </g>
            </svg>
          </div>
        </div>
        {plans.map((plan) => (
          <div key={plan.name} className="flex flex-col justify-between h-full p-4 align-top">
            <div className="space-y-2">
              <span className="text-xl text-gray-300 block">
                {plan.name}
              </span>
              <div className="flex items-start gap-2">
                <span className="text-2xl font-bold text-white">
                  {plan.price.replace(/\/year|\/one-time/g, '')}
                </span>
                {(plan.price.includes('/year') || plan.price.includes('/one-time')) && (
                  <span className="text-sm font-body text-gray-400">
                    {plan.price.includes('/year') ? '/year' : '/one-time'}
                  </span>
                )}
              </div>
              <p className="text-gray-300 text-sm font-normal text-left">
                {plan.description}
                {plan.tooltip && (
                  <InfoIcon 
                    tooltip={plan.tooltip} 
                    id={`${planType}-${plan.name}`}
                    activeTooltip={activeTooltip}
                    setActiveTooltip={setActiveTooltip}
                  />
                )}
              </p>
            </div>
            <Button 
              variant={plan.cta === 'Contact us' ? 'secondary' : 'primary'}
              size="sm"
              className="w-full mt-8"
              href={plan.cta === 'Contact us' ? 'https://optimajet.com/contact-us/' : plan.cta === 'Build Form' ? 'https://formbuilder.workflowengine.io/' : plan.href}
              target={plan.cta === 'Contact us' || plan.cta === 'Build Form' ? '_blank' : '_self'}
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>



      {/* Тело таблицы */}
      <div className="grid grid-cols-[minmax(250px,auto)_repeat(5,minmax(180px,1fr))]">
        {allFeatures.map((feature, index) => (
          <React.Fragment key={feature.label}>
            <div className={`p-4 text-left text-gray-300 font-normal w-auto min-w-[250px] ${index % 2 === 0 ? 'bg-[#101828]' : ''}`}>
              {feature.label === 'React Form Component library' ? (
                <a 
                  href="#react-form-component-library" 
                  className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer underline decoration-dotted underline-offset-2"
                >
                  {feature.label}
                </a>
              ) : feature.label === 'Container component' ? (
                <a 
                  href="#component-container" 
                  className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer underline decoration-dotted underline-offset-2"
                >
                  {feature.label}
                </a>
              ) : feature.label === 'Repeater component' ? (
                <a 
                  href="#component-repeater" 
                  className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer underline decoration-dotted underline-offset-2"
                >
                  {feature.label}
                </a>
              ) : feature.label === 'QR Code component' ? (
                <a 
                  href="#component-qr-code" 
                  className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer underline decoration-dotted underline-offset-2"
                >
                  {feature.label}
                </a>
              ) : feature.label === 'Google Maps component' ? (
                <a 
                  href="#component-google-map" 
                  className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer underline decoration-dotted underline-offset-2"
                >
                  {feature.label}
                </a>
              ) : feature.label === 'Rich Text Editor component' ? (
                <a 
                  href="#component-rich-text-editor" 
                  className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer underline decoration-dotted underline-offset-2"
                >
                  {feature.label}
                </a>
              ) : feature.label === 'Handwritten e-sign component' ? (
                <a 
                  href="#component-signature" 
                  className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer underline decoration-dotted underline-offset-2"
                >
                  {feature.label}
                </a>
              ) : feature.label === 'Data Grid component' ? (
                <a 
                  href="#component-data-grid" 
                  className="text-blue-300 hover:text-blue-200 transition-colors cursor-pointer underline decoration-dotted underline-offset-2"
                >
                  {feature.label}
                </a>
              ) : (
                feature.label
              )}
            </div>
            {plans.map((plan) => (
              <div key={`${plan.name}-${feature.label}`} className={`p-4 text-center w-auto min-w-[180px] ${index % 2 === 0 ? 'bg-[#101828]' : ''}`}>
                {renderFeatureValue(getFeatureValue(plan, feature.label))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
} 