import React, { useState } from 'react'
import { getBlockCopy } from './labels'

const CaseStage = ({
  items = [],
  layout = 'single',
  caseId,
  onImageClick,
  compact = false,
  language
}) => {
  const copy = getBlockCopy(language)
  const [ratios, setRatios] = useState({})
  const isRow = layout === 'pair' || layout === 'trio'

  const handleImageLoad = (index) => (event) => {
    const { naturalWidth, naturalHeight } = event.currentTarget
    if (!naturalWidth || !naturalHeight) return

    const ratio = naturalWidth / naturalHeight
    setRatios((prev) => (prev[index] === ratio ? prev : { ...prev, [index]: ratio }))
  }

  return (
    <div
      className={`case-stage case-stage--${layout}${compact ? ' case-stage--compact' : ''}`}
    >
      <div className="case-stage__grid">
        {items.map((item, index) => {
          const image = (
            <img
              src={item.src}
              alt={item.caption || ''}
              loading="lazy"
              onLoad={isRow ? handleImageLoad(index) : undefined}
            />
          )

          return (
            <div
              key={`${item.src}-${index}`}
              className="case-stage__item"
              style={isRow ? { flex: `${ratios[index] || 1} 1 0` } : undefined}
            >
              {onImageClick ? (
                <button
                  type="button"
                  className="case-stage__media"
                  onClick={() => onImageClick(item.src)}
                  aria-label={item.caption ? copy.openImageNamed(item.caption) : copy.openImage}
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
