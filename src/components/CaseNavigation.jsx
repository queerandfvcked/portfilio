import React from 'react'

const CaseNavigation = ({ sections, activeSection, onSectionClick }) => {
  return (
    <nav className="hidden lg:block lg:sticky lg:top-24 lg:h-fit" aria-label="Case sections">
      <ul className="space-y-3">
        {sections.map((section, index) => (
          <li key={section.id}>
            <button
              onClick={() => onSectionClick(section.id)}
              className={`nav-item text-left transition-all duration-300 ${
                activeSection === section.id
                  ? 'nav-item-active text-accent-400 font-medium'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <span className="mono-meta mr-3">{section.label || String(index + 1).padStart(2, '0')}</span>
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default CaseNavigation
