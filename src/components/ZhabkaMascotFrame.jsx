import React, { useEffect, useRef, useState } from 'react'

// Готовые ролики (интерфейс + анимация, экспорт из Figma 393x852, как в портфолио).
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia(REDUCED_MOTION_QUERY).matches

export function ZhabkaMascotFrame({ videoSrc }) {
  const videoRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion)

  // Реагируем на смену системной настройки на лету.
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined

    const query = window.matchMedia(REDUCED_MOTION_QUERY)
    const handleChange = (event) => setReducedMotion(event.matches)

    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  // Без reduced-motion ролик играет только пока виден в области просмотра.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    if (reducedMotion) {
      video.pause()
      video.currentTime = 0
      return undefined
    }

    if (typeof IntersectionObserver === 'undefined') {
      video.play().catch(() => {})
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.35 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [reducedMotion])

  return (
    <div
      className="w-[78%] max-w-[240px] shrink-0 snap-center aspect-[393/852] bg-[var(--bg)] rounded-[20px] border border-white/5 overflow-hidden shadow-2xl select-none sm:w-full sm:max-w-[320px] sm:shrink sm:mx-auto"
    >
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay={!reducedMotion}
        muted
        loop={!reducedMotion}
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />
    </div>
  )
}

/* Горизонтальная полоса существует только на ≤640px, поэтому role="region" и
   tabIndex нужны только там: на широком экране это обычная статичная сетка. */
const MOTION_STRIP_QUERY = '(max-width: 640px)'

const useMotionStripMode = () => {
  const [isStrip, setIsStrip] = useState(
    () =>
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia(MOTION_STRIP_QUERY).matches
  )

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined

    const query = window.matchMedia(MOTION_STRIP_QUERY)
    const handleChange = (event) => setIsStrip(event.matches)

    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  return isStrip
}

/* Показ роликов: на ≤640px — горизонтальная полоса с нативным скроллом и
   снапом (рамка ~78% ширины колонки, следующая видна сбоку), на >640px —
   прежние три колонки. Скрытые за краем полосы видео остаются на паузе:
   IntersectionObserver в ZhabkaMascotFrame видит их как невидимые. */
export function ZhabkaMascotShowcase({ label }) {
  const isStrip = useMotionStripMode()

  return (
    <div
      role={isStrip ? 'region' : undefined}
      tabIndex={isStrip ? 0 : undefined}
      aria-label={isStrip ? label : undefined}
      className="flex gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain snap-x snap-mandatory [touch-action:pan-x_pan-y] mt-6 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:snap-none"
    >
      <ZhabkaMascotFrame videoSrc="/assets/zhabka/mascot-splash-video.webm" />
      <ZhabkaMascotFrame videoSrc="/assets/zhabka/mascot-bookmarks-video.webm" />
      <ZhabkaMascotFrame videoSrc="/assets/zhabka/mascot-notfound-video.webm" />
    </div>
  )
}
