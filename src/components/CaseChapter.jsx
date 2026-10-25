import React, { useEffect, useRef } from 'react'
import { AccentText } from './case-blocks/BlockText'
import { useTranslation } from '../contexts/LanguageContext'

const hasText = (value) => typeof value === 'string' && value.trim() !== ''
const hasLead = (value) => hasText(value) && !value.startsWith('casePage.')

const CaseChapter = ({ section, index, isActive, isExpanded, onToggle, children }) => {
  const { t } = useTranslation()
  const bodyRef = useRef(null)
  const number = String(index + 1).padStart(2, '0')
  const label = hasText(section.label) ? `${number} · ${section.label}` : number
  const bodyId = `${section.id}-body`
  const isCollapsible = section.collapsible === true
  const isOpen = !isCollapsible || isExpanded
  const lead = hasLead(section.lead) ? section.lead : ''
  const preview = isCollapsible && !isOpen && !lead && hasText(section.teaser) ? section.teaser.trim() : ''

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

  const handleKeyDown = (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return

    event.preventDefault()
    onToggle()
  }

  const headProps = isCollapsible
    ? {
        role: 'button',
        tabIndex: 0,
        'aria-expanded': isOpen,
        'aria-controls': bodyId,
        onClick: onToggle,
        onKeyDown: handleKeyDown
      }
    : {}

  return (
    <section
      id={section.id}
      data-section={section.id}
      className={`case-chapter scroll-mt-24 ${isActive ? 'is-active' : ''} ${isOpen ? 'is-open' : ''} ${isCollapsible ? 'is-collapsible' : 'is-static'} ${section.id === 'takeaways' ? 'case-chapter--takeaways' : ''}`}
    >
      <div className="case-chapter__header">
        <div className="case-chapter__head" {...headProps}>
          <span className="mono-meta case-chapter__label">{label}</span>

          <div className="case-chapter__title-row">
            <h2 className="case-chapter__title">
              <AccentText text={section.title} />
            </h2>

            {isCollapsible && (
              <span className="case-chapter__toggle" aria-hidden="true">
                <span className="case-chapter__icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </span>
            )}
          </div>

          {lead && (
            <p className="case-chapter__lead">
              <AccentText text={lead} />
            </p>
          )}

          {preview && <p className="case-chapter__teaser">{preview}</p>}
        </div>

        {isCollapsible && !isOpen && (
          <button
            type="button"
            className="case-chapter__expand-btn"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={bodyId}
          >
            {t('casePage.expandChapter')}
          </button>
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

      {isCollapsible && isOpen && (
        <button
          type="button"
          className="case-chapter__collapse-btn"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={bodyId}
        >
          {t('casePage.collapseChapter')}
        </button>
      )}
    </section>
  )
}

export default CaseChapter
