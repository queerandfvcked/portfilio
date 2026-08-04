import React from 'react'

export function ImagePairDisplay({ desktopSrc, mobileSrc, altPrefix, openImageModal }) {
  return (
    <div className="flex flex-col md:flex-row md:items-start gap-4 justify-center">
      <div className="cursor-pointer group" onClick={() => openImageModal(desktopSrc)}>
        <img
          src={desktopSrc}
          alt={`${altPrefix} - Desktop`}
          className="max-h-[480px] w-auto max-w-full rounded-lg shadow-xl transition-transform duration-300 group-hover:scale-105 mx-auto"
        />
        <p className="text-center text-secondary text-sm mt-2">Desktop</p>
      </div>
      <div className="cursor-pointer group" onClick={() => openImageModal(mobileSrc)}>
        <img
          src={mobileSrc}
          alt={`${altPrefix} - Mobile`}
          className="max-h-[480px] w-auto max-w-full rounded-lg shadow-xl transition-transform duration-300 group-hover:scale-105 mx-auto"
        />
        <p className="text-center text-secondary text-sm mt-2">Mobile</p>
      </div>
    </div>
  )
}
