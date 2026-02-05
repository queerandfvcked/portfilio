import React from 'react'
import { useTranslation } from '../contexts/LanguageContext'
import CaseCard from './CaseCard'

const Projects = () => {
  const { t } = useTranslation()

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform Redesign',
      subtitle: 'Mobile App Design',
      description: 'Complete redesign of mobile e-commerce application with focus on user experience and conversion optimization. Implemented new design system and improved user flow from product discovery to checkout.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      tags: ['E-commerce', 'Mobile', 'Prototyping'],
      metrics: [
        { value: '+30%', label: 'Conversion Rate' },
        { value: '+20%', label: 'Avg Order Value' }
      ],
      link: '#'
    },
    {
      id: 2,
      title: 'Banking Dashboard',
      subtitle: 'Web Application',
      description: 'Design and development of comprehensive banking dashboard with real-time data visualization and analytics. Created intuitive interface for complex financial data management.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      tags: ['FinTech', 'Dashboard', 'Data Viz'],
      metrics: [
        { value: '+45%', label: 'User Engagement' },
        { value: '-60%', label: 'Task Time' }
      ],
      link: '#'
    },
    {
      id: 3,
      title: 'Healthcare Patient Portal',
      subtitle: 'Web & Mobile',
      description: 'End-to-end design of patient portal system with appointment scheduling and medical records management. Focused on accessibility and ease of use for all age groups.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
      tags: ['Healthcare', 'Portal', 'Mobile'],
      metrics: [
        { value: '+25%', label: 'Patient Satisfaction' },
        { value: '+40%', label: 'Appointment Rate' }
      ],
      link: '#'
    },
    {
      id: 4,
      title: 'SaaS Analytics Platform',
      subtitle: 'Enterprise Solution',
      description: 'Design of comprehensive analytics platform for enterprise clients with custom dashboards, reporting tools, and data visualization capabilities.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      tags: ['SaaS', 'Analytics', 'Enterprise'],
      metrics: [
        { value: '+35%', label: 'User Retention' },
        { value: '+50%', label: 'Data Accuracy' }
      ],
      link: '#'
    }
  ]

  return (
    <section id="projects" className="py-20">
      <div className="container">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('projects.title')}
          </h2>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
