'use client'

import { useState } from 'react'

interface CopyableCommandProps {
  command: string
  prompt?: string // 'PM>', '$', '>', etc.
}

export default function CopyableCommand({ command, prompt = '$' }: CopyableCommandProps) {
  const [copied, setCopied] = useState(false)

  const onCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Older browsers / insecure context — silently ignore
    }
  }

  return (
    <div className="bg-[#0f172a] text-slate-200 font-mono text-sm rounded-lg px-4 py-3 flex items-center justify-between gap-3">
      <code className="overflow-x-auto whitespace-nowrap min-w-0 flex-1">
        <span className="text-slate-500 select-none mr-2">{prompt}</span>
        {command}
      </code>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? 'Copied' : 'Copy command'}
        className="flex-shrink-0 text-slate-400 hover:text-white transition-colors p-1 cursor-pointer"
      >
        {copied ? (
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 8 L7 12 L13 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="5" y="5" width="9" height="9" rx="1" />
            <path d="M11 5 L11 2 L2 2 L2 11 L5 11" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </div>
  )
}
