import React from 'react'
import { InlineText } from './BlockText'

const CaseCallout = ({ label, text }) => (
  <aside className="case-callout">
    {label && <span className="mono-meta case-callout__label">{label}</span>}
    <p className="case-callout__text">
      <InlineText text={text} />
    </p>
  </aside>
)

export default CaseCallout
