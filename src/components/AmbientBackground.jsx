import React from 'react'

const AmbientBackground = () => {

  return (

    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">

      {/* Subtle dot grid */}
      <div

        className="absolute inset-0 opacity-[0.15]"

        style={{

          backgroundImage: 'radial-gradient(circle, #6C8CFF 1px, transparent 1px)',

          backgroundSize: '32px 32px'

        }}

      ></div>

      {/* Soft radial signature glow */}
      <div

        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.08]"

        style={{ backgroundImage: 'linear-gradient(135deg, #22D3EE, #4ADE80)' }}

      ></div>

    </div>

  )

}

export default AmbientBackground
