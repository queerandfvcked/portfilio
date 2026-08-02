import React from 'react'
import { useTranslation } from '../contexts/LanguageContext'

const ProductApproach = () => {
  const { t } = useTranslation()

  const approaches = t('approaches')

  return (
    <section id="about" className="py-20">
      <div className="container">
        <div className="mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            {t('about.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {approaches.map((approach, index) => (
            <div 
              key={index}
              className="rounded-3xl p-8 hover:shadow-2xl hover:shadow-accent-500/10 transition-all duration-[400ms] group backdrop-blur-sm"
              style={{ 
                backgroundColor: '#171B24', 
                border: '1px solid #2A2D3A',
                animationDelay: `${index * 0.1}s` 
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center group-hover:bg-accent-500/30 transition-colors duration-300">
                  <div className="text-accent-400">
                    {approach.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-semibold text-white mb-3 group-hover:text-accent-400 transition-colors duration-300">
                    {approach.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {approach.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductApproach
