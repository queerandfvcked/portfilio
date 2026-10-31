import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const distDir = path.join(root, 'dist')
const ssrCandidates = ['entry-server.mjs', 'entry-server.js']

const LANGUAGES = ['ru', 'en']
const CASE_SLUGS = ['zhabka', 'keepl-app', 'keepl-landing', 'hired-app', 'add-transition']

const PAGES = LANGUAGES.flatMap((lang) => [
  { lang, slug: null, url: `/${lang}` },
  ...CASE_SLUGS.map((slug) => ({ lang, slug, url: `/${lang}/${slug}` }))
])

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/* Remove the tags that are rewritten per page, so every generated file has
   exactly one title, description, canonical, og:* and twitter:* set. */
const stripManagedHeadTags = (html) =>
  html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta\b(?=[^>]*(?:name|property)="(?:description|og:[^"]+|twitter:[^"]+)")[^>]*>\s*/gi, '')
    .replace(/<link\b(?=[^>]*rel="(?:canonical|alternate)")[^>]*>\s*/gi, '')

const renderHead = (meta) => {
  const alternates = meta.alternates
    .map((item) => `  <link rel="alternate" hreflang="${escapeHtml(item.hreflang)}" href="${escapeHtml(item.href)}">`)
    .join('\n')

  return [
    `  <title>${escapeHtml(meta.title)}</title>`,
    `  <meta name="description" content="${escapeHtml(meta.description)}">`,
    `  <link rel="canonical" href="${escapeHtml(meta.canonical)}">`,
    alternates,
    `  <meta property="og:title" content="${escapeHtml(meta.title)}">`,
    `  <meta property="og:description" content="${escapeHtml(meta.description)}">`,
    `  <meta property="og:image" content="${escapeHtml(meta.image)}">`,
    `  <meta property="og:url" content="${escapeHtml(meta.canonical)}">`,
    '  <meta property="og:type" content="website">',
    '  <meta property="og:site_name" content="Andrian Shtark Portfolio">',
    `  <meta property="og:locale" content="${escapeHtml(meta.ogLocale)}">`,
    `  <meta property="og:locale:alternate" content="${escapeHtml(meta.ogLocaleAlternate)}">`,
    '  <meta name="twitter:card" content="summary_large_image">',
    `  <meta name="twitter:title" content="${escapeHtml(meta.title)}">`,
    `  <meta name="twitter:description" content="${escapeHtml(meta.description)}">`,
    `  <meta name="twitter:image" content="${escapeHtml(meta.image)}">`
  ].join('\n')
}

const main = async () => {
  const template = await readFile(path.join(distDir, 'index.html'), 'utf8')
  const ssrPath = await (async () => {
    for (const name of ssrCandidates) {
      const candidate = path.join(root, 'dist-ssr', name)
      try {
        await readFile(candidate)
        return candidate
      } catch {}
    }
    throw new Error(`SSR bundle not found in ${path.join(root, 'dist-ssr')}`)
  })()
  const ssr = await import(pathToFileURL(ssrPath).href)
  const render = ssr.render || ssr.default?.render

  if (typeof render !== 'function') {
    throw new Error(`render() not found in ${ssrPath}`)
  }
  if (!template.includes('<div id="root"></div>')) {
    throw new Error('dist/index.html has no empty <div id="root"></div> placeholder')
  }

  for (const page of PAGES) {
    const { html, meta } = render(page.url)
    const head = renderHead(meta)

    let output = template
    output = output.replace(/<html\b[^>]*>/i, `<html lang="${meta.lang}">`)
    output = output.replace('<div id="root"></div>', () => `<div id="root">${html}</div>`)
    output = stripManagedHeadTags(output)
    output = output.replace('</head>', () => `${head}\n</head>`)

    const outPath = page.slug
      ? path.join(distDir, page.lang, page.slug, 'index.html')
      : path.join(distDir, page.lang, 'index.html')

    await mkdir(path.dirname(outPath), { recursive: true })
    await writeFile(outPath, output, 'utf8')

    const note = meta.descriptionTooLong ? ' [description kept whole: first sentence > 160]' : ''
    console.log(`prerendered ${meta.pagePath} -> ${path.relative(root, outPath)}${note}`)
  }

  console.log(`done: ${PAGES.length} pages`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
