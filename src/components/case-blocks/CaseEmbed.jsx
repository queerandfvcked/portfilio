import React, { useEffect } from 'react'

const KB_SANDBOX =
  'allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox'

const FIGMA_EMBED_PATH = /^\/embed(?:\/|$)/

const toHttps = (raw) => {
  const trimmed = String(raw || '').trim()
  if (!trimmed) return ''
  if (/^https:\/\//i.test(trimmed)) return trimmed
  if (/^http:\/\//i.test(trimmed)) return trimmed.replace(/^http:\/\//i, 'https://')
  return `https://${trimmed.replace(/^\/+/, '')}`
}

/* The allowlist is checked before rendering, so an unapproved host never
   produces an iframe — not even for one paint. */
const getAllowedUrl = (raw) => {
  const normalized = toHttps(raw)
  if (!normalized) return null

  try {
    const parsed = new URL(normalized)
    if (parsed.protocol !== 'https:') return null

    const host = parsed.hostname.toLowerCase()
    if (host === 'embed.figma.com') return parsed.toString()
    if (host === 'www.figma.com' && FIGMA_EMBED_PATH.test(parsed.pathname)) {
      return parsed.toString()
    }
    if (host === 'cdn.knightlab.com') return parsed.toString()
    return null
  } catch (error) {
    return null
  }
}

const toAspectRatio = (value, fallback) => {
  const match = String(value || '')
    .trim()
    .match(/^(\d+(?:\.\d+)?)\s*[:/]\s*(\d+(?:\.\d+)?)$/)

  if (!match) return fallback

  const width = Number(match[1])
  const height = Number(match[2])
  if (!width || !height) return fallback

  return `${width} / ${height}`
}

const isFigmaUrl = (value) => {
  try {
    const host = new URL(value).hostname.toLowerCase()
    return host === 'embed.figma.com' || host === 'www.figma.com'
  } catch (error) {
    return false
  }
}

export const CaseEmbed = ({
  url = '',
  ratio = '16:9',
  mobileRatio = '',
  maxWidth = '',
  title = '',
  sandbox = ''
}) => {
  const safeUrl = getAllowedUrl(url)
  const desktopRatio = toAspectRatio(ratio, '16 / 9')
  const mobileRatioValue = mobileRatio ? toAspectRatio(mobileRatio, desktopRatio) : ''
  const numericMaxWidth = Number(maxWidth)
  const isFigma = safeUrl ? isFigmaUrl(safeUrl) : false

  useEffect(() => {
    if (url.trim() && !safeUrl && typeof console !== 'undefined') {
      console.warn('[CaseEmbed] blocked iframe URL — host not in allowlist:', url)
    }
  }, [url, safeUrl])

  if (!safeUrl) return null

  /* `allowfullscreen` is an iframe attribute, not a sandbox token: Figma
     embeds get it instead of a sandbox, so the prototype can go fullscreen. */
  const sandboxValue = sandbox === 'wide' && !isFigma ? KB_SANDBOX : undefined

  return (
    <div
      className="case-embed"
      style={{
        '--case-embed-ratio': desktopRatio,
        '--case-embed-mobile-ratio': mobileRatioValue || desktopRatio,
        maxWidth: numericMaxWidth > 0 ? `${numericMaxWidth}px` : undefined
      }}
    >
      <iframe
        className="case-embed__frame"
        src={safeUrl}
        title={title || 'Embedded content'}
        loading="lazy"
        sandbox={sandboxValue}
        allowFullScreen={isFigma || undefined}
      />
    </div>
  )
}

export default CaseEmbed
