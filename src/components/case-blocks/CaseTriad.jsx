import React, { Fragment } from 'react'
import { InlineText } from './BlockText'

const CaseTriad = ({ labels = [], rows = [] }) => {
  const isMultiRow = rows.length > 1

  if (isMultiRow) {
    return (
      <div className="case-triad case-triad--cards">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="case-triad__card">
            <span className="mono-meta case-triad__card-number">{String(rowIndex + 1).padStart(2, '0')}</span>
            {row.slice(0, 3).map((cell, index) => (
              <div key={`${cell}-${index}`} className="case-triad__card-row">
                <span className="mono-meta case-triad__card-label">{labels[index] || ''}</span>
                <span className={`case-triad__card-text ${index === 1 ? 'case-triad__card-text--main' : ''}`}>
                  <InlineText text={cell} />
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="case-triad">
      <div className="case-triad__head">
        {labels.slice(0, 3).map((label, index) => (
          <span key={`${label}-${index}`} className="mono-meta case-triad__label">{label}</span>
        ))}
      </div>

      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="case-triad__row">
          {row.slice(0, 3).map((cell, index) => (
            <Fragment key={`${cell}-${index}`}>
              <div className="case-triad__cell">
                <InlineText text={cell} />
              </div>
              {index < 2 && <span className="case-triad__arrow" aria-hidden="true">→</span>}
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  )
}

export default CaseTriad
