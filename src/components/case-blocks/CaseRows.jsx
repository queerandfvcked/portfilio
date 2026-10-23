import React from 'react'
import { InlineText } from './BlockText'

const CaseRows = ({ items = [] }) => (
  <div className="case-rows">
    {items.map((item, index) => (
      <div key={`${item.title}-${index}`} className="case-rows__item">
        <h3 className="case-rows__title">
          <InlineText text={item.title} />
        </h3>
        {item.text && (
          <p className="case-rows__text">
            <InlineText text={item.text} />
          </p>
        )}
      </div>
    ))}
  </div>
)

export default CaseRows
