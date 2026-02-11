import React from 'react'
import { useTranslation } from '../contexts/LanguageContext'

const Hero = () => {
  const { t } = useTranslation()

  const skills = t('skills')

  return (
    <section className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl">
          {/* Main heading with animation - left aligned */}
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>

        {/* Skills ticker - respects container padding */}
        <div className="mt-20 animate-fade-in-up delay-300 relative z-10">
          <div className="relative overflow-hidden">
            <div className="flex gap-6 animate-ticker hover:animate-ticker-pause">
              {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
                <div 
                  key={index}
                >
                  <div className="flex items-center px-6 py-3 rounded-full whitespace-nowrap backdrop-blur-sm"
                    style={{ backgroundColor: '#181A1F', border: '1px solid #2A2D3A' }}
                  >
                    <span className="text-slate-400 text-sm font-medium">
                      {skill}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
