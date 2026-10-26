const DEFAULT_QUAD_AXES = ['INTERNAL', 'EXTERNAL', 'TECHNICAL', 'PRODUCT']

const splitPipes = (line) => line.split('|').map((part) => part.trim())

const nonEmptyLines = (lines) => lines.map((line) => line.trim()).filter(Boolean)

const cleanBold = (text) => text.replace(/\*\*/g, '').trim()

const parseAttrs = (raw = '') => {
  // Directive attribute list: NAME=VALUE with optional double- or single-quoted
  // values. Quoted values may contain `=` and `&` and `%` (for example long
  // Figma share URLs), so the regex keeps matching after the first quote until
  // the matching closing quote.
  const attrs = {}
  const pattern = /([a-zA-Z][\w-]*)(?:=(?:"([^"]*)"|'([^']*)'|([^\s]+)))?/g
  let match = pattern.exec(raw)

  while (match) {
    attrs[match[1]] = match[2] ?? match[3] ?? match[4] ?? true
    match = pattern.exec(raw, match.index + match[0].length)
  }

  return attrs
}

const parseStep = (line) => {
  const [title, text] = splitPipes(line)
  return { title, text: text || '' }
}

const parseRow = (line) => {
  const bold = line.match(/^\*\*(.+?)\*\*\s*\.?\s*(.*)$/)

  if (bold) {
    return {
      title: bold[1].replace(/[.!?]$/, '').trim(),
      text: bold[2].trim()
    }
  }

  const sentence = line.match(/^(.+?[.!?])\s+(.*)$/)

  if (sentence) {
    return {
      title: sentence[1].replace(/[.!?]$/, '').trim(),
      text: sentence[2].trim()
    }
  }

  return { title: line.trim(), text: '' }
}

const parseImageLine = (line) => {
  const pipe = line.indexOf('|')

  if (pipe === -1) {
    return { src: line.trim(), caption: '' }
  }

  return {
    src: line.slice(0, pipe).trim(),
    caption: line.slice(pipe + 1).trim()
  }
}

const parseScenarioSteps = (lines) => {
  const scenarios = []
  let current = null

  lines.forEach((line) => {
    const trimmed = line.trim()
    if (!trimmed) return

    if (trimmed.startsWith('# ')) {
      current = { title: trimmed.slice(2).trim(), steps: [] }
      scenarios.push(current)
      return
    }

    if (!current) {
      current = { title: 'Сценарий 1', steps: [] }
      scenarios.push(current)
    }

    current.steps.push(parseStep(trimmed))
  })

  return scenarios
}

const parseFlow = (lines) => {
  const nodes = []
  const loops = []

  nonEmptyLines(lines).forEach((line) => {
    const loop = line.match(/^loop\s+(\d+)\s*>\s*(\d+)\s*(?:\|\s*(.*))?$/i)

    if (loop) {
      loops.push({
        from: Number(loop[1]),
        to: Number(loop[2]),
        label: loop[3]?.trim() || ''
      })
      return
    }

    const [shape, title, text] = splitPipes(line)
    nodes.push({
      shape: ['circle', 'square', 'diamond'].includes(shape) ? shape : 'square',
      title: title || shape,
      text: text || ''
    })
  })

  return { nodes, loops }
}

