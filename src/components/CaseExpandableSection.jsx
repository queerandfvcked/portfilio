import React from 'react'

export function ExpandableSection({ section, isActive, slug, t, formatContent, openImageModal, expandedSections, toggleSection }) {

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

          <h2 className="font-display heading-accent text-3xl font-bold text-gray-200 mb-4 group-hover:text-accent-400 transition-colors">

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

            <svg className="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">

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
