import React from 'react'

import { CaseSubAccordion } from './CaseSubAccordion'

export function RegularSection({ section, isActive, slug, t, language, formatContent, openImageModal, currentSlide, setCurrentSlide }) {

    return (

      <section 

        key={section.id}

        id={section.id}

        data-section={section.id}

        className={`scroll-mt-16 mb-16`}

      >

        <h2 className="font-display heading-accent text-3xl md:text-4xl font-bold text-gray-200 mb-8">

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

        

        <div className="prose prose-lg text-secondary max-w-none mb-8">

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



        {/* Sub-accordion after main content */}

        {section.items && section.items.length > 0 && (

          <div className="mt-10">

            {section.accordionTitle && (

              <h3 className="font-display text-xl font-bold text-accent-300 mt-6 mb-3">

                {section.accordionTitle}

              </h3>

            )}

            <CaseSubAccordion items={section.items} formatContent={formatContent} />

          </div>

        )}



        {/* Special rendering for final-mockups */}

        {section.id === 'final-mockups' ? (

          <div>

            <div className="prose prose-lg text-secondary max-w-none mb-8 mt-8">

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

            

            <div className="prose prose-lg text-secondary max-w-none mb-8 mt-12">

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

              <div className="prose prose-lg text-secondary max-w-none mb-8 mt-12">

                <div className="text-lg leading-relaxed">

                  {formatContent(section.additionalContent3)}

                </div>

              </div>

            )}

            

            {/* Additional content 4 for final-mockups */}

            {section.additionalContent4 && (

              <div className="prose prose-lg text-secondary max-w-none mb-8 mt-4">

                <div className="text-lg leading-relaxed">

                  {formatContent(section.additionalContent4)}

                </div>

              </div>

            )}

            

            {/* Additional images 2 for final-mockups */}

            {section.additionalImages2 && section.additionalImages2.length > 0 && (

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

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

              <div className="prose prose-lg text-secondary max-w-none mb-8 mt-12">

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

              <div className="prose prose-lg text-secondary max-w-none mb-8 mt-12">

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

                    <p className="text-center text-secondary text-sm mt-2">{index === 0 ? t('caseStudies.hiredApp.sections.4.imageCaption1') : t('caseStudies.hiredApp.sections.4.imageCaption2')}</p>

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

          <div className="prose prose-lg text-secondary max-w-none mb-8 mt-12">

            <div className="text-lg leading-relaxed">

              {formatContent(section.additionalContent)}

            </div>

          </div>

        )}



        {/* More content for structure-design before additional images */}

        {section.moreContent && section.id === 'structure-design' && (

          <div className={`prose prose-lg text-secondary max-w-none mb-8 mt-4`}>

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

                    <p className="text-center text-secondary text-sm mt-2">{index === 0 ? 'HH' : 'Hired'}</p>

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

          <div className={`prose prose-lg text-secondary max-w-none mb-8 ${section.id === 'structure-design' ? 'mt-4' : 'mt-12'}`}>

            <div className="text-lg leading-relaxed">

              {formatContent(section.moreContent)}

            </div>

          </div>

        )}



        {/* Additional content 2 after more content */}

        {section.additionalContent2 && section.id !== 'final-mockups' && (

          <div className="prose prose-lg text-secondary max-w-none mb-8 mt-12">

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

          <div className="prose prose-lg text-secondary max-w-none mb-8 mt-12">

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

                    <p className="text-left text-secondary text-sm mt-2">{t('caseStudies.hiredApp.sections.4.abandonedFeatures').split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < t('caseStudies.hiredApp.sections.4.abandonedFeatures').split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}</p>

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

          <div className="prose prose-lg text-secondary max-w-none mb-8">

            <div className="text-lg leading-relaxed">

              {formatContent(section.lastContent)}

            </div>

          </div>

        )}



        {/* Image pairs for card demonstrations (non-UI sections) */}

        {section.imagePairs && section.imagePairs.length > 0 && section.id !== 'ui' && (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

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

          <div className="prose prose-lg text-secondary max-w-none mb-8">

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

          <div className="prose prose-lg text-secondary max-w-none mb-8">

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

          <div className="prose prose-lg text-secondary max-w-none mb-8">

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

                      <p className="text-center text-secondary text-sm mt-2">Desktop</p>

                    </div>

                    <div className="cursor-pointer group" onClick={() => openImageModal(pair.mobile)}>

                      <img

                        src={pair.mobile}

                        alt={`${section.title} - Mobile ${pairIndex + 1}`}

                        className="w-full h-80 object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                      />

                      <p className="text-center text-secondary text-sm mt-2">Mobile</p>

                    </div>

                  </React.Fragment>

                ))}

              </div>

            )}



            {/* Additional text after onboarding slider for UI section */}

            <div className="prose prose-lg text-secondary max-w-none mt-8">

              <div className="text-lg leading-relaxed">

                <p className="text-secondary mb-3">

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

                        index === currentSlide ? 'bg-accent-400' : 'bg-gray-600'

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

            <div className="prose prose-lg text-secondary max-w-none mt-8">

              <div className="text-lg leading-relaxed">

                <p className="text-secondary mb-3">

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

                <p className="text-center text-secondary text-sm mt-2">Home</p>

              </div>

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/create_new_goal.png')}>

                <img

                  src="/assets/keepl app/create_new_goal.png"

                  alt="Create new goal"

                  className="w-full h-80 object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-secondary text-sm mt-2">Create Goal</p>

              </div>

            </div>



            {/* Additional text after Home images for UI section */}

            <div className="prose prose-lg text-secondary max-w-none mt-8">

              <div className="text-lg leading-relaxed">

                <p className="text-secondary mb-3">

                  {language === 'en' ? "Unlike most similar services, Keepl allows users to customize goals: choose custom units of measurement, group sub-goals, and add easier alternatives." : 'В отличие от большинства аналогичных сервисов, Keepl позволяет пользователю кастомизировать цель: самостоятельно выбирать единицы измерения задачи, группировать подцели и добавлять легкую альтернативу.'}

                </p>

                <p className="text-secondary mb-3">

                  {language === 'en' ? "To prevent high flexibility from impacting Activation Rate, I used a progressive disclosure pattern: complex settings remain optional, keeping cognitive load low for new users." : 'Чтобы высокая гибкость не ударила по Activation Rate, я использовал паттерн постепенного раскрытия: сложные настройки остаются опциональными, сохраняя когнитивную нагрузку на низком уровне для новых юзеров.'}

                </p>

                <p className="text-secondary mb-3">

                  {language === 'en' ? 'Depending on the nature of the goal, the user can make it one-time or long-term, add image uploads, mood tracking. Breaking the goal into sub-goals and manual input of results allows more accurate tracking of metrics and progress visibility.' : 'В зависимости от характера цели пользователь может сделать ее одноразовой или долгосрочной, включить добавление изображений, трекер настроения. Разбивание цели на сабголы и ручной ввод результата позволяет точнее отслеживать метрику и видеть прогресс.'}

                </p>

                <p className="text-secondary mb-3">

                  {language === 'en' ? 'This is key to user motivation. Even partial task completion is reflected in the graphs, preventing churn due to guilt. The service doesn\'t "force", but motivates through visualization of any effort invested.' : 'Это ключевое решение для мотивации пользователя. Даже частичное выполнение задачи отражается на графиках, что предотвращает отток из-за чувства вины. Сервис не "принуждает", а мотивирует через визуализацию любого вложенного усилия.'}

                </p>

                <p className="text-secondary mb-3">

                  {language === 'en' ? 'Settings are optional; if desired, Keepl can be used like a regular habit tracker. For example, a goal can be made one-time, in which case sub-goals don\'t update daily, and after completion the goal is marked finished.' : 'Настройки опциональны, при желании keepl может использоваться так же, как и обыкновенный трекер привычек. Например, цель можно сделать одноразовой - в этом случае сабголы не обновляются ежедневно, а после их выполнения цель отмечается завершенной.'}

                </p>

              </div>

            </div>



            {/* Goal creation images for UI section */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

                  <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/create_new_goal 1.png')}>

                    <img

                      src="/assets/keepl app/create_new_goal 1.png"

                      alt="Create goal mobile"

                      className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                    />

                    <p className="text-center text-secondary text-sm mt-2">Desktop</p>

                  </div>

                  <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/create_goal.png')}>

                    <img

                      src="/assets/keepl app/create_goal.png"

                      alt="Create goal desktop"

                      className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                    />

                    <p className="text-center text-secondary text-sm mt-2">Mobile</p>

                  </div>

                </div>



            {/* Additional text after goal creation images for UI section */}

            <div className="prose prose-lg text-secondary max-w-none mt-8">

              <div className="text-lg leading-relaxed">

                <p className="text-secondary mb-3">

                  {language === 'en' ? "After saving a goal, the user lands on the newly created goal screen. A circular progress bar for the current day provides instant feedback, while a motivational card drives emotional engagement. This helps users immediately feel the product's value and increases the likelihood they'll return tomorrow to see how these numbers change." : 'После сохранения цели пользователь попадает на экран только что созданной цели. Круглый прогресс-бар за текущий день создает мгновенную обратную связь, а карточка-мотиватор работает на эмоциональную вовлеченность. Это помогает пользователю сразу почувствовать ценность продукта и повышает вероятность того, что он вернется завтра, чтобы увидеть, как изменятся эти цифры.'}

                </p>

              </div>

            </div>



            {/* Goal detail screen images for UI section */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/goal screen desktop.png')}>

                <img

                  src="/assets/keepl app/goal screen desktop.png"

                  alt="Goal screen desktop"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-secondary text-sm mt-2">Desktop</p>

              </div>

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/goal screen mobile.png')}>

                <img

                  src="/assets/keepl app/goal screen mobile.png"

                  alt="Goal screen mobile"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-secondary text-sm mt-2">Mobile</p>

              </div>

            </div>



            {/* H2 heading for daily progress section */}

            <h2 className="font-display heading-accent text-2xl font-bold text-accent-200 mt-12 mb-6">{language === 'en' ? 'Daily Progress Tracking and Emotional Feedback' : 'Отметка ежедневного прогресса и эмоциональный фидбек'}</h2>



            {/* Additional text about daily progress tracking */}

            <div className="prose prose-lg text-secondary max-w-none mt-8">

              <div className="text-lg leading-relaxed">

                <p className="text-secondary mb-3">

                  {language === 'en' ? "To maintain motivation and create a sense of progress, even when a goal isn't fully completed, I added the ability to manually input results. This allows users to capture even partial success, directly impacting consistency and supporting the North Star Metric—weekly active goal days. Instant visualization on the progress bar provides a dopamine response and reinforces daily usage patterns." : 'Чтобы сохранить мотивацию и создать ощущение движения, даже если цель выполнена не полностью, я добавил возможность ввода результата вручную. Это позволяет фиксировать даже частичный успех, напрямую влияя на регулярность и поддерживая North Star Metric - weekly active goal days. Мгновенная визуализация на прогресс-баре дает дофаминовый отклик и закрепляет паттерн ежедневного использования.'}

                </p>

                <p className="text-secondary mb-3">

                  {language === 'en' ? "Integrating an optional mood tracker allows collecting qualitative data for deep reflection. In the future, this helps users see the correlation between their habits and emotional state." : 'Интеграция опционального трекера настроения позволяет собирать качественные данные для глубокой рефлексии. В будущем это помогает пользователю увидеть корреляцию между своими привычками и эмоциональным состоянием.'}

                </p>

              </div>

            </div>



            {/* Modal and overlay images for UI section */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

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

            <div className="prose prose-lg text-secondary max-w-none mt-8">

              <div className="text-lg leading-relaxed">

                <p className="text-secondary mb-3">

                  {language === 'en' ? "Users can also mark tasks as completed from the Home screen. Here they see a quick summary of today's progress, how many tasks they've completed for each goal, their average mood, and helpful tips. Below are the sub-goal cards themselves, which can be marked complete at once or progress can be updated gradually using manual input." : 'Пользователь также может отмечать таски выполненными на главном экране Home. Там же заодно он увидит быструю сводку по сегодняшнему прогрессу, сколько задач он выполнил по каждой из целей, свой средний муд и совет-подсказку. Ниже располагаются сами карточки сабголов, которые можно отметить выполненными сразу или же дополнять прогресс постепенно, используя мануальный ввод.'}

                </p>

              </div>

            </div>



            {/* Home screen task management images for UI section */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/home.png')}>

                <img

                  src="/assets/keepl app/home.png"

                  alt="Home screen"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-secondary text-sm mt-2">Desktop</p>

              </div>

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/home mobile.png')}>

                <img

                  src="/assets/keepl app/home mobile.png"

                  alt="Home screen mobile"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-secondary text-sm mt-2">Mobile</p>

              </div>

            </div>



            {/* H2 heading for analytics section */}

            <h2 className="font-display heading-accent text-2xl font-bold text-accent-200 mt-12 mb-6">{language === 'en' ? 'Analysis and Progress Visualization' : 'Анализ и визуализация прогресса'}</h2>



            {/* Additional text about analytics and progress visualization */}

            <div className="prose prose-lg text-secondary max-w-none mt-8">

              <div className="text-lg leading-relaxed">

                <p className="text-secondary mb-3">

                  {language === 'en' ? "To combat burnout and increase self-awareness, Keepl provides deep analytics. Users can track goal progress in 'Week' and 'Month' tabs to see trends and maintain focus." : 'Для борьбы с выгоранием и повышения осознанности Keepl предоставляет глубокую аналитику. Пользователь может отслеживать прогресс по конкретной цели во вкладках "Неделя" и "Месяц", чтобы видеть динамику и не терять фокус.'}

                </p>

              </div>

            </div>



            {/* Goal 2 images for UI section */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/goal 2 desktop.png')}>

                <img

                  src="/assets/keepl app/goal 2 desktop.png"

                  alt="Goal 2 desktop"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-secondary text-sm mt-2">Desktop</p>

              </div>

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/goal 2 mobile.png')}>

                <img

                  src="/assets/keepl app/goal 2 mobile.png"

                  alt="Goal 2 mobile"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-secondary text-sm mt-2">Mobile</p>

              </div>

            </div>



            {/* Additional text about calendar navigation */}

            <div className="prose prose-lg text-secondary max-w-none mt-8">

              <div className="text-lg leading-relaxed">

                <p className="text-secondary mb-3">

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

            <div className="prose prose-lg text-secondary max-w-none mt-8">

              <div className="text-lg leading-relaxed">

                <p className="text-secondary mb-3">

                  {language === 'en' ? "The overall Progress page provides a summary assessment of activity across all goals. Moving from detailed views to summaries helps users see the scale of their work, directly impacting User Self-Efficacy." : 'Общая страница Progress дает суммарную оценку активности по всем целям. Переход от детализации к обобщению помогает пользователю увидеть масштаб проделанной работы, что напрямую влияет на User Self-Efficacy.'}

                </p>

              </div>

            </div>



            {/* Progress images for UI section */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/progress desktop.png')}>

                <img

                  src="/assets/keepl app/progress desktop.png"

                  alt="Progress screen"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-secondary text-sm mt-2">Desktop</p>

              </div>

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/progress mobile.png')}>

                <img

                  src="/assets/keepl app/progress mobile.png"

                  alt="Progress screen mobile"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-secondary text-sm mt-2">Mobile</p>

              </div>

            </div>



            {/* Additional text about gallery integration */}

            <div className="prose prose-lg text-secondary max-w-none mt-8">

              <div className="text-lg leading-relaxed">

                <p className="text-secondary mb-3">

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

                <p className="text-center text-secondary text-sm mt-2">Desktop</p>

              </div>

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/gallery 2 desktop.png')}>

                <img

                  src="/assets/keepl app/gallery 2 desktop.png"

                  alt="Gallery 2 desktop"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-secondary text-sm mt-2">Desktop</p>

              </div>

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/gallery 1 mobile.png')}>

                <img

                  src="/assets/keepl app/gallery 1 mobile.png"

                  alt="Gallery 1 mobile"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-secondary text-sm mt-2">Mobile</p>

              </div>

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/gallery 2 mobile.png')}>

                <img

                  src="/assets/keepl app/gallery 2 mobile.png"

                  alt="Gallery 2 mobile"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-secondary text-sm mt-2">Mobile</p>

              </div>

            </div>



            {/* H2 heading for goal completion section */}

            <h2 className="font-display heading-accent text-2xl font-bold text-accent-200 mt-12 mb-6">{language === 'en' ? 'Goal Completion' : 'Завершение цели'}</h2>



            {/* Additional text about goal completion */}

            <div className="prose prose-lg text-secondary max-w-none mt-8">

              <div className="text-lg leading-relaxed">

                <p className="text-secondary mb-3">

                  {language === 'en' ? "In Keepl, the goal completion process is fully controlled by the user. I intentionally avoided hard deadlines to reduce anxiety and prevent negative pressure from time constraints." : 'В Keepl процесс завершения цели полностью подконтролен пользователю. Я намеренно отказался от жестких дедлайнов, чтобы снизить уровень тревожности и избежать негативного давления временных рамок.'}

                </p>

                <p className="text-secondary mb-3">

                  {language === 'en' ? "When users feel a goal is achieved, they can complete it through an intuitive flow. The goal then moves to 'Completed' where all graphs, photos, and success history remain available for reflection. One-click goal reactivation provides system flexibility—if a user decides to return to a habit, there's no need to set everything up again." : 'Когда пользователь чувствует, что результат достигнут, он может завершить цель через интуитивно понятный флоу. Тогда цель попадет в "завершенные", там все графики, фото и история успехов остаются доступными для рефлексии. Возможность реактивации цели в один клик обеспечивает гибкость системы - если юзер решит вернуться к привычке, ему не нужно настраивать все заново.'}

                </p>

              </div>

            </div>



            {/* Goals images for UI section */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/goals desktop.png')}>

                <img

                  src="/assets/keepl app/goals desktop.png"

                  alt="Goals screen"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-secondary text-sm mt-2">Desktop</p>

              </div>

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/goals mobile.png')}>

                <img

                  src="/assets/keepl app/goals mobile.png"

                  alt="Goals screen mobile"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-secondary text-sm mt-2">Mobile</p>

              </div>

            </div>



            {/* H2 heading for profile section */}

            <h2 className="font-display heading-accent text-2xl font-bold text-accent-200 mt-12 mb-6">{language === 'en' ? 'Profile' : 'Профиль'}</h2>



            {/* Additional text about profile */}

            <div className="prose prose-lg text-secondary max-w-none mt-8">

              <div className="text-lg leading-relaxed">

                <p className="text-secondary mb-3">

                  {language === 'en' ? 'Since the service is in MVP stage, we have relatively few settings. Currently users can change their avatar, username, password, and delete their account, but account management capabilities will expand in the future.' : 'Поскольку сервис находится на стадии MVP, у нас достаточно мало настроек. Пока что пользователь может сменить аватарку, юзернейм, поменять пароль и удалить аккаунт, но в будущем возможностей управления аккаунтом станет больше.'}

                </p>

                <p className="text-secondary mb-3">

                  {language === 'en' ? 'I also implemented a Quick Stats section that summarizes key metrics: number of active days and total sub-goals completed. This gives the user a sense of the scale of work accomplished at the highest level.' : 'Также я реализовал раздел Quick Stats, который суммирует общие показатели: количество активных дней и общее число выполненных подцелей. Это дает пользователю ощущение масштаба проделанной работы на самом верхнем уровне.'}

                </p>

              </div>

            </div>



            {/* Profile images for UI section */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/profile desktop.png')}>

                <img

                  src="/assets/keepl app/profile desktop.png"

                  alt="Profile screen"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-secondary text-sm mt-2">Desktop</p>

              </div>

              <div className="cursor-pointer group" onClick={() => openImageModal('/assets/keepl app/profile mobile.png')}>

                <img

                  src="/assets/keepl app/profile mobile.png"

                  alt="Profile screen mobile"

                  className="w-full max-w-full h-auto lg:h-96 lg:h-[32rem] object-contain transition-transform duration-300 group-hover:scale-105 bg-transparent"

                />

                <p className="text-center text-secondary text-sm mt-2">Mobile</p>

              </div>

            </div>

          </>

        )}

      </section>

    )

}
