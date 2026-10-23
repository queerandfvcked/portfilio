import React from 'react'
import { InlineText } from './BlockText'

const CaseQuad = ({
  axes = ['INTERNAL', 'EXTERNAL', 'TECHNICAL', 'PRODUCT'],
  cells = []
}) => (
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
        {cells.slice(0, 4).map((cell, index) => (
          <article key={index} className="case-quad__cell">
            <h3 className="case-quad__title">
              <InlineText text={cell.title} />
            </h3>
            {cell.text && (
              <p className="case-quad__text">
                <InlineText text={cell.text} />
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  </div>
)

export default CaseQuad
