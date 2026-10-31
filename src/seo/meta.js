export const BASE_URL = 'https://andrianshtark.vercel.app'
export const CASE_SLUGS = ['zhabka', 'keepl-app', 'keepl-landing', 'hired-app', 'add-transition']

/* Titles and descriptions are fixed here, not taken from the content dictionaries. */
const CASE_META = {
  zhabka: {
    en: {
      title: 'Zhabka — case study | Andrian Shtark',
      description: 'Zhabka: a personal AI assistant for job hunting. It collects vacancies from Telegram and keeps the relevant ones: about 170 posts a day down to 5–10.'
    },
    ru: {
      title: 'Zhabka — кейс | Andrian Shtark',
      description: 'Zhabka — персональный AI-ассистент для поиска работы: собирает вакансии из Telegram и оставляет релевантные. Около 170 постов в день превращаются в 5–10.'
    }
  },
  'keepl-app': {
    en: {
      title: 'Keepl App — case study | Andrian Shtark',
      description: 'A web app for reaching goals without guilt: flexible progress instead of “done / not done”. MVP, pre-launch.'
    },
    ru: {
      title: 'Keepl App — кейс | Andrian Shtark',
      description: 'Веб-приложение для достижения целей без чувства вины: гибкий прогресс вместо «сделано / не сделано». MVP, до запуска.'
    }
  },
  'keepl-landing': {
    en: {
      title: 'Keepl Landing Page — case study | Andrian Shtark',
      description: 'Landing page for Keepl, a web app for reaching goals: it explains the product’s value and leads visitors to their first action.'
    },
    ru: {
      title: 'Keepl Landing Page — кейс | Andrian Shtark',
      description: 'Лендинг для Keepl, веб-приложения для достижения целей: объясняет ценность продукта и подводит к первому действию.'
    }
  },
  'hired-app': {
    en: {
      title: 'Hired App — case study | Andrian Shtark',
      description: 'Hired App: a job-search app designed from scratch, from research and JTBD to final UI and a design system. Hackathon project turned MVP.'
    },
    ru: {
      title: 'Hired App — кейс | Andrian Shtark',
      description: 'Hired App: приложение для поиска работы с нуля: от исследования и JTBD до финальных интерфейсов и дизайн-системы. Хакатон → MVP.'
    }
  },
  'add-transition': {
    en: {
      title: 'Add Transaction — case study | Andrian Shtark',
      description: 'UX audit and redesign of the add-transaction flow in a finance app: quick, clear entry of expenses and income. Based on a review of 7 competitors.'
    },
    ru: {
      title: 'Добавление операции — кейс | Andrian Shtark',
      description: 'UX-аудит и редизайн добавления операции в финансовом приложении: быстрый и понятный ввод трат и доходов. Разбор 7 конкурентов.'
    }
  }
}

const HOME_TITLE = 'Andrian Shtark — Product Designer'

const HOME_DESCRIPTION = {
  ru: 'Продуктовый дизайнер, B2C: исследования, продуктовая логика и рабочие прототипы. Кейсы: Zhabka, Keepl, Hired App и сценарий добавления операции в финтехе.',
  en: 'Product designer for B2C: research, product logic and working prototypes. Case studies: Zhabka, Keepl, Hired App and a fintech add-transaction flow.'
}

const getLanguage = (pathname) => {
  const segment = pathname.split('/').filter(Boolean)[0]
  return segment === 'en' ? 'en' : 'ru'
}

const getSlug = (pathname) => {
  const segments = pathname.split('/').filter(Boolean)
  if (segments[0] === 'ru' || segments[0] === 'en') segments.shift()

  return segments[0] && CASE_SLUGS.includes(segments[0]) ? segments[0] : null
}

export const getMeta = (url = '/') => {
  const pathname = new URL(url, BASE_URL).pathname
  const lang = getLanguage(pathname)
  const slug = getSlug(pathname)
  const otherLang = lang === 'ru' ? 'en' : 'ru'
  const pagePath = slug ? `/${lang}/${slug}` : `/${lang}`
  const otherPath = slug ? `/${otherLang}/${slug}` : `/${otherLang}`
  const canonical = `${BASE_URL}${pagePath}`

  const caseMeta = slug ? CASE_META[slug]?.[lang] : null
  const description = {
    text: slug ? (caseMeta?.description || '') : HOME_DESCRIPTION[lang],
    tooLong: false,
    cut: false
  }

  const title = slug
    ? (caseMeta?.title || `${slug} — ${lang === 'ru' ? 'кейс' : 'case study'} | Andrian Shtark`)
    : HOME_TITLE

  return {
    lang,
    slug,
    title,
    description: description.text,
    descriptionTooLong: description.tooLong,
    descriptionCut: description.cut,
    canonical,
    image: `${BASE_URL}/og-image.jpg`,
    ogLocale: lang === 'ru' ? 'ru_RU' : 'en_US',
    ogLocaleAlternate: otherLang === 'ru' ? 'ru_RU' : 'en_US',
    alternates: [
      { hreflang: 'ru', href: `${BASE_URL}${slug ? `/ru/${slug}` : '/ru'}` },
      { hreflang: 'en', href: `${BASE_URL}${slug ? `/en/${slug}` : '/en'}` },
      { hreflang: 'x-default', href: `${BASE_URL}${slug ? `/en/${slug}` : '/en'}` }
    ],
    pagePath,
    otherPath
  }
}
