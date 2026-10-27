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
      className="w-full max-w-[320px] mx-auto aspect-[393/852] bg-[var(--bg)] rounded-[20px] border border-white/5 overflow-hidden shadow-2xl select-none"
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

export function ZhabkaMascotShowcase() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
      <ZhabkaMascotFrame videoSrc="/assets/zhabka/mascot-splash-video.webm" />
      <ZhabkaMascotFrame videoSrc="/assets/zhabka/mascot-bookmarks-video.webm" />
      <ZhabkaMascotFrame videoSrc="/assets/zhabka/mascot-notfound-video.webm" />
    </div>
  )
}
