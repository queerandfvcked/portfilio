import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductApproach from './components/ProductApproach'
import Projects from './components/Projects'
import CaseStudy from './components/CaseStudy'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

function HomePage() {
  useEffect(() => {
    // Handle anchor navigation when coming from case studies
    const hash = window.location.hash
    if (hash) {
      const anchor = hash.substring(1) // Remove #
      setTimeout(() => {
        const element = document.getElementById(anchor)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100) // Small delay to ensure DOM is ready
    }
  }, [])

  return (
    <>
      <Hero />
      <ProductApproach />
      <Projects />
    </>
  )
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen" style={{ backgroundColor: '#111318' }}>
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
