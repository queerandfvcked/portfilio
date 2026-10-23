import React from 'react'
import CaseStage from './CaseStage'

const CaseGallery = ({ cols = 2, items = [], caseId, onImageClick }) => (
  <div className={`case-gallery case-gallery--${cols}`}>
    {items.map((item, index) => (
      <CaseStage
        key={`${item.src}-${index}`}
        items={[item]}
        layout="single"
        caseId={caseId}
        onImageClick={onImageClick}
        compact
      />
    ))}
  </div>
)

export default CaseGallery
