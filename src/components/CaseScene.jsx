import React from 'react'
import CaseImage from './CaseImage'
import Reveal from './Reveal'
import { CASE_MEDIA } from './caseMedia'

export const CASE_GLOW = {
  zhabka: { rgb: '70 120 200', alpha: 0.28, position: '72% 8%' },
  'keepl-app': { rgb: '95 227 176', alpha: 0.24, position: '28% 42%' },
  'add-transition': { rgb: '95 227 176', alpha: 0.18, position: '50% 0%' },
  'hired-app': { rgb: '95 227 176', alpha: 0.16, position: '50% 0%' }
}

const HERO_SCENES = {
  zhabka: {
    aspect: '1.23',
    laptop: { left: '10.7%', top: '0%', width: '89.3%' },
    phone: { left: '0%', top: '29.5%', width: '36.4%' }
  },
  'keepl-app': {
    aspect: '1.07',
    laptop: { left: '0%', top: '0%', width: '88%' },
    phone: { left: '69.5%', top: '17.6%', width: '29%', rotate: '-8deg' }
  }
}

const CaseScene = ({ project, variant = 'card', priority = false }) => {
  const media = CASE_MEDIA[project.id]
  if (!media) return null

  if (variant === 'hero') {
    const scene = HERO_SCENES[project.id]
    const glow = CASE_GLOW[project.id] || CASE_GLOW['hired-app']
    const glowStyle = {
      '--glow-rgb': glow.rgb,
      '--glow-a': glow.alpha,
      '--glow-pos': glow.position
    }

    if (scene) {
      return (
        <div
          className={`case-scene case-scene--hero case-scene--${project.id === 'zhabka' ? 'zhabka' : 'keepl'}`}
          style={{ ...glowStyle, '--scene-aspect': scene.aspect }}
        >
          <div className="case-scene__laptop" style={scene.laptop}>
            <Reveal delay={0} y={22}>
              <CaseImage
                name={media.laptop}
                alt={`${project.title} - desktop`}
                sizes="(min-width: 1024px) 640px, 92vw"
                priority={priority}
                className="case-mock-par case-mock-par--laptop"
              />
            </Reveal>
          </div>

          <div className="case-scene__phone" style={scene.phone}>
            <Reveal delay={150} y={26}>
              <CaseImage
                name={media.phone}
                alt={`${project.title} - mobile`}
                sizes="(min-width: 1024px) 260px, 36vw"
                className="case-mock-par case-mock-par--phone"
              />
            </Reveal>
          </div>
        </div>
      )
    }

    return (
      <div className="case-scene case-scene--hero case-scene--cover" style={glowStyle}>
        <CaseImage
          name={media.cover}
          alt={project.title}
          sizes="(min-width: 1024px) 640px, 92vw"
          priority={priority}
          className="case-scene__cover-img"
        />
      </div>
    )
  }

  if (project.variant === 'wide') {
    return (
      <div className="case-scene">
        <div className="case-scene__laptop">
          <Reveal delay={0} y={22}>
            <CaseImage
              name={media.laptop}
              alt={`${project.title} - desktop`}
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
              alt={`${project.title} - mobile`}
              sizes="(min-width: 1024px) 260px, 36vw"
              className="case-mock-par case-mock-par--phone"
            />
          </Reveal>
        </div>
      </div>
    )
  }

  return (
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
  )
}

export default CaseScene
