import React, { useEffect, useRef } from 'react'
import { AccentText } from './case-blocks/BlockText'

const CaseChapter = ({ section, index, isActive, isExpanded, onToggle, children }) => {
  const bodyRef = useRef(null)
  const label = section.label || String(index + 1).padStart(2, '0')
  const bodyId = `${section.id}-body`
  const isCollapsible = section.collapsible === true
  const isOpen = !isCollapsible || isExpanded

  useEffect(() => {
    const node = bodyRef.current
    if (!node || !isCollapsible) return

    if (isOpen) {
      node.removeAttribute('hidden')
    } else {
      node.setAttribute('hidden', 'until-found')
    }
  }, [isCollapsible, isOpen])

  useEffect(() => {
    const node = bodyRef.current
    if (!node || !isCollapsible) return

    const handleBeforeMatch = () => {
      if (!isOpen) onToggle()
    }

    node.addEventListener('beforematch', handleBeforeMatch)
    return () => node.removeEventListener('beforematch', handleBeforeMatch)
  }, [isCollapsible, isOpen, onToggle])

  const titleContent = (
    <>
      <span className="mono-meta case-chapter__label">{label}</span>
      <span className="case-chapter__name">
        <AccentText text={section.title} />
      </span>
    </>
  )

  return (
    <section
      id={section.id}
      data-section={section.id}
      className={`case-chapter scroll-mt-24 ${isActive ? 'is-active' : ''} ${isOpen ? 'is-open' : ''} ${isCollapsible ? 'is-collapsible' : 'is-static'} ${section.id === 'takeaways' ? 'case-chapter--takeaways' : ''}`}
    >
      <div className="case-chapter__header">
        <h2 className="case-chapter__title">
          {isCollapsible ? (
            <button
              type="button"
              className="case-chapter__toggle"
              onClick={onToggle}
              aria-expanded={isOpen}
              aria-controls={bodyId}
            >
              {titleContent}
              <span className="case-chapter__icon" aria-hidden="true">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </button>
          ) : (
            <span className="case-chapter__static-title">{titleContent}</span>
          )}
        </h2>

        {section.lead && (
          <p className="case-chapter__lead">
            <AccentText text={section.lead} />
          </p>
        )}

        {isCollapsible && !isOpen && section.teaser && (
          <p className="case-chapter__teaser">{section.teaser}</p>
        )}
      </div>

      <div
        id={bodyId}
        className={`case-chapter__body ${isOpen ? 'is-open' : ''} ${isCollapsible ? '' : 'is-static'}`}
      >
        <div ref={bodyRef} className="case-chapter__body-inner">
          {children}
        </div>
      </div>
    </section>
  )
}

export default CaseChapter
