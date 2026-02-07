import React from 'react'

const CaseNavigation = ({ sections, activeSection, onSectionClick }) => {
  return (
    <nav className="hidden lg:block lg:sticky lg:top-24 lg:h-fit">
      <ul className="space-y-3">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => onSectionClick(section.id)}
              className={`text-left transition-all duration-300 ${
                activeSection === section.id
                  ? 'text-cyan-400 font-medium'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default CaseNavigation
