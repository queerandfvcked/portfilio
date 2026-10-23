import React from 'react'
import { CASE_GLOW } from '../CaseScene'

const CaseStage = ({
  items = [],
  layout = 'single',
  caseId,
  onImageClick,
  compact = false
}) => {
  const glow = CASE_GLOW[caseId] || CASE_GLOW['add-transition']
  const style = {
    '--stage-glow-rgb': glow.rgb,
    '--stage-glow-a': glow.alpha,
    '--stage-glow-pos': glow.position
  }

  return (
    <div
      className={`case-stage case-stage--${layout}${compact ? ' case-stage--compact' : ''}`}
      style={style}
    >
      <div className="grid-mask case-stage__grid-mask" aria-hidden="true" />
      <div className="case-stage__glow" aria-hidden="true" />

      <div className="case-stage__grid">
        {items.map((item, index) => {
          const image = (
            <img src={item.src} alt={item.caption || ''} loading="lazy" />
          )

          return (
            <div key={`${item.src}-${index}`} className="case-stage__item">
              {onImageClick ? (
                <button
                  type="button"
                  className="case-stage__media"
                  onClick={() => onImageClick(item.src)}
                  aria-label={item.caption ? `Открыть изображение: ${item.caption}` : 'Открыть изображение'}
                >
                  {image}
                </button>
              ) : (
                <div className="case-stage__media">{image}</div>
              )}

              {item.caption && (
                <span className="case-stage__caption">{item.caption}</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CaseStage
