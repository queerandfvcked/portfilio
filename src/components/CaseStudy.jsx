import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from '../contexts/LanguageContext'
import ImageSlider from './ImageSlider'
import CaseNavigation from './CaseNavigation'

const CaseStudy = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState('overview')
  const [expandedSections, setExpandedSections] = useState({})
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageScale, setImageScale] = useState(1)
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const contentRef = useRef(null)

  // Toggle section expansion
  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  // Open image modal
  const openImageModal = (imageSrc) => {
    setSelectedImage(imageSrc)
    document.body.style.overflow = 'hidden'
  }

  // Close image modal
  const closeImageModal = () => {
    setSelectedImage(null)
    setImageScale(1)
    setImagePosition({ x: 0, y: 0 })
    setIsDragging(false)
    document.body.style.overflow = 'auto'
  }

  // Handle image zoom with mouse wheel
  const handleImageWheel = (e) => {
    // Disable zoom on mobile/tablet devices
    if (window.innerWidth <= 768) return
    
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    const newScale = Math.min(Math.max(0.5, imageScale * delta), 3)
    setImageScale(newScale)
    
    // Reset position when zooming back to 1x
    if (newScale === 1) {
      setImagePosition({ x: 0, y: 0 })
    }
  }

  // Handle mouse down for dragging
  const handleMouseDown = (e) => {
    if (imageScale <= 1) return // Only allow dragging when zoomed in
    
    setIsDragging(true)
    setDragStart({
      x: e.clientX - imagePosition.x,
      y: e.clientY - imagePosition.y
    })
    e.preventDefault()
  }

  // Handle mouse move for dragging
  const handleMouseMove = (e) => {
    if (!isDragging || imageScale <= 1) return
    
    const newX = e.clientX - dragStart.x
    const newY = e.clientY - dragStart.y
    
    setImagePosition({ x: newX, y: newY })
  }

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Add global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragStart])

  // Format content with markdown-like syntax
  const formatContent = (content) => {
    const lines = content.split('\n')
    let inTable = false
    let tableContent = []
    let afterBullet = false
    
    return lines.map((line, index) => {
      if (line.startsWith('### ')) {
        afterBullet = false
        return (
          <h3 key={index} className="text-xl font-bold text-gray-200 mt-6 mb-3">
            {line.replace('### ', '')}
          </h3>
        )
      } else if (line.startsWith('## ')) {
        afterBullet = false
        return (
          <h2 key={index} className="text-2xl font-bold text-gray-200 mt-8 mb-4">
            {line.replace('## ', '')}
          </h2>
        )
      } else if (line.startsWith('| ') && line.endsWith(' |')) {
        afterBullet = false
        // Table row
        if (!inTable) {
          inTable = true
          tableContent = []
        }
        const cells = line.split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim())
        
        // Skip separator rows (---, ===, or rows with only dashes/equals)
        const isSeparator = cells.every(cell => cell.match(/^[-=]+$/))
        if (!isSeparator) {
          tableContent.push(cells)
        }
        
        return null // Don't render individual table rows
      } else if (line.startsWith('---') || line.startsWith('===')) {
        afterBullet = false
        // Table separator
        return null
      } else if (inTable && tableContent.length > 0) {
        afterBullet = false
        // Render table when we hit a non-table line after table content
        inTable = false
        const table = (
          <div key={index} className="overflow-x-auto mb-8">
            <table className="w-full border-collapse border border-gray-600 rounded-lg text-xs">
              <thead>
                <tr className="bg-gray-800">
                  {tableContent[0].map((cell, cellIndex) => (
                    <th key={cellIndex} className="border border-gray-600 px-2 py-2 text-left text-gray-200 font-semibold break-words max-w-[120px]">
                      {cell.replace(/\*\*/g, '')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableContent.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-800/50">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-gray-600 px-2 py-1 text-gray-300 break-words max-w-[120px]">
                        {cell.replace(/\*\*/g, '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
        tableContent = []
        return table
      } else if (line.startsWith('• ')) {
        afterBullet = true
        return (
          <div key={index} className="flex items-start space-x-2 mb-2">
            <span className="text-cyan-400">•</span>
            <span className="text-gray-300">{line.replace('• ', '')}</span>
          </div>
        )
      } else if (line.startsWith('- ')) {
        afterBullet = true
        return (
          <div key={index} className="flex items-start space-x-2 mb-2">
            <span className="text-cyan-400">•</span>
            <span className="text-gray-300">{line.replace('- ', '')}</span>
          </div>
        )
      } else if (line.startsWith('Таким образом, рынок закрывает разные аспекты')) {
        afterBullet = false
        return (
          <p key={index} className="text-gray-300 mb-3 mt-8">
            {line}
          </p>
        )
      } else if (line.startsWith('Чтобы глубже понять рынок, я проанализировал конкретные продукты из этих категорий:')) {
        afterBullet = false
        return (
          <p key={index} className="text-gray-300 mb-6">
            {line}
          </p>
        )
      } else if (line.startsWith('• ')) {
        afterBullet = true
        return (
          <div key={index} className="flex items-start space-x-2 mb-2">
            <span className="text-cyan-400">•</span>
            <span className="text-gray-300">{line.replace('• ', '')}</span>
          </div>
        )
      } else if (line.startsWith('- ')) {
        afterBullet = true
        return (
          <div key={index} className="flex items-start space-x-2 mb-2">
            <span className="text-cyan-400">•</span>
            <span className="text-gray-300">{line.replace('- ', '')}</span>
          </div>
        )
      } else if (afterBullet && line.trim() !== '') {
        return (
          <p key={index} className="text-gray-300 mb-3 ml-4">
            {line}
          </p>
        )
      } else if (line.trim() === '') {
        return null // Skip empty lines to avoid extra spacing
      } else {
        afterBullet = false
        return (
          <p key={index} className="text-gray-300 mb-3">
            {line}
          </p>
        )
      }
    }).filter(Boolean) // Filter out null values
  }

  // Clean up body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  // Sections that should have toggle functionality
  const toggleableSections = ['overview', 'product-discovery', 'jtbd', 'user-flow', 'results']

  // Expandable section component
  const ExpandableSection = ({ section, isActive }) => {
    const isExpanded = expandedSections[section.id] || false
    
    return (
      <div 
        id={section.id}
        className={`mb-16 scroll-mt-24`}
      >
        {/* Section header with toggle */}
        <div 
          className="flex items-center justify-between cursor-pointer group"
          onClick={() => toggleSection(section.id)}
        >
          <h2 className="text-3xl font-bold text-gray-200 mb-4 group-hover:text-cyan-400 transition-colors">
            {section.title}
          </h2>
          <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {/* Expandable content */}
        <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="space-y-6">
            <div className="text-gray-300 text-lg leading-relaxed">
              {formatContent(section.content)}
            </div>
            
            {section.images && section.images.length > 0 && (
              <div className="space-y-4">
                {section.images.map((image, index) => (
                  <div key={index} className="bg-transparent rounded-lg cursor-pointer group" onClick={() => openImageModal(image)}>
                    <img 
                      src={image} 
                      alt={`${section.title} - ${index + 1}`}
                      className="w-full h-auto rounded-lg object-contain opacity-100 transition-transform duration-300 group-hover:scale-105"
                      style={{ filter: 'none' }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-black/50 rounded-full p-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Image pairs for desktop/mobile comparison */}
            {section.imagePairs && section.imagePairs.length > 0 && (
              <div className="space-y-8">
                {section.imagePairs.map((pair, pairIndex) => (
                  <div key={pairIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="cursor-pointer group" onClick={() => openImageModal(pair.desktop)}>
                      <img
                        src={pair.desktop}
                        alt={`${section.title} - Desktop ${pairIndex + 1}`}
                        className="w-full h-auto rounded-lg shadow-xl transition-transform duration-300 group-hover:scale-105"
                      />
                      <p className="text-center text-gray-400 text-sm mt-2">Desktop</p>
                    </div>
                    <div className="cursor-pointer group" onClick={() => openImageModal(pair.mobile)}>
                      <img
                        src={pair.mobile}
                        alt={`${section.title} - Mobile ${pairIndex + 1}`}
                        className="w-full h-auto rounded-lg shadow-xl transition-transform duration-300 group-hover:scale-105"
                      />
                      <p className="text-center text-gray-400 text-sm mt-2">Mobile</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Regular section component (always expanded)
  const RegularSection = ({ section, isActive }) => {
    return (
      <section 
        key={section.id}
        data-section={section.id}
        className={`scroll-mt-16 mb-16`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-200 mb-8">
          {section.title}
        </h2>
        
        <div className="prose prose-lg text-gray-300 max-w-none mb-8">
          <div className="text-lg leading-relaxed">
            {formatContent(section.content)}
          </div>
        </div>

        {/* Image pairs for desktop/mobile comparison */}
        {section.imagePairs && section.imagePairs.length > 0 && (
          <div className="space-y-8 mb-8">
            {section.imagePairs.map((pair, pairIndex) => (
              <div key={pairIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="cursor-pointer group" onClick={() => openImageModal(pair.desktop)}>
                  <img
                    src={pair.desktop}
                    alt={`${section.title} - Desktop ${pairIndex + 1}`}
                    className="w-full h-80 object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"
                  />
                  <p className="text-center text-gray-400 text-sm mt-2">Desktop</p>
                </div>
                <div className="cursor-pointer group" onClick={() => openImageModal(pair.mobile)}>
                  <img
                    src={pair.mobile}
                    alt={`${section.title} - Mobile ${pairIndex + 1}`}
                    className="w-full h-80 object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"
                  />
                  <p className="text-center text-gray-400 text-sm mt-2">Mobile</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Images for this section */}
        {section.images && section.images.length > 0 && (
          <div className="space-y-8">
            {section.images.map((image, index) => (
              <div key={index} className="cursor-pointer group" onClick={() => openImageModal(image)}>
                <img
                  src={image}
                  alt={`${section.title} - Image ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-xl transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}

        {/* Additional text after image pairs for UI section */}
        {section.id === 'ui' && (
          <div className="prose prose-lg text-gray-300 max-w-none">
            <div className="text-lg leading-relaxed">
              <p className="text-gray-300 mb-3">
                После регистрации пользователь проходит через короткий онбординг, который подсвечивает ключевые возможности. Моя цель - сократить Time to Value, чтобы юзер максимально быстро осознал пользу приложения.
              </p>
            </div>
          </div>
        )}

        {/* Onboarding slider for UI section */}
        {section.id === 'ui' && section.onboardingImages && section.onboardingImages.length > 0 && (
          <div className="mt-8">
            <ImageSlider images={section.onboardingImages} />
          </div>
        )}
      </section>
    )
  }

  // Case study data based on HTML files
  const caseStudies = {
    'keepl-app': {
      title: 'Keepl App',
      subtitle: 'Mobile App',
      description: 'Веб-приложение для достижения целей. Помогает пользователям отслеживать прогресс, учитывать эмоциональное состояние и бороться с выгоранием. Проектирование продукта с нуля: от анализа рынка и гипотез до разработки адаптивной дизайн-системы.',
      tags: ['Product Design', 'Web App', 'Frontend (React)'],
      heroImage: '/assets/keepl app.png',
      heroImages: [
        '/assets/keepl app.png',
        '/assets/keepl app/home_placeholder.png',
        '/assets/keepl app/create_new_goal.png'
      ],
      sections: [
        {
          id: 'overview',
          title: 'Предыстория',
          content: 'Проект начался как эксперимент: я провел небольшие интервью с друзьями, чтобы понять, с какими трудностями они сталкиваются при достижении своих задач и целей. На основе этих наблюдений я попробовал спроектировать несколько экранов мобильного приложения, которое помогает пользователю отслеживать прогресс и поддерживает мотивацию. Опыт оказался интересным, и я решил развить его в полноценный продукт.',
          images: ['/assets/mini-research.png']
        },
        {
          id: 'problem',
          title: 'Проблема пользователей',
          content: 'Пользователи сталкиваются с несколькими ключевыми трудностями при попытке достигать своих целей:\n\n• Сложно видеть свой прогресс и понимать, что уже сделано, а что еще нет.\n• Мотивация падает, когда сервис не показывает достижения и не помогает удерживать фокус.\n• Давление со стороны привычных механик (стрики, невыполненные задачи) вызывает чувство вины и стресс вместо поддержки и мотивации.\n• Существующие инструменты либо перегружены функциями, либо слишком абстрактны и не учитывают эмоциональный опыт пользователя.\n• Часто приходится комбинировать разные приложения и методы, что создает хаос и лишнюю нагрузку.\n\nВ результате достижение целей превращается в рутину, а не в осознанный и мотивирующий процесс, и пользователи часто ощущают усталость и разочарование.',
          images: []
        },
        {
          id: 'product-discovery',
          title: 'Product discovery',
          content: '### Что именно мы хотим сделать?\n\nВеб-приложение, которое помогает пользователю достигать своих целей (какими бы они ни были) и делает процесс более осознанным и мотивирующим. В центре внимания - опыт и эмоции пользователя: он отслеживает прогресс в наглядной форме и может фиксировать свое настроение, чтобы понимать, как оно соотносится с результатом.\n\nЯ сфокусировался на персонализации и эмпатии: приложение подстраивается под стиль работы пользователя и поддерживает его мотивацию через простые и понятные механики.\n\n### Для кого это предназначено?\n\nЦелевая аудитория - люди, которые ставят себе личные или рабочие цели, но сталкиваются с проблемой поддержания мотивации и отслеживания прогресса.\n\n### Зачем мы это делаем?\n\nОбычно сервисы для целей фокусируются только на продуктивности: выполнить как можно больше и быстрее. В итоге пользователь со временем приходит к тому, что прожимает чекбоксы на автомате.\nМы же хотим сместить акцент на сам процесс - дать пользователю пространство для осознанности, поддержки и понимания своего состояния. Это не только про "сделать задачу", а про то, чтобы видеть ценность в собственных шагах и понимать, что даже небольшое действие приближает к прогрессу.\n\n### Какие есть альтернативы?\n\nБольшинство конкурентов можно разделить на четыре типа:\n\n- Таск-менеджеры: сильны в управлении задачами, метриках и отчетности, но почти не затрагивают эмоциональную мотивацию.\n- Коучинг-лайфстайл приложения: дают поддержку и вдохновение, но часто перегружены функциями и не имеют удобной визуализации прогресса.\n- Трекеры привычек и настроений: помогают отмечать шаги и привычки, показывают прогресс в графиках, иногда связывают действия с настроением, но ограничены в глубине постановки целей и редко выходят за рамки чек-листов.\n- Планировщики дня: структурируют расписание и помогают следовать режиму, но почти не работают с долгосрочными целями и эмоциями пользователя.\n\nТаким образом, рынок закрывает разные аспекты: где-то есть жесткая структура и визуализация, где-то эмоциональная поддержка и коучинг, а где-то гибкий трекинг привычек. Но практически никто не соединяет все это вместе: постановку целей с подцелями, эмоциональные теги и настроение на уровне конкретных шагов, фото-прогресс и мягкие альтернативы действий под состояние пользователя.\n\nЧтобы глубже понять рынок, я проанализировал конкретные продукты из этих категорий:\n\n| **Название** | **Цели и мини-цели** | **Визуализация прогресса** | **Настроение/теги** | **Фото прогресс** | **Альтернативы действий** | **Мотивация** |\n| --- | --- | --- | --- | --- | --- | --- |\n| Strides | ✅ гибкие цели, привычки, KPI | ✅ прогресс бар, графики | ❌ | ❌ | ❌ | ❌ |\n| Fabulous | ❌ фокус на привычки | ❌ стрики | частично, общий трекер | ❌ | ✅ | ✅ коуч-сценарии |\n| Daylio | ❌ только привычки | ✅ графики настроения/привычек | ✅ | ❌ | ❌ | ❌ статистика |\n| Habitica | ✅ квесты | ✅ xp, уровни | ❌ | ❌ | ✅ | ✅ геймификация, коммьюнити |\n| Coach.me | ✅ | ❌ счетчики | ❌ | ❌ | ❌ | ✅ коучи |\n| Remente | ✅ life goals, подцели, планы | ✅ | ✅ муд трекер | ❌ | ❌ | ✅ статьи, напоминания |\n| Way of Life | ❌ фокус на привычки | ✅ | ✅ муд теги к привычкам | ❌ | ❌ | ❌ статистика |\n| Goal: Habits & Tasks | ✅ цели, привычки, задачи | ✅ прогресс бары, календари | ❌ | ❌ | ❌ | ❌ |\n| Success Wizard | ✅ пошаговые планы, цели | ❌ отчеты | ❌ | ❌ | ❌ | ❌ |\n| ATracker PRO | ❌ тайм трекер | ✅ графики | ❌ | ❌ | ❌ | ❌ |\n| ClickUp | ✅ | ✅ дашборды и метрики | ❌ | ❌ | ❌ | ❌ |\n\n### Как пользователи решают эту проблему сейчас?\n\nЛюди используют заметки, таск-менеджеры, планировщики и трекеры привычек, но ни один инструмент не объединяет мотивацию, визуальный прогресс и эмоциональную поддержку. Часто они полагаются на самодисциплину и теряют мотивацию, когда не видят результатов.',
          images: []
        },
        {
          id: 'ux-research',
          title: 'UX-исследование и инсайты',
          content: 'Чтобы глубже понять контекст и реальные боли, я провел небольшие интервью со знакомыми и дополнительно проанализировал отзывы пользователей схожих приложений (Strides, Habitica, Daylio, Fabulous, Finch).\n\nЭто помогло сформулировать три ключевых паттерна поведения:\n\n- Сложно начать\n\nЛюди теряются при первом запуске и не понимают, как правильно поставить цель. Значит, нужен онбординг и шаблоны, которые помогают начать без стресса.\n\n- Нет гибкости\n\nПриложения заставляют подстраиваться под жесткие шаблоны, а пользователи хотят задавать свои параметры. Значит, важно дать возможность настраивать единицы измерения и структуру цели под себя.\n\n- Эмоциональное давление\n\nИз-за стриков и отчетности у людей появляется чувство вины, если они не выполняют все запланированные действия. Интерфейс должен поддерживать, а не осуждать. Нужен мягкий UX-тон, текстовые мотивации, легкие альтернативы шагов.',
          images: []
        },
        {
          id: 'jtbd',
          title: 'JTBD',
          content: '\n\n- Когда я ставлю большую цель, я хочу разбить ее на маленькие шаги, чтобы видеть понятный план и не терять мотивацию.\n- Когда я выполняю ежедневные действия, я хочу отмечать прогресс и видеть динамику визуально, чтобы чувствовать движение вперед и гордиться результатом.\n- Когда я устал или у меня плохое настроение, я хочу иметь более легкую альтернативу шага, чтобы не выпадать из процесса, сохранить ритм и не винить себя за пропуски.\n- Когда я закрываю мини-цель, я хочу прикрепить фото или заметку, чтобы наглядно видеть изменения и иметь возможность вернуться к ним позже.\n- Когда я фиксирую настроение после выполнения мини-цели, я хочу отслеживать его вместе с прогрессом, чтобы видеть связь между действиями и состоянием.\n- Когда я теряю интерес или силы, я хочу получать мягкие подбадривающие напоминания, чтобы поддерживать мотивацию и продолжать движение к цели.',
          images: []
        },
        {
          id: 'hypothesis',
          title: 'Гипотеза',
          content: 'Если дать пользователю возможность кастомизировать цели под свой стиль и состояние, добавить эмоциональный фидбек (трекер настроения, фото, поддерживающие тексты) и легкую альтернативу, то это поможет ему дольше сохранять мотивацию и ощущение прогресса. Что, в свою очередь, приведет к росту retention, stickness (DAU) и снизит drop-off rate.',
          images: []
        },
        {
          id: 'user-flow',
          title: 'User flow',
          content: 'Три сценария пользователя: создание цели, отметка выполнения ежедневной мини-цели и замена мини-цели на более легкую альтернативу. Флоу простой и наглядный, чтобы показать, как пользователь взаимодействует с сервисом.\n\n### Сценарий 1: пользователь создает новую цель.\n\nФлоу создания цели сфокусирован на минимизации когнитивной нагрузки и борьбе с эффектом, когда "слишком много нужно сделать". Гибкая настройка единиц измерения и превентивное добавление легкой альтернативы в момент создания цели - ключевое продуктовое решение.\n\nМы даем пользователю полный контроль над своим планом Б, позволяя ему заранее установить реалистичный, упрощенный шаг на случай низкой мотивации. Пользователю не нужно импровизировать или пропускать шаг, что напрямую решает проблему "сложно начать и отсутствие гибкости".\n\n### Сценарий 2: пользователь отмечает ежедневный прогресс.\n\nЭтот флоу сознательно отказывается от агрессивного акцента на стриках, смещая фокус на сам прогресс. Ручной ввод результата заставляет пользователя осознанно оценить свое усилие. Визуализация прогресса, даже минимального, сразу после ввода дает позитивное подкрепление и борется с ощущением, что усилия тщетны.\n\nОпциональный трекинг настроения на оверлее интегрирован для сбора данных о корреляции между действием и эмоциональным состоянием: пользователь видит, что в прошлый раз, когда он выполнил задачу, он почувствовал себя лучше, а значит, имеет смысл сделать усилие и в этот раз.\n\n### Сценарий 3: Пользователь устал и не может выполнить цель полностью.\n\nЭтот сценарий - решение для инсайта "пользователь чувствует вину и бросает цель, когда не может ее выполнить полностью". Вместо пропуска задачи флоу предлагает активировать заранее определенный пользователем упрощенный путь. Это сохраняет привычку и снимает эмоциональное давление, используя решение, принятое самим пользователем в более мотивированном состоянии, что является критически важным для долгосрочного удержания.',
          images: ['/assets/keepl app/flow.png']
        },
        {
          id: 'metrics',
          title: 'Метрики и план проверки гипотезы',
          content: '### Основная гипотеза\n\nЖесткие системы "выполнено/пропущено" создают давление на пользователя и чувство вины при пропуске. Внедрение кастомизации под текущее состояние пользователя (ручной ввод прогресса, легкая альтернатива и эмоциональный фидбек) позволит сохранить ощущение контроля и мотивацию на длинной дистанции.\n\n### Ключевые метрики\n\nДля оценки успеха мы будем отслеживать следующие показатели:\n\n- Retention через 30 дней - ключевой индикатор долгосрочной ценности. Мы ожидаем, что гибкость системы удержит пользователя в продукте дольше, чем классические аналоги\n- Stickiness (DAU/MAU) - частота возвратов. Покажет, стало ли приложение ежедневным помощником благодаря "легким альтернативам".\n- Feature Adoption Rate - процент использования функций "lighter alternative" и ручного инпута. Это подтвердит, что пользователи находят эти инструменты полезными в моменты усталости.\n- Completion Rate - процент целей, доведенных до конца. Позволит увидеть, помогает ли "легкая альтернатива" не бросать сложные задачи, а дожимать их до финала.',
          images: []
        },
        {
          id: 'ui',
          title: 'UI',
          content: 'Дизайн Keepl отошел от агрессивных интерфейсов продуктивности и сфокусировался на создании поддерживающей, гибкой и осознанной среды для достижения целей. Я использовал мягкие скругления для снижения визуальной резкости, такую же мягкую тень для создания легкой, но быстрой узнаваемости интерактивных элементов, и спокойную цветовую палитру, не режущую глаз при ежедневном использовании приложения.\n\nМобильная адаптация реализована в виде PWA - пользователь сможет "сохранить" веб страницу на свой хоум скрин и использовать как обычное мобильное приложение. Для этого я переработал некоторые элементы интерфейса, чтобы приложение вело себя нативно: сайд бар сменился привычным таб баром, модалки стали bottom sheet.\n\n## Первый вход в приложение и создание цель',
          images: [],
          imagePairs: [
            {
              desktop: '/assets/keepl app/log_in.png',
              mobile: '/assets/keepl app/log_in 1.png'
            }
          ],
          onboardingImages: [
            '/assets/keepl app/onboarding.png',
            '/assets/keepl app/onboarding 2.png',
            '/assets/keepl app/onboarding 3.png',
            '/assets/keepl app/onboarding 4.png'
          ]
        },{
          id: 'results',
          title: 'Статус проекта',
          content: 'Спроектирован и реализован полный пользовательский опыт для трекера целей. Создано 15+ экранов с адаптивным дизайном, разработана дизайн-система из 50+ компонентов. Реализована сложная навигация с сохранением контекста пользователя. Идет работа над бэком.',
          images: ['/assets/keepl app/goal.png']
        }
      ]
    },
    'hired-app': {
      title: 'Hired App',
      subtitle: 'Mobile App',
      description: 'Проектирование платформы по поиску работы с нуля. Создал полный пользовательский опыт: от этапа исследования и JTBD-фреймворков до финальных интерфейсов. Разработал сложную архитектуру продукта, многошаговые сценарии и масштабируемую дизайн-систему.',
      tags: ['Product Design', 'Mobile'],
      heroImage: '/assets/hired app.png',
      heroImages: [
        '/assets/hired app.png',
        '/assets/hired app/Frame_1984077494.png'
      ],
      sections: [
        {
          id: 'overview',
          title: 'Обзор',
          content: 'Проектирование платформы по поиску работы с нуля. Создал полный пользовательский опыт: от этапа исследования и JTBD-фреймворков до финальных интерфейсов. Разработал сложную архитектуру продукта, многошаговые сценарии и масштабируемую дизайн-систему.',
          images: ['/assets/hired app/Frame_1984077494.png']
        },
        {
          id: 'problem',
          title: 'Анализ конкурентов',
          content: 'Провел детальный анализ конкурентов и выявил ключевые проблемы в существующих решениях. Большинство платформ не учитывают контекст поиска работы и предлагают слишком общие рекомендации. Отсутствует персонализация и глубокое понимание потребностей соискателей.',
          images: ['/assets/hired app/image 1.png']
        },
        {
          id: 'research',
          title: 'Исследование',
          content: 'Использовал JTBD-фреймворки для понимания реальных потребностей пользователей. Провел интервью с соискателями и рекрутерами, чтобы выявить болевые точки и возможности для улучшения.',
          images: ['/assets/hired app/image 2.png']
        },
        {
          id: 'design',
          title: 'Дизайн',
          content: 'Разработал сложную архитектуру продукта с многошаговыми сценариями. Создал масштабируемую дизайн-систему, которая позволяет легко добавлять новые функции и поддерживать консистентный пользовательский опыт.',
          images: ['/assets/hired app/Frame_1984077494 1.png']
        },
        {
          id: 'results',
          title: 'Результаты',
          content: 'Создал полнофункциональную платформу с продуманным пользовательским опытом. Реализовал сложные сценарии взаимодействия и обеспечил масштабируемость для будущего роста продукта.',
          images: ['/assets/hired app/image.png']
        }
      ]
    }
  }

  const currentCase = caseStudies[slug]

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const sections = contentRef.current.querySelectorAll('[data-section]')
        const scrollPosition = window.scrollY + 100

        sections.forEach(section => {
          const sectionTop = section.offsetTop
          if (scrollPosition >= sectionTop) {
            setActiveSection(section.dataset.section)
          }
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!currentCase) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#111318' }}>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-8">Case Study Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-cyan-500 text-gray-900 rounded-lg hover:bg-cyan-400 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#111318' }}>
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container relative z-10 pt-32">
          {/* Back Button - positioned in container */}
          <button
            onClick={() => navigate('/')}
            className="absolute -top-16 left-0 z-30 flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-xl rounded-lg border border-gray-700/50 text-gray-300 hover:bg-gray-700/70 hover:text-white transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7 7 7" />
            </svg>
            <span>Назад</span>
          </button>
          
          {/* Content */}
          <div className="space-y-6 text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {currentCase.title}
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl">
              {currentCase.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {currentCase.tags.map((tag, index) => (
                <span key={index} className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-full text-sm border border-cyan-500/30">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Full width image below content */}
          <div className="h-full w-full mt-12">
            <img 
              src={currentCase.heroImage} 
              alt={currentCase.title}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>

      {/* Content Section with Navigation */}
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-20">
          {/* Sticky Navigation */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <CaseNavigation 
              sections={currentCase.sections}
              activeSection={activeSection}
              onSectionClick={scrollToSection}
            />
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-20" ref={contentRef}>
            {currentCase.sections.map((section) => {
              const isActive = activeSection === section.id
              const isToggleable = toggleableSections.includes(section.id)
              
              if (isToggleable) {
                return (
                  <ExpandableSection 
                    key={section.id}
                    section={section}
                    isActive={isActive}
                  />
                )
              } else {
                return (
                  <RegularSection 
                    key={section.id}
                    section={section}
                    isActive={isActive}
                  />
                )
              }
            })}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <>
          <button
            className="fixed top-4 right-4 z-[60] text-white hover:text-cyan-400 transition-colors animate-slide-down"
            onClick={closeImageModal}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in overflow-auto"
            onClick={closeImageModal}
          >
            <div className="relative max-w-6xl max-h-full animate-scale-in">
              <div className="overflow-hidden max-h-[90vh] relative">
                <img
                  src={selectedImage}
                  alt="Enlarged view"
                  className={`object-contain rounded-lg transition-transform duration-200 ${
                    imageScale > 1 && window.innerWidth > 768 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
                  }`}
                  style={{ 
                    transform: `scale(${imageScale}) translate(${imagePosition.x / imageScale}px, ${imagePosition.y / imageScale}px)`,
                    transformOrigin: 'center',
                    maxHeight: '90vh',
                    minWidth: '200px',
                    userSelect: 'none'
                  }}
                  onWheel={handleImageWheel}
                  onMouseDown={handleMouseDown}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              {window.innerWidth > 768 && (
                <p className="text-center text-gray-400 text-sm mt-2">Используйте колесико мыши для масштабирования</p>
              )}
            </div>
          </div>
        </>
      )}

      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out 0.1s both;
        }
      `}</style>
    </div>
  )
}

export default CaseStudy
