import React from 'react'
import FlowChart from '../FlowChart'
import { useTranslation } from '../../contexts/LanguageContext'

const CaseFlow = ({ nodes = [], loops = [] }) => {
  const { t } = useTranslation()
  const process = t('process')

  const steps = nodes.map((node) => ({
    kind: node.shape || 'square',
    title: node.title,
    text: node.text
  }))

  if (steps.length === 0) return null

  return (
    <div className="case-flow">
      <FlowChart
        steps={steps}
        loops={loops}
        defaultFirstStep={true}
        labels={{
          yes: process?.yes || '',
          no: process?.no || '',
          step: process?.step || 'Step',
          of: process?.of || 'of',
          example: process?.exampleLabel || '',
          back: process?.backLabel || ''
        }}
      />
    </div>
  )
}

export default CaseFlow
