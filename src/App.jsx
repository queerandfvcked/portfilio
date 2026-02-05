import React from 'react'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductApproach from './components/ProductApproach'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        <Header />
        <main>
          <Hero />
          <ProductApproach />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App
