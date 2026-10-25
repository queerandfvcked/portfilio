import React, { Fragment } from 'react'
import { InlineText } from './BlockText'

const CaseChain = ({ nodes = [] }) => (
  <ol className="case-chain">
    {nodes.map((node, index) => (
      <Fragment key={`${node}-${index}`}>
        <li className="case-chain__item">
          <span className="case-chain__text">
            <InlineText text={node} />
          </span>
        </li>
        {index < nodes.length - 1 && (
          <li className="case-block-connector case-block-connector--chain" aria-hidden="true">
            <span>↓</span>
          </li>
        )}
      </Fragment>
    ))}
  </ol>
)

export default CaseChain
