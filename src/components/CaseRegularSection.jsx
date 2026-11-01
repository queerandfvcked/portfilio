import React from 'react'

import { ZhabkaMascotShowcase } from './ZhabkaMascotFrame'
import CaseFigure from './case-blocks/CaseFigure'

export function RegularSection({ section, t, formatContent, openImageModal, embedded = false, hideHeading = false, language }) {

    const Wrapper = embedded ? 'div' : 'section'

    // Caption for the clickable images: titles carry markdown emphasis (*word*)
    // and some sections hold more than one image, so number them in that case.
    const images = section.images || []
    const figureCaption = String(section.title || '').replace(/\*/g, '').trim()

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

            {images.map((image, index) => (

              <CaseFigure

                key={index}

                src={image}

                alt={images.length > 1 ? `${figureCaption} ${index + 1}` : figureCaption}

                onClick={openImageModal}

                language={language}

              />

            ))}

          </div>

        )}

      </Wrapper>

    )

}
