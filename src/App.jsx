import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import ProcessFlow from './components/ProcessFlow'
import Projects from './components/Projects'
import CaseStudy from './components/CaseStudy'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { DEFAULT_LANGUAGE, LANGUAGES, localizedPath } from './utils/localizedPath'

const CaseBlocksDevPage = import.meta.env.DEV
  ? lazy(() => import('./pages/CaseBlocksDevPage'))
  : null

// Keep in sync with the top-level keys in CaseStudyData.js.
const CASE_SLUGS = ['zhabka', 'keepl-app', 'keepl-landing', 'hired-app', 'add-transition']

const RedirectToDefaultLanguage = ({ path = '/' }) => {
  const location = useLocation()
  const target = localizedPath(
    DEFAULT_LANGUAGE,
    `${path}${location.search}${location.hash}`
  )

  return <Navigate to={target} replace />
}

const RootSegment = () => {
  const { slug } = useParams()

  if (LANGUAGES.includes(slug)) return <HomePage />
  if (CASE_SLUGS.includes(slug)) return <RedirectToDefaultLanguage path={`/${slug}`} />

  return <CaseStudy />
}

function HomePage() {
  useEffect(() => {
    // Landing on /#projects or /#about — including client-side navigation
    // from a case study, where the anchor has to survive a full route swap.
    const raw = window.location.hash
    if (!raw) return

    const id = decodeURIComponent(raw.slice(1))
    if (!id) return

    let raf = 0
    let tries = 0

    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      // The section may not be mounted yet on the first frames after a
      // route change — keep looking for a short while, then give up.
      if (++tries < 30) raf = requestAnimationFrame(tryScroll)
    }

    raf = requestAnimationFrame(tryScroll)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      <Hero />
      <Projects />
      <ProcessFlow />
    </>
  )
}

export function AppContent() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
          <Header />
          <main>
            <ScrollToTop>
              <Routes>
                <Route path="/" element={<RedirectToDefaultLanguage />} />
                {CaseBlocksDevPage && (
                  <Route
                    path="/dev/blocks"
                    element={(
                      <Suspense fallback={null}>
                        <CaseBlocksDevPage />
                      </Suspense>
                    )}
                  />
                )}
                <Route path="/:slug" element={<RootSegment />} />
                <Route path="/:lang/:slug" element={<CaseStudy />} />
                <Route path="*" element={<CaseStudy />} />
              </Routes>
            </ScrollToTop>
          </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
