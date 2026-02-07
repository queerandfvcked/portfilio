import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = ({ children }) => {
  const location = useLocation()

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo(0, 0)
  }, [location.pathname])

  return children
}

export default ScrollToTop
