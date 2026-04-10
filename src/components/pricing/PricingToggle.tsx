'use client'

type Props = {
  planType: 'subscription' | 'perpetual'
  setPlanType: (type: 'subscription' | 'perpetual') => void
}

export function PricingToggle({ planType, setPlanType }: Props) {
  return (
    <div className="flex flex-col items-center mb-10">
      <div className="inline-flex rounded-full border border-white p-1 mb-6">
        <button
          onClick={() => setPlanType('perpetual')}
          className={`px-6 py-2 rounded-full transition text-lg cursor-pointer ${
            planType === 'perpetual' ? 'bg-white text-gray-900' : 'text-gray-400 hover:text-white'
          }`}
        >
          Perpetual
        </button>
        <button
          onClick={() => setPlanType('subscription')}
          className={`px-6 py-2 rounded-full transition text-lg cursor-pointer ${
            planType === 'subscription' ? 'bg-white text-gray-900' : 'text-gray-400 hover:text-white'
          }`}
        >
          Subscription
        </button>
      </div>

      {/* Описания для каждого варианта */}
      <div className="text-center max-w-4xl">
        {planType === 'subscription' ? (
          <p className="text-gray-300 text-lg">
            This subscription renews each year and includes continuous product updates and improvements as long as your subscription remains active.
          </p>
        ) : (
          <p className="text-gray-300 text-lg">
            With this option, you'll pay once, and the product will continue working indefinitely without restrictions. It also includes 365 days of free updates from the date of purchase. After these 365 days, the product will still function fully, but updates will no longer be available unless you purchase access separately.
          </p>
        )}
      </div>
    </div>
  )
}
