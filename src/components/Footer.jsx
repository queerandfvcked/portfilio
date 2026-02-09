import React, { useState } from 'react'
import { useTranslation } from '../contexts/LanguageContext'
import ContactSidebar from './ContactSidebar'

const Footer = () => {
  const [isContactOpen, setIsContactOpen] = useState(false)
  const currentYear = new Date().getFullYear()
  const { t } = useTranslation()

  return (
    <>
      <footer className="text-gray-400 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500">
                © 2026 – Andrian Shtark
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="/#projects" className="text-gray-500 hover:text-gray-300 transition-colors">
                {t('nav.projects')}
              </a>
              <a href="/#about" className="text-gray-500 hover:text-gray-300 transition-colors">
                {t('nav.about')}
              </a>
              <button
                onClick={() => setIsContactOpen(true)}
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                {t('nav.contact')}
              </button>
            </div>
          </div>
        </div>
      </footer>
      
      <ContactSidebar isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}

export default Footer
