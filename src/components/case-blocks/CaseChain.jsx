import React from 'react'
import { InlineText } from './BlockText'

const CaseChain = ({ nodes = [] }) => (
  <ol className="case-chain">
    {nodes.map((node, index) => (
      <li key={`${node}-${index}`} className="case-chain__item">
        <span className="case-chain__text">
          <InlineText text={node} />
        </span>
      </li>
    ))}
  </ol>
)

export default CaseChain
