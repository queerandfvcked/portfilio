import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../contexts/LanguageContext'
import CaseCard from './CaseCard'

const Projects = () => {
  const { t } = useTranslation()

  const projects = t('projectsList')

  return (
    <section id="projects" className="py-20">
      <div className="container">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('nav.projects')}
          </h2>
        </div>

        <div>
          {projects.map((project, index) => (
            <Link key={project.id} to={project.link}>
              <div className="mb-20">
                <CaseCard
                  key={project.id}
                  title={project.title}
                  subtitle={project.subtitle}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                  metrics={project.metrics}
                  link={project.link}
                  index={index}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
