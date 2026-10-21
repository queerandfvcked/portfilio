import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from '../contexts/LanguageContext'

// Sections to track. Their order is read from the DOM at runtime, so the
// list does not have to match the order they happen to be rendered in.
const SECTIONS = ['home', 'projects', 'about']

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { language, toggleLanguage, t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  const barRef = useRef(null)
  const rafRef = useRef(0)
  const scrolledRef = useRef(false)
  const burgerRef = useRef(null)
  const mobileLangRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const menuWasOpen = useRef(false)

  const isHome = location.pathname === '/'
  const showHeaderSurface = isScrolled && !isMobileMenuOpen

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

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const menu = mobileMenuRef.current
    const burger = burgerRef.current
    if (!menu || !burger) return

    const firstItem = menu.querySelector('[data-mobile-menu-item]')
    firstItem?.focus?.({ preventScroll: true })

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setIsMobileMenuOpen(false)
        return
      }

      if (event.key !== 'Tab') return

      const items = Array.from(menu.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (el) => el.getClientRects().length > 0
      )
      const focusables = [mobileLangRef.current, burger, ...items].filter(Boolean)
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (menuWasOpen.current && !isMobileMenuOpen) {
      burgerRef.current?.focus()
    }
    menuWasOpen.current = isMobileMenuOpen
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (isMobileMenuOpen) setIsMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)')
    const onChange = (event) => {
      if (event.matches) setIsMobileMenuOpen(false)
    }

    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

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

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const handleMobileContact = () => {
    closeMobileMenu()
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToAnchor('contact'))
    })
  }

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
    <>
      <header
        className="fixed top-0 w-full z-50 transition-colors duration-300"
        style={{
          backgroundColor: showHeaderSurface ? 'rgb(var(--bg-rgb) / 0.66)' : 'transparent',
          borderBottom: `1px solid ${showHeaderSurface ? 'var(--line)' : 'transparent'}`,
          backdropFilter: showHeaderSurface ? 'blur(14px) saturate(140%)' : 'none',
          WebkitBackdropFilter: showHeaderSurface ? 'blur(14px) saturate(140%)' : 'none',
        }}
      >
        <div className="relative" style={{ height: 'var(--nav-h)' }}>
          <div className="container h-full">
            <div className="flex h-full items-center justify-between gap-4">
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
              className="hidden md:block mono-meta-sm px-2.5 py-1.5 rounded-md transition-colors duration-200"
              style={{ color: 'var(--dim)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--dim)'
              }}
              aria-label={t('nav.switchLanguage')}
            >
              {language === 'ru' ? 'EN' : 'RU'}
            </button>

            <button
              ref={mobileLangRef}
              type="button"
              onClick={toggleLanguage}
              className="md:hidden grid place-items-center min-w-11 min-h-11 rounded-full mono-meta-sm transition-colors duration-200"
              style={{ border: '1px solid var(--line-2)', color: 'var(--dim)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--dim)'
              }}
              aria-label={t('nav.switchLanguage')}
            >
              {language === 'ru' ? 'EN' : 'RU'}
            </button>

            <button
              onClick={() => scrollToAnchor('contact')}
              className="hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'var(--accent)',
                color: 'var(--accent-ink)',
                display: isMobileMenuOpen ? 'none' : undefined,
              }}
            >
              {t('nav.contact')}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>

            <button
              ref={burgerRef}
              className="md:hidden grid place-items-center w-11 h-11 rounded-full transition-colors"
              style={{ border: '1px solid var(--line-2)', color: 'var(--text)' }}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={isMobileMenuOpen ? t('nav.closeMenu') : t('nav.menu')}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
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
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className="mobile-menu md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.menu')}
        >
          <div className="mobile-menu__bg" aria-hidden="true">
            <div className="grid-mask" />
          </div>

          <div className="container mobile-menu__inner">
            <nav aria-label={t('nav.menu')}>
              <ul className="mobile-menu__list">
                {navItems.map((item, index) => {
                  const active = isActive(item)
                  const content = (
                    <>
                      <span className="mono-meta-sm mobile-menu__index">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="mobile-menu__name font-heading font-bold">{item.name}</span>
                      <span className="mobile-menu__meta">
                        {item.download && (
                          <span className="mobile-menu__arrow" aria-hidden="true">↗</span>
                        )}
                        {active && <span className="mobile-menu__dot" aria-hidden="true" />}
                      </span>
                    </>
                  )

                  return (
                    <li
                      key={item.id || 'resume'}
                      className={`mobile-menu__item${active ? ' is-active' : ''}`}
                      style={{ '--menu-index': index }}
                    >
                      {item.download ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          data-mobile-menu-item
                          className="mobile-menu__link"
                          onClick={closeMobileMenu}
                        >
                          {content}
                        </a>
                      ) : (
                        <Link
                          to={navTarget(item)}
                          data-mobile-menu-item
                          className="mobile-menu__link"
                          onClick={(event) => {
                            navOnClick(item)(event)
                            closeMobileMenu()
                          }}
                        >
                          {content}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="mobile-menu__footer">
              <button type="button" className="mobile-menu__contact" onClick={handleMobileContact}>
                <span>{t('nav.contact')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
