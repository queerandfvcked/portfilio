import React from 'react'

import { ZhabkaMascotShowcase } from './ZhabkaMascotFrame'

export function RegularSection({ section, t, formatContent, openImageModal, embedded = false, hideHeading = false }) {

    const Wrapper = embedded ? 'div' : 'section'

    return (

      <Wrapper

        key={section.id}

        {...(!embedded ? { id: section.id, 'data-section': section.id } : {})}

        className={`scroll-mt-16 mb-16`}

      >

        {!hideHeading && <h2 className="font-heading heading-accent text-3xl md:text-4xl font-bold text-gray-200 mb-8">

          {section.title}

        </h2>}

        <div className="prose prose-lg text-secondary max-w-none mb-8">

          <div className="text-lg leading-relaxed">

            {formatContent(section.content)}

          </div>

        </div>

        {/* The video row is limited by the same `.prose` wrapper as the ::: blocks,
            so it lines up with rows/cards/stage instead of the full case column. */}
        {section.id === 'motion-states' && (
          <div className="prose">
            <ZhabkaMascotShowcase label={t('casePage.zhabkaAnimations')} />
          </div>
        )}

        {section.images && section.images.length > 0 && (

          <div className="space-y-8 mb-8">

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

      </Wrapper>

    )

}
