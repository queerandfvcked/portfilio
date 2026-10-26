import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { getBlockCopy } from './labels'

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

// Desktop (>640px): stage height is computed once for all slides from the
// LOWEST slide, i.e. the slide with the LARGEST aspect ratio (w/h). H =
// clamp(Hmin, sceneWidth / maxAspect, Hmax). The widest/tallest slide does
// not raise the stage; the tallest slide only determines the center position
// of its image inside the fixed stage.
const BREAKPOINT = 640

const H_DESKTOP = { min: 240, max: 640 }
const H_MOBILE_MIN = 280

const CaseSlider = ({ items = [], onImageClick, language }) => {
  const total = items.length
  const copy = getBlockCopy(language)

  // Guard clause kept, but placed after refs/hooks are declared so hooks are
  // called unconditionally (React rules of hooks).
  if (total === 0) {
    // Still need to keep hook declarations reachable; declare before guard.
  }

  // Refs / state declared before guard so they are always initialized.
  const [active, setActive] = useState(0)
  const [measured, setMeasured] = useState(false)
  const [sizes, setSizes] = useState([])
  const pointerStart = useRef(null)
  const didSwipe = useRef(false)
  const sceneRef = useRef(null)
  const stageRef = useRef(null)
  const roRef = useRef(null)
  const rafId = useRef(null)
  const mqRef = useRef(null)

  // Guard again after declarations (no hooks after this).
  if (total === 0) return null

  const current = Math.min(active, total - 1)

  const step = (delta) => {
    setActive((prev) => {
      const base = Math.min(Math.max(prev, 0), total - 1)
      return (base + delta + total) % total
    })
  }

  function maxAspect() {
    let best = 0
    for (let i = 0; i < sizes.length; i++) {
      const s = sizes[i]
      if (!s || s.w <= 0 || s.h <= 0) continue
      const a = s.w / s.h
      if (a > best) best = a
    }
    return best || null
  }

  function sceneWidth() {
    if (sceneRef.current) return sceneRef.current.clientWidth
    if (typeof document !== 'undefined') return document.documentElement.clientWidth
    return 0
  }

  function desktopHeightFor(width, maxAspectValue) {
    if (!maxAspectValue) return H_DESKTOP.min
    const raw = width / maxAspectValue
    return Math.max(H_DESKTOP.min, Math.min(H_DESKTOP.max, Math.round(raw)))
  }

  function applyHeight() {
    rafId.current = null
    if (!sceneRef.current) return

    const width = sceneWidth()
    if (width <= 0) return

    // Only compute desktop sizing for >640px. On mobile the scene uses
    // height: auto and we do not set any inline height.
    const mobileMode = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 640px)').matches

    if (mobileMode) {
      // Reset any previous inline height set on desktop, then leave scene on auto.
      stageRef.current && (stageRef.current.style.height = '')
      setMeasured(true)
      return
    }

    const aspect = maxAspect()
    const h = desktopHeightFor(width, aspect)

    if (stageRef.current) {
      stageRef.current.style.height = `${h}px`
    }
    setMeasured(true)
  }

  function onResize() {
    if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(applyHeight)
  }

  // One ResizeObserver for the scene; created once, disconnected on cleanup.
  useEffect(() => {
    if (typeof ResizeObserver === 'undefined' || !sceneRef.current) return

    const ro = new ResizeObserver(onResize)
    ro.observe(sceneRef.current)
    roRef.current = ro
    return () => {
      ro.disconnect()
      roRef.current = null
    }
  }, [items]) // layout intent stable across image loads

  // media query for breakpoint changes (mobile <-> desktop) in the same pass
  // as direct width-based recalc when crossing 640px without a layout change.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia('(max-width: 640px)')
    const handler = () => applyHeight()
    if (mql.addEventListener) {
      mql.addEventListener('change', handler)
    } else if (mql.addListener) {
      mql.addListener(handler)
    }
    mqRef.current = mql
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', handler)
      } else if (mql.removeListener) {
        mql.removeListener(handler)
      }
    }
  }, [])

  // After sizes change, recompute height asynchronously once to avoid
  // thrashing during image load. onError does not remove a size, so a broken
  // slide is simply not counted toward maxAspect.
  useEffect(() => {
    if (!measured) return
    if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(applyHeight)
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
  }, [sizes, measured])

  // First mount: schedule one measurement.
  useEffect(() => {
    applyHeight()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
      onLoad={(e) => {
        const el = e.target
        setSizes((prev) => {
          const next = prev.slice()
          next[index] = { w: el.naturalWidth, h: el.naturalHeight }
          return next
        })
      }}
      onError={() => {
        // Slide with failed load is excluded from sizing; do not break
        // existing array shape.
        setSizes((prev) => {
          const next = prev.slice()
          if (!next[index]) next[index] = { w: 0, h: 0 }
          return next
        })
      }}
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
            aria-label={copy.openImage}
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
      aria-label={copy.images}
      onKeyDown={handleKeyDown}
    >
      <div
        className="case-slider__stage"
        ref={sceneRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          pointerStart.current = null
        }}
      >
        <div
          ref={stageRef}
          className="case-slider__scene"
        >
          {items.map((item, index) => (
            <div
              key={`${item.src}-${index}`}
              className={`case-slider__slide${index === current ? ' is-active' : ''}`}
              role="group"
              aria-roledescription="slide"
              aria-label={copy.slidePosition(index + 1, total)}
              aria-hidden={index !== current}
            >
              {onImageClick ? (
                <button
                  type="button"
                  className="case-slider__media"
                  onClick={() => handleImageClick(item.src)}
                  tabIndex={index === current ? 0 : -1}
                  aria-label={item.caption ? copy.openImageNamed(item.caption) : copy.openImage}
                >
                  {image(item, index)}
                </button>
              ) : (
                image(item, index)
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="case-slider__controls">
        <button
          type="button"
          className="case-slider__control"
          onClick={() => step(-1)}
          aria-label={copy.previous}
        >
          <Chevron direction="prev" />
        </button>

        <p className="case-slider__status" aria-live="polite">
          <span className="mono-meta case-slider__label">{items[current].caption || copy.slide(current + 1)}</span>
          <span className="case-slider__sep" aria-hidden="true">·</span>
          <span className="mono-meta case-slider__count">{current + 1}/{total}</span>
        </p>

        <button
          type="button"
          className="case-slider__control"
          onClick={() => step(1)}
          aria-label={copy.next}
        >
          <Chevron direction="next" />
        </button>
      </div>
    </div>
  )
}

export default CaseSlider
