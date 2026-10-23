import React from 'react'

const CaseChips = ({ items = [] }) => (
  <div className="case-chips">
    {items.map((item, index) => (
      <span key={`${item}-${index}`} className="mono-meta case-chips__item">
        {item}
      </span>
    ))}
  </div>
)

export default CaseChips
