import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { stripLanguage } from '../utils/localizedPath'

const ScrollToTop = ({ children }) => {
  const location = useLocation()
  // Switching /ru/<slug> -> /en/<slug> is the same page: keep the viewport
  // where it is. Real route changes (including slug changes) still scroll up.
  const routePath = stripLanguage(location.pathname)

  useEffect(() => {
    // A hash link is handled by the page that owns the anchor (App's hash
    // effect, scrollToTarget); scrolling to the top here would cancel it.
    if (location.hash) return
    // Scroll to top when route changes
    window.scrollTo(0, 0)
  }, [routePath, location.hash])

  return children
}

export default ScrollToTop
