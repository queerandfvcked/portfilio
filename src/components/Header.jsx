import React, { useState, useEffect } from 'react'
import { useTranslation } from '../contexts/LanguageContext'
import ContactSidebar from './ContactSidebar'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const { language, toggleLanguage, t } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.projects'), href: '/#projects' },
    { name: t('nav.about'), href: '/#about' },
    { name: t('nav.resume'), href: language === 'ru' ? '/assets/resume_ru.pdf' : '/assets/resume_en.pdf', download: true },
    { name: t('nav.contact'), action: 'contact' }
  ]

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'backdrop-blur-md border-b' : 'bg-transparent'
    }`}
      style={{ 
        backgroundColor: isScrolled ? '#181A1F99' : 'transparent',
        borderColor: isScrolled ? '#2A2D3A' : 'transparent'
      }}>
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-white">Andrian Shtark</h1>
          </div>
          
          <nav className="hidden md:block flex-1">
            <ul className="flex items-center justify-center space-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.action === 'contact' ? (
                    <button
                      onClick={() => setIsContactOpen(true)}
                      className="text-gray-300 hover:text-white transition-colors font-medium"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className="text-gray-300 hover:text-white transition-colors font-medium"
                      {...(item.download && { download: true, target: '_blank' })}
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Language toggle button - right edge */}
          <button
            onClick={toggleLanguage}
            className="hidden md:block px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: '#181A1F', 
              border: '1px solid #2A2D3A',
              color: '#9CA3AF'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#06b6d4'
              e.target.style.color = '#ffffff'
              e.target.style.borderColor = '#06b6d4'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#181A1F'
              e.target.style.color = '#9CA3AF'
              e.target.style.borderColor = '#2A2D3A'
            }}
          >
            {language === 'ru' ? 'EN' : 'RU'}
          </button>
            
            <button
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden backdrop-blur-md border-t"
            style={{ 
              backgroundColor: '#181A1F99',
              borderColor: '#2A2D3A'
            }}>
          <div className="container">
            {/* Mobile language toggle */}
            <div className="py-3 border-b border-gray-700">
              <button
                onClick={toggleLanguage}
                className="w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-left"
                style={{ 
                  backgroundColor: '#181A1F', 
                  border: '1px solid #2A2D3A',
                  color: '#9CA3AF'
                }}
              >
                🌐 {language === 'ru' ? 'Switch to English' : 'Переключить на русский'}
              </button>
            </div>
            
            <ul className="py-4 space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.action === 'contact' ? (
                    <button
                      onClick={() => {
                        setIsContactOpen(true)
                        setIsMobileMenuOpen(false)
                      }}
                      className="block text-gray-300 hover:text-white transition-colors font-medium py-2"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className="block text-gray-300 hover:text-white transition-colors font-medium py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                      {...(item.download && { download: true, target: '_blank' })}
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {/* Contact Sidebar */}
      <ContactSidebar isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </header>
  )
}

export default Header
