import React from 'react'

// Готовые ролики (интерфейс + анимация, экспорт из Figma 393x852, как в портфолио).
export function ZhabkaMascotFrame({ videoSrc }) {
  return (
    <div
      className="w-full max-w-[320px] mx-auto aspect-[393/852] bg-[#0B0E13] rounded-[20px] border border-white/5 overflow-hidden shadow-2xl select-none"
    >
      <video
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
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