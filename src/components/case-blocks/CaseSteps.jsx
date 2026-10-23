import React, { useId, useRef, useState } from 'react'
import { InlineText } from './BlockText'

const StepsList = ({ steps = [], listId }) => (
  <ol id={listId} className="case-steps__list">
    {steps.map((step, index) => (
      <li key={`${step.title}-${index}`} className="case-steps__item">
        <span className="mono-meta case-steps__number">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="case-steps__title">
          <InlineText text={step.title} />
        </span>
        {step.text && (
          <span className="case-steps__text">
            <InlineText text={step.text} />
          </span>
        )}
      </li>
    ))}
  </ol>
)

const CaseSteps = ({ steps = [], scenarios = [] }) => {
  const [activeTab, setActiveTab] = useState(0)
  const tabRefs = useRef([])
  const baseId = useId().replace(/:/g, '')
  const hasScenarios = scenarios.length > 0
  const safeTab = Math.min(activeTab, Math.max(0, scenarios.length - 1))

  const focusTab = (index) => {
    const next = Math.max(0, Math.min(scenarios.length - 1, index))
    setActiveTab(next)
    tabRefs.current[next]?.focus()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      focusTab(safeTab + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      focusTab(safeTab - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      focusTab(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      focusTab(scenarios.length - 1)
    }
  }

  if (!hasScenarios) {
    return (
      <div className="case-steps">
        <StepsList steps={steps} />
      </div>
    )
  }

  return (
    <div className="case-steps case-steps--tabs">
      <div className="case-steps__tabs" role="tablist" aria-label="Сценарии">
        {scenarios.map((scenario, index) => {
          const selected = index === safeTab
          return (
            <button
              key={`${scenario.title}-${index}`}
              ref={(node) => {
                tabRefs.current[index] = node
              }}
              type="button"
              id={`${baseId}-tab-${index}`}
              className="case-steps__tab"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveTab(index)}
              onKeyDown={handleKeyDown}
            >
              {scenario.title}
            </button>
          )
        })}
      </div>

      {scenarios.map((scenario, index) => {
        const selected = index === safeTab
        return (
          <div
            key={`${scenario.title}-panel-${index}`}
            id={`${baseId}-panel-${index}`}
            className="case-steps__panel"
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${index}`}
            hidden={!selected}
          >
            <StepsList steps={scenario.steps} listId={`${baseId}-list-${index}`} />
          </div>
        )
      })}
    </div>
  )
}

export default CaseSteps
