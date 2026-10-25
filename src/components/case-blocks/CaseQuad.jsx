import React from 'react'
import { InlineText } from './BlockText'

const CaseQuad = ({
  axes = ['INTERNAL', 'EXTERNAL', 'TECHNICAL', 'PRODUCT'],
  cells = []
}) => {
  const axisPairs = [
    [axes[0], axes[2]],
    [axes[0], axes[3]],
    [axes[1], axes[2]],
    [axes[1], axes[3]]
  ]

  return (
    <div className="case-quad">
      <div className="case-quad__vertical">
        <span className="mono-meta">{axes[0]}</span>
        <span className="mono-meta">{axes[1]}</span>
      </div>

      <div className="case-quad__main">
        <div className="case-quad__horizontal">
          <span className="mono-meta">{axes[2]}</span>
          <span className="mono-meta">{axes[3]}</span>
        </div>

        <div className="case-quad__grid">
          {cells.slice(0, 4).map((cell, index) => {
            const axisLabel = axisPairs[index]?.filter(Boolean).join(' · ')

            return (
              <article key={index} className="case-quad__cell">
                {axisLabel && (
                  <span className="mono-meta case-quad__axis">
                    {axisLabel}
                  </span>
                )}
                <h3 className="case-quad__title">
                  <InlineText text={cell.title} />
                </h3>
                {cell.text && (
                  <p className="case-quad__text">
                    <InlineText text={cell.text} />
                  </p>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CaseQuad
