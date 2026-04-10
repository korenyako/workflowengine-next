'use client'

import { useState } from 'react'

export function PromoBanner() {
  const [copied, setCopied] = useState(false)
  const promoCode = 'FE-50-OFF'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promoCode)
    } catch {
      // Fallback для старых браузеров
      const textarea = document.createElement('textarea')
      textarea.value = promoCode
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mb-10 p-6 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 shadow-xl flex items-center justify-between gap-6">
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-white mb-2">
          Limited-time offer for new customers
        </h3>
        <p className="text-gray-300 mb-4">
          Get 50% off any paid license. Use the promo code below at checkout. Valid for a limited time.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <code className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-900 font-mono text-lg text-white">
            {promoCode}
          </code>
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-lg text-gray-800 font-semibold bg-gradient-to-r from-blue-300 to-purple-300 hover:from-blue-400 hover:to-purple-400 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            {copied ? 'Copied ✓' : 'Copy code'}
          </button>
        </div>

        <p className="text-gray-500 text-sm mt-4">
          Valid until Jan 31 · One-time use per customer
        </p>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-32 h-32 text-gray-600 hidden sm:block flex-shrink-0 self-center"
      >
        <path d="M13.9461 2.09411C12.8248 1.13855 11.1756 1.13856 10.0544 2.0941L8.70636 3.24286C8.54619 3.37935 8.34705 3.46183 8.13728 3.47857L6.3718 3.61946C4.90327 3.73665 3.73714 4.90278 3.61995 6.3713L3.47907 8.13678C3.46234 8.34654 3.37983 8.54573 3.24334 8.70589L2.09458 10.0539C1.13904 11.1752 1.13905 12.8243 2.0946 13.9455L3.24336 15.2936C3.37983 15.4538 3.46232 15.6529 3.47906 15.8627L3.61997 17.6281C3.73716 19.0966 4.9033 20.2627 6.37184 20.3799L8.13729 20.5209C8.34705 20.5376 8.54615 20.6201 8.70631 20.7566L10.0543 21.9053C11.1756 22.8608 12.8248 22.8609 13.9461 21.9053L15.2941 20.7566C15.4542 20.6201 15.6533 20.5376 15.8631 20.5208L17.6286 20.3799C19.0971 20.2628 20.2632 19.0967 20.3805 17.6281L20.5213 15.8627C20.538 15.6529 20.6206 15.4537 20.757 15.2935L21.9058 13.9456C22.8614 12.8243 22.8614 11.1751 21.9058 10.0539L20.757 8.70585C20.6205 8.54568 20.5381 8.34654 20.5214 8.13679L20.3805 6.37131C20.2633 4.9028 19.0971 3.73663 17.6286 3.61945L15.8631 3.47856C15.6533 3.46182 15.4542 3.37935 15.2941 3.24286L13.9461 2.09411ZM14.8284 7.75718L16.2426 9.1714L9.17151 16.2425L7.7573 14.8282L14.8284 7.75718ZM10.2322 10.232C9.64638 10.8178 8.69664 10.8178 8.11085 10.232C7.52506 9.6463 7.52506 8.69652 8.11085 8.11073C8.69664 7.52494 9.64638 7.52494 10.2322 8.11073C10.818 8.69652 10.818 9.6463 10.2322 10.232ZM13.7677 15.8889C13.1819 15.3031 13.1819 14.3534 13.7677 13.7676C14.3535 13.1818 15.3032 13.1818 15.889 13.7676C16.4748 14.3534 16.4748 15.3031 15.889 15.8889C15.3032 16.4747 14.3535 16.4747 13.7677 15.8889Z"></path>
      </svg>
    </div>
  )
}
