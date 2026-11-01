import React from 'react'
import { getBlockCopy } from './labels'

// Shared clickable figure for hand-written layouts. It reuses the same
// `case-stage__media` wrapper as every other case image, so the hover
// affordance (zoom-in cursor, no scale) stays consistent across a case.
const CaseFigure = ({ src, alt, className = '', onClick, language }) => {
  const copy = getBlockCopy(language)

  return (
    <div className={className}>
      <button
        type="button"
        className="case-stage__media"
        onClick={() => onClick(src)}
        aria-label={alt ? copy.openImageNamed(alt) : copy.openImage}
      >
        <img src={src} alt={alt} loading="lazy" />
      </button>
    </div>
  )
}

export default CaseFigure
