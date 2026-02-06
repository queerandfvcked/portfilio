import React from 'react'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductApproach from './components/ProductApproach'
import Projects from './components/Projects'
import Footer from './components/Footer'

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen" style={{ backgroundColor: '#111318' }}>
        <Header />
        <main>
          <Hero />
          <ProductApproach />
          <Projects />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App
