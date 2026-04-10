'use client'

import { useState } from 'react'
import { PricingToggle } from '@/components/pricing/PricingToggle'
import { PricingTable } from '@/components/pricing/PricingTable'
import { PromoBanner } from '@/components/pricing/PromoBanner'
import { PromoBannerEmail } from '@/components/pricing/PromoBannerEmail'

export default function Pricing() {
  const [planType, setPlanType] = useState<'subscription' | 'perpetual'>('perpetual')

  return (
    <section className="pt-0 pb-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-2">
          <PricingToggle planType={planType} setPlanType={setPlanType} />
        </div>

        {/* TODO: раскомментировать когда будут готовы коллеги
        <PromoBanner />
        <PromoBannerEmail />
        */}

        <PricingTable planType={planType} />
      </div>
    </section>
  )
}
