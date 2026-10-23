import React from 'react'
import { InlineText } from './BlockText'

const CaseFindings = ({ items = [] }) => (
  <div className="case-findings">
    {items.map((item, index) => {
      const isGood = item.kind === 'good'
      return (
        <article
          key={`${item.title}-${index}`}
          className={`case-findings__item case-findings__item--${isGood ? 'good' : 'mistake'}${item.image ? '' : ' case-findings__item--text'}`}
        >
          {item.image && (
            <div className="case-findings__media">
              <img src={item.image} alt={item.title || ''} loading="lazy" />
            </div>
          )}

          <div className="case-findings__body">
            <span className="mono-meta case-findings__badge">
              {isGood ? 'Хорошо' : 'Ошибка'}
            </span>
            <h3 className="case-findings__title">
              <InlineText text={item.title} />
            </h3>
            {item.text && (
              <p className="case-findings__text">
                <InlineText text={item.text} />
              </p>
            )}
          </div>
        </article>
      )
    })}
  </div>
)

export default CaseFindings