export const buildCaseBlock = ({ name, attrs, lines, raw }) => {
  const body = lines.join('\n').trim()
  const cleanLines = nonEmptyLines(lines)

  switch (name) {
    case 'callout':
      return {
        type: 'callout',
        props: {
          label: attrs.label || '',
          text: body
        }
      }

    case 'cards': {
      const cols = [2, 3, 4].includes(Number(attrs.cols)) ? Number(attrs.cols) : 3
      const items = cleanLines.map((line) => {
        const [title, text] = splitPipes(line)
        return { title: cleanBold(title), text: text || '' }
      })

      return {
        type: 'cards',
        props: {
          cols,
          numbered: attrs.numbered === true || attrs.numbered === 'true',
          items
        }
      }
    }

    case 'triad':
      return {
        type: 'triad',
        props: {
          labels: String(attrs.labels || '').split('|').map((label) => label.trim()),
          rows: cleanLines.map((line) => {
            const cells = splitPipes(line)
            return [cells[0] || '', cells[1] || '', cells[2] || '']
          })
        }
      }

    case 'stats':
      return {
        type: 'stats',
        props: {
          items: cleanLines.map((line) => {
            const [value, label] = splitPipes(line)
            return { value: value || '', label: label || '' }
          })
        }
      }

    case 'quad': {
      const axes = String(attrs.axes || '').split('|').map((axis) => axis.trim())
      const resolvedAxes = DEFAULT_QUAD_AXES.map((axis, index) => axes[index] || axis)
      const cells = Array.from({ length: 4 }, (_, index) => {
        const line = cleanLines[index]
        if (!line) return { title: '', text: '' }
        const [title, text] = splitPipes(line)
        return { title: cleanBold(title), text: text || '' }
      })

      return {
        type: 'quad',
        props: { axes: resolvedAxes, cells }
      }
    }

    case 'steps':
      return {
        type: 'steps',
        props: { steps: cleanLines.map(parseStep) }
      }

    case 'steps-tabs':
      return {
        type: 'steps',
        props: { scenarios: parseScenarioSteps(lines) }
      }

    case 'chain':
      return {
        type: 'chain',
        props: { nodes: cleanLines }
      }

    case 'chips':
      return {
        type: 'chips',
        props: {
          items: cleanLines
            .flatMap((line) => line.split(','))
            .map((item) => item.trim())
            .filter(Boolean)
        }
      }

    case 'rows':
      return {
        type: 'rows',
        props: { items: cleanLines.map(parseRow) }
      }

    case 'findings':
      return {
        type: 'findings',
        props: {
          items: cleanLines.map((line) => {
            const [kind, title, text, image] = splitPipes(line)
            return {
              kind: kind === 'good' ? 'good' : 'mistake',
              title: cleanBold(title || ''),
              text: text || '',
              image: image || ''
            }
          })
        }
      }

    case 'gallery': {
      const cols = [2, 3].includes(Number(attrs.cols)) ? Number(attrs.cols) : 2
      return {
        type: 'gallery',
        props: { cols, items: cleanLines.map(parseImageLine) }
      }
    }

    case 'stage': {
      const layout = ['single', 'pair', 'trio'].includes(attrs.layout)
        ? attrs.layout
        : 'single'
      return {
        type: 'stage',
        props: { layout, items: cleanLines.map(parseImageLine) }
      }
    }

    case 'slider':
      /* Единый вид: любые лишние атрибуты (mode=...) принимаем и игнорируем. */
      return {
        type: 'slider',
        props: { items: cleanLines.map(parseImageLine) }
      }

    case 'flow':
      return {
        type: 'flow',
        props: parseFlow(lines)
      }

    case 'embed':
      return {
        type: 'embed',
        props: {
          url: attrs.url || '',
          ratio: attrs.ratio || '16:9',
          mobileRatio: attrs.mobileratio || '',
          maxWidth: attrs.maxwidth || '',
          title: attrs.title || '',
          sandbox: attrs.sandbox || '',
          raw: raw.trim()
        }
      }

    default:
      return {
        type: 'unknown',
        props: { raw: raw.trim() }
      }
  }
}

export const EMBED_ALLOWED_HOSTS = new Set([
  'embed.figma.com',
  'www.figma.com',
  'cdn.knightlab.com',
])

export const parseCaseBlocks = (content) => {
  if (!content) return []

  const lines = content.replace(/\r\n/g, '\n').split('\n')
  const segments = []
  let textLines = []

  const flushText = () => {
    if (textLines.length === 0) return
    const text = textLines.join('\n')
    if (text.trim()) {
      segments.push({ type: 'text', text })
    }
    textLines = []
  }

  let index = 0

  while (index < lines.length) {
    const opening = lines[index].match(/^:::\s*([a-z][\w-]*)(?:\s+(.*))?$/i)

    if (opening) {
      let closing = -1

      for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
        if (/^\s*:::\s*$/.test(lines[cursor])) {
          closing = cursor
          break
        }
      }

      if (closing !== -1) {
        flushText()
        const blockLines = lines.slice(index + 1, closing)
        const raw = lines.slice(index, closing + 1).join('\n')
        segments.push({
          type: 'block',
          block: {
            name: opening[1].toLowerCase(),
            attrs: parseAttrs(opening[2] || ''),
            lines: blockLines,
            raw
          }
        })
        index = closing + 1
        continue
      }
    }

    textLines.push(lines[index])
    index += 1
  }

  flushText()
  return segments
}
