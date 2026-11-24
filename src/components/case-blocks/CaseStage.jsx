import React, { useState } from 'react'
import { getBlockCopy } from './labels'
import { TILED_MAPS } from '../tiledMaps'

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
          // Huge maps are shown as a light preview; the click still passes the
          // original path, which is the key of the tiled viewer.
          const tiledMap = TILED_MAPS[item.src]
          const image = (
            <img
              src={tiledMap ? tiledMap.preview : item.src}
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
