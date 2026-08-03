import React, { useState } from 'react'

export function CaseSubAccordion({ items, formatContent }) {

  const [openItems, setOpenItems] = useState({})

  const toggleItem = (id) => {

    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }))

  }

  return (

    <div className="space-y-3">

      {items.map((item) => {

        const isOpen = openItems[item.id] || false

        return (

          <div key={item.id} className="border border-gray-700 rounded-2xl overflow-hidden">

            <button

              onClick={() => toggleItem(item.id)}

              className="w-full flex items-center justify-between p-5 text-left group"

            >

              <h4 className="font-display text-lg font-semibold text-primary group-hover:text-accent-400 transition-colors">

                {item.title}

              </h4>

              <div className={`shrink-0 ml-4 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>

                <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />

                </svg>

              </div>

            </button>

            <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'}`}>

              <div className="px-5 pb-5 text-secondary leading-relaxed">

                {formatContent ? formatContent(item.content) : item.content}

              </div>

            </div>

          </div>

        )

      })}

    </div>

  )

}
