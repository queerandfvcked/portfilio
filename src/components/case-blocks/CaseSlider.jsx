import React, { useRef, useState } from 'react'

const SWIPE_THRESHOLD = 40

const Chevron = ({ direction }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d={direction === 'prev' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'}
    />
  </svg>
)

const CaseSlider = ({ items = [], onImageClick }) => {
  const total = items.length
  const [active, setActive] = useState(0)
  const pointerStart = useRef(null)
  const didSwipe = useRef(false)

  if (total === 0) return null

  const current = Math.min(active, total - 1)

  const step = (delta) => {
    setActive((prev) => {
      const base = Math.min(Math.max(prev, 0), total - 1)
      return (base + delta + total) % total
    })
  }

  const handleKeyDown = (event) => {
    if (total < 2) return

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      step(-1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      step(1)
    }
  }

  const handlePointerDown = (event) => {
    if (event.pointerType !== 'touch' || total < 2) return
    pointerStart.current = { x: event.clientX, y: event.clientY }
  }

  const handlePointerUp = (event) => {
    const start = pointerStart.current
    pointerStart.current = null
    if (!start || total < 2) return

    const deltaX = event.clientX - start.x
    const deltaY = event.clientY - start.y

    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY)) return

    didSwipe.current = true
    window.setTimeout(() => {
      didSwipe.current = false
    }, 350)

    step(deltaX < 0 ? 1 : -1)
  }

  const handleImageClick = (src) => {
    if (didSwipe.current) return
    onImageClick?.(src)
  }

  const image = (item, index) => (
    <img
      className="case-slider__img"
      src={item.src}
      alt={item.caption || ''}
      loading={index === 0 ? 'eager' : 'lazy'}
      draggable="false"
    />
  )

  if (total === 1) {
    const item = items[0]

    return (
      <div className="case-slider case-slider--single">
        {onImageClick ? (
          <button
            type="button"
            className="case-slider__media"
            onClick={() => handleImageClick(item.src)}
            aria-label="Открыть изображение"
          >
            {image(item, 0)}
          </button>
        ) : (
          image(item, 0)
        )}

        {item.caption && <span className="case-slider__caption mono-meta">{item.caption}</span>}
      </div>
    )
  }

  return (
    <div
      className="case-slider"
      role="group"
      aria-roledescription="carousel"
      aria-label="Изображения"
      onKeyDown={handleKeyDown}
    >
      <div
        className="case-slider__stage"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          pointerStart.current = null
        }}
      >
        {items.map((item, index) => (
          <div
            key={`${item.src}-${index}`}
            className={`case-slider__slide${index === current ? ' is-active' : ''}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} из ${total}`}
            aria-hidden={index !== current}
          >
            {onImageClick ? (
              <button
                type="button"
                className="case-slider__media"
                onClick={() => handleImageClick(item.src)}
                tabIndex={index === current ? 0 : -1}
                aria-label={item.caption ? `Открыть изображение: ${item.caption}` : 'Открыть изображение'}
              >
                {image(item, index)}
              </button>
            ) : (
              image(item, index)
            )}
          </div>
        ))}
      </div>

      <div className="case-slider__controls">
        <button
          type="button"
          className="case-slider__control"
          onClick={() => step(-1)}
          aria-label="Предыдущий"
        >
          <Chevron direction="prev" />
        </button>

        <p className="case-slider__status" aria-live="polite">
          <span className="mono-meta case-slider__label">{items[current].caption || `Слайд ${current + 1}`}</span>
          <span className="case-slider__sep" aria-hidden="true">·</span>
          <span className="mono-meta case-slider__count">{current + 1}/{total}</span>
        </p>

        <button
          type="button"
          className="case-slider__control"
          onClick={() => step(1)}
          aria-label="Следующий"
        >
          <Chevron direction="next" />
        </button>
      </div>
    </div>
  )
}

export default CaseSlider
