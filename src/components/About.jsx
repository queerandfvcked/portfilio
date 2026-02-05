import React from 'react'
import { useTranslation } from '../contexts/LanguageContext'

const About = () => {
  const { t } = useTranslation()

  return (
    <section id="about" className="py-20">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('about.title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-square bg-gray-700 rounded-2xl overflow-hidden">
                <img 
                  src="/api/placeholder/500/500"
                  alt="My photo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                {t('about.subtitle')}
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {t('about.description1')}
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {t('about.description2')}
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed">
                {t('about.description3')}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="font-semibold text-white mb-1">{t('about.info.location')}</div>
                  <div className="text-gray-300">{t('about.info.locationValue')}</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="font-semibold text-white mb-1">{t('about.info.experience')}</div>
                  <div className="text-gray-300">{t('about.info.experienceValue')}</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="font-semibold text-white mb-1">{t('about.info.languages')}</div>
                  <div className="text-gray-300">{t('about.info.languagesValue')}</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="font-semibold text-white mb-1">{t('about.info.status')}</div>
                  <div className="text-gray-300">{t('about.info.statusValue')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
