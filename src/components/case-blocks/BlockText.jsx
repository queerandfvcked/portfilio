import React from 'react'

export const InlineText = ({ text }) => {
  if (text === null || text === undefined) return null

  const parts = String(text).split(/(\*\*[^*]+\*\*)/g)

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }

    return part
  })
}

export const AccentText = ({ text }) => {
  if (text === null || text === undefined) return null

  const parts = String(text).split(/(\*[^*]+\*)/g)

  return parts.map((part, index) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <span key={index} className="case-accent-word">
          {part.slice(1, -1)}
        </span>
      )
    }

    return part
  })
}

export default InlineText
