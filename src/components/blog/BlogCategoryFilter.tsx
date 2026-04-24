'use client'

import { useState } from 'react'

interface BlogCategoryFilterProps {
  categories: string[]
}

export default function BlogCategoryFilter({ categories }: BlogCategoryFilterProps) {
  const [active, setActive] = useState('All')

  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
            active === cat
              ? 'bg-[#4286F4]/15 text-[#4286F4]'
              : 'text-slate-500 hover:text-slate-900 border-2 border-slate-300'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
