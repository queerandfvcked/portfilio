import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from '../contexts/LanguageContext'
import ContactSidebar from './ContactSidebar'

// Sections to track. Their order is read from the DOM at runtime, so the
// list does not have to match the order they happen to be rendered in.
const SECTIONS = ['home', 'projects', 'about']

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { language, toggleLanguage, t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  const barRef = useRef(null)
  const rafRef = useRef(0)
  const scrolledRef = useRef(false)

  const isHome = location.pathname === '/'

  /* ── Navigation ─────────────────────────────────────── */

  const scrollToAnchor = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // While already on the homepage we scroll in place instead of letting the
  // router push another history entry for a hash we are already showing.
  const handleHomeClick = (e) => {
    if (!isHome) return
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    navigate('/', { replace: true })
  }

  const handleSectionClick = (e, id) => {
    if (!isHome) return
    e.preventDefault()
    scrollToAnchor(id)
  }

  /* ── Scroll: progress bar via ref, isScrolled on change only ── */

  useEffect(() => {
    const update = () => {
      const y = window.scrollY

      const scrolled = y > 20
      if (scrolled !== scrolledRef.current) {
        scrolledRef.current = scrolled
        setIsScrolled(scrolled)
      }

      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
    }

    // One rAF per frame, no matter how many scroll events land in it.
    const schedule = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        update()
      })
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
  }, [location.pathname])

  // Allows any section (e.g. hero) to open the contact panel
  useEffect(() => {
    const open = () => setIsContactOpen(true)
    window.addEventListener('open-contact', open)
    return () => window.removeEventListener('open-contact', open)
  }, [])

  /* ── Scrollspy ──────────────────────────────────────── */

  useEffect(() => {
    if (!isHome) {
      setActiveSection('')
      return
    }

    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return

    // Reading order straight from the document.
    const order = els
      .slice()
      .sort((a, b) =>
        a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
      )
      .map((el) => el.id)

    const visible = new Set()

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target.id)
          else visible.delete(e.target.id)
        })

        const hit = order.filter((id) => visible.has(id)).pop()
        if (hit) setActiveSection(hit)
      },
      // A thin band across the middle of the viewport acts as the reading line.
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [isHome])

  const navItems = [
    { id: 'home', name: t('nav.home') },
    { id: 'projects', name: t('nav.projects') },
    { id: 'about', name: t('nav.about') },
    {
      name: t('nav.resume'),
      href: language === 'ru' ? '/assets/resume_ru.pdf' : '/assets/resume_en.pdf',
      download: true,
    },
  ]

  const isActive = (item) => isHome && activeSection === item.id

  const navLinkClass = 'block px-4 py-2 rounded-full text-[13px] font-semibold transition-colors duration-200'

  const navTarget = (item) => (item.id === 'home' ? '/' : `/#${item.id}`)

  const navOnClick = (item) => (item.id === 'home' ? handleHomeClick : (e) => handleSectionClick(e, item.id))

  const renderNavItem = (item) => {
    if (item.download) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className={navLinkClass}
          style={{ color: isActive(item) ? 'var(--accent-ink)' : 'var(--muted)' }}
          onMouseEnter={(e) => {
            if (!isActive(item)) e.currentTarget.style.color = 'var(--text)'
          }}
          onMouseLeave={(e) => {
            if (!isActive(item)) e.currentTarget.style.color = 'var(--muted)'
          }}
        >
          {item.name}
        </a>
      )
    }

    const onClick = navOnClick(item)

    return (
      <Link
        to={navTarget(item)}
        className={navLinkClass}
        style={
          isActive(item)
            ? { color: 'var(--accent-ink)', background: 'var(--accent)' }
            : { color: 'var(--muted)' }
        }
        onClick={onClick}
        onMouseEnter={(e) => {
          if (!isActive(item)) {
            e.currentTarget.style.color = 'var(--text)'
            e.currentTarget.style.background = 'var(--surface-2)'
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive(item)) {
            e.currentTarget.style.color = 'var(--muted)'
            e.currentTarget.style.background = 'transparent'
          }
        }}
      >
        {item.name}
      </Link>
    )
  }

  return (
    <header
      className="fixed top-0 w-full z-50 transition-colors duration-300"
      style={{
        backgroundColor: isScrolled ? 'rgb(var(--bg-rgb) / 0.66)' : 'transparent',
        borderBottom: `1px solid ${isScrolled ? 'var(--line)' : 'transparent'}`,
        backdropFilter: isScrolled ? 'blur(14px) saturate(140%)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(14px) saturate(140%)' : 'none',
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between gap-4" style={{ height: 'var(--nav-h)' }}>
          <Link
            to="/"
            onClick={handleHomeClick}
            className="flex items-center gap-2.5 shrink-0 group"
            aria-label="Andrian Shtark"
          >
            <i
              className="block rounded-full bg-accent transition-transform duration-300 group-hover:scale-125"
              style={{ width: 8, height: 8, boxShadow: '0 0 12px var(--accent)' }}
            />
            <span className="font-heading font-bold text-[15px] tracking-tight" style={{ color: 'var(--text)' }}>
              Andrian Shtark
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex">
            <ul
              className="flex items-center gap-1 p-1 rounded-full"
              style={{ border: '1px solid var(--line)', background: 'var(--surface)' }}
            >
              {navItems.map((item) => (
                <li key={item.name}>{renderNavItem(item)}</li>
              ))}
            </ul>
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="mono-meta-sm px-2.5 py-1.5 rounded-md transition-colors duration-200"
              style={{ color: 'var(--dim)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--dim)'
              }}
              aria-label="Toggle language"
            >
              {language === 'ru' ? 'EN' : 'RU'}
            </button>

            <button
              onClick={() => setIsContactOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
            >
              {t('nav.contact')}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>

            <button
              className="md:hidden grid place-items-center w-10 h-10 rounded-full transition-colors"
              style={{ border: '1px solid var(--line-2)', color: 'var(--text)' }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll progress — driven by ref, never re-renders the header */}
      <div
        className="absolute left-0 right-0 bottom-0 h-px overflow-hidden"
        style={{ background: 'var(--line)' }}
      >
        <div
          ref={barRef}
          className="h-full origin-left"
          style={{
            transform: 'scaleX(0)',
            background: 'linear-gradient(90deg, var(--accent-deep), var(--accent))',
            transition: 'transform .12s linear',
          }}
        />
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden"
          style={{
            background: 'rgb(var(--bg-rgb) / 0.96)',
            borderTop: '1px solid var(--line)',
            backdropFilter: 'blur(14px)',
          }}
        >
          <div className="container py-2">
            <ul>
              {navItems.map((item) => (
                <li key={item.name} className="border-b last:border-0" style={{ borderColor: 'var(--line)' }}>
                  {item.download ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-4 text-lg font-medium"
                      style={{ color: 'var(--text)' }}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={navTarget(item)}
                      onClick={(e) => {
                        navOnClick(item)(e)
                        setIsMobileMenuOpen(false)
                      }}
                      className="block py-4 text-lg font-medium"
                      style={{ color: isActive(item) ? 'var(--accent)' : 'var(--text)' }}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
              <li className="border-t" style={{ borderColor: 'var(--line)' }}>
                <button
                  onClick={() => {
                    setIsContactOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                  className="block w-full text-left py-4 text-lg font-medium"
                  style={{ color: 'var(--accent)' }}
                >
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}

      <ContactSidebar isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </header>
  )
}

export default Header
