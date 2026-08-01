import { useState, useEffect, useRef } from 'react'

import { useParams, useNavigate } from 'react-router-dom'

import { useTranslation } from '../contexts/LanguageContext'

import ImageSlider from './ImageSlider'

import CaseNavigation from './CaseNavigation'

import { getCaseStudies } from './CaseStudyData'

import { formatContent as formatContentRaw } from './formatCaseContent.jsx'

import { ExpandableSection } from './CaseExpandableSection'

import { RegularSection } from './CaseRegularSection'


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



  const formatContent = (content) => formatContentRaw(content, openImageModal, language)



  // Clean up body overflow on unmount

  useEffect(() => {

    return () => {

      document.body.style.overflow = 'auto'

    }

  }, [])



  // Sections that should have toggle functionality

  const toggleableSections = ['overview', 'product-discovery', 'jtbd', 'user-flow', 'results', 'goal-context', 'competitor-solutions', 'idea', 'process']


  const caseStudies = getCaseStudies(t)


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

    if (!contentRef.current) return



    const sections = contentRef.current.querySelectorAll('[data-section]')



    const observer = new IntersectionObserver(

      (entries) => {

        const visible = entries

          .filter((entry) => entry.isIntersecting)

          .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top)



        if (visible.length > 0) {

          setActiveSection(visible[0].target.dataset.section)

        }

      },

      { rootMargin: '-100px 0px -70% 0px', threshold: 0 }

    )



    sections.forEach((section) => observer.observe(section))



    return () => observer.disconnect()



  }, [])



  const scrollToSection = (sectionId) => {

    const element = document.getElementById(sectionId)



    if (element) {

      element.scrollIntoView({ behavior: 'smooth' })

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

                {t('common.behanceButton')}

              </a>

            </div>

          )}

          {/* Live Landing button for keepl-landing case */}

          {slug === 'keepl-landing' && (

            <div className="flex justify-center mt-8">

              <a

                href="https://keepl.vercel.app/"

                target="_blank"

                rel="noopener noreferrer"

                className="inline-flex items-center px-6 py-3 bg-cyan-500 text-gray-900 font-semibold rounded-full hover:bg-cyan-400 transition-colors duration-300"

              >

                Live Landing

              </a>

            </div>

          )}

          {/* Pitch Deck button for keepl-app case */}

          {slug === 'keepl-app' && (

            <div className="flex justify-center mt-8">

              <a

                href={language === 'ru' ? '/assets/pitch_deck_ru.pdf' : '/assets/pitch_deck_en.pdf'}

                target="_blank"

                rel="noopener noreferrer"

                className="inline-flex items-center px-6 py-3 bg-cyan-500 text-gray-900 font-semibold rounded-full hover:bg-cyan-400 transition-colors duration-300"

              >

                {t('common.pitchDeck')}

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

                    slug={slug}

                    t={t}

                    formatContent={formatContent}

                    openImageModal={openImageModal}

                    expandedSections={expandedSections}

                    toggleSection={toggleSection}

                  />

                )

              } else {

                return (

                  <RegularSection 

                    key={section.id}

                    section={section}

                    isActive={isActive}

                    slug={slug}

                    t={t}

                    language={language}

                    formatContent={formatContent}

                    openImageModal={openImageModal}

                    currentSlide={currentSlide}

                    setCurrentSlide={setCurrentSlide}

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

            className="fixed inset-0 z-50 flex bg-black/90 p-4 animate-fade-in overflow-auto"

            onClick={closeImageModal}

          >

            <div className="relative max-w-6xl m-auto animate-scale-in">

              <div className={`relative ${imageScale > 1 ? '' : 'overflow-hidden max-h-[90vh]'}`}>

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
            </div>

            {window.innerWidth > 768 && (

              <p className="fixed bottom-4 right-8 text-gray-400 text-sm pointer-events-none">{t('common.zoomHint')}</p>

            )}

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
