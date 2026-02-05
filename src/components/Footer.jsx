import React from 'react'
import { useTranslation } from '../contexts/LanguageContext'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { t } = useTranslation()

  return (
    <footer className="text-gray-400 py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500">
              {currentYear} {t('footer.copyright')}
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#projects" className="text-gray-500 hover:text-gray-300 transition-colors">
              {t('nav.projects')}
            </a>
            <a href="#about" className="text-gray-500 hover:text-gray-300 transition-colors">
              {t('nav.about')}
            </a>
            <a href="#contact" className="text-gray-500 hover:text-gray-300 transition-colors">
              {t('nav.contact')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
