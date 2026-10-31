import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { AppContent } from './App.jsx'
import { getMeta } from './seo/meta.js'

/* Build-time render used by scripts/prerender.mjs. BrowserRouter stays in the
   client entry; StaticRouter here reads the URL we pass in. */
export function render(url) {
  const html = renderToString(
    <StaticRouter location={url}>
      <AppContent />
    </StaticRouter>
  )

  return { html, meta: getMeta(url) }
}
