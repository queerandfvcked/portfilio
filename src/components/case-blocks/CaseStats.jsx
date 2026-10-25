import React from 'react'

const CaseStats = ({ items = [] }) => {
  if (items.length === 0) return null

  return (
    <div className="case-stats case-block-stats">
      <div
        className="case-stats__grid"
        data-count={items.length}
        style={{ '--cols': items.length }}
      >
        {items.map((item, index) => (
          <div key={`${item.value}-${index}`} className="case-stats__item">
            <span className="case-stats__value">{item.value}</span>
            <span className="case-stats__label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CaseStats
