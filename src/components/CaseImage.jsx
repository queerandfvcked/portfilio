import React from 'react'
import { CASE_IMAGES } from './caseMedia'

const buildSrcSet = (name, widths, format) =>
  widths.map((width) => `/assets/case-main/${name}-${width}.${format} ${width}w`).join(', ')

const CaseImage = ({
  name,
  alt,
  sizes,
  priority = false,
  className = '',
  style
}) => {
  const meta = CASE_IMAGES[name]
  if (!meta) return null

  const { widths, width, height, alpha } = meta
  const fallbackWidth = widths[widths.length - 1]
  const fallback = `/assets/case-main/${name}-${fallbackWidth}.${alpha ? 'webp' : 'jpg'}`

  return (
    <picture>
      <source type="image/webp" srcSet={buildSrcSet(name, widths, 'webp')} sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className={className}
        style={style}
      />
    </picture>
  )
}

export default CaseImage
