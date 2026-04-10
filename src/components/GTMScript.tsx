'use client'

import { useEffect } from 'react'

export default function GTMScript({ gtmId }: { gtmId: string }) {
  useEffect(() => {
    // @ts-ignore dataLayer is a GTM global
    window.dataLayer = window.dataLayer || []
    // @ts-ignore dataLayer is a GTM global
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
    document.head.appendChild(script)
  }, [gtmId])

  return null
}
