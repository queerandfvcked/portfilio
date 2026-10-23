import React from 'react'
import FlowChart from './FlowChart'
import { useTranslation } from '../contexts/LanguageContext'

const ProcessFlow = () => {
  const { t } = useTranslation()
  const process = t('process')
  const projects = t('projectsList')

  const steps = process.steps.map((step) => {
    const project = projects.find((item) => item.id === step.caseId)

    return {
      kind: step.kind,
      title: step.title,
      text: step.text,
      link: project ? { href: project.link, label: step.example } : undefined
    }
  })

  const loops = process.steps.flatMap((step, index) =>
    step.backTo
      ? [{ from: index + 1, to: step.backTo, label: process.no }]
      : []
  )

  return (
    <section id="about" className="process-flow py-20">
      <div className="grid-mask process-flow__grid" aria-hidden="true" />

      <div className="container relative z-10">
        <div className="mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text">
            {process.heading}
          </h2>
        </div>

        <FlowChart
          steps={steps}
          loops={loops}
          terminal
          labels={{
            yes: process.yes,
            no: process.no,
            step: process.step,
            of: process.of,
            example: process.exampleLabel,
            back: process.backLabel
          }}
        />
      </div>
    </section>
  )
}

export default ProcessFlow
