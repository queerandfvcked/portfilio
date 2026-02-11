import React, { useState, useEffect, useRef } from 'react'

import { useParams, useNavigate } from 'react-router-dom'

import { useTranslation } from '../contexts/LanguageContext'

import ImageSlider from './ImageSlider'

import CaseNavigation from './CaseNavigation'



const CaseStudy = () => {

  const { slug } = useParams()

  const navigate = useNavigate()

  const { t, language } = useTranslation()

  

  const [activeSection, setActiveSection] = useState('overview')

  const [expandedSections, setExpandedSections] = useState({})

  const [selectedImage, setSelectedImage] = useState(null)

  const [imageScale, setImageScale] = useState(1)

  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })

  const [isDragging, setIsDragging] = useState(false)

  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const [currentSlide, setCurrentSlide] = useState(0)

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

    if (!content) return null

    const lines = content.split('\n')

    let inTable = false

    let tableContent = []

    let afterBullet = false

    

    return lines.map((line, index) => {

      if (line.startsWith('### ')) {

        afterBullet = false

        return (

          <h3 key={index} className="text-xl font-bold text-cyan-300 mt-6 mb-3">

            {line.replace('### ', '')}

          </h3>

        )

      } else if (line.startsWith('## ')) {

        afterBullet = false

        return (

          <h2 key={index} className="text-2xl font-bold text-cyan-200 mt-8 mb-4">

            {line.replace('## ', '')}

          </h2>

        )

      } else if (line.includes('ZENMONEY_IMAGES_START')) {

        // Handle ZenMoney special marker

        return (

          <div key={index} className="flex flex-row gap-4 justify-center items-center w-full my-8">

            <img 

              src="/assets/New folder/Competitive analysis/zenmoney 1.png" 

              alt="ZenMoney 1"

              className="w-2/5 h-80 object-contain"

            />

            <img 

              src="/assets/New folder/Competitive analysis/zenmoney 2.png" 

              alt="ZenMoney 2"

              className="w-2/5 h-80 object-contain"

            />

            <img 

              src="/assets/New folder/Competitive analysis/zenmoney 3.png" 

              alt="ZenMoney 3"

              className="w-2/5 h-80 object-contain"

            />

          </div>

        )

      } else if (line.includes('MONEFY_IMAGES_START')) {

        // Handle Monefy special marker

        return (

          <div key={index} className="flex flex-row gap-4 justify-center items-center w-full my-8">

            <img 

              src="/assets/New folder/Competitive analysis/monefy 1.png" 

              alt="Monefy 1"

              className="w-2/5 h-80 object-contain"

            />

            <img 

              src="/assets/New folder/Competitive analysis/monefy 2.png" 

              alt="Monefy 2"

              className="w-2/5 h-80 object-contain"

            />

            <img 

              src="/assets/New folder/Competitive analysis/monefy 3.png" 

              alt="Monefy 3"

              className="w-2/5 h-80 object-contain"

            />

          </div>

        )

      } else if (line.includes('SPENDEE_IMAGES_START')) {

        // Handle Spendee special marker

        return (

          <div key={index} className="flex flex-row gap-4 justify-center items-center w-full my-8">

            <img 

              src="/assets/New folder/Competitive analysis/spendee 1.png" 

              alt="Spendee 1"

              className="w-2/5 h-80 object-contain"

            />

            <img 

              src="/assets/New folder/Competitive analysis/spendee 2.png" 

              alt="Spendee 2"

              className="w-2/5 h-80 object-contain"

            />

            <img 

              src="/assets/New folder/Competitive analysis/spendee 3.png" 

              alt="Spendee 3"

              className="w-2/5 h-80 object-contain"

            />

          </div>

        )

      } else if (line.includes('MONEYMGR_IMAGES_START')) {

        // Handle Money Mgr special marker

        return (

          <div key={index} className="flex flex-row gap-4 justify-center items-center w-full my-8">

            <img 

              src="/assets/New folder/Competitive analysis/money mgr 1.png" 

              alt="Money Mgr 1"

              className="w-2/5 h-80 object-contain"

            />

            <img 

              src="/assets/New folder/Competitive analysis/money mgr 2.png" 

              alt="Money Mgr 2"

              className="w-2/5 h-80 object-contain"

            />

            <img 

              src="/assets/New folder/Competitive analysis/money mgr 3.png" 

              alt="Money Mgr 3"

              className="w-2/5 h-80 object-contain"

            />

          </div>

        )

      } else if (line.includes('LAYOUT_START')) {

        // Handle layout section with image and text side by side

        return (

          <div key={index} className="flex flex-col lg:flex-row gap-8 my-12">

            <div className="lg:w-1/2">

              <img 

                src="/assets/New folder/iPhone_13_mini.png" 

                alt="iPhone 13 mini mockup"

                className="w-full h-auto rounded-lg object-contain"

              />

            </div>

            <div className="lg:w-1/2">

              <div className="space-y-4">

                <div className="flex items-start space-x-2">

                  <span className="text-cyan-400">•</span>

                  <span className="text-gray-200">По умолчанию видны 4 категории. Предполагается, что первыми стоят используемые чаще всего, чтобы не вынуждать пользователя лишний раз разворачивать список</span>

                </div>

                <div className="flex items-start space-x-2">

                  <span className="text-cyan-400">•</span>

                  <span className="text-gray-200">Кнопка неактивна, пока не будет введена сумма и выбрана категория</span>

                </div>

                <div className="flex items-start space-x-2">

                  <span className="text-cyan-400">•</span>

                  <span className="text-gray-200">При заходе на экран инпут суммы сразу в фокусе, клавиатура открыта. Так мы сократим время на тапе и сразу позволим ввести сумму (за этим пользователь и пришел на экран)</span>

                </div>

              </div>

              <div className="mt-6 text-gray-400 text-sm italic">

                Для удобства и скорости можно также использовать кастомную клавиатуру на экране, как у конкурентов, но я посчитал, что автоматический фокус на инпуте сработает не хуже, а системная клавиатура будет привычнее для пользователя.

              </div>

            </div>

          </div>

        )

      } else if (line.includes('LAYOUT_SECOND')) {

        // Handle second layout section with image and text side by side

        return (

          <div key={index} className="flex flex-col lg:flex-row gap-8 my-12">

            <div className="lg:w-1/2">

              <img 

                src="/assets/New folder/iPhone_13_mini 1.png" 

                alt="iPhone 13 mini mockup 1"

                className="w-full h-auto rounded-lg object-contain"

              />

            </div>

            <div className="lg:w-1/2">

              <div className="space-y-4">

                <div className="flex items-start space-x-2">

                  <span className="text-cyan-400">•</span>

                  <span className="text-gray-200">Выделил категории разными цветами, но сделал их пастельными, не яркими, чтоб не резали глаз при ежедневном использовании. Если для каждой категории установить фиксированный цвет, то юзер может ориентироваться еще и по цвету в выборе категории</span>

                </div>

                <div className="flex items-start space-x-2">

                  <span className="text-cyan-400">•</span>

                  <span className="text-gray-200">Дата по умолчанию стоит "сегодня". При необходимости юзер нажмет на иконку и в боттом шит календаре выберет нужную дату</span>

                </div>

                <div className="flex items-start space-x-2">

                  <span className="text-cyan-400">•</span>

                  <span className="text-gray-200">Инпут комментария не занимает много места, лейбл в плейсхолдере. Сразу указал в нем на опциональность функции, чтобы пользователь точно не запутался</span>

                </div>

              </div>

            </div>

          </div>

        )

      } else if (line.includes('LAYOUT_IMAGES')) {

        // Handle three layout images in row

        return (

          <div key={index}>

            <div className="flex flex-col lg:flex-row gap-6 justify-start items-center w-full my-12">

              <img 

                src="/assets/New folder/iPhone_13_mini 2.png" 

                alt="iPhone 13 mini mockup 2"

                className="w-full lg:w-[30%] h-auto object-contain"

              />

              <img 

                src="/assets/New folder/iPhone_13_mini 3.png" 

                alt="iPhone 13 mini mockup 3"

                className="w-full lg:w-[30%] h-auto object-contain"

              />

              <img 

                src="/assets/New folder/iPhone_13_mini 4.png" 

                alt="iPhone 13 mini mockup 4"

                className="w-full lg:w-[30%] h-auto object-contain"

              />

            </div>

            <div className="mt-6 text-gray-400 text-sm italic">

              Если категорий много, то можно использовать боттом шит с поиском, чтобы не нагружать основной экран и сделать поиск более удобным.

            </div>

          </div>

        )

      } else if (line.trim().startsWith('<div')) {

        // Handle HTML div tags for flex layouts

        if (line.includes('zenmoney')) {

          return (

            <div key={index} className="flex flex-row gap-4 justify-center items-center w-full my-4">

              <img 

                src="/assets/New folder/Competitive analysis/zenmoney 1.png" 

                alt="ZenMoney 1"

                className="w-1/3 h-64 object-contain"

              />

              <img 

                src="/assets/New folder/Competitive analysis/zenmoney 2.png" 

                alt="ZenMoney 2"

                className="w-1/3 h-64 object-contain"

              />

              <img 

                src="/assets/New folder/Competitive analysis/zenmoney 3.png" 

                alt="ZenMoney 3"

                className="w-1/3 h-64 object-contain"

              />

            </div>

          )

        }

        return null

      } else if (line.trim().startsWith('<div')) {

        // Handle HTML div tags - render as HTML

        return (

          <div key={index} dangerouslySetInnerHTML={{ __html: line }} />

        )

      } else if (line.trim().startsWith('<p')) {

        // Handle HTML p tags - render as HTML  

        return (

          <p key={index} dangerouslySetInnerHTML={{ __html: line }} />

        )

      } else if (line.trim().startsWith('<img ')) {

        // Handle HTML img tags

        const imgMatch = line.match(/<img src="([^"]+)"[^>]*>/);

        if (imgMatch) {

          const src = imgMatch[1];

          return (

            <div key={index} className="my-4">

              <img

                src={src}

                alt="Screenshot"

                className="w-full max-w-full h-auto rounded-lg object-contain transition-transform duration-300 hover:scale-105 bg-transparent"

                style={{ maxWidth: '90%', margin: '0 auto', display: 'block' }}

              />

            </div>

          )

        }

        return null

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

            <table className="w-full border-collapse border border-cyan-800/30 rounded-lg text-xs">

              <thead>

                <tr className="bg-cyan-900/20">

                  {tableContent[0].map((cell, cellIndex) => (

                    <th key={cellIndex} className="border border-cyan-800/30 px-2 py-2 text-left text-cyan-100 font-semibold break-words max-w-[120px]">

                      {cell.replace(/\*\*/g, '')}

                    </th>

                  ))}

                </tr>

              </thead>

              <tbody>

                {tableContent.slice(1).map((row, rowIndex) => (

                  <tr key={rowIndex} className="hover:bg-cyan-900/10">

                    {row.map((cell, cellIndex) => (

                      <td key={cellIndex} className="border border-cyan-800/30 px-2 py-1 text-gray-200 break-words max-w-[120px]">

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

            <span className="text-gray-200">{line.replace('• ', '')}</span>

          </div>

        )

      } else if (line.startsWith('- ')) {

        afterBullet = true

        return (

          <div key={index} className="flex items-start space-x-2 mb-2">

            <span className="text-cyan-400">•</span>

            <span className="text-gray-200">{line.replace('- ', '')}</span>

          </div>

        )

      } else if (
        line.startsWith('Таким образом, рынок закрывает разные аспекты') ||
        line.startsWith('Thus, the market covers different aspects')
      ) {

        afterBullet = false

        return (

          <p key={index} className="text-gray-200 mb-3 mt-8 font-medium">

            {line}

          </p>

        )

      } else if (
        line.startsWith('Чтобы глубже понять рынок, я проанализировал конкретные продукты из этих категорий:') ||
        line.startsWith('To understand the market deeper, I analyzed specific products from these categories:')
      ) {

        afterBullet = false

        return (

          <p key={index} className="text-gray-200 mb-6 font-medium">

            {line}

          </p>

        )

      } else if (line.startsWith('• ')) {

        afterBullet = true

        return (

          <div key={index} className="flex items-start space-x-2 mb-2">

            <span className="text-cyan-400">•</span>

            <span className="text-gray-200">{line.replace('• ', '')}</span>

          </div>

        )

      } else if (line.startsWith('- ')) {

        afterBullet = true

        return (

          <div key={index} className="flex items-start space-x-2 mb-2">

            <span className="text-cyan-400">•</span>

            <span className="text-gray-200">{line.replace('- ', '')}</span>

          </div>

        )

      } else if (afterBullet && line.trim() !== '' && !line.startsWith('Также сделал разбор конкурентов')) {

        return (

          <p key={index} className="text-gray-200 mb-3 ml-4">

            {line}

          </p>

        )

      } else if (line.startsWith('Также сделал разбор конкурентов')) {

        afterBullet = false

        return (

          <p key={index} className="text-gray-200 mb-3 mt-6">

            {line}

          </p>

        )

      } else if (line.trim() === '') {

        return null // Skip empty lines to avoid extra spacing

      } else {

        afterBullet = false

        return (

          <p key={index} className="text-gray-200 mb-3">

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

  const toggleableSections = ['overview', 'product-discovery', 'jtbd', 'user-flow', 'results', 'goal-context', 'competitor-solutions', 'idea', 'process']



  // Expandable section component

  const ExpandableSection = ({ section, isActive }) => {

    const isExpanded = expandedSections[section.id] || false

    

    return (

      <div 

        id={section.id}

        data-section={section.id}

        className={`mb-16 scroll-mt-24`}

      >

        {/* Section header with toggle */}

        <div 

          className="flex items-center justify-between cursor-pointer group"

          onClick={() => toggleSection(section.id)}

        >

          <h2 className="text-3xl font-bold text-gray-200 mb-4 group-hover:text-cyan-400 transition-colors">

            {slug === 'keepl-app' ? (
              section.id === 'overview' ? t('caseStudies.keeplApp.sections.0.title') : 
              section.id === 'problem' ? t('caseStudies.keeplApp.sections.1.title') : 
              section.id === 'product-discovery' ? t('caseStudies.keeplApp.sections.2.title') :
              section.id === 'ux-research' ? t('caseStudies.keeplApp.sections.3.title') :
              section.id === 'jtbd' ? t('caseStudies.keeplApp.sections.4.title') :
              section.id === 'hypothesis' ? t('caseStudies.keeplApp.sections.5.title') :
              section.id === 'user-flow' ? t('caseStudies.keeplApp.sections.6.title') :
              section.id === 'metrics' ? t('caseStudies.keeplApp.sections.7.title') :
              section.id === 'ui' ? t('caseStudies.keeplApp.sections.8.title') :
              section.id === 'results' ? t('caseStudies.keeplApp.sections.9.title') :
              section.title
            ) : section.title}

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

            <div className="text-gray-200 text-lg leading-relaxed">

              {slug === 'keepl-app' ? (
                section.id === 'overview' ? formatContent(t('caseStudies.keeplApp.sections.0.content')) : 
                 section.id === 'problem' ? formatContent(t('caseStudies.keeplApp.sections.1.content')) : 
                 section.id === 'product-discovery' ? formatContent(t('caseStudies.keeplApp.sections.2.content')) :
                 section.id === 'ux-research' ? formatContent(t('caseStudies.keeplApp.sections.3.content')) :
                 section.id === 'jtbd' ? formatContent(t('caseStudies.keeplApp.sections.4.content')) :
                 section.id === 'hypothesis' ? formatContent(t('caseStudies.keeplApp.sections.5.content')) :
                 section.id === 'user-flow' ? formatContent(t('caseStudies.keeplApp.sections.6.content')) :
                 section.id === 'metrics' ? formatContent(t('caseStudies.keeplApp.sections.7.content')) :
                 section.id === 'ui' ? formatContent(t('caseStudies.keeplApp.sections.8.content')) :
                 section.id === 'results' ? formatContent(t('caseStudies.keeplApp.sections.9.content')) :
                 formatContent(section.content)
              ) : formatContent(section.content)}

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

        id={section.id}

        data-section={section.id}

        className={`scroll-mt-16 mb-16`}

      >

        <h2 className="text-3xl md:text-4xl font-bold text-gray-200 mb-8">

          {slug === 'keepl-app' ? (
              section.id === 'overview' ? t('caseStudies.keeplApp.sections.0.title') : 
               section.id === 'problem' ? t('caseStudies.keeplApp.sections.1.title') : 
               section.id === 'product-discovery' ? t('caseStudies.keeplApp.sections.2.title') :
               section.id === 'ux-research' ? t('caseStudies.keeplApp.sections.3.title') :
               section.id === 'jtbd' ? t('caseStudies.keeplApp.sections.4.title') :
               section.id === 'hypothesis' ? t('caseStudies.keeplApp.sections.5.title') :
               section.id === 'user-flow' ? t('caseStudies.keeplApp.sections.6.title') :
               section.id === 'metrics' ? t('caseStudies.keeplApp.sections.7.title') :
               section.id === 'ui' ? t('caseStudies.keeplApp.sections.8.title') :
               section.id === 'results' ? t('caseStudies.keeplApp.sections.9.title') :
               section.title
            ) : section.title}

        </h2>

        

        <div className="prose prose-lg text-gray-200 max-w-none mb-8">

          <div className="text-lg leading-relaxed">

            {slug === 'keepl-app' ? (
              section.id === 'overview' ? formatContent(t('caseStudies.keeplApp.sections.0.content')) : 
             section.id === 'problem' ? formatContent(t('caseStudies.keeplApp.sections.1.content')) : 
             section.id === 'product-discovery' ? formatContent(t('caseStudies.keeplApp.sections.2.content')) :
             section.id === 'ux-research' ? formatContent(t('caseStudies.keeplApp.sections.3.content')) :
             section.id === 'jtbd' ? formatContent(t('caseStudies.keeplApp.sections.4.content')) :
             section.id === 'hypothesis' ? formatContent(t('caseStudies.keeplApp.sections.5.content')) :
             section.id === 'user-flow' ? formatContent(t('caseStudies.keeplApp.sections.6.content')) :
             section.id === 'metrics' ? formatContent(t('caseStudies.keeplApp.sections.7.content')) :
             section.id === 'ui' ? formatContent(t('caseStudies.keeplApp.sections.8.content')) :
             section.id === 'results' ? formatContent(t('caseStudies.keeplApp.sections.9.content')) :
             formatContent(section.content)
            ) : formatContent(section.content)}

          </div>

        </div>



        {/* Special rendering for final-mockups */}

        {section.id === 'final-mockups' ? (

          <div>

            <div className="prose prose-lg text-gray-200 max-w-none mb-8 mt-8">

              <div className="text-lg leading-relaxed">

                {formatContent(section.additionalContent)}

              </div>

            </div>

            

            <div className="mt-8">

              {section.images.map((image, index) => (

                <div key={index} className="cursor-pointer group" onClick={() => openImageModal(image)}>

                  <img

                    src={image}

                    alt="Jobs, Filter, Found Screens"

                    className="w-full h-auto rounded-lg shadow-xl transition-transform duration-300 group-hover:scale-105"

                  />

                </div>

              ))}

            </div>

            

            <div className="prose prose-lg text-gray-200 max-w-none mb-8 mt-12">

              <div className="text-lg leading-relaxed">

                {formatContent(section.additionalContent2)}

              </div>

            </div>

            

            {/* Additional images for final-mockups */}

            {section.additionalImages && section.additionalImages.length > 0 && (

              <div className="mt-8">

                {section.additionalImages.map((image, index) => (

                  <div key={index} className="cursor-pointer group" onClick={() => openImageModal(image)}>

                    <img

                      src={image}

                      alt={`${section.title} - Additional Image ${index + 1}`}

                      className="w-full h-auto rounded-lg shadow-xl transition-transform duration-300 group-hover:scale-105"

                    />

                  </div>

                ))}

              </div>

            )}

            

            {/* Additional content 3 for final-mockups */}

            {section.additionalContent3 && (

              <div className="prose prose-lg text-gray-200 max-w-none mb-8 mt-12">

                <div className="text-lg leading-relaxed">

                  {formatContent(section.additionalContent3)}

                </div>

              </div>

            )}

            

            {/* Additional content 4 for final-mockups */}

            {section.additionalContent4 && (

              <div className="prose prose-lg text-gray-200 max-w-none mb-8 mt-4">

                <div className="text-lg leading-relaxed">

                  {formatContent(section.additionalContent4)}

                </div>

              </div>

            )}

            

            {/* Additional images 2 for final-mockups */}

            {section.additionalImages2 && section.additionalImages2.length > 0 && (

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

                {section.additionalImages2.map((image, index) => (

                  <div key={index} className="cursor-pointer group" onClick={() => openImageModal(image)}>

                    <img

                      src={image}

                      alt={index === 0 ? 'profile' : 'profile2'}

                      className="w-full h-auto rounded-lg shadow-xl transition-transform duration-300 group-hover:scale-105"

                    />

                  </div>

                ))}

              </div>

            )}

            

            {/* Additional content 5 for final-mockups */}

            {section.additionalContent5 && (

              <div className="prose prose-lg text-gray-200 max-w-none mb-8 mt-12">

                <div className="text-lg leading-relaxed">

                  {formatContent(section.additionalContent5)}

                </div>

              </div>

            )}

            

            {/* Additional images 3 for final-mockups */}

            {section.additionalImages3 && section.additionalImages3.length > 0 && (

              <div className="mt-8">

                {section.additionalImages3.map((image, index) => (

                  <div key={index} className="cursor-pointer group" onClick={() => openImageModal(image)}>

                    <img

                      src={image}

                      alt={`${section.title} - Resume Creating`}

                      className="w-full h-auto rounded-lg shadow-xl transition-transform duration-300 group-hover:scale-105"

                    />

                  </div>

                ))}

              </div>

            )}

            

            {/* Additional content 6 for final-mockups */}

            {section.additionalContent6 && (

              <div className="prose prose-lg text-gray-200 max-w-none mb-8 mt-12">

                <div className="text-lg leading-relaxed">

                  {formatContent(section.additionalContent6)}

                </div>

              </div>

            )}

            

            {/* Additional content 7 for final-mockups */}

            {section.additionalContent7 && (

              <div className="w-full mb-8 mt-12">

                <div dangerouslySetInnerHTML={{ __html: section.additionalContent7 }} />

              </div>

            )}

          </div>

        ) : (

          <div className={section.id === 'research-analysis' ? "grid grid-cols-1 md:grid-cols-2 gap-4 mt-8" : "space-y-8 mb-8"}>

            {section.images.map((image, index) => (

              <div key={index} className="cursor-pointer group" onClick={() => openImageModal(image)}>

                {section.id === 'research-analysis' ? (

                  <div>

                    <img

                      src={image}

                      alt={`${section.title} - Image ${index + 1}`}

                      className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                    />

                    <p className="text-center text-gray-400 text-sm mt-2">{index === 0 ? 'Веб-сайты' : 'Мобильные приложения'}</p>

                  </div>

                ) : (

                  <img

                    src={image}

                    alt={`${section.title} - Image ${index + 1}`}

                    className="w-full h-auto rounded-lg shadow-xl transition-transform duration-300 group-hover:scale-105"

                  />

                )}

              </div>

            ))}

          </div>

        )}

        

        {/* Additional content after images */}

        {section.additionalContent && section.id !== 'final-mockups' && (

          <div className="prose prose-lg text-gray-200 max-w-none mb-8 mt-12">

            <div className="text-lg leading-relaxed">

              {formatContent(section.additionalContent)}

            </div>

          </div>

        )}



        {/* More content for structure-design before additional images */}

        {section.moreContent && section.id === 'structure-design' && (

          <div className={`prose prose-lg text-gray-200 max-w-none mb-8 mt-4`}>

            <div className="text-lg leading-relaxed">

              {formatContent(section.moreContent)}

            </div>

          </div>

        )}



        {/* Additional images after content */}

        {section.additionalImages && section.additionalImages.length > 0 && section.id !== 'final-mockups' && (

          <div className={section.id === 'research-analysis' ? "grid grid-cols-1 md:grid-cols-2 gap-4 mt-8" : "space-y-8 mb-8"}>

            {section.additionalImages.map((image, index) => (

              <div key={index} className="cursor-pointer group" onClick={() => openImageModal(image)}>

                {section.id === 'research-analysis' ? (

                  <div>

                    <img

                      src={image}

                      alt={index === 0 ? 'hh vs hired 1' : 'hh vs hired 2'}

                      className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                    />

                    <p className="text-center text-gray-400 text-sm mt-2">{index === 0 ? 'HH' : 'Hired'}</p>

                  </div>

                ) : section.id === 'structure-design' ? (

                  <div>

                    <img

                      src={image}

                      alt={index === 0 ? 'User Flow' : 'Информационная архитектура'}

                      className="w-full transition-transform duration-300 group-hover:scale-105 bg-transparent h-auto rounded-lg shadow-xl"

                    />

                  </div>

                ) : (

                  <img

                    src={image}

                    alt={`${section.title} - Additional Image ${index + 1}`}

                    className={`w-full transition-transform duration-300 group-hover:scale-105 bg-transparent ${

                      section.id === 'competitor-solutions' && index === 0 ? 'max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain' : 'h-auto rounded-lg shadow-xl'

                    }`}

                  />

                )}

              </div>

            ))}

          </div>

        )}



        {/* More content after additional images */}

        {section.moreContent && section.id !== 'structure-design' && section.id !== 'final-mockups' && (

          <div className={`prose prose-lg text-gray-200 max-w-none mb-8 ${section.id === 'structure-design' ? 'mt-4' : 'mt-12'}`}>

            <div className="text-lg leading-relaxed">

              {formatContent(section.moreContent)}

            </div>

          </div>

        )}



        {/* Additional content 2 after more content */}

        {section.additionalContent2 && section.id !== 'final-mockups' && (

          <div className="prose prose-lg text-gray-200 max-w-none mb-8 mt-12">

            <div className="text-lg leading-relaxed">

              {formatContent(section.additionalContent2)}

            </div>

          </div>

        )}



        {/* Additional content 3 after content 2 */}

        {section.additionalContent3 && section.id !== 'final-mockups' && (

          <div key="content3" className="cursor-pointer group" onClick={() => openImageModal(section.additionalContent3)}>

            <div>

              <img

                src={section.additionalContent3}

                alt="Информационная архитектура"

                className="w-full transition-transform duration-300 group-hover:scale-105 bg-transparent h-auto rounded-lg shadow-xl"

              />

            </div>

          </div>

        )}



        {/* Additional content 4 after content 3 */}

        {section.additionalContent4 && section.id !== 'final-mockups' && (

          <div className="prose prose-lg text-gray-200 max-w-none mb-8 mt-12">

            <div className="text-lg leading-relaxed">

              {formatContent(section.additionalContent4)}

            </div>

          </div>

        )}



        {/* Additional content 5 after content 4 */}

        {section.additionalContent5 && section.id !== 'final-mockups' && (

          <div className="w-full mb-8">

            <div dangerouslySetInnerHTML={{ __html: section.additionalContent5 }} />

          </div>

        )}



        {/* Final images after more content */}

        {section.finalImages && section.finalImages.length > 0 && (

          <div className="space-y-8 mb-8">

            {section.finalImages.map((image, index) => (

              <div key={index} className="cursor-pointer group" onClick={() => openImageModal(image)}>

                {section.id === 'research-analysis' ? (

                  <div>

                    <img

                      src={image}

                      alt={`${section.title} - Final Image ${index + 1}`}

                      className="w-full transition-transform duration-300 group-hover:scale-105 bg-transparent h-80 object-contain object-left"

                    />

                    <p className="text-left text-gray-400 text-sm mt-2">Мы отказались от лишних фичей:<br/>Виртуальные собеседования сложно реализовать технически, а кроме того пользователи уже привыкли использовать другие сервисы для этого.<br/>Если бы обратная связь стала обязательной, это, конечно, обрадовало бы соискателей, но эйчары получили бы дополнительную головную боль.<br/>Подготовка к собеседованиям обернулась бы разочарованием для соискателей, потому что на реальном собеседовании могут быть совершенно другие вопросы, и недовольством для работодателя - он мог бы посчитать это нечестным.</p>

                  </div>

                ) : section.id === 'structure-design' ? (

                  <div>

                    <img

                      src={image}

                      alt="Информационная архитектура"

                      className="w-full transition-transform duration-300 group-hover:scale-105 bg-transparent h-auto rounded-lg shadow-xl"

                    />

                  </div>

                ) : (

                  <img

                    src={image}

                    alt={`${section.title} - Final Image ${index + 1}`}

                    className={`w-full transition-transform duration-300 group-hover:scale-105 bg-transparent ${

                      section.imageFullWidth ? 'h-auto' : 'h-80 object-contain'

                    }`}

                  />

                )}

              </div>

            ))}

          </div>

        )}



        {/* Last content after final images */}

        {section.lastContent && (

          <div className="prose prose-lg text-gray-200 max-w-none mb-8">

            <div className="text-lg leading-relaxed">

              {formatContent(section.lastContent)}

            </div>

          </div>

        )}



        {/* Image pairs for card demonstrations (non-UI sections) */}

        {section.imagePairs && section.imagePairs.length > 0 && section.id !== 'ui' && (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

            {section.imagePairs.map((pair, pairIndex) => (

              <div key={pairIndex} className="cursor-pointer group" onClick={() => openImageModal(pair.desktop)}>

                <img

                  src={pair.desktop}

                  alt={`${section.title} - Card ${pairIndex + 1}`}

                  className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

              </div>

            ))}

          </div>

        )}



        {/* Final section and CTA image */}

        {section.finalSection && (

          <div className="prose prose-lg text-gray-200 max-w-none mb-8">

            <div className="text-lg leading-relaxed">

              {formatContent(section.finalSection)}

            </div>

          </div>

        )}



        {/* CTA and footer image */}

        {section.ctaImage && (

          <div className="space-y-8 mb-8">

            <div className="cursor-pointer group" onClick={() => openImageModal(section.ctaImage)}>

              <img

                src={section.ctaImage}

                alt={`${section.title} - CTA and Footer`}

                className={`w-full transition-transform duration-300 group-hover:scale-105 bg-transparent ${

                  section.imageFullWidth ? 'h-auto' : 'h-80 object-contain'

                }`}

              />

            </div>

          </div>

        )}



        {/* More section */}

        {section.moreSection && (

          <div className="prose prose-lg text-gray-200 max-w-none mb-8">

            <div className="text-lg leading-relaxed">

              {formatContent(section.moreSection)}

            </div>

          </div>

        )}



        {/* More section images */}

        {section.moreSectionImages && section.moreSectionImages.length > 0 && (

          <div className="space-y-8 mb-8">

            {section.moreSectionImages.map((image, index) => (

              <div key={index} className="cursor-pointer group" onClick={() => openImageModal(image)}>

                <img

                  src={image}

                  alt={`${section.title} - More Section Image ${index + 1}`}

                  className={`w-full transition-transform duration-300 group-hover:scale-105 bg-transparent ${

                    section.imageFullWidth ? 'h-auto' : 'h-80 object-contain'

                  }`}

                />

              </div>

            ))}

          </div>

        )}



        {/* Ultimate content */}

        {section.ultimateContent && (

          <div className="prose prose-lg text-gray-200 max-w-none mb-8">

            <div className="text-lg leading-relaxed">

              {formatContent(section.ultimateContent)}

            </div>

          </div>

        )}



        {/* Ultimate images */}

        {section.ultimateImages && section.ultimateImages.length > 0 && (

          <div className="space-y-8 mb-8">

            {section.ultimateImages.map((image, index) => (

              <div key={index} className="cursor-pointer group" onClick={() => openImageModal(image)}>

                <img

                  src={image}

                  alt={`${section.title} - Ultimate Image ${index + 1}`}

                  className={`w-full transition-transform duration-300 group-hover:scale-105 bg-transparent ${

                    section.imageFullWidth ? 'h-auto' : 'h-80 object-contain'

                  }`}

                />

              </div>

            ))}

          </div>

        )}



        {/* UI section specific content */}

        {section.id === 'ui' && (

          <>

            {/* Image pairs for desktop/mobile comparison in UI section */}

            {section.imagePairs && section.imagePairs.length > 0 && (

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

                {section.imagePairs.map((pair, pairIndex) => (

                  <React.Fragment key={pairIndex}>

                    <div className="cursor-pointer group" onClick={() => openImageModal(pair.desktop)}>

                      <img

                        src={pair.desktop}

                        alt={`${section.title} - Desktop ${pairIndex + 1}`}

                        className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

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

                  </React.Fragment>

                ))}

              </div>

            )}



            {/* Additional text after onboarding slider for UI section */}

            <div className="prose prose-lg text-gray-200 max-w-none mt-8">

              <div className="text-lg leading-relaxed">

                <p className="text-gray-200 mb-3">

                  {language === 'en' ? 'After registration, the user goes through a short onboarding that highlights key features. My goal is to reduce Time to Value so the user quickly understands the value of the app.' : 'После регистрации пользователь проходит через короткий онбординг, который подсвечивает ключевые возможности. Моя цель - сократить Time to Value, чтобы юзер максимально быстро осознал пользу приложения.'}

                </p>

              </div>

            </div>



            {/* Onboarding images slider for UI section */}

            {section.onboardingImages && section.onboardingImages.length > 0 && (

              <div className="relative mt-8">

                <div className="overflow-hidden rounded-lg">

                  <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>

                    {section.onboardingImages.map((image, index) => (

                      <div key={index} className="flex-shrink-0 w-full">

                        <div className="cursor-pointer group" onClick={() => openImageModal(image)}>

                          <img

                            src={image}

                            alt={`${section.title} - Onboarding ${index + 1}`}

                            className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                          />

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

                

                {/* Navigation dots */}

                <div className="flex justify-center mt-4 space-x-2">

                  {section.onboardingImages.map((_, index) => (

                    <button

                      key={index}

                      onClick={() => setCurrentSlide(index)}

                      className={`w-3 h-3 rounded-full transition-colors ${

                        index === currentSlide ? 'bg-cyan-400' : 'bg-gray-600'

                      }`}

                    />

                  ))}

                </div>

                

                {/* Navigation arrows */}

                <button

                  onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}

                  disabled={currentSlide === 0}

                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"

                >

                  ‹

                </button>

                <button

                  onClick={() => setCurrentSlide(Math.min(section.onboardingImages.length - 1, currentSlide + 1))}

                  disabled={currentSlide === section.onboardingImages.length - 1}

                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"

                >

                  ›

                </button>

              </div>

            )}



            {/* Additional text after onboarding slider for UI section */}

            <div className="prose prose-lg text-gray-200 max-w-none mt-8">

              <div className="text-lg leading-relaxed">

                <p className="text-gray-200 mb-3">

                  {language === 'en' ? 'The Home screen immediately offers to create a new goal; clicking the button takes the user to the goal creation screen.' : 'Экран Home сразу предлагает создать новую цель, по кнопке пользователь попадает на экран создания цели.'}

                </p>

              </div>

            </div>



            {/* Home screen images for UI section */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/home_placeholder.png')}>

                <img

                  src="/assets/keepl app/home_placeholder.png"

                  alt="Home placeholder"

                  className="w-full h-80 object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-gray-400 text-sm mt-2">Home</p>

              </div>

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/create_new_goal.png')}>

                <img

                  src="/assets/keepl app/create_new_goal.png"

                  alt="Create new goal"

                  className="w-full h-80 object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-gray-400 text-sm mt-2">Create Goal</p>

              </div>

            </div>



            {/* Additional text after Home images for UI section */}

            <div className="prose prose-lg text-gray-200 max-w-none mt-8">

              <div className="text-lg leading-relaxed">

                <p className="text-gray-200 mb-3">

                  {language === 'en' ? "Unlike most similar services, Keepl allows users to customize goals: choose custom units of measurement, group sub-goals, and add easier alternatives." : 'В отличие от большинства аналогичных сервисов, Keepl позволяет пользователю кастомизировать цель: самостоятельно выбирать единицы измерения задачи, группировать подцели и добавлять легкую альтернативу.'}

                </p>

                <p className="text-gray-200 mb-3">

                  {language === 'en' ? "To prevent high flexibility from impacting Activation Rate, I used a progressive disclosure pattern: complex settings remain optional, keeping cognitive load low for new users." : 'Чтобы высокая гибкость не ударила по Activation Rate, я использовал паттерн постепенного раскрытия: сложные настройки остаются опциональными, сохраняя когнитивную нагрузку на низком уровне для новых юзеров.'}

                </p>

                <p className="text-gray-200 mb-3">

                  {language === 'en' ? 'Depending on the nature of the goal, the user can make it one-time or long-term, add image uploads, mood tracking. Breaking the goal into sub-goals and manual input of results allows more accurate tracking of metrics and progress visibility.' : 'В зависимости от характера цели пользователь может сделать ее одноразовой или долгосрочной, включить добавление изображений, трекер настроения. Разбивание цели на сабголы и ручной ввод результата позволяет точнее отслеживать метрику и видеть прогресс.'}

                </p>

                <p className="text-gray-200 mb-3">

                  {language === 'en' ? 'This is key to user motivation. Even partial task completion is reflected in the graphs, preventing churn due to guilt. The service doesn\'t "force", but motivates through visualization of any effort invested.' : 'Это ключевое решение для мотивации пользователя. Даже частичное выполнение задачи отражается на графиках, что предотвращает отток из-за чувства вины. Сервис не "принуждает", а мотивирует через визуализацию любого вложенного усилия.'}

                </p>

                <p className="text-gray-200 mb-3">

                  {language === 'en' ? 'Settings are optional; if desired, Keepl can be used like a regular habit tracker. For example, a goal can be made one-time, in which case sub-goals don\'t update daily, and after completion the goal is marked finished.' : 'Настройки опциональны, при желании keepl может использоваться так же, как и обыкновенный трекер привычек. Например, цель можно сделать одноразовой - в этом случае сабголы не обновляются ежедневно, а после их выполнения цель отмечается завершенной.'}

                </p>

              </div>

            </div>



            {/* Goal creation images for UI section */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

                  <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/create_new_goal 1.png')}>

                    <img

                      src="/assets/keepl app/create_new_goal 1.png"

                      alt="Create goal mobile"

                      className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                    />

                    <p className="text-center text-gray-400 text-sm mt-2">Desktop</p>

                  </div>

                  <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/create_goal.png')}>

                    <img

                      src="/assets/keepl app/create_goal.png"

                      alt="Create goal desktop"

                      className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                    />

                    <p className="text-center text-gray-400 text-sm mt-2">Mobile</p>

                  </div>

                </div>



            {/* Additional text after goal creation images for UI section */}

            <div className="prose prose-lg text-gray-200 max-w-none mt-8">

              <div className="text-lg leading-relaxed">

                <p className="text-gray-200 mb-3">

                  {language === 'en' ? "After saving a goal, the user lands on the newly created goal screen. A circular progress bar for the current day provides instant feedback, while a motivational card drives emotional engagement. This helps users immediately feel the product's value and increases the likelihood they'll return tomorrow to see how these numbers change." : 'После сохранения цели пользователь попадает на экран только что созданной цели. Круглый прогресс-бар за текущий день создает мгновенную обратную связь, а карточка-мотиватор работает на эмоциональную вовлеченность. Это помогает пользователю сразу почувствовать ценность продукта и повышает вероятность того, что он вернется завтра, чтобы увидеть, как изменятся эти цифры.'}

                </p>

              </div>

            </div>



            {/* Goal detail screen images for UI section */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/goal screen desktop.png')}>

                <img

                  src="/assets/keepl app/goal screen desktop.png"

                  alt="Goal screen desktop"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-gray-400 text-sm mt-2">Desktop</p>

              </div>

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/goal screen mobile.png')}>

                <img

                  src="/assets/keepl app/goal screen mobile.png"

                  alt="Goal screen mobile"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-gray-400 text-sm mt-2">Mobile</p>

              </div>

            </div>



            {/* H2 heading for daily progress section */}

            <h2 className="text-2xl font-bold text-cyan-200 mt-12 mb-6">{language === 'en' ? 'Daily Progress Tracking and Emotional Feedback' : 'Отметка ежедневного прогресса и эмоциональный фидбек'}</h2>



            {/* Additional text about daily progress tracking */}

            <div className="prose prose-lg text-gray-200 max-w-none mt-8">

              <div className="text-lg leading-relaxed">

                <p className="text-gray-200 mb-3">

                  {language === 'en' ? "To maintain motivation and create a sense of progress, even when a goal isn't fully completed, I added the ability to manually input results. This allows users to capture even partial success, directly impacting consistency and supporting the North Star Metric—weekly active goal days. Instant visualization on the progress bar provides a dopamine response and reinforces daily usage patterns." : 'Чтобы сохранить мотивацию и создать ощущение движения, даже если цель выполнена не полностью, я добавил возможность ввода результата вручную. Это позволяет фиксировать даже частичный успех, напрямую влияя на регулярность и поддерживая North Star Metric - weekly active goal days. Мгновенная визуализация на прогресс-баре дает дофаминовый отклик и закрепляет паттерн ежедневного использования.'}

                </p>

                <p className="text-gray-200 mb-3">

                  {language === 'en' ? "Integrating an optional mood tracker allows collecting qualitative data for deep reflection. In the future, this helps users see the correlation between their habits and emotional state." : 'Интеграция опционального трекера настроения позволяет собирать качественные данные для глубокой рефлексии. В будущем это помогает пользователю увидеть корреляцию между своими привычками и эмоциональным состоянием.'}

                </p>

              </div>

            </div>



            {/* Modal and overlay images for UI section */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/modal.png')}>

                <img

                  src="/assets/keepl app/modal.png"

                  alt="Modal screen"

                  className="w-full max-w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

              </div>

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/overlay.png')}>

                <img

                  src="/assets/keepl app/overlay.png"

                  alt="Overlay screen"

                  className="w-full max-w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

              </div>

            </div>



            {/* Additional text about Home screen task management */}

            <div className="prose prose-lg text-gray-200 max-w-none mt-8">

              <div className="text-lg leading-relaxed">

                <p className="text-gray-200 mb-3">

                  {language === 'en' ? "Users can also mark tasks as completed from the Home screen. Here they see a quick summary of today's progress, how many tasks they've completed for each goal, their average mood, and helpful tips. Below are the sub-goal cards themselves, which can be marked complete at once or progress can be updated gradually using manual input." : 'Пользователь также может отмечать таски выполненными на главном экране Home. Там же заодно он увидит быструю сводку по сегодняшнему прогрессу, сколько задач он выполнил по каждой из целей, свой средний муд и совет-подсказку. Ниже располагаются сами карточки сабголов, которые можно отметить выполненными сразу или же дополнять прогресс постепенно, используя мануальный ввод.'}

                </p>

              </div>

            </div>



            {/* Home screen task management images for UI section */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/home.png')}>

                <img

                  src="/assets/keepl app/home.png"

                  alt="Home screen"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-gray-400 text-sm mt-2">Desktop</p>

              </div>

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/home mobile.png')}>

                <img

                  src="/assets/keepl app/home mobile.png"

                  alt="Home screen mobile"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-gray-400 text-sm mt-2">Mobile</p>

              </div>

            </div>



            {/* H2 heading for analytics section */}

            <h2 className="text-2xl font-bold text-cyan-200 mt-12 mb-6">{language === 'en' ? 'Analysis and Progress Visualization' : 'Анализ и визуализация прогресса'}</h2>



            {/* Additional text about analytics and progress visualization */}

            <div className="prose prose-lg text-gray-200 max-w-none mt-8">

              <div className="text-lg leading-relaxed">

                <p className="text-gray-200 mb-3">

                  {language === 'en' ? "To combat burnout and increase self-awareness, Keepl provides deep analytics. Users can track goal progress in 'Week' and 'Month' tabs to see trends and maintain focus." : 'Для борьбы с выгоранием и повышения осознанности Keepl предоставляет глубокую аналитику. Пользователь может отслеживать прогресс по конкретной цели во вкладках "Неделя" и "Месяц", чтобы видеть динамику и не терять фокус.'}

                </p>

              </div>

            </div>



            {/* Goal 2 images for UI section */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/goal 2 desktop.png')}>

                <img

                  src="/assets/keepl app/goal 2 desktop.png"

                  alt="Goal 2 desktop"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-gray-400 text-sm mt-2">Desktop</p>

              </div>

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/goal 2 mobile.png')}>

                <img

                  src="/assets/keepl app/goal 2 mobile.png"

                  alt="Goal 2 mobile"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-gray-400 text-sm mt-2">Mobile</p>

              </div>

            </div>



            {/* Additional text about calendar navigation */}

            <div className="prose prose-lg text-gray-200 max-w-none mt-8">

              <div className="text-lg leading-relaxed">

                <p className="text-gray-200 mb-3">

                  {language === 'en' ? 'The calendar allows convenient navigation between time periods.' : 'Календарь позволяет удобно перемещаться между временными периодами.'}

                </p>

              </div>

            </div>



            {/* Goal detail calendar image for UI section */}

            <div className="cursor-pointer group mt-8" onClick={() => openImageModal('/assets/keepl app/goaldetail calendar.png')}>

              <img

                src="/assets/keepl app/goaldetail calendar.png"

                alt="Goal detail calendar"

                className="w-full max-w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

              />

            </div>



            {/* Additional text about overall progress page */}

            <div className="prose prose-lg text-gray-200 max-w-none mt-8">

              <div className="text-lg leading-relaxed">

                <p className="text-gray-200 mb-3">

                  {language === 'en' ? "The overall Progress page provides a summary assessment of activity across all goals. Moving from detailed views to summaries helps users see the scale of their work, directly impacting User Self-Efficacy." : 'Общая страница Progress дает суммарную оценку активности по всем целям. Переход от детализации к обобщению помогает пользователю увидеть масштаб проделанной работы, что напрямую влияет на User Self-Efficacy.'}

                </p>

              </div>

            </div>



            {/* Progress images for UI section */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/progress desktop.png')}>

                <img

                  src="/assets/keepl app/progress desktop.png"

                  alt="Progress screen"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-gray-400 text-sm mt-2">Desktop</p>

              </div>

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/progress mobile.png')}>

                <img

                  src="/assets/keepl app/progress mobile.png"

                  alt="Progress screen mobile"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-gray-400 text-sm mt-2">Mobile</p>

              </div>

            </div>



            {/* Additional text about gallery integration */}

            <div className="prose prose-lg text-gray-200 max-w-none mt-8">

              <div className="text-lg leading-relaxed">

                <p className="text-gray-200 mb-3">

                  {language === 'en' ? "For visually-oriented goals (like fitness), I integrated a Gallery. When creating a goal, users indicate whether they want to add photo upload capability. If yes, the goal page displays the option to add images. Photos can be viewed there or in the 'Gallery' tab\u2014not just storage, but an Emotional Retention tool: seeing one's journey through photos creates powerful visual reinforcement." : '\u0414\u043b\u044f \u0432\u0438\u0437\u0443\u0430\u043b\u044c\u043d\u043e-\u043e\u0440\u0438\u0435\u043d\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0445 \u0446\u0435\u043b\u0435\u0439 (\u043d\u0430\u043f\u0440\u0438\u043c\u0435\u0440, \u0444\u0438\u0442\u043d\u0435\u0441\u0430) \u044f \u0438\u043d\u0442\u0435\u0433\u0440\u0438\u0440\u043e\u0432\u0430\u043b \u0413\u0430\u043b\u0435\u0440\u0435\u044e. \u041f\u0440\u0438 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u0438 \u0446\u0435\u043b\u0438 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c \u043e\u0442\u043c\u0435\u0447\u0430\u0435\u0442, \u0445\u043e\u0447\u0435\u0442 \u043b\u0438 \u043e\u043d \u0434\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043e\u043f\u0446\u0438\u044e \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438 \u0444\u043e\u0442\u043e. \u0415\u0441\u043b\u0438 \u0434\u0430, \u0442\u043e \u043d\u0430 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435 \u0446\u0435\u043b\u0438 \u043f\u043e\u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u043e\u043f\u0446\u0438\u044f \u0434\u043e\u0431\u0430\u0432\u043b\u044f\u0442\u044c \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f. \u041f\u0440\u043e\u0441\u043c\u0430\u0442\u0440\u0438\u0432\u0430\u0442\u044c \u0438\u0445 \u043c\u043e\u0436\u043d\u043e \u0442\u0430\u043c \u0436\u0435, \u043b\u0438\u0431\u043e \u043f\u0435\u0440\u0435\u0439\u0442\u0438 \u0432\u043e \u0432\u043a\u043b\u0430\u0434\u043a\u0443 \"\u0433\u0430\u043b\u0435\u0440\u0435\u044f\" - \u043d\u0435 \u043f\u0440\u043e\u0441\u0442\u043e \u0445\u0440\u0430\u043d\u0438\u043b\u0438\u0449\u0435, \u0430 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442 Emotional Retention: \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u044c \u0443\u0432\u0438\u0434\u0435\u0442\u044c \u0441\u0432\u043e\u0439 \u043f\u0443\u0442\u044c \u0447\u0435\u0440\u0435\u0437 \u0444\u043e\u0442\u043e \u0441\u043e\u0437\u0434\u0430\u0435\u0442 \u043c\u043e\u0449\u043d\u043e\u0435 \u0432\u0438\u0437\u0443\u0430\u043b\u044c\u043d\u043e\u0435 \u043f\u043e\u0434\u043a\u0440\u0435\u043f\u043b\u0435\u043d\u0438\u0435.'}

                </p>

              </div>

            </div>



            {/* Gallery images for UI section */}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/gallery 1 desktop.png')}>

                <img

                  src="/assets/keepl app/gallery 1 desktop.png"

                  alt="Gallery 1 desktop"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-gray-400 text-sm mt-2">Desktop</p>

              </div>

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/gallery 2 desktop.png')}>

                <img

                  src="/assets/keepl app/gallery 2 desktop.png"

                  alt="Gallery 2 desktop"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-gray-400 text-sm mt-2">Desktop</p>

              </div>

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/gallery 1 mobile.png')}>

                <img

                  src="/assets/keepl app/gallery 1 mobile.png"

                  alt="Gallery 1 mobile"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-gray-400 text-sm mt-2">Mobile</p>

              </div>

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/gallery 2 mobile.png')}>

                <img

                  src="/assets/keepl app/gallery 2 mobile.png"

                  alt="Gallery 2 mobile"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-gray-400 text-sm mt-2">Mobile</p>

              </div>

            </div>



            {/* H2 heading for goal completion section */}

            <h2 className="text-2xl font-bold text-cyan-200 mt-12 mb-6">{language === 'en' ? 'Goal Completion' : 'Завершение цели'}</h2>



            {/* Additional text about goal completion */}

            <div className="prose prose-lg text-gray-200 max-w-none mt-8">

              <div className="text-lg leading-relaxed">

                <p className="text-gray-200 mb-3">

                  {language === 'en' ? "In Keepl, the goal completion process is fully controlled by the user. I intentionally avoided hard deadlines to reduce anxiety and prevent negative pressure from time constraints." : 'В Keepl процесс завершения цели полностью подконтролен пользователю. Я намеренно отказался от жестких дедлайнов, чтобы снизить уровень тревожности и избежать негативного давления временных рамок.'}

                </p>

                <p className="text-gray-200 mb-3">

                  {language === 'en' ? "When users feel a goal is achieved, they can complete it through an intuitive flow. The goal then moves to 'Completed' where all graphs, photos, and success history remain available for reflection. One-click goal reactivation provides system flexibility—if a user decides to return to a habit, there's no need to set everything up again." : 'Когда пользователь чувствует, что результат достигнут, он может завершить цель через интуитивно понятный флоу. Тогда цель попадет в "завершенные", там все графики, фото и история успехов остаются доступными для рефлексии. Возможность реактивации цели в один клик обеспечивает гибкость системы - если юзер решит вернуться к привычке, ему не нужно настраивать все заново.'}

                </p>

              </div>

            </div>



            {/* Goals images for UI section */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/goals desktop.png')}>

                <img

                  src="/assets/keepl app/goals desktop.png"

                  alt="Goals screen"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-gray-400 text-sm mt-2">Desktop</p>

              </div>

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/goals mobile.png')}>

                <img

                  src="/assets/keepl app/goals mobile.png"

                  alt="Goals screen mobile"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-gray-400 text-sm mt-2">Mobile</p>

              </div>

            </div>



            {/* H2 heading for profile section */}

            <h2 className="text-2xl font-bold text-cyan-200 mt-12 mb-6">{language === 'en' ? 'Profile' : 'Профиль'}</h2>



            {/* Additional text about profile */}

            <div className="prose prose-lg text-gray-200 max-w-none mt-8">

              <div className="text-lg leading-relaxed">

                <p className="text-gray-200 mb-3">

                  {language === 'en' ? 'Since the service is in MVP stage, we have relatively few settings. Currently users can change their avatar, username, password, and delete their account, but account management capabilities will expand in the future.' : 'Поскольку сервис находится на стадии MVP, у нас достаточно мало настроек. Пока что пользователь может сменить аватарку, юзернейм, поменять пароль и удалить аккаунт, но в будущем возможностей управления аккаунтом станет больше.'}

                </p>

                <p className="text-gray-200 mb-3">

                  {language === 'en' ? 'I also implemented a Quick Stats section that summarizes key metrics: number of active days and total sub-goals completed. This gives the user a sense of the scale of work accomplished at the highest level.' : 'Также я реализовал раздел Quick Stats, который суммирует общие показатели: количество активных дней и общее число выполненных подцелей. Это дает пользователю ощущение масштаба проделанной работы на самом верхнем уровне.'}

                </p>

              </div>

            </div>



            {/* Profile images for UI section */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/profile desktop.png')}>

                <img

                  src="/assets/keepl app/profile desktop.png"

                  alt="Profile screen"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-gray-400 text-sm mt-2">Desktop</p>

              </div>

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/profile mobile.png')}>

                <img

                  src="/assets/keepl app/profile mobile.png"

                  alt="Profile screen mobile"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-gray-400 text-sm mt-2">Mobile</p>

              </div>

            </div>

          </>

        )}

      </section>

    )

  }  



  // Case study data based on HTML files

  const caseStudies = {

    'keepl-app': {

      title: t('caseStudies.keeplApp.title'),

      subtitle: t('caseStudies.keeplApp.subtitle'),

      description: t('caseStudies.keeplApp.description'),

      tags: t('caseStudies.keeplApp.tags'),

      heroImage: '/assets/keepl app.png',

      heroImages: [

        '/assets/keepl app.png',

        '/assets/keepl app/home_placeholder.png',

        '/assets/keepl app/create_new_goal.png'

      ],

      sections: [

        {

          id: 'overview',

          title: t('caseStudies.keeplApp.sections.0.title'),

          content: 'Проект начался как эксперимент: я провел небольшие интервью с друзьями, чтобы понять, с какими трудностями они сталкиваются при достижении своих задач и целей. На основе этих наблюдений я попробовал спроектировать несколько экранов мобильного приложения, которое помогает пользователю отслеживать прогресс и поддерживает мотивацию. Опыт оказался интересным, и я решил развить его в полноценный продукт.',

          images: ['/assets/mini-research.png']

        },

        {

          id: 'problem',

          title: t('caseStudies.keeplApp.sections.1.title'),

          content: 'Пользователи сталкиваются с несколькими ключевыми трудностями при попытке достигать своих целей:\n\n• Сложно видеть свой прогресс и понимать, что уже сделано, а что еще нет.\n• Мотивация падает, когда сервис не показывает достижения и не помогает удерживать фокус.\n• Давление со стороны привычных механик (стрики, невыполненные задачи) вызывает чувство вины и стресс вместо поддержки и мотивации.\n• Существующие инструменты либо перегружены функциями, либо слишком абстрактны и не учитывают эмоциональный опыт пользователя.\n• Часто приходится комбинировать разные приложения и методы, что создает хаос и лишнюю нагрузку.\n\nВ результате достижение целей превращается в рутину, а не в осознанный и мотивирующий процесс, и пользователи часто ощущают усталость и разочарование.',

          images: []

        },

        {

          id: 'product-discovery',

          title: t('caseStudies.keeplApp.sections.2.title'),

          content: '### Что именно мы хотим сделать?\n\nВеб-приложение, которое помогает пользователю достигать своих целей (какими бы они ни были) и делает процесс более осознанным и мотивирующим. В центре внимания - опыт и эмоции пользователя: он отслеживает прогресс в наглядной форме и может фиксировать свое настроение, чтобы понимать, как оно соотносится с результатом.\n\nЯ сфокусировался на персонализации и эмпатии: приложение подстраивается под стиль работы пользователя и поддерживает его мотивацию через простые и понятные механики.\n\n### Для кого это предназначено?\n\nЦелевая аудитория - люди, которые ставят себе личные или рабочие цели, но сталкиваются с проблемой поддержания мотивации и отслеживания прогресса.\n\n### Зачем мы это делаем?\n\nОбычно сервисы для целей фокусируются только на продуктивности: выполнить как можно больше и быстрее. В итоге пользователь со временем приходит к тому, что прожимает чекбоксы на автомате.\nМы же хотим сместить акцент на сам процесс - дать пользователю пространство для осознанности, поддержки и понимания своего состояния. Это не только про "сделать задачу", а про то, чтобы видеть ценность в собственных шагах и понимать, что даже небольшое действие приближает к прогрессу.\n\n### Какие есть альтернативы?\n\nБольшинство конкурентов можно разделить на четыре типа:\n\n- Таск-менеджеры: сильны в управлении задачами, метриках и отчетности, но почти не затрагивают эмоциональную мотивацию.\n- Коучинг-лайфстайл приложения: дают поддержку и вдохновение, но часто перегружены функциями и не имеют удобной визуализации прогресса.\n- Трекеры привычек и настроений: помогают отмечать шаги и привычки, показывают прогресс в графиках, иногда связывают действия с настроением, но ограничены в глубине постановки целей и редко выходят за рамки чек-листов.\n- Планировщики дня: структурируют расписание и помогают следовать режиму, но почти не работают с долгосрочными целями и эмоциями пользователя.\n\nТаким образом, рынок закрывает разные аспекты: где-то есть жесткая структура и визуализация, где-то эмоциональная поддержка и коучинг, а где-то гибкий трекинг привычек. Но практически никто не соединяет все это вместе: постановку целей с подцелями, эмоциональные теги и настроение на уровне конкретных шагов, фото-прогресс и мягкие альтернативы действий под состояние пользователя.\n\nЧтобы глубже понять рынок, я проанализировал конкретные продукты из этих категорий:\n\n| **Название** | **Цели и мини-цели** | **Визуализация прогресса** | **Настроение/теги** | **Фото прогресс** | **Альтернативы действий** | **Мотивация** |\n| --- | --- | --- | --- | --- | --- | --- |\n| Strides | ✅ гибкие цели, привычки, KPI | ✅ прогресс бар, графики | ❌ | ❌ | ❌ | ❌ |\n| Fabulous | ❌ фокус на привычки | ❌ стрики | частично, общий трекер | ❌ | ✅ | ✅ коуч-сценарии |\n| Daylio | ❌ только привычки | ✅ графики настроения/привычек | ✅ | ❌ | ❌ | ❌ статистика |\n| Habitica | ✅ квесты | ✅ xp, уровни | ❌ | ❌ | ✅ | ✅ геймификация, коммьюнити |\n| Coach.me | ✅ | ❌ счетчики | ❌ | ❌ | ❌ | ✅ коучи |\n| Remente | ✅ life goals, подцели, планы | ✅ | ✅ муд трекер | ❌ | ❌ | ✅ статьи, напоминания |\n| Way of Life | ❌ фокус на привычки | ✅ | ✅ муд теги к привычкам | ❌ | ❌ | ❌ статистика |\n| Goal: Habits & Tasks | ✅ цели, привычки, задачи | ✅ прогресс бары, календари | ❌ | ❌ | ❌ | ❌ |\n| Success Wizard | ✅ пошаговые планы, цели | ❌ отчеты | ❌ | ❌ | ❌ | ❌ |\n| ATracker PRO | ❌ тайм трекер | ✅ графики | ❌ | ❌ | ❌ | ❌ |\n| ClickUp | ✅ | ✅ дашборды и метрики | ❌ | ❌ | ❌ | ❌ |\n\n### Как пользователи решают эту проблему сейчас?\n\nЛюди используют заметки, таск-менеджеры, планировщики и трекеры привычек, но ни один инструмент не объединяет мотивацию, визуальный прогресс и эмоциональную поддержку. Часто они полагаются на самодисциплину и теряют мотивацию, когда не видят результатов.',

          images: []

        },

        {

          id: 'ux-research',

          title: t('caseStudies.keeplApp.sections.3.title'),

          content: 'Чтобы глубже понять контекст и реальные боли, я провел небольшие интервью со знакомыми и дополнительно проанализировал отзывы пользователей схожих приложений (Strides, Habitica, Daylio, Fabulous, Finch).\n\nЭто помогло сформулировать три ключевых паттерна поведения:\n\n- Сложно начать\n\nЛюди теряются при первом запуске и не понимают, как правильно поставить цель. Значит, нужен онбординг и шаблоны, которые помогают начать без стресса.\n\n- Нет гибкости\n\nПриложения заставляют подстраиваться под жесткие шаблоны, а пользователи хотят задавать свои параметры. Значит, важно дать возможность настраивать единицы измерения и структуру цели под себя.\n\n- Эмоциональное давление\n\nИз-за стриков и отчетности у людей появляется чувство вины, если они не выполняют все запланированные действия. Интерфейс должен поддерживать, а не осуждать. Нужен мягкий UX-тон, текстовые мотивации, легкие альтернативы шагов.',

          images: []

        },

        {

          id: 'jtbd',

          title: t('caseStudies.keeplApp.sections.4.title'),

          content: '\n\n- Когда я ставлю большую цель, я хочу разбить ее на маленькие шаги, чтобы видеть понятный план и не терять мотивацию.\n- Когда я выполняю ежедневные действия, я хочу отмечать прогресс и видеть динамику визуально, чтобы чувствовать движение вперед и гордиться результатом.\n- Когда я устал или у меня плохое настроение, я хочу иметь более легкую альтернативу шага, чтобы не выпадать из процесса, сохранить ритм и не винить себя за пропуски.\n- Когда я закрываю мини-цель, я хочу прикрепить фото или заметку, чтобы наглядно видеть изменения и иметь возможность вернуться к ним позже.\n- Когда я фиксирую настроение после выполнения мини-цели, я хочу отслеживать его вместе с прогрессом, чтобы видеть связь между действиями и состоянием.\n- Когда я теряю интерес или силы, я хочу получать мягкие подбадривающие напоминания, чтобы поддерживать мотивацию и продолжать движение к цели.',

          images: []

        },

        {

          id: 'hypothesis',

          title: t('caseStudies.keeplApp.sections.5.title'),

          content: 'Если дать пользователю возможность кастомизировать цели под свой стиль и состояние, добавить эмоциональный фидбек (трекер настроения, фото, поддерживающие тексты) и легкую альтернативу, то это поможет ему дольше сохранять мотивацию и ощущение прогресса. Что, в свою очередь, приведет к росту retention, stickness (DAU) и снизит drop-off rate.',

          images: []

        },

        {

          id: 'user-flow',

          title: t('caseStudies.keeplApp.sections.6.title'),

          content: 'Три сценария пользователя: создание цели, отметка выполнения ежедневной мини-цели и замена мини-цели на более легкую альтернативу. Флоу простой и наглядный, чтобы показать, как пользователь взаимодействует с сервисом.\n\n### Сценарий 1: пользователь создает новую цель.\n\nФлоу создания цели сфокусирован на минимизации когнитивной нагрузки и борьбе с эффектом, когда "слишком много нужно сделать". Гибкая настройка единиц измерения и превентивное добавление легкой альтернативы в момент создания цели - ключевое продуктовое решение.\n\nМы даем пользователю полный контроль над своим планом Б, позволяя ему заранее установить реалистичный, упрощенный шаг на случай низкой мотивации. Пользователю не нужно импровизировать или пропускать шаг, что напрямую решает проблему "сложно начать и отсутствие гибкости".\n\n### Сценарий 2: пользователь отмечает ежедневный прогресс.\n\nЭтот флоу сознательно отказывается от агрессивного акцента на стриках, смещая фокус на сам прогресс. Ручной ввод результата заставляет пользователя осознанно оценить свое усилие. Визуализация прогресса, даже минимального, сразу после ввода дает позитивное подкрепление и борется с ощущением, что усилия тщетны.\n\nОпциональный трекинг настроения на оверлее интегрирован для сбора данных о корреляции между действием и эмоциональным состоянием: пользователь видит, что в прошлый раз, когда он выполнил задачу, он почувствовал себя лучше, а значит, имеет смысл сделать усилие и в этот раз.\n\n### Сценарий 3: Пользователь устал и не может выполнить цель полностью.\n\nЭтот сценарий - решение для инсайта "пользователь чувствует вину и бросает цель, когда не может ее выполнить полностью". Вместо пропуска задачи флоу предлагает активировать заранее определенный пользователем упрощенный путь. Это сохраняет привычку и снимает эмоциональное давление, используя решение, принятое самим пользователем в более мотивированном состоянии, что является критически важным для долгосрочного удержания.',

          images: ['/assets/keepl app/flow.png']

        },

        {

          id: 'metrics',

          title: t('caseStudies.keeplApp.sections.7.title'),

          content: '### Основная гипотеза\n\nЖесткие системы "выполнено/пропущено" создают давление на пользователя и чувство вины при пропуске. Внедрение кастомизации под текущее состояние пользователя (ручной ввод прогресса, легкая альтернатива и эмоциональный фидбек) позволит сохранить ощущение контроля и мотивацию на длинной дистанции.\n\n### Ключевые метрики\n\nДля оценки успеха мы будем отслеживать следующие показатели:\n\n- Retention через 30 дней - ключевой индикатор долгосрочной ценности. Мы ожидаем, что гибкость системы удержит пользователя в продукте дольше, чем классические аналоги\n- Stickiness (DAU/MAU) - частота возвратов. Покажет, стало ли приложение ежедневным помощником благодаря "легким альтернативам".\n- Feature Adoption Rate - процент использования функций "lighter alternative" и ручного инпута. Это подтвердит, что пользователи находят эти инструменты полезными в моменты усталости.\n- Completion Rate - процент целей, доведенных до конца. Позволит увидеть, помогает ли "легкая альтернатива" не бросать сложные задачи, а дожимать их до финала.',

          images: []

        },

        {

          id: 'ui',

          title: t('caseStudies.keeplApp.sections.8.title'),

          content: 'Дизайн Keepl отошел от агрессивных интерфейсов продуктивности и сфокусировался на создании поддерживающей, гибкой и осознанной среды для достижения целей. Я использовал мягкие скругления для снижения визуальной резкости, такую же мягкую тень для создания легкой, но быстрой узнаваемости интерактивных элементов, и спокойную цветовую палитру, не режущую глаз при ежедневном использовании приложения.\n\nМобильная адаптация реализована в виде PWA - пользователь сможет "сохранить" веб страницу на свой хоум скрин и использовать как обычное мобильное приложение. Для этого я переработал некоторые элементы интерфейса, чтобы приложение вело себя нативно: сайд бар сменился привычным таб баром, модалки стали bottom sheet.\n\n## Первый вход в приложение и создание цели',

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

          title: t('caseStudies.keeplApp.sections.9.title'),

          content: 'Спроектирован и реализован полный пользовательский опыт для трекера целей. Создано 15+ экранов с адаптивным дизайном, разработана дизайн-система из 50+ компонентов. Реализована сложная навигация с сохранением контекста пользователя. Идет работа над бэком.',

          images: []

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

          id: 'idea',

          title: 'Идея',

          content: 'После участия в хакатоне ко мне обратился разработчик нашей команды с предложением поработать над созданием MVP с последующим развитием в полноценный продукт. На мое быстрое согласие повлияли два фактора: во-первых, я уже успел погрузиться в предметную область, работая над КвикВак, а во-вторых, при поиске работы я неоднократно сталкивался с недостатками уже существующих сервисов - наших будущих конкурентов - поэтому идея сделать удобное и простое для пользователя приложение зажглась во мне моментально.',

          images: []

        },

        {

          id: 'process',

          title: 'Процесс',

          content: `- Формулировка идеи\nРазработчик описал проблематику рынка трудоустройства и предложил сделать MVP, ориентируясь на реальные боли пользователей.\n- Обмен опытом и гипотезами\nМы обсудили типичные сценарии поиска работы и взаимодействия с рекрутёрами, зафиксировали основные раздражающие факторы.\n- Первичный список функций\nБез привязки к конкретной структуре сформировал пул функций, которые должны были упростить поиск и сделать процесс прозрачнее для обеих сторон.\n- Исследование целевой аудитории\nСформулировал прототипы персон, составил JTBD и CJM.\n- Конкурентный анализ\nПроанализировал решения hh.ru, Indeed, LinkedIn и других - определил их UX-слабости и хорошие практики, которые можно адаптировать.\n- User Flow\nСоставил структуру пользовательских переходов для ключевых сценариев: поиск работы, отклик, статус отклика.\n- Информационная архитектура\nПостроил базовую архитектуру интерфейса, продумал навигацию, экраны и взаимосвязи между ними.\n- Wireframes\nСоздал черновые вайрфреймы.\n- Разработка дизайн-системы\nОпределил стилистику, типографику, цветовую палитру, состояний компонентов и паттернов взаимодействия.\n- Макеты и интерактивный прототип\nОтрисовал экраны в финальной визуализации, собрал кликабельный прототип.\n- Подготовка к передаче в разработку\nЗафиксировал базовые UI-гайды и логику компонентов. В рамках MVP команда ориентировалась на быструю сборку, поэтому документация была минимальной, но структурированной.`,

          images: []

        },

        {

          id: 'user-problem',

          title: 'Проблема пользователей',

          content: 'Соискатели сталкиваются с двумя трудностями, которые вызывают выгорание и потерю времени:\n- Низкая релевантность поиска: существующие фильтры слишком жесткие и не позволяют комбинировать форматы работы. Пользователь вынужден выбирать между удаленкой и офисом, что приводит к пропуску подходящих вакансий.\n- Отсутствие прозрачности: после отправки отклика соискатель с несколькими резюме не может понять, какое резюме было использовано, что вызывает путаницу и раздражение.',

          images: []

        },

        {

          id: 'hypothesis',

          title: 'Гипотеза',

          content: 'Если мы предложим гибкий фильтр, позволяющий комбинировать локальные и удаленные форматы работы, и добавим единый, прозрачный центр отслеживания статуса откликов с привязкой к конкретному резюме, то мы повысим конверсию в просмотр вакансий и снизим уровень тревожности пользователя.',

          images: []

        },

        {

          id: 'research-analysis',

          title: 'Исследование и анализ',

          content: 'Перед тем как начать работать над макетом, я разобрался, кто будет пользоваться сервисом и с какими задачами.\n\nДля этого я:\n- Сформировал образы соискателей и рекрутёров - что их раздражают, чего они боятся, что хотят упростить.\n- Выписал основные задачи, которые люди хотят решить с помощью сервиса.\n- Разложил путь пользователя по шагам - где он может застрять, где теряет мотивацию, где нужно подсветить следующую точку действия.\n\nТакже сделал разбор конкурентов - hh, LinkedIn, Glassdoor, Indeed, Ziprecruiter.',

          additionalContent: 'Отметил, что:\n- У hh нельзя понять, с какого резюме ты откликнулся.\n- У LinkedIn слишком сложная система: соц.сеть и поиск работы в одном флаконе, разобраться непросто.\n- Нигде не нашел гибкого фильтра в выборе формата работы: например, я хочу работать удаленно, но если компания находится в моем городе, то рассматриваю офис или гибрид. Таким образом, мне выдавались бы удаленные вакансии отовсюду и вакансии с любым форматом из моего города.',

          moreContent: 'Я посмотрел, что уже существует на рынке, и вспомнил то, чего мне не хватало как соискателю. Отслеживал фидбэк в тг-чатах и через личные разговоры. На этом этапе стало понятно, какие функции не вызывают интереса (например, фильтр вакансий по языкам программирования), а какие находят отклик.\n\nНа основе этого выделил набор функций, которые точно должны быть, и те, что казались хорошими на старте, но потом были отброшены.',

          images: ['/assets/hired app/Competitive analysis/веб-сайты.jpg', '/assets/hired app/Competitive analysis/приложения.jpg'],

          finalImages: ['/assets/hired app/image features.png'],

          additionalImages: ['/assets/hired app/hh vs hired 1.png', '/assets/hired app/hh vs hired 2.png']

        },

        {

          id: 'structure-design',

          title: 'Структура и проектирование',

          content: 'После исследований я собрал все в единую картину и начал проектирование продукта.',

          additionalContent: '## User Flow',

          moreContent: 'Построил флоу с учетом реальных сценариев. Учитывал технические ограничения и типовые паттерны поведения.',

          images: [],

          additionalImages: ['/assets/hired app/Frame_1984077494.png'],

          additionalContent2: '## Информационная архитектура\n\nОпределил, какие разделы будут, как они связаны и как логически выстроена навигация.',

          additionalContent3: '/assets/hired app/Frame_1984077494 1.png',

          additionalContent4: '## Вайрфреймы\n\nСделал черновую отрисовку ключевых экранов, чтобы оценить, как будет выглядеть интерфейс и где у пользователя могут возникнуть проблемы.',

          additionalContent5: '<div style="position: relative; width: 100%; padding-bottom: 56.25%;"><iframe frameborder="0" class="juxtapose" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://cdn.knightlab.com/libs/juxtapose/latest/embed/index.html?uid=e1bccb4c-cff0-11f0-ba1b-0e6f42328d7d" sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"></iframe></div>',

          finalImages: []

        },

        {

          id: 'final-mockups',

          title: 'Финальные макеты и прототип',

          content: 'Полный визуал кейса я оформил на behance, сюда вставлю только пару ключевых флоу.',

          additionalContent: '## Поиск вакансии и отклик\n\nПользователь быстро находит релевантные вакансии благодаря гибкому фильтру, который позволяет комбинировать локальные и удаленные форматы работы. Это устраняет необходимость просматривать сотни неподходящих предложений.',

          images: ['/assets/hired app/pics.png'],

          additionalContent2: 'После того, как пользователь нашел подходящую вакансию, он откликается на нее, предварительно выбрав резюме для отклика и по желанию прикрепив сопроводительное письмо. На странице вакансии отмечается, с каким резюме был отправлен отклик.',

          additionalImages: ['/assets/hired app/stack.png'],

          additionalContent3: '## Создание резюме',

          additionalContent4: 'Опция создания резюме появляется сразу после регистрации. Также пользователь может в любой момент добавить новое резюме через вкладку "профиль".',

          additionalImages2: ['/assets/hired app/profile.png', '/assets/hired app/profile2.png'],

          additionalContent5: 'Чтобы снизить барьер входа и мотивировать пользователя к отклику, процесс создания резюме был максимально упрощен. Мы разбили заполнение на 5 логических, пошаговых этапов, исключив избыточную информацию и фокусируясь только на том, что первостепенно важно.',

          additionalImages3: ['/assets/hired app/resume creating.png'],

          additionalContent6: '## Прототип',

          additionalContent7: '<div style="position: relative; width: 100%; max-width: 800px; padding-bottom: 56.25%;"><iframe frameborder="0" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://embed.figma.com/proto/J1DL62y8hKJYKosiXTzmDo/prototype?content-scaling=fixed&kind=proto&node-id=1-13507&page-id=0%3A1&scaling=scale-down&starting-point-node-id=1%3A12816&embed-host=share" allowfullscreen></iframe></div>'

        }

      ]

    },

    'keepl-landing': {

      title: 'Keepl Landing Page',

      subtitle: 'Landing Page',

      description: 'Keepl Landing Page — лендинг для экосистемы трекинга целей. Спроектировал структуру страницы, выстраивая повествование от «боли» пользователя к решению, чтобы удержать внимание и максимально раскрыть ценность продукта. Перенес визуальный концепт приложения в адаптивный веб-дизайн и реализовал фронтенд с помощью ИИ, обеспечивая точность и соответствие интерфейса оригиналу.',

      tags: ['Product Design', 'Web', 'Mobile', 'Frontend (React)'],

      heroImage: '/assets/landing.png',

      heroImages: [

        '/assets/landing.png',

        '/assets/keepl landing page/desktop.png',

        '/assets/keepl landing page/mobile.png'

      ],

      sections: [

        {

          id: 'problem',

          title: 'Проблема',

          content: '### Контекст\n\nKeepl - это MVP адаптивного трекера целей, который строится на гибкой методологии. Продукт нацелен на аудиторию, склонную к выгоранию от классических жестких таск-менеджеров.\n\n### Продуктовая проблема\n\nИз-за технических ограничений мы не смогли избежать обязательной регистрации аккаунта для использования приложения. В условиях перенасыщенного рынка трекеров привычек это создает две критические проблемы:\n\n- Высокий Friction: пользователь еще не доверяет продукту, но уже должен отдать свои данные.\n- Delayed TTV: момент осознания ценности продукта откладывается до завершения онбординга внутри приложения.\n\n### Бизнес-риск\n\nБез "прогрева" на лендинге большинство пользователей отвалятся на этапе авторизации, так и не узнав, чем keepl отличается от десятков аналогов.',

          images: []

        },

        {

          id: 'task-hypothesis',

          title: 'Задача и гипотеза',

          content: 'Как заставить пользователя пройти через "стену" регистрации, когда он еще ничего не знает о продукте?\n\n### Гипотеза\n\nЕсли мы вынесем демонстрацию ценности (aha-moment) на лендинг, то:\n\n- Конверсия в регистрацию вырастет, так как юзер будет мотивирован конкретным профитом, а не просто любопытством.\n- Activation Rate внутри приложения увеличится, так как пользователь придет уже "подготовленным" и будет знать, как работают ключевые фичи.',

          images: []

        },

        {

          id: 'solution',

          title: 'Решение',

          content: 'Спроектировать лендинг, который работает как инструмент пре-активации: снимает страх перед обязательной регистрацией, обучая пользователя методологии Keepl и демонстрируя ценность продукта еще до создания аккаунта.',

          images: []

        },

        {

          id: 'implementation',

          title: 'Реализация',

          content: '## Hero-section & Philosophy\n\nПоскольку продукт требует регистрации, нужно было зацепить внимание пользователя не функционалом, а общностью ценностей.\n\nТекст о неидеальных днях бьет в боль целевой аудитории и объясняет зачем им нужен еще один трекер.',

          images: ['/assets/keepl landing page/Hero-section & Philosophy.png'],

          imageFullWidth: true,

          additionalContent: '## What can you do with Keepl?\n\nБлок служит мостом между философией и интерфейсом. Я выделил конкретные действия, чтобы пользователь сразу "примерил" продукт на свой образ жизни.\n\nЭто снижает когнитивную нагрузку и готовит юзера к онбордингу внутри приложения.',

          additionalImages: ['/assets/keepl landing page/What can you do with Keepl.png'],

          moreContent: '## Features\n\nВместо простого перечисления функций, каждый блок закрывает конкретный страх пользователя: сложность старта, риск выгорания, непонимание прогресса и отсутствие эмоциональной связи с результатом.',

          finalImages: ['/assets/keepl landing page/Features.png'],

          lastContent: 'Для того, чтобы пользователь смог "пощупать" продукт до регистрации, я добавил интерактивности элементам интерфейса.\n\nНапример, принцип работы легкой альтернативы юзер сможет понять, нажав на кнопку в карточке:',

          imagePairs: [

            {

              desktop: '/assets/keepl landing page/card 1.png',

              mobile: '/assets/keepl landing page/card 1.png'

            },

            {

              desktop: '/assets/keepl landing page/card 2.png',

              mobile: '/assets/keepl landing page/card 2.png'

            }

          ],

          finalSection: '## Финальный CTA и футер',

          ctaImage: '/assets/keepl landing page/CTA and footer.png'

        },

        {

          id: 'results',

          title: 'Результат',

          content: 'На текущем этапе спроектирована целостная точка входа, которая транслирует методологию Keepl и подготавливает пользователя к регистрации.',

          images: []

        }

      ]

    },

    'add-transition': {

      title: 'Проектирование интерфейса добавления операций',

      subtitle: 'Interface Design',

      description: 'Проектирование интерфейса добавления операций для финансового приложения. Разработка интуитивного и удобного пользовательского опыта для ввода финансовых транзакций.',

      tags: ['UI/UX Design', 'Interface Design', 'Financial App'],

      heroImage: '/assets/New folder/hero.png',

      heroImages: [

        '/assets/New folder/hero.png'

      ],

      sections: [

        {

          id: 'goal-context',

          title: 'Цель и контекст',

          content: '### Задача\n\nРазработка интерфейса экрана добавления новой операции для мобильного приложения по учету личных финансов.\n\n### Целевая аудитория\n\nМолодые люди (25-35 лет), которые хотят контролировать расходы и доходы.\n\n### Главная цель UX\n\nСоздание максимально быстрого и удобного флоу ввода для ежедневного использования, минимизация когнитивной нагрузки и количества тапов.',

          images: []

        },

        {

          id: 'user-problem',

          title: 'Основная проблема пользователей',

          content: 'Анализ решений конкурентов показал, что основные проблемы похожих приложений это разрывы в флоу и низкий приоритет скорости:\n\n- Пользователь вынужден проходить 3-4 шага (ввод суммы, выбор типа, переход к категориям, выбор категории, сохранение) для фиксации простой траты\n- Опциональные поля создают визуальный шум и перегружают интерфейс\n- Инпуты одинакового визуального веса, из-за чего теряется фокус на ключевом - ввод суммы\n- Клавиатура часто перекрывает важные элементы, а кнопка "сохранить" прячется за скроллом',

          images: []

        },

        {

          id: 'competitor-solutions',

          title: 'Решения конкурентов',

          content: '### Coinkeeper\n\nОчень перегружено, глаза разбегаются, что совсем не экономит время при выполнении задачи. Приходится вчитываться в текст, чтобы понять, что я вообще вижу.\n\n<img src="/assets/New folder/Competitive analysis/coinkeeper.png">\n\n### Money Manager\n\nЭкран выглядит перегруженным, теги, комментарий, фото занимают много место, являясь второстепенными опциями.\n\n<img src="/assets/New folder/Competitive analysis/money manager.png">\n\n### Incomes\n\nХод с кастомной клавиатурой действительно экономит время пользователя - не приходится жать на инпут и ждать выдвижения системной клавиатуры. Но в остальном...\n\n<img src="/assets/New folder/Competitive analysis/incomes.png">\n\n### ZenMoney\n\nЛишний шаг при переходе на экран создания транзакции: мне сразу предлагают выбрать тип операции, но чаще всего пользователь записывает расходы. На мой взгляд, по умолчанию должен открываться "расход", при необходимости уже на самом экране юзер переключится на другой тип.\n\nПоле для суммы не является центральным элементом и теряется среди других инпутов. приходится "сканировать" форму, а не сразу вводить сумму.\n\nZENMONEY_IMAGES_START\n\n### Monefy\n\nНе нравится флоу с кнопкой "выбрать категорию". Пользователь не видит категории сразу, не может быстро нажать на нужную, сначала он обязан ввести сумму и только потом ему покажут категории.\n\nMONEFY_IMAGES_START\n\n### Spendee\n\nРазработчики постарались ускорить флоу тем, что при заходе на экран сразу предлагают выбрать категорию, после этого появляется клавиатура для ввода суммы, а потом уже юзер может заполнить опциональные поля или завершить задачу.\n\nЯ бы сначала сделал акцент на сумме, а потом уже на категории, потому что сумма это основа. Еще для каждой категории у них свой цвет, меняющий весь цвет интерфейса на экране. для шоппинга розовый, для культуры - оранжевый. Бьет по глазам и сбивает с толку (я не сразу понял, что эти скрины относятся к одному приложению, когда сортировал всех конкурентов)\n\nSPENDEE_IMAGES_START\n\n### Money Mgr\n\nНет визуальной иерархии, категории требуют bottom sheet для показа. Приложение заставляет меня выбрать account, без этого сохранить не дает...\n\nMONEYMGR_IMAGES_START',

          images: []

        },

        {

          id: 'ux-solutions',

          title: 'UX-решения',

          content: '- Главный фокус на сумме: крупный доминирующий инпут, сразу получает фокус и вызывает клавиатуру\n\n- Тип операции по умолчанию - расход: 80–90% операций у пользователей составляют траты, поэтому дефолт снижает один шаг\n\n- Быстрый выбор категории: отображается 4–5 самых частых категорий (на основе истории или времени дня). Полный список можно открыть тапом\n\n- Кнопка "сохранить" всегда в зоне видимости: становится активной после ввода суммы и выбора категории',

          images: []

        },

        {

          id: 'flow',

          title: 'Флоу',

          content: 'Сценарий для быстрой фиксации расхода: \n\n1. Юзер нажимает "добавить операцию" (на главном экране, например)\n2. Переходит на экран. Фокус сразу на поле для суммы, открывается клавиатура\n3. Пользователь вводит сумму, тип операции по умолчанию "расход"\n4. Выбирает категорию одним тапом из 4-5 предложенных иконок\n5. Нажимает "сохранить"\n\nОбщее количество действий  2-3 тапа, все происходит на одном экране без переходов.',

          images: []

        },

        {

          id: 'layout',

          title: 'Макет',

          content: 'LAYOUT_START\n\nLAYOUT_SECOND\n\nLAYOUT_IMAGES',

          images: []

        },

        {

          id: 'result',

          title: 'Итог',

          content: '- Чистая визуальная иерархия: я выделил два главных действия - ввод суммы и выбор категории. Это позволяет пользователю совершить операцию за минимальное количество времени.\n\n- Снижение когнитивной нагрузки: все второстепенные опции (дата, комментарий) вынесены в лаконичный список.\n\n- Скорость: горизонтальная сетка категорий и оптимизированный список позволяют добавить операцию "на ходу" одной рукой, что является критическим сценарием для финансового трекера.',

          images: []

        }

      ]

    }

  }

  // Helper function to get section title from LanguageContext
  const getSectionTitle = (sectionId) => {
    try {
      const sections = caseStudies['keepl-app'].sections
      const sectionIndex = sections.findIndex(s => s.id === sectionId)
      if (sectionIndex !== -1) {
        const sectionNum = sectionIndex
        return t(`caseStudies.keeplApp.sections.${sectionNum}.title`)
      }
    } catch (e) {
      console.error('Error getting section title:', e)
    }
    return sectionId
  }

  // Helper function to get section content from LanguageContext
  const getSectionContent = (sectionId) => {
    try {
      const sections = caseStudies['keepl-app'].sections
      const sectionIndex = sections.findIndex(s => s.id === sectionId)
      if (sectionIndex !== -1) {
        const sectionNum = sectionIndex
        return t(`caseStudies.keeplApp.sections.${sectionNum}.content`)
      }
    } catch (e) {
      console.error('Error getting section content:', e)
    }
    return ''
  }

  const currentCase = caseStudies[slug]



  // Add custom CSS for competitor images

  useEffect(() => {

    const style = document.createElement('style');

    style.textContent = `

      img[src*="coinkeeper.png"] {

        max-width: 90% !important;

        height: 400px !important;

        width: auto !important;

        margin: 0 auto !important;

        display: block !important;

      }

      img[src*="money manager.png"] {

        max-width: 90% !important;

        height: 400px !important;

        width: auto !important;

        margin: 0 auto !important;

        display: block !important;

      }

      img[src*="incomes.png"] {

        max-width: 90% !important;

        height: 400px !important;

        width: auto !important;

        margin: 0 auto !important;

        display: block !important;

      }

      img[src*="zenmoney 1"], img[src*="zenmoney 2"], img[src*="zenmoney 3"] {

        max-width: 40% !important;

        height: 320px !important;

        width: auto !important;

        object-fit: contain !important;

      }

      img[src*="monefy 1"], img[src*="monefy 2"], img[src*="monefy 3"] {

        max-width: 40% !important;

        height: 320px !important;

        width: auto !important;

        object-fit: contain !important;

      }

      img[src*="spendee 1"], img[src*="spendee 2"], img[src*="spendee 3"] {

        max-width: 40% !important;

        height: 320px !important;

        width: auto !important;

        object-fit: contain !important;

      }

      img[src*="money mgr 1"], img[src*="money mgr 2"], img[src*="money mgr 3"] {

        max-width: 40% !important;

        height: 320px !important;

        width: auto !important;

        object-fit: contain !important;

      }

    `;

    document.head.appendChild(style);



    return () => {

      document.head.removeChild(style);

    };

  }, [])



  useEffect(() => {

    const handleScroll = () => {

      if (contentRef.current) {

        const sections = contentRef.current.querySelectorAll('[data-section]')

        const scrollPosition = window.scrollY + 100



        console.log('📜 Scroll position:', scrollPosition)

        console.log('📜 Found sections:', sections.length)



        let currentActiveSection = null

        

        // Проверяем секции в обратном порядке (снизу вверх)

        for (let i = sections.length - 1; i >= 0; i--) {

          const section = sections[i]

          const sectionId = section.dataset.section

          const isToggleable = toggleableSections.includes(sectionId)

          const isExpanded = expandedSections[sectionId] || !isToggleable

          

          let sectionTop = section.offsetTop

          

          // For collapsed sections, find first visible element inside

          if (!isExpanded) {

            const header = section.querySelector('h2, h3')

            if (header) {

              sectionTop = header.offsetTop + section.offsetTop

            }

          }

          

          console.log(`📜 Section "${sectionId}": top=${sectionTop}, expanded=${isExpanded}`)

          

          if (scrollPosition >= sectionTop) {

            currentActiveSection = sectionId

            console.log(`✅ Setting active section to: ${sectionId}`)

            break // Нашли подходящую секцию, выходим из цикла

          }

        }

        

        if (currentActiveSection) {

          setActiveSection(currentActiveSection)

        }

      }

    }



    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)

  }, [expandedSections, toggleableSections])



  const scrollToSection = (sectionId) => {

    console.log('🎯 scrollToSection called with:', sectionId)

    const element = document.getElementById(sectionId)

    console.log('📍 Element found:', element)

    

    if (element) {

      console.log('📏 Element position:', element.offsetTop)

      console.log('📏 Element height:', element.offsetHeight)

      console.log('📏 Current scroll position:', window.scrollY)

      

      try {

        element.scrollIntoView({ behavior: 'smooth' })

        console.log('✅ scrollIntoView executed successfully')

      } catch (error) {

        console.error('❌ scrollIntoView failed:', error)

      }

    } else {

      console.error('❌ Element not found with ID:', sectionId)

    }

  }



  // Scroll to top function

  const scrollToTop = () => {

    window.scrollTo({

      top: 0,

      behavior: 'smooth'

    })

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



          {/* Behance button for hired-app case */}

          {slug === 'hired-app' && (

            <div className="flex justify-center mt-8">

              <a

                href="https://www.behance.net/gallery/228101995/Hired-Job-search-app"

                target="_blank"

                rel="noopener noreferrer"

                className="inline-flex items-center px-6 py-3 bg-cyan-500 text-gray-900 font-semibold rounded-full hover:bg-cyan-400 transition-colors duration-300"

              >

                Больше визуала на Behance

              </a>

            </div>

          )}

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



      {/* Scroll to top button */}

      <button

        onClick={scrollToTop}

        className="fixed bottom-8 right-8 z-40 p-3 bg-cyan-500/20 backdrop-blur-xl rounded-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 hover:text-cyan-300 hover:border-cyan-500/50 transition-all duration-300 group"

        aria-label="Наверх"

      >

        <svg 

          className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" 

          fill="none" 

          stroke="currentColor" 

          viewBox="0 0 24 24"

        >

          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />

        </svg>

      </button>

    </div>

  )

}



export default CaseStudy

