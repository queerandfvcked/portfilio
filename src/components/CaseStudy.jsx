import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from '../contexts/LanguageContext'
import CaseNavigation from './CaseNavigation'
import { getCaseStudies } from './CaseStudyData'
import { formatContent as formatContentRaw } from './formatCaseContent.jsx'
import { RegularSection } from './CaseRegularSection'
import AmbientBackground from './AmbientBackground'
import CaseChapter from './CaseChapter'
import CaseScene from './CaseScene'
import CaseCard from './CaseCard'

const hasValue = (value) =>
  typeof value === 'string' && value.trim() !== '' && !value.startsWith('casePage.')

const makeTeaser = (section) => {
  if (section.teaser) return section.teaser
  if (!section.content) return ''
  const plain = section.content
    .replace(/[#*_>`|]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return plain.length > 150 ? `${plain.slice(0, 147)}…` : plain
}

const CaseStudy = () => {
  const { slug } = useParams()
  const { t, language } = useTranslation()

  const [activeSection, setActiveSection] = useState('')
  const [expandedSections, setExpandedSections] = useState({})
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageScale, setImageScale] = useState(1)
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [currentSlide, setCurrentSlide] = useState(0)
  const contentRef = useRef(null)

  const caseStudies = getCaseStudies(t, language)
  const currentCase = caseStudies[slug]
  const projects = t('projectsList')
  const projectList = Array.isArray(projects) ? projects : []
  const project = projectList.find((item) => item.id === slug)
  const sections = currentCase?.sections || []
  const collapsibleSections = sections.filter((section) => section.collapsible)
  const hasCollapsible = collapsibleSections.length > 0

  const toggleSection = (sectionId) => {
    if (!sections.find((section) => section.id === sectionId)?.collapsible) return

    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const expandAll = () => {
    setExpandedSections(Object.fromEntries(collapsibleSections.map((section) => [section.id, true])))
  }

  const collapseAll = () => {
    setExpandedSections(Object.fromEntries(collapsibleSections.map((section) => [section.id, false])))
  }

  const openImageModal = (imageSrc) => {
    setSelectedImage(imageSrc)
    document.body.style.overflow = 'hidden'
  }

  const closeImageModal = () => {
    setSelectedImage(null)
    setImageScale(1)
    setImagePosition({ x: 0, y: 0 })
    setIsDragging(false)
    document.body.style.overflow = 'auto'
  }

  const handleImageWheel = (e) => {
    if (window.innerWidth <= 768) return

    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    const newScale = Math.min(Math.max(0.5, imageScale * delta), 3)
    setImageScale(newScale)

    if (newScale === 1) {
      setImagePosition({ x: 0, y: 0 })
    }
  }

  const handleMouseDown = (e) => {
    if (imageScale <= 1) return

    setIsDragging(true)
    setDragStart({
      x: e.clientX - imagePosition.x,
      y: e.clientY - imagePosition.y
    })
    e.preventDefault()
  }

  const handleMouseMove = (e) => {
    if (!isDragging || imageScale <= 1) return

    setImagePosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragStart])

  const formatContent = (content) => formatContentRaw(content, openImageModal, language)

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  useEffect(() => {
    if (!currentCase) return

    setExpandedSections(
      Object.fromEntries(
        currentCase.sections
          .filter((section) => section.collapsible)
          .map((section) => [section.id, Boolean(section.defaultOpen)])
      )
    )
    setActiveSection(currentCase.sections[0]?.id || '')
  }, [slug, language])

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      img[src*="coinkeeper.png"],
      img[src*="money manager.png"],
      img[src*="incomes.png"] {
        max-width: 90% !important;
        height: 400px !important;
        width: auto !important;
        margin: 0 auto !important;
        display: block !important;
      }
      img[src*="zenmoney 1"], img[src*="zenmoney 2"], img[src*="zenmoney 3"],
      img[src*="monefy 1"], img[src*="monefy 2"], img[src*="monefy 3"],
      img[src*="spendee 1"], img[src*="spendee 2"], img[src*="spendee 3"],
      img[src*="money mgr 1"], img[src*="money mgr 2"], img[src*="money mgr 3"] {
        max-width: 40% !important;
        height: 320px !important;
        width: auto !important;
        object-fit: contain !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  useEffect(() => {
    if (!contentRef.current) return

    const observed = contentRef.current.querySelectorAll('[data-section]')
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top)

        if (visible.length > 0) {
          setActiveSection(visible[0].target.dataset.section)
        }
      },
      { rootMargin: '-100px 0px -70% 0px', threshold: 0 }
    )

    observed.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [slug, language])

  const scrollToSection = (sectionId) => {
    if (sections.find((section) => section.id === sectionId)?.collapsible) {
      setExpandedSections((prev) => ({ ...prev, [sectionId]: true }))
    }

    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }, 40)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openLandingChapter = () => {
    setExpandedSections((prev) => ({ ...prev, landing: true }))
    window.setTimeout(() => {
      document.getElementById('landing')?.scrollIntoView({ behavior: 'smooth' })
    }, 40)
  }

  if (!currentCase) {
    return (
      <div className="case-page min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-primary mb-8">{t('casePage.notFound')}</h1>
          <Link to="/" className="btn-accent">
            {t('casePage.backHome')}
          </Link>
        </div>
      </div>
    )
  }

  const metaItems = [
    { label: t('casePage.role'), value: currentCase.meta?.role },
    { label: t('casePage.platform'), value: project?.platform || currentCase.meta?.platform },
    { label: t('casePage.scope'), value: project?.scope || currentCase.meta?.scope },
    { label: t('casePage.status'), value: currentCase.meta?.status }
  ].filter((item) => hasValue(item.value))

  const stats = Array.isArray(currentCase.stats) ? currentCase.stats : []
  const links = Array.isArray(currentCase.links) ? currentCase.links : []
  const takeaways = Array.isArray(currentCase.takeaways) ? currentCase.takeaways : []
  const tldrValues = currentCase.tldr
  const tldr = tldrValues && ['problem', 'solution', 'result'].every((key) => hasValue(tldrValues[key]))
    ? tldrValues
    : null
  const domain = project?.domain?.join(' · ') || currentCase.subtitle
  const otherCases = projectList
    .filter((item) => item.id !== slug && item.id !== 'keepl-landing')
    .slice(0, 3)
    .map((item) => ({ ...item, variant: 'compact' }))

  return (
    <div className="case-page">
      <header className="case-hero">
        <AmbientBackground />

        <div className="container case-hero__inner">
          <Link to="/#projects" className="case-back">
            {t('casePage.back')}
          </Link>

          <div className="case-hero__grid">
            <div className="case-hero__copy">
              <span className="mono-meta case-hero__eyebrow">{domain}</span>
              <h1 className="case-hero__title">{currentCase.title}</h1>
              <p className="case-hero__desc">{currentCase.description}</p>

              {slug === 'keepl-app' && (
                <button type="button" className="case-hero__landing-link" onClick={openLandingChapter}>
                  {t('casePage.includesLanding')}
                </button>
              )}

              {links.length > 0 && (
                <div className="case-links">
                  {links.map((link) => {
                    const className = link.kind === 'primary' ? 'btn-accent' : 'btn-ghost'

                    if (link.external) {
                      return (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={className}
                        >
                          {link.label}
                        </a>
                      )
                    }

                    return (
                      <Link key={link.label} to={link.href} className={className}>
                        {link.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="case-hero__media">
              {project ? (
                <CaseScene project={project} variant="hero" priority />
              ) : (
                <div className="case-scene case-scene--hero case-scene--cover">
                  <img
                    src={currentCase.heroImage}
                    alt={currentCase.title}
                    className="case-scene__cover-img"
                  />
                </div>
              )}
            </div>
          </div>

          {metaItems.length > 0 && (
            <dl className="case-meta">
              {metaItems.map((item) => (
                <div key={item.label} className="case-meta__item">
                  <dt className="mono-meta">{item.label}</dt>
                  <dd className="case-meta__value">{item.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {stats.length > 0 && (
            <div className="case-stats">
              <div
                className="case-stats__grid"
                style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
              >
                {stats.map((stat) => (
                  <div key={`${stat.value}-${stat.label}`} className="case-stats__item">
                    <span className="case-stats__value">{stat.value}</span>
                    <span className="case-stats__label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {tldr && (
        <section className="case-tldr">
          <div className="container">
            <h2 className="case-tldr__title">{t('casePage.in20Seconds')}</h2>
            <div className="case-tldr__grid">
              {[
                { key: 'problem', label: t('casePage.problem') },
                { key: 'solution', label: t('casePage.solution') },
                { key: 'result', label: t('casePage.outcome') }
              ].map((item) => (
                <article key={item.key} className="case-tldr__card">
                  <span className="mono-meta case-tldr__label">{item.label}</span>
                  <p className="case-tldr__text">{tldr[item.key]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <main className="case-main">
        <div className="container">
          <div className="case-layout">
            <div className="case-toc">
              <CaseNavigation
                sections={sections}
                activeSection={activeSection}
                onSectionClick={scrollToSection}
              />
            </div>

            <div className="case-chapters" ref={contentRef}>
              {hasCollapsible && (
                <div className="case-chapters__toolbar">
                  <button type="button" className="case-chapters__tool" onClick={expandAll}>
                    {t('casePage.expandAll')}
                  </button>
                  <button type="button" className="case-chapters__tool" onClick={collapseAll}>
                    {t('casePage.collapseAll')}
                  </button>
                </div>
              )}

              {sections.map((section, index) => (
                <CaseChapter
                  key={section.id}
                  section={{ ...section, teaser: makeTeaser(section) }}
                  index={index}
                  isActive={activeSection === section.id}
                  isExpanded={Boolean(expandedSections[section.id])}
                  onToggle={() => toggleSection(section.id)}
                >
                  <div className="case-chapter__content">
                    <RegularSection
                      section={section}
                      isActive={activeSection === section.id}
                      slug={slug}
                      t={t}
                      language={language}
                      formatContent={formatContent}
                      openImageModal={openImageModal}
                      currentSlide={currentSlide}
                      setCurrentSlide={setCurrentSlide}
                      embedded
                      hideHeading
                    />

                    {section.landingLinks && <LandingLinks links={section.landingLinks} />}
                  </div>
                </CaseChapter>
              ))}

              {takeaways.length > 0 && (
                <CaseChapter
                  section={{ id: 'takeaways', title: t('casePage.learned'), collapsible: false }}
                  index={sections.length}
                  isActive={false}
                  isExpanded={false}
                  onToggle={() => {}}
                >
                  <div className="case-chapter__content">
                    <Takeaways takeaways={takeaways} />
                  </div>
                </CaseChapter>
              )}
            </div>
          </div>
        </div>

        {otherCases.length > 0 && (
          <section className="case-other">
            <div className="container">
              <h2 className="case-other__title">{t('casePage.otherCases')}</h2>
              <div className="case-other__grid">
                {otherCases.map((item) => (
                  <CaseCard key={item.id} project={item} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {selectedImage && (
        <>
          <button
            className="fixed top-4 right-4 z-[60] text-white hover:text-accent-400 transition-colors animate-slide-down"
            onClick={closeImageModal}
            aria-label="Close image"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="fixed inset-0 z-50 flex bg-black/90 p-4 animate-fade-in overflow-auto"
            onClick={closeImageModal}
          >
            <div className="relative max-w-6xl m-auto animate-scale-in">
              <div className={`relative ${imageScale > 1 ? '' : 'overflow-hidden max-h-[90vh]'}`}>
                <img
                  src={selectedImage}
                  alt="Enlarged view"
                  className={`object-contain rounded-lg transition-transform duration-200 ${
                    imageScale > 1 && window.innerWidth > 768 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
                  }`}
                  style={{
                    transform: `scale(${imageScale}) translate(${imagePosition.x / imageScale}px, ${imagePosition.y / imageScale}px)`,
                    transformOrigin: 'center',
                    maxHeight: '90vh',
                    minWidth: '200px',
                    userSelect: 'none'
                  }}
                  onWheel={handleImageWheel}
                  onMouseDown={handleMouseDown}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            {window.innerWidth > 768 && (
              <p className="fixed bottom-4 right-8 text-secondary text-sm pointer-events-none">{t('common.zoomHint')}</p>
            )}
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
        .animate-slide-down { animation: slide-down 0.3s ease-out 0.1s both; }
      `}</style>

      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-40 p-3 bg-accent-500/20 backdrop-blur-xl rounded-full border border-accent-500/30 text-accent-400 hover:bg-accent-500/30 hover:text-accent-300 hover:border-accent-500/50 transition-all duration-300 group"
        aria-label={language === 'ru' ? 'Наверх' : 'Back to top'}
      >
        <svg
          className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  )
}

const LandingLinks = ({ links }) => (
  <div className="case-links">
    {links.map((link) => {
      const className = link.kind === 'primary' ? 'btn-accent' : 'btn-ghost'

      if (link.external) {
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
          >
            {link.label}
          </a>
        )
      }

      return (
        <Link key={link.label} to={link.href} className={className}>
          {link.label}
        </Link>
      )
    })}
  </div>
)

const Takeaways = ({ takeaways }) => (
  <div className="case-takeaways__list">
    {takeaways.map((item) => (
      <div key={item.title} className="case-takeaways__item">
        <h3 className="case-takeaways__heading">{item.title}</h3>
        <p className="case-takeaways__text">{item.text}</p>
      </div>
    ))}
  </div>
)

export default CaseStudy
