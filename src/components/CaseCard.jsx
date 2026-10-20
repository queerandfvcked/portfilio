import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../contexts/LanguageContext'
import useSpotlight from '../hooks/useSpotlight'
import CaseImage from './CaseImage'
import Reveal from './Reveal'
import { CASE_MEDIA } from './caseMedia'

// Glow per case: Zhabka is cold blue-teal, Keepl is the mint accent.
const GLOW = {
  zhabka: { rgb: '70 120 200', alpha: 0.28, position: '72% 8%' },
  'keepl-app': { rgb: '95 227 176', alpha: 0.24, position: '28% 42%' },
  'add-transition': { rgb: '95 227 176', alpha: 0.18, position: '50% 0%' },
  'hired-app': { rgb: '95 227 176', alpha: 0.16, position: '50% 0%' }
}

const CaseCard = ({ project, priority = false }) => {
  const { t } = useTranslation()
  const cardRef = useRef(null)

  const isWide = project.variant === 'wide'
  const media = CASE_MEDIA[project.id]
  const glow = GLOW[project.id] || GLOW['hired-app']

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
        <span className="case-card__arrow" aria-hidden="true">
          →
        </span>
      </span>
    </div>
  )

  return (
    <Link
      ref={cardRef}
      to={project.link}
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

          <div className="case-scene">
            <div className="case-scene__laptop">
              <Reveal delay={0} y={22}>
                <CaseImage
                  name={media.laptop}
                  alt={`${project.title} — desktop`}
                  sizes="(min-width: 1024px) 640px, 92vw"
                  priority={priority}
                  className="case-mock-par case-mock-par--laptop"
                />
              </Reveal>
            </div>

            <div className="case-scene__phone">
              <Reveal delay={150} y={26}>
                <CaseImage
                  name={media.phone}
                  alt={`${project.title} — mobile`}
                  sizes="(min-width: 1024px) 260px, 36vw"
                  className="case-mock-par case-mock-par--phone"
                />
              </Reveal>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="case-card__cover">
            <CaseImage
              name={media.cover}
              alt={project.title}
              sizes="(min-width: 768px) 560px, 92vw"
              priority={priority}
              className={`case-card__cover-img ${project.id === 'hired-app' ? 'case-card__cover-img--hired' : ''}`}
            />
            {project.badge && <span className="case-card__badge">{project.badge}</span>}
          </div>

          <div className="case-card__body">{textBlock}</div>
        </>
      )}
    </Link>
  )
}

export default CaseCard
