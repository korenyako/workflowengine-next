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
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            active === cat
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
              : 'text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
