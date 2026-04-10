'use client'

import { useState } from 'react'

export function PromoBannerEmail() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    // Симуляция отправки (заменить на реальный API)
    setTimeout(() => {
      setStatus('success')
    }, 1000)
  }

  return (
    <div className="mb-10 p-6 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 shadow-xl flex items-center justify-between gap-6">
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-white mb-2">
          Get your exclusive promo code
        </h3>
        <p className="text-gray-300 mb-4">
          Enter your email to receive a 50% discount code. We'll send it right away.
        </p>

        {status === 'success' ? (
          <div className="flex items-center gap-2 text-green-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Check your inbox! Promo code sent to {email}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent w-full sm:w-64"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-4 py-2 rounded-lg text-gray-800 font-semibold bg-gradient-to-r from-blue-300 to-purple-300 hover:from-blue-400 hover:to-purple-400 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending...' : 'Get promo code'}
            </button>
          </form>
        )}

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
        {/* Ticket/coupon icon */}
        <path d="M4 4C2.89543 4 2 4.89543 2 6V9C3.10457 9 4 9.89543 4 11C4 12.1046 3.10457 13 2 13V16C2 17.1046 2.89543 18 4 18H20C21.1046 18 22 17.1046 22 16V13C20.8954 13 20 12.1046 20 11C20 9.89543 20.8954 9 22 9V6C22 4.89543 21.1046 4 20 4H4ZM9 7V9H10V7H9ZM9 10V12H10V10H9ZM9 13V15H10V13H9ZM13 8.5C13 7.67157 13.6716 7 14.5 7C15.3284 7 16 7.67157 16 8.5C16 9.32843 15.3284 10 14.5 10C13.6716 10 13 9.32843 13 8.5ZM13 13.5C13 12.6716 13.6716 12 14.5 12C15.3284 12 16 12.6716 16 13.5C16 14.3284 15.3284 15 14.5 15C13.6716 15 13 14.3284 13 13.5Z" />
      </svg>
    </div>
  )
}
