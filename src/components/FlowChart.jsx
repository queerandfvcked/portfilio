import React, { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../contexts/LanguageContext'
import { localizedPath } from '../utils/localizedPath'

const VIEW_WIDTH = 1160
const NODE_Y = 110
const NODE_START_X = 70
const NODE_END_X = 1060
const TERMINAL_X = VIEW_WIDTH - 35
const RESPONSIVE_WIDTH = 900
const LOOP_BASE_Y = 185
const LOOP_GAP = 40
const LOOP_BOTTOM_PADDING = 35
const MIN_VIEW_HEIGHT = 260

const normalizeLink = (link) => {
  if (!link) return null
  if (typeof link === 'string') return { href: link, label: link }
  if (!link.href) return null
  return { ...link, label: link.label || link.href }
}

const FlowChart = ({
  steps = [],
  loops = [],
  terminal = false,
  labels = {},
  className = '',
  defaultFirstStep = false
}) => {
  const { language } = useTranslation()
  const copy = {
    yes: labels.yes ?? '',
    no: labels.no ?? '',
    step: labels.step ?? 'Step',
    of: labels.of ?? 'of',
    example: labels.example ?? '',
    back: labels.back ?? ''
  }
  const [activeIndex, setActiveIndex] = useState(defaultFirstStep ? 0 : -1)
  const nodeRefs = useRef([])
  const baseId = useId().replace(/:/g, '')
  const total = steps.length
  const safeActive = total === 0 ? 0 : Math.max(0, Math.min(activeIndex, total - 1))
  const activeStep = steps[safeActive]
  const activeLink = normalizeLink(activeStep?.link)

  useEffect(() => {
    if (total > 0 && activeIndex > total - 1) {
      setActiveIndex(total - 1)
    }
  }, [activeIndex, total])

  const stepGap = total > 1 ? (NODE_END_X - NODE_START_X) / (total - 1) : 0
  const nodeX = steps.map((_, index) => NODE_START_X + stepGap * index)

  const normalizedLoops = loops
    .map((loop, index) => {
      const from = Number(loop.from)
      const to = Number(loop.to)
      if (!Number.isInteger(from) || !Number.isInteger(to)) return null
      if (from < 1 || from > total || to < 1 || to > total) return null
      return { ...loop, from, to, index, span: Math.abs(from - to) }
    })
    .filter(Boolean)
    .sort((a, b) => a.span - b.span || a.index - b.index)
    .map((loop, depth) => ({ ...loop, depth }))

  const maxLoopY = normalizedLoops.length
    ? LOOP_BASE_Y + (normalizedLoops.length - 1) * LOOP_GAP
    : 0
  const viewHeight = Math.max(MIN_VIEW_HEIGHT, maxLoopY + LOOP_BOTTOM_PADDING)

  const focusStep = (next) => {
    const clamped = Math.max(0, Math.min(total - 1, next))
    setActiveIndex(clamped)
    nodeRefs.current[clamped]?.focus()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      focusStep(safeActive + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      focusStep(safeActive - 1)
    }
  }

  const renderShape = (step, index) => {
    const active = index === safeActive
    const shapeClass = `process-flow__shape${active ? ' is-active' : ''}`
    const x = nodeX[index]

    if (step.kind === 'circle') {
      return <circle cx={x} cy={NODE_Y} r={20} className={shapeClass} />
    }

    if (step.kind === 'diamond') {
      return (
        <polygon
          points={`${x},${NODE_Y - 26} ${x + 26},${NODE_Y} ${x},${NODE_Y + 26} ${x - 26},${NODE_Y}`}
          className={shapeClass}
        />
      )
    }

    return <rect x={x - 20} y={NODE_Y - 20} width={40} height={40} rx={4} className={shapeClass} />
  }

  const arrowMarker = (active) => `url(#${baseId}-${active ? 'arrow-active' : 'arrow'})`

  const renderLink = (link, className = 'process-flow__link') => {
    if (!link) return null

    if (link.external) {
      return (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {link.label}
          <span aria-hidden="true">→</span>
        </a>
      )
    }

    return (
      <Link to={localizedPath(language, link.href)} className={className}>
        {link.label}
        <span aria-hidden="true">→</span>
      </Link>
    )
  }

  if (total === 0) return null

  return (
    <div className={`flow-chart ${className}`.trim()}>
      <div className="process-flow__desktop">
        <div className="process-flow__stage">
          <svg
            viewBox={`0 0 ${VIEW_WIDTH} ${viewHeight}`}
            className="process-flow__diagram"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <marker
                id={`${baseId}-arrow`}
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
                id={`${baseId}-arrow-active`}
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

            {steps.slice(0, -1).map((step, index) => {
              const active = safeActive > index
              return (
                <line
                  key={`arrow-${step.title}-${index}`}
                  x1={nodeX[index] + 26}
                  y1={NODE_Y}
                  x2={nodeX[index + 1] - 26}
                  y2={NODE_Y}
                  className={`process-flow__arrow${active ? ' is-active' : ''}`}
                  markerEnd={arrowMarker(active)}
                />
              )
            })}

            {steps.map((step, index) =>
              step.kind === 'diamond' && index < total - 1 ? (
                <text
                  key={`yes-${step.title}-${index}`}
                  x={(nodeX[index] + nodeX[index + 1]) / 2}
                  y={100}
                  textAnchor="middle"
                  className="process-flow__yesno"
                >
                  {copy.yes}
                </text>
              ) : null
            )}

            {terminal && total > 0 && (
              <>
                <line
                  x1={nodeX[total - 1] + 26}
                  y1={NODE_Y}
                  x2={TERMINAL_X - 4}
                  y2={NODE_Y}
                  className={`process-flow__arrow${safeActive === total - 1 ? ' is-active' : ''}`}
                  markerEnd={arrowMarker(safeActive === total - 1)}
                />
                <text
                  x={(nodeX[total - 1] + 26 + TERMINAL_X - 4) / 2}
                  y={100}
                  textAnchor="middle"
                  className="process-flow__yesno"
                >
                  {copy.yes}
                </text>
                <circle
                  cx={TERMINAL_X}
                  cy={NODE_Y}
                  r={4}
                  className={`process-flow__dot${safeActive === total - 1 ? ' is-active' : ''}`}
                />
              </>
            )}

            {normalizedLoops.map((loop) => {
              const loopY = LOOP_BASE_Y + loop.depth * LOOP_GAP
              const xFrom = nodeX[loop.from - 1]
              const xTo = nodeX[loop.to - 1]
              const active = safeActive + 1 === loop.from

              return (
                <g key={`loop-${loop.from}-${loop.to}-${loop.index}`}>
                  <path
                    d={`M ${xFrom} ${NODE_Y + 26} V ${loopY} H ${xTo} V ${NODE_Y + 24}`}
                    className={`process-flow__loop${active ? ' is-active' : ''}`}
                    markerEnd={arrowMarker(active)}
                  />
                  <text
                    x={(xFrom + xTo) / 2}
                    y={loopY - 7}
                    textAnchor="middle"
                    className="process-flow__yesno"
                  >
                    {loop.label || copy.no}
                  </text>
                </g>
              )
            })}

            {steps.map((step, index) => (
              <g key={`node-${step.title}-${index}`}>
                {renderShape(step, index)}
                <text
                  x={nodeX[index]}
                  y={NODE_Y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={`process-flow__num${index === safeActive ? ' is-active' : ''}`}
                >
                  {index + 1}
                </text>
                <text
                  x={nodeX[index]}
                  y={60}
                  textAnchor="middle"
                  className={`process-flow__node-title${index === safeActive ? ' is-active' : ''}`}
                >
                  {step.title}
                </text>
              </g>
            ))}
          </svg>

          <div className="process-flow__nodes">
            {steps.map((step, index) => (
              <button
                key={`hit-${step.title}-${index}`}
                ref={(node) => {
                  nodeRefs.current[index] = node
                }}
                type="button"
                className={`process-node process-node--${step.kind}`}
                style={{
                  left: `${(nodeX[index] / VIEW_WIDTH) * 100}%`,
                  top: `${(NODE_Y / viewHeight) * 100}%`
                }}
                aria-label={`${index + 1}. ${step.title}`}
                aria-current={index === safeActive ? 'step' : undefined}
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
            {copy.step} {safeActive + 1} {copy.of} {total}
          </span>
          <h3 className="process-flow__panel-title">{activeStep.title}</h3>
          <p className="process-flow__panel-text">{activeStep.text}</p>
          {activeLink && (
            <p className="process-flow__example">
              <span className="process-flow__example-label">{copy.example}</span>{' '}
              {renderLink(activeLink)}
            </p>
          )}
        </div>
      </div>

      <ol className="process-flow__mobile">
        {steps.map((step, index) => {
          const open = index === safeActive
          const panelId = `${baseId}-mobile-panel-${index}`
          const link = normalizeLink(step.link)
          const loop = normalizedLoops.find((item) => item.from === index + 1)

          return (
            <li
              key={`mobile-${step.title}-${index}`}
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
                {loop && (
                  <p className="process-mobile__note">
                    {loop.label || copy.no} → {copy.back} {loop.to}
                  </p>
                )}
                {link && (
                  <p className="process-mobile__example">
                    <span className="process-flow__example-label">{copy.example}</span>{' '}
                    {renderLink(link)}
                  </p>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default FlowChart
