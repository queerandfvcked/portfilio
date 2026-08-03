import React from 'react'

export function FlowDiagram({ steps }) {
  return (
    <div className="py-12 w-full overflow-hidden">
      {/* Desktop: horizontal timeline */}
      <div className="hidden md:flex items-start justify-between relative max-w-4xl mx-auto">
        <div 
          className="absolute top-[7px] left-0 right-0 h-[2px]"
          style={{ backgroundColor: '#6C8CFF', opacity: 0.3 }}
        ></div>
        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-col items-center text-center px-2 flex-1 min-w-0">
            <div className="w-4 h-4 rounded-full bg-[#10131A] border-2 border-accent-400 z-10 mb-4 shrink-0"></div>
            <p className="font-display text-sm font-semibold text-gray-100 leading-snug break-words">
              {step}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile: vertical timeline */}
      <div className="md:hidden flex flex-col items-start relative pl-6 max-w-sm mx-auto">
        <div 
          className="absolute top-2 bottom-2 left-[7px] w-[2px]"
          style={{ backgroundColor: '#6C8CFF', opacity: 0.3 }}
        ></div>
        {steps.map((step, index) => (
          <div key={index} className="relative flex items-start mb-8 last:mb-0 w-full">
            <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-[#10131A] border-2 border-accent-400 shrink-0"></div>
            <p className="font-display text-base font-semibold text-gray-100 leading-snug">
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
