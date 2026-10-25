import React from 'react'

const hasText = (value) => typeof value === 'string' && value.trim() !== ''

const CaseNavigation = ({ sections, activeSection, onSectionClick }) => {
  return (
    <nav className="hidden lg:block" aria-label="Case sections">
      <ul className="space-y-3">
        {sections.map((section, index) => {
          const number = String(index + 1).padStart(2, '0')
          const navLabel = hasText(section.nav) ? section.nav : hasText(section.label) ? section.label : section.title
          const displayLabel = `${number} · ${navLabel}`
          const isActive = activeSection === section.id

          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => onSectionClick(section.id)}
                className={`nav-item text-left transition-colors duration-300 ${isActive ? 'is-active' : ''}`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="mono-meta">{displayLabel}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default CaseNavigation
