import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import ProcessFlow from './components/ProcessFlow'
import Projects from './components/Projects'
import CaseStudy from './components/CaseStudy'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

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

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen">
          <Header />
          <main>
            <ScrollToTop>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:slug" element={<CaseStudy />} />
              </Routes>
            </ScrollToTop>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
