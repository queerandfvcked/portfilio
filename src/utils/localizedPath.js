export const DEFAULT_LANGUAGE = 'ru'
export const LANGUAGES = ['ru', 'en']

const EXTERNAL_PATTERN = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i
const STATIC_PATH_PATTERN = /^\/(?:assets|dev)(?:\/|$)/

const splitPath = (value) => {
  const match = value.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/)

  return {
    pathname: match?.[1] || '',
    search: match?.[2] || '',
    hash: match?.[3] || '',
  }
}

export const getLanguageFromPath = (pathname = '/') => {
  const segment = pathname.split('/')[1]
  return segment === 'en' ? 'en' : DEFAULT_LANGUAGE
}

export const stripLanguage = (pathname = '/') => {
  const parts = pathname.split('/')

  if (LANGUAGES.includes(parts[1])) {
    parts.splice(1, 1)
    return parts.join('/') || '/'
  }

  return pathname
}

export const isHomePath = (pathname = '/') => {
  const rest = stripLanguage(pathname)
  return rest === '/' || rest === ''
}

/**
 * Prefix an internal route with the active language.
 *
 * External URLs, hash-only links and static assets (for example /assets/*.pdf)
 * are returned untouched. An already localised path is re-prefixed instead of
 * being prefixed twice.
 */
export const localizedPath = (language, path = '/') => {
  const lang = language === 'en' ? 'en' : DEFAULT_LANGUAGE

  if (!path || typeof path !== 'string') return path
  if (EXTERNAL_PATTERN.test(path)) return path
  if (STATIC_PATH_PATTERN.test(path)) return path
  if (!path.startsWith('/')) return path

  const { pathname, search, hash } = splitPath(path)
  const parts = pathname.split('/').filter(Boolean)

  if (LANGUAGES.includes(parts[0])) parts.shift()

  const rest = parts.join('/')
  return `/${lang}/${rest}${search}${hash}`
}
