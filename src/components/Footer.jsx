import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from '../contexts/LanguageContext'
import useSpotlight from '../hooks/useSpotlight'

const CONTACT_HREFS = {
  telegram: 'https://t.me/icedcreamsoda',
  email: 'mailto:andrianshtark@gmail.com',
  otherRu: 'https://spb.hh.ru/resume/a951adeaff0f2857bf0039ed1f645643673433',
  otherEn: 'https://www.linkedin.com/in/andrian-shtark-19b0b23b1',
}

const copyText = async (value) => {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value)
      return true
    } catch {}
  }

  const field = document.createElement('textarea')
  field.value = value
  field.setAttribute('readonly', '')
  field.style.position = 'fixed'
  field.style.top = '-9999px'
  document.body.appendChild(field)
  field.select()

  try {
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    field.remove()
  }
}

const Footer = () => {
  const { language, t } = useTranslation()
  const contact = t('contact')
  const contactRef = useRef(null)
  const spotlight = useSpotlight(contactRef)
  const [copied, setCopied] = useState(false)
  const copiedTimer = useRef(0)
  const currentYear = new Date().getFullYear()

  useEffect(() => () => clearTimeout(copiedTimer.current), [])

  const email = contact.rows?.find((row) => row.id === 'email')?.value

  const handleCopy = async () => {
    if (!email) return

    const success = await copyText(email)
    if (!success) return

    setCopied(true)
    clearTimeout(copiedTimer.current)
    copiedTimer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  const getHref = (id) => {
    if (id === 'other') {
      return language === 'ru' ? CONTACT_HREFS.otherRu : CONTACT_HREFS.otherEn
    }
    return CONTACT_HREFS[id]
  }

  return (
    <footer>
      <section id="contact" ref={contactRef} className="contact-block">
        <div className="contact-block__bg" aria-hidden="true">
          <div className="grid-mask" />
          {spotlight && <div className="grid-spotlight" />}
        </div>

        <div className="container contact-block__inner">
          <div className="contact-block__grid">
            <div className="contact-block__intro">
              <span className="mono-meta contact-block__label">{contact.label}</span>
              <h2 className="contact-block__title">{contact.title}</h2>
              <p className="contact-block__text">{contact.text}</p>
            </div>

            <div className="contact-block__rows">
              {contact.rows?.map((row) => {
                const external = row.id !== 'email'

                return (
                  <div className="contact-row" key={row.id}>
                    <a
                      className="contact-row__link"
                      href={getHref(row.id)}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      <span className="contact-row__body">
                        <span className="mono-meta contact-row__label">{row.label}</span>
                        <span className="contact-row__value">{row.value}</span>
                      </span>
                      <span className="contact-row__arrow" aria-hidden="true">↗</span>
                    </a>

                    {row.id === 'email' && (
                      <button
                        type="button"
                        className="contact-row__copy"
                        onClick={handleCopy}
                      >
                        <span aria-live="polite">{copied ? contact.copied : contact.copy}</span>
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="footer-bottom">
          <p className="footer-bottom__copy">© {currentYear} – Andrian Shtark</p>
          <nav className="footer-bottom__nav" aria-label={contact.label}>
            <a className="footer-bottom__link" href="/#projects">{t('nav.projects')}</a>
            <a className="footer-bottom__link" href="/#about">{t('nav.about')}</a>
            <a className="footer-bottom__link" href="#contact">{t('nav.contact')}</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
