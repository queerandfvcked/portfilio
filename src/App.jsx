import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductApproach from './components/ProductApproach'
import Projects from './components/Projects'
import CaseStudy from './components/CaseStudy'
import Footer from './components/Footer'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen" style={{ backgroundColor: '#111318' }}>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <ProductApproach />
                  <Projects />
                </>
              } />
              <Route path="/:slug" element={<CaseStudy />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
