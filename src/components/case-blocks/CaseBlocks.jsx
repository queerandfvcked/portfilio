import React from 'react'
import CaseCallout from './CaseCallout'
import CaseCards from './CaseCards'
import CaseTriad from './CaseTriad'
import CaseStats from './CaseStats'
import CaseQuad from './CaseQuad'
import CaseSteps from './CaseSteps'
import CaseChain from './CaseChain'
import CaseChips from './CaseChips'
import CaseRows from './CaseRows'
import CaseFindings from './CaseFindings'
import CaseGallery from './CaseGallery'
import CaseStage from './CaseStage'
import CaseSlider from './CaseSlider'
import CaseFlow from './CaseFlow'
import './case-blocks.css'

const renderers = {
  callout: CaseCallout,
  cards: CaseCards,
  triad: CaseTriad,
  stats: CaseStats,
  quad: CaseQuad,
  steps: CaseSteps,
  chain: CaseChain,
  chips: CaseChips,
  rows: CaseRows,
  findings: CaseFindings,
  gallery: CaseGallery,
  stage: CaseStage,
  slider: CaseSlider,
  flow: CaseFlow
}

export const CaseBlock = ({ block, caseId, openImageModal }) => {
  const Component = renderers[block.type]

  if (!Component) {
    return <pre className="case-block-fallback">{block.props.raw}</pre>
  }

  return (
    <Component
      {...block.props}
      caseId={caseId}
      onImageClick={openImageModal}
    />
  )
}

export default CaseBlock
