import React from 'react'

/**
 * Ambient background layers.
 * `spotlight` is only ever true on devices with a fine pointer and without
 * reduced-motion — see the check in Hero.jsx.
 */
const AmbientBackground = ({ spotlight = false }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="grid-mask" />

      {spotlight && <div className="grid-spotlight" />}

      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.14), transparent)' }}
      />
    </div>
  )
}

export default AmbientBackground