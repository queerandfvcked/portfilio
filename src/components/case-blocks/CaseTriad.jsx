import React, { Fragment } from 'react'
import { InlineText } from './BlockText'

const CaseTriad = ({ labels = [], rows = [] }) => (
  <div className="case-triad">
    <div className="case-triad__head">
      {labels.slice(0, 3).map((label, index) => (
        <Fragment key={`${label}-${index}`}>
          <span className="mono-meta case-triad__label">{label}</span>
          {index < 2 && <span className="case-triad__arrow" aria-hidden="true">→</span>}
        </Fragment>
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

export default CaseTriad
