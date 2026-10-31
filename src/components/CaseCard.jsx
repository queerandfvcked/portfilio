import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../contexts/LanguageContext'
import useSpotlight from '../hooks/useSpotlight'
import CaseScene, { CASE_GLOW } from './CaseScene'
import { localizedPath } from '../utils/localizedPath'

const CaseCard = ({ project, priority = false }) => {
  const { t, language } = useTranslation()
  const cardRef = useRef(null)

  const isWide = project.variant === 'wide'
  const glow = CASE_GLOW[project.id] || CASE_GLOW['hired-app']

  useSpotlight(cardRef, { parallax: isWide })

  const domain = project.domain.join(' · ')

  const textBlock = (
    <div className="case-card__text-inner">
      <span className="mono-meta case-card__domain">{domain}</span>

      <h3 className={`case-card__title ${isWide ? 'case-card__title--wide' : ''}`}>
        {project.cardTitle || project.title}
      </h3>

      <p className={`case-card__desc ${isWide ? '' : 'case-card__desc--compact'}`}>
        {project.summary}
      </p>

      {project.highlight && (
        <div className="case-card__highlight">
          <span className="case-card__highlight-value">{project.highlight.value}</span>
          <span className="case-card__highlight-label">{project.highlight.label}</span>
        </div>
      )}

      <dl className="case-card__specs">
        <div className="case-card__spec">
          <dt className="mono-meta-sm">{t('projects.platformLabel')}</dt>
          <dd>{project.platform}</dd>
        </div>
        <div className="case-card__spec">
          <dt className="mono-meta-sm">{t('projects.scopeLabel')}</dt>
          <dd>{project.scope}</dd>
        </div>
      </dl>

      <span className="case-card__link">
        {t('projects.viewCase')}
      </span>
    </div>
  )

  return (
    <Link
      ref={cardRef}
      to={localizedPath(language, project.link)}
      className={`case-card ${isWide ? `case-card--wide case-card--${project.id === 'zhabka' ? 'zhabka' : 'keepl'}` : 'case-card--compact'}`}
      style={{
        '--glow-rgb': glow.rgb,
        '--glow-a': glow.alpha,
        '--glow-pos': glow.position
      }}
      aria-label={project.title}
    >
      <div className="case-card__bg" aria-hidden="true">
        <div className="grid-mask" />
        <div className="grid-spotlight" />
      </div>

      {isWide ? (
        <>
          <div className="case-card__cols">
            <div className="case-card__text">{textBlock}</div>
          </div>

          <CaseScene project={project} priority={priority} />
        </>
      ) : (
        <>
          <CaseScene project={project} priority={priority} />

          <div className="case-card__body">{textBlock}</div>
        </>
      )}
    </Link>
  )
}

export default CaseCard
