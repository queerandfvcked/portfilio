import React from 'react'
import { InlineText } from './BlockText'

const CaseFlow = ({ nodes = [], loops = [] }) => (
  <div className="case-flow">
    <ol className="case-flow__nodes">
      {nodes.map((node, index) => (
        <li key={`${node.title}-${index}`} className="case-flow__node">
          <span
            className={`case-flow__marker case-flow__marker--${node.shape}`}
            aria-hidden="true"
          >
            <span>{index + 1}</span>
          </span>
          <h3 className="case-flow__title">
            <InlineText text={node.title} />
          </h3>
          {node.text && (
            <p className="case-flow__text">
              <InlineText text={node.text} />
            </p>
          )}
        </li>
      ))}
    </ol>

    {loops.length > 0 && (
      <ul className="case-flow__loops">
        {loops.map((loop, index) => (
          <li key={`${loop.from}-${loop.to}-${index}`} className="case-flow__loop">
            <span className="mono-meta">
              {loop.from} → {loop.to}
            </span>
            {loop.label && <span className="case-flow__loop-label">{loop.label}</span>}
          </li>
        ))}
      </ul>
    )}
  </div>
)

export default CaseFlow
