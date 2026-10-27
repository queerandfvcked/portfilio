import React from 'react'
import { InlineText } from './BlockText'

const CaseCards = ({ cols = 3, numbered = false, featured = false, items = [] }) => (
  <div className={`case-cards case-cards--${cols}${featured ? ' case-cards--featured' : ''}`}>
    {items.map((item, index) => (
      <article key={`${item.title}-${index}`} className="case-cards__item">
        {numbered && (
          <span className="mono-meta case-cards__number">
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
        <h3 className="case-cards__title">
          <InlineText text={item.title} />
        </h3>
        {item.text && (
          <p className="case-cards__text">
            <InlineText text={item.text} />
          </p>
        )}
      </article>
    ))}
  </div>
)

export default CaseCards
