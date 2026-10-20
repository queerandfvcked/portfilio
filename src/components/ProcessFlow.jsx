import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../contexts/LanguageContext'

const NODE_X = [70, 235, 400, 565, 730, 895, 1060]
const NODE_Y = 110
const TOTAL = 7
const DOT_X = 1125

const ProcessFlow = () => {
  const { t } = useTranslation()
  const process = t('process')
  const projects = t('projectsList')
  const [activeIndex, setActiveIndex] = useState(0)
  const nodeRefs = useRef([])

  const steps = process.steps
  const activeStep = steps[activeIndex]
  const activeProject = projects.find((project) => project.id === activeStep.caseId)

  const focusStep = (next) => {
    setActiveIndex(next)
    nodeRefs.current[next]?.focus()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      focusStep(Math.min(TOTAL - 1, activeIndex + 1))
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      focusStep(Math.max(0, activeIndex - 1))
    }
  }

  const renderShape = (step, index) => {
    const active = index === activeIndex
    const className = `process-flow__shape${active ? ' is-active' : ''}`
    const x = NODE_X[index]

    if (step.kind === 'circle') {
      return <circle cx={x} cy={NODE_Y} r={20} className={className} />
    }

    if (step.kind === 'diamond') {
      return (
        <polygon
          points={`${x},${NODE_Y - 26} ${x + 26},${NODE_Y} ${x},${NODE_Y + 26} ${x - 26},${NODE_Y}`}
          className={className}
        />
      )
    }

    return <rect x={x - 20} y={NODE_Y - 20} width={40} height={40} rx={4} className={className} />
  }

  const arrowMarker = (active) => `url(#${active ? 'pf-arrow-active' : 'pf-arrow'})`

  return (
    <section id="about" className="process-flow py-20">
      <div className="grid-mask process-flow__grid" aria-hidden="true" />

      <div className="container relative z-10">
        <div className="mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text">
            {process.heading}
          </h2>
        </div>

        <div className="process-flow__desktop">
          <div className="process-flow__stage">
            <svg
              viewBox="0 0 1160 260"
              className="process-flow__diagram"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                <marker
                  id="pf-arrow"
                  viewBox="0 0 8 8"
                  refX="7"
                  refY="4"
                  markerWidth="8"
                  markerHeight="8"
                  markerUnits="userSpaceOnUse"
                  orient="auto"
                >
                  <path d="M0 0 L8 4 L0 8 Z" className="process-flow__arrowhead" />
                </marker>
                <marker
                  id="pf-arrow-active"
                  viewBox="0 0 8 8"
                  refX="7"
                  refY="4"
                  markerWidth="8"
                  markerHeight="8"
                  markerUnits="userSpaceOnUse"
                  orient="auto"
                >
                  <path d="M0 0 L8 4 L0 8 Z" className="process-flow__arrowhead is-active" />
                </marker>
              </defs>

              {steps.slice(0, TOTAL - 1).map((step, index) => {
                const active = activeIndex > index
                return (
                  <line
                    key={`arrow-${step.title}`}
                    x1={NODE_X[index] + 26}
                    y1={NODE_Y}
                    x2={NODE_X[index + 1] - 26}
                    y2={NODE_Y}
                    className={`process-flow__arrow${active ? ' is-active' : ''}`}
                    markerEnd={arrowMarker(active)}
                  />
                )
              })}

              <text x={(NODE_X[3] + NODE_X[4]) / 2} y={100} textAnchor="middle" className="process-flow__yesno">
                {process.yes}
              </text>

              <line
                x1={NODE_X[6] + 26}
                y1={NODE_Y}
                x2={DOT_X - 4}
                y2={NODE_Y}
                className={`process-flow__arrow${activeIndex === 6 ? ' is-active' : ''}`}
                markerEnd={arrowMarker(activeIndex === 6)}
              />
              <text
                x={(NODE_X[6] + 26 + DOT_X - 4) / 2}
                y={100}
                textAnchor="middle"
                className="process-flow__yesno"
              >
                {process.yes}
              </text>
              <circle
                cx={DOT_X}
                cy={NODE_Y}
                r={4}
                className={`process-flow__dot${activeIndex === 6 ? ' is-active' : ''}`}
              />

              <path
                d={`M ${NODE_X[3]} ${NODE_Y + 26} V 185 H ${NODE_X[2]} V ${NODE_Y + 24}`}
                className={`process-flow__loop${activeIndex === 3 ? ' is-active' : ''}`}
                markerEnd={arrowMarker(activeIndex === 3)}
              />
              <text
                x={(NODE_X[3] + NODE_X[2]) / 2}
                y={178}
                textAnchor="middle"
                className="process-flow__yesno"
              >
                {process.no}
              </text>

              <path
                d={`M ${NODE_X[6]} ${NODE_Y + 26} V 225 H ${NODE_X[1]} V ${NODE_Y + 24}`}
                className={`process-flow__loop${activeIndex === 6 ? ' is-active' : ''}`}
                markerEnd={arrowMarker(activeIndex === 6)}
              />
              <text
                x={(NODE_X[6] + NODE_X[1]) / 2}
                y={218}
                textAnchor="middle"
                className="process-flow__yesno"
              >
                {process.no}
              </text>

              {steps.map((step, index) => (
                <g key={`node-${step.title}`}>
                  {renderShape(step, index)}
                  <text
                    x={NODE_X[index]}
                    y={NODE_Y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className={`process-flow__num${index === activeIndex ? ' is-active' : ''}`}
                  >
                    {index + 1}
                  </text>
                  <text
                    x={NODE_X[index]}
                    y={60}
                    textAnchor="middle"
                    className={`process-flow__node-title${index === activeIndex ? ' is-active' : ''}`}
                  >
                    {step.title}
                  </text>
                </g>
              ))}
            </svg>

            <div className="process-flow__nodes">
              {steps.map((step, index) => (
                <button
                  key={`hit-${step.title}`}
                  ref={(el) => {
                    nodeRefs.current[index] = el
                  }}
                  type="button"
                  className={`process-node process-node--${step.kind}`}
                  style={{
                    left: `${(NODE_X[index] / 1160) * 100}%`,
                    top: `${(NODE_Y / 260) * 100}%`
                  }}
                  aria-label={`${index + 1}. ${step.title}`}
                  aria-current={index === activeIndex ? 'step' : undefined}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={handleKeyDown}
                />
              ))}
            </div>
          </div>

          <div className="process-flow__panel" aria-live="polite">
            <span className="mono-meta">
              {process.step} {activeIndex + 1} {process.of} {TOTAL}
            </span>
            <h3 className="process-flow__panel-title">{activeStep.title}</h3>
            <p className="process-flow__panel-text">{activeStep.text}</p>
            {activeProject && (
              <p className="process-flow__example">
                <span className="process-flow__example-label">{process.exampleLabel}</span>{' '}
                <Link to={activeProject.link} className="process-flow__link">
                  {activeStep.example}
                  <span aria-hidden="true">→</span>
                </Link>
              </p>
            )}
          </div>
        </div>

        <ol className="process-flow__mobile">
          {steps.map((step, index) => {
            const open = index === activeIndex
            const panelId = `process-mobile-panel-${index}`
            const project = projects.find((item) => item.id === step.caseId)

            return (
              <li
                key={`mobile-${step.title}`}
                className={`process-mobile__item${open ? ' is-open' : ''}`}
              >
                <button
                  type="button"
                  className="process-mobile__row"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className={`process-mobile__marker process-mobile__marker--${step.kind}`}>
                    <span>{index + 1}</span>
                  </span>
                  <span className="process-mobile__title">{step.title}</span>
                </button>

                <div id={panelId} className="process-mobile__panel" hidden={!open}>
                  <p className="process-mobile__text">{step.text}</p>
                  {step.backTo && (
                    <p className="process-mobile__note">
                      {process.no} → {process.backLabel} {step.backTo}
                    </p>
                  )}
                  {project && (
                    <p className="process-mobile__example">
                      <span className="process-flow__example-label">{process.exampleLabel}</span>{' '}
                      <Link to={project.link} className="process-flow__link">
                        {step.example}
                        <span aria-hidden="true">→</span>
                      </Link>
                    </p>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default ProcessFlow
