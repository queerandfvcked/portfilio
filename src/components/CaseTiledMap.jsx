import React, { useEffect, useRef, useState } from 'react'

/* Full-screen viewer for one map built from Deep Zoom tiles. OpenSeadragon is
   imported lazily, on first open, and only in the browser: the prerender pass
   never reaches this code. */
const CaseTiledMap = ({ map, onClose, hint, language }) => {
  const hostRef = useRef(null)
  const [isReady, setIsReady] = useState(false)
  const [hasFailed, setHasFailed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let viewer = null
    let disposed = false

    const mount = async () => {
      try {
        const { default: OpenSeadragon } = await import('openseadragon')
        if (disposed || !hostRef.current) return

        viewer = OpenSeadragon({
          element: hostRef.current,
          tileSources: map.dzi,
          // No built-in chrome: the overlay keeps the same close button and the
          // same gesture set as the regular image lightbox.
          showNavigationControl: false,
          showNavigator: false,
          showHomeControl: false,
          showFullPageControl: false,
          gestureSettingsTouch: { pinchRotate: false },
          animationTime: 0.5,
          // One image pixel per screen pixel (times two for retina) is already
          // far deeper than the map needs, and it caps decoded tile size.
          maxZoomPixelRatio: 2,
          minZoomImageRatio: 1,
          visibilityRatio: 0.6,
          constrainDuringPan: true,
          imageLoaderLimit: 2,
          backgroundColor: 'rgba(0, 0, 0, 0)'
        })

        viewer.addHandler('open', () => {
          if (!disposed) setIsReady(true)
        })
        viewer.addHandler('open-failed', () => {
          if (!disposed) setHasFailed(true)
        })
      } catch (error) {
        if (!disposed) setHasFailed(true)
      }
    }

    mount()

    return () => {
      disposed = true
      if (viewer) {
        viewer.destroy()
        viewer = null
      }
    }
  }, [map])

  const statusText = hasFailed
    ? language === 'ru'
      ? 'Карта не загрузилась. Обновите страницу и попробуйте снова.'
      : 'The map failed to load. Reload the page and try again.'
    : language === 'ru'
      ? 'Загрузка карты…'
      : 'Loading map…'

  return (
    <>
      <button
        className="fixed top-4 right-4 z-[60] text-white hover:text-accent-400 transition-colors animate-slide-down"
        onClick={onClose}
        aria-label="Close image"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="fixed inset-0 z-50 bg-black/90 animate-fade-in" onClick={onClose}>
        <div
          ref={hostRef}
          className="absolute inset-0"
          style={{ touchAction: 'none' }}
          onClick={(event) => event.stopPropagation()}
        />

        {!isReady && (
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-secondary text-sm pointer-events-none">
            {statusText}
          </p>
        )}

        {isReady && typeof window !== 'undefined' && window.innerWidth > 768 && (
          <p className="fixed bottom-4 right-8 text-secondary text-sm pointer-events-none">{hint}</p>
        )}
      </div>
    </>
  )
}

export default CaseTiledMap
