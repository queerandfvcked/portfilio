import React from 'react'
import { useTranslation } from '../contexts/LanguageContext'
import CaseCard from './CaseCard'

const Projects = () => {
  const { t } = useTranslation()

  const projects = t('projectsList')
  const wide = projects.filter((project) => project.variant === 'wide')
  const compact = projects.filter((project) => project.variant === 'compact')

  return (
    <section id="projects" className="py-20">
      <div className="container">
        <div className="mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text">
            {t('nav.projects')}
          </h2>
        </div>

        <div className="case-list">
          {wide.map((project, index) => (
            <CaseCard key={project.id} project={project} priority={index === 0} />
          ))}

          <div className="case-row">
            {compact.map((project) => (
              <CaseCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
