import React from 'react'
import { useTranslation } from '../contexts/LanguageContext'

const ProductApproach = () => {
  const { t } = useTranslation()

  const approaches = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z"/>
        </svg>
      ),
      title: 'Продуктовое мышление',
      description: 'Фокусируюсь на поиске решений для бизнеса через MVP и проверку гипотез. Проектирую интерфейсы, которые помогают продукту расти и удерживать пользователей.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
        </svg>
      ),
      title: 'UI & Дизайн-системы',
      description: 'Создаю масштабируемые библиотеки компонентов с учетом гайдлайнов Apple и Google. Поддерживаю порядок в макетах и чистоту в визуальной иерархии.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
        </svg>
      ),
      title: 'UX-исследования',
      description: 'Глубоко погружаюсь в боли пользователей. Анализирую конкурентов и паттерны рынка, чтобы создавать интуитивно понятные сценарии.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
      ),
      title: 'Доступность и гайдлайны',
      description: 'Проектирую с учетом инклюзивности и платформенных паттернов. Знаю, как сделать интерфейс удобным для всех и понятным для команды разработки.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: 'Проектирование логики',
      description: 'Разрабатываю сложную информационную архитектуру и User Flows. Устраняю "тупики" в сценариях, делая путь пользователя бесшовным и логичным.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.99zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>
        </svg>
      ),
      title: 'Вайбкодинг и AI-инструменты',
      description: 'Использую ИИ для сборки функциональных фронтенд-прототипов. Это позволяет мне тестировать дизайн в реальной среде и быстрее проверять идеи.'
    }
  ]

  return (
    <section id="about" className="py-20">
      <div className="container">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('about.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {approaches.map((approach, index) => (
            <div 
              key={index}
              className="rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl group backdrop-blur-sm"
              style={{ 
                backgroundColor: '#181A1F', 
                border: '1px solid #2A2D3A',
                animationDelay: `${index * 0.1}s` 
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors duration-300">
                  <div className="text-cyan-400">
                    {approach.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
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
