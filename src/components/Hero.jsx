import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from '../contexts/LanguageContext'
import AmbientBackground from './AmbientBackground'
import Reveal from './Reveal'

const Hero = () => {
  const { t } = useTranslation()

  const skills = t('skills')

  const sectionRef = useRef(null)
  const [spotlight, setSpotlight] = useState(false)

  /* Cursor-tracked spotlight on the background grid.
     Positions go straight to CSS variables on the section — one rAF per
     frame, no React state, no re-renders. Skipped entirely on coarse
     pointers and when the user asked for reduced motion. */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduce.matches) return

    setSpotlight(true)

    let latestX = 0
    let latestY = 0
    let raf = 0
    let listening = false

    const flush = () => {
      raf = 0
      el.style.setProperty('--mx', `${latestX}px`)
      el.style.setProperty('--my', `${latestY}px`)
    }

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      latestX = e.clientX - rect.left
      latestY = e.clientY - rect.top
      if (!raf) raf = requestAnimationFrame(flush)
    }

    const onEnter = () => el.classList.add('is-spotlit')
    const onLeave = () => el.classList.remove('is-spotlit')

    const listen = () => {
      if (listening) return
      el.addEventListener('pointermove', onMove, { passive: true })
      listening = true
    }

    const unlisten = () => {
      if (!listening) return
      el.removeEventListener('pointermove', onMove)
      listening = false
      if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    listen()
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)

    // Stop tracking entirely while the hero is off screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          listen()
        } else {
          unlisten()
          el.classList.remove('is-spotlit')
        }
      },
      { threshold: 0 }
    )
    io.observe(el)

    return () => {
      unlisten()
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
      io.disconnect()
    }
  }, [])

  // duplicated once so the marquee loops seamlessly at -50%
  const marqueeItems = [...skills, ...skills]

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative overflow-hidden flex items-center"
      style={{ minHeight: 'max(88svh, 560px)' }}
    >
      <AmbientBackground spotlight={spotlight} />

      <div
        className="container relative z-10"
        style={{ paddingTop: 'clamp(100px, 15vh, 170px)', paddingBottom: 'clamp(96px, 12vh, 130px)' }}
      >
        <div className="grid gap-10 md:gap-12 items-end md:grid-cols-[1.15fr_0.85fr]">
          {/* Left: role + name */}
          <div>
            <Reveal y={14}>
              <p
                className="font-heading font-bold"
                style={{
                  fontSize: 'clamp(17px, 2.2vw, 26px)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                  color: 'var(--muted)',
                  marginBottom: 'clamp(14px, 2vw, 22px)',
                }}
              >
                {t('hero.title')}
              </p>
            </Reveal>

            <h1
              className="font-mega sheen-text"
              style={{ fontSize: 'clamp(48px, 11vw, 142px)' }}
            >
              <span className="mask-line">
                <span style={{ '--d': '80ms' }}>Andrian</span>
              </span>
              <span className="mask-line">
                <span style={{ '--d': '190ms' }}>Shtark</span>
              </span>
            </h1>
          </div>

          {/* Right: label + lead */}
          <div className="md:pb-2">
            <Reveal delay={300} style={{ marginBottom: 20 }}>
              <span className="mono-meta">B2C · Web &amp; Mobile</span>
            </Reveal>

            <Reveal delay={380}>
              <p className="prose-lead line-clamp-3" style={{ marginTop: 20 }}>
                {t('hero.subtitle')}
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Skills strip — full bleed */}
      <div
        className="absolute inset-x-0 bottom-0 z-10"
        style={{ borderTop: '1px solid var(--line)' }}
      >
        <div
          className="marquee-wrap overflow-hidden py-4"
          style={{
            maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)',
          }}
        >
          <div className="marquee">
            {marqueeItems.map((skill, index) => (
              <span key={index} className="flex items-center gap-6 pr-6">
                <span className="mono-meta" style={{ color: 'var(--muted)' }}>
                  {skill}
                </span>
                <svg className="w-1.5 h-1.5 shrink-0" viewBox="0 0 10 10" fill="var(--accent)" aria-hidden="true">
                  <path d="M5 0l5 5-5 5-5-5z" />
                </svg>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero