import React from 'react'
import { useTranslation } from '../contexts/LanguageContext'
import CaseCard from './CaseCard'

const Projects = () => {
  const { t } = useTranslation()

  const projects = [
    {
      id: 1,
      image: '/assets/keepl app.png',
      title: 'Keepl App',
      subtitle: 'Web & Mobile',
      description: 'Веб-приложение для достижения целей. Проектирование продукта с нуля: от анализа рынка и гипотез до разработки адаптивной дизайн-системы. В рамках кейса я проработал сложные сценарии визуализации данных и самостоятельно реализовал фронтенд-часть на React, чтобы валидировать UX-паттерны в живом интерфейсе.',
      tags: ['Product Design', 'Web App', 'Frontend (React)'],
      link: '#'
    },
    {
      id: 2,
      title: 'Keepl Landing page',
      subtitle: 'Landing page',
      description: 'Keepl Landing Page — лендинг для экосистемы трекинга целей. Спроектировал структуру страницы, выстраивая повествование от «боли» пользователя к решению, чтобы удержать внимание и максимально раскрыть ценность продукта. Перенес визуальный концепт приложения в адаптивный веб-дизайн и реализовал фронтенд с помощью ИИ, обеспечивая точность и соответствие интерфейса оригиналу.',
      image: '/assets/landing.png',
      tags: ['Product Design', 'Web', 'Mobile', 'Frontend (React)'],
      link: '#'
    },
    {
      id: 3,
      title: 'Проектирование интерфейса добавления операций',
      subtitle: 'Mobile App',
      description: 'Оптимизация процесса учета расходов. Провел UX-анализ причин оттока пользователей и полностью переработал флоу фиксации операций, сократив время ввода до 2-3 секунд. Спроектировал одноэкранный интерфейс с выбором категорий, минимизировал когнитивную нагрузку и подготовил финальный UI, сфокусированный на скорости использования «на ходу».',
      image: '/assets/fintech.png',
      tags: ['FinTech', 'Mobile', 'Product Design'],
      link: '#'
    },
    {
      id: 4,
      title: 'Hired App',
      subtitle: 'Mobile App',
      description: 'Проектирование платформы по поиску работы с нуля. Создал полный пользовательский опыт: от этапа исследования и JTBD-фреймворков до финальных интерфейсов. Разработал сложную архитектуру продукта, многошаговые сценарии и масштабируемую дизайн-систему.',
      image: '/assets/hired app.png',
      tags: ['Product Design', 'Mobile'],
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

        <div>
          {projects.map((project, index) => (
            <div key={project.id} className="mb-20">
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
