/* A single scrollIntoView measures the target once. Long pages keep growing
   after that (lazy images, the JS-sized sliders, collapsing chapters), and the
   smooth scroll itself can stop short of a distant target, so the page lands a
   screen or two above the clicked item. Re-align the target until the layout
   settles, and drop the correction as soon as the user starts scrolling. */

const MIN_TRACK_MS = 1500
const SETTLE_MS = 600
const MAX_TRACK_MS = 10000
const MAX_REALIGNS = 4

let activeJob = null

export const cancelScrollToTarget = () => {
  const job = activeJob
  if (!job) return

  activeJob = null
  job.cancelled = true
  window.clearTimeout(job.timer)
  job.stop?.()
}

/**
 * Smoothly scroll an element (or element id) to the top of the viewport and
 * keep it there while the page height settles.
 *
 * @param {string | HTMLElement} target element id or node
 * @param {{ delay?: number }} options delay the first measurement, e.g. to let
 *   a collapsed section expand before its position is read
 */
export const scrollToTarget = (target, { delay = 0 } = {}) => {
  cancelScrollToTarget()

  const resolve = () => (typeof target === 'string' ? document.getElementById(target) : target)

  const job = { cancelled: false, timer: 0, stop: null }
  activeJob = job

  const start = () => {
    if (job.cancelled) return

    const el = resolve()
    if (!el) return

    const offset = parseFloat(window.getComputedStyle(el).scrollMarginTop) || 0

    /* window.scrollTo rather than el.scrollIntoView: on a long case page
       scrollIntoView can silently do nothing when the target sits near the
       document bottom, so the correction below never converges. */
    const align = () => {
      const maxY = document.documentElement.scrollHeight - window.innerHeight
      const top = window.scrollY + el.getBoundingClientRect().top - offset
      window.scrollTo({ top: Math.max(0, Math.min(top, maxY)), behavior: 'smooth' })
    }

    align()

    const startedAt = performance.now()
    let lastY = window.scrollY
    let lastHeight = document.documentElement.scrollHeight
    let stableSince = startedAt
    let lastAlignAt = startedAt
    let realigns = 0
    let rafId = 0

    const stop = () => {
      job.cancelled = true
      cancelAnimationFrame(rafId)
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchstart', stop)
      window.removeEventListener('keydown', stop)
      if (activeJob === job) activeJob = null
    }

    job.stop = stop

    window.addEventListener('wheel', stop, { passive: true })
    window.addEventListener('touchstart', stop, { passive: true })
    window.addEventListener('keydown', stop)

    const tick = () => {
      if (job.cancelled) return
      if (!el.isConnected) {
        stop()
        return
      }

      const now = performance.now()
      const elapsed = now - startedAt
      const y = window.scrollY
      const height = document.documentElement.scrollHeight
      const maxY = height - window.innerHeight
      const distance = el.getBoundingClientRect().top - offset
      const heightChanged = height !== lastHeight
      const moved = Math.abs(y - lastY) >= 2

      if (heightChanged || moved) stableSince = now

      lastY = y
      lastHeight = height

      const realign = () => {
        align()
        realigns += 1
        lastAlignAt = now
        stableSince = now
      }

      if (heightChanged && Math.abs(distance) > 8 && now - lastAlignAt > 120) {
        // Media above the target finished loading — follow the new position.
        realign()
      } else if (now - stableSince > 250 && distance > 8 && y < maxY - 2 && realigns < MAX_REALIGNS) {
        // The smooth scroll ended short (the target is still below the top).
        realign()
      }

      if (elapsed > MAX_TRACK_MS || (elapsed > MIN_TRACK_MS && now - stableSince > SETTLE_MS)) {
        stop()
        return
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
  }

  job.timer = window.setTimeout(start, delay)
}
