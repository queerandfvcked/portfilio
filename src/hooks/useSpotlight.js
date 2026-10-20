import { useEffect, useState } from 'react'

/**
 * Cursor-tracked spotlight shared by the hero and the case cards.
 *
 * Writes `--mx` / `--my` (and, when `parallax` is on, `--par-x` / `--par-y`
 * in the -1..1 range) straight to the element's style — one rAF per frame,
 * no React re-render. Toggling `is-spotlit` is what fades the layer in.
 *
 * Disabled entirely on coarse pointers and under prefers-reduced-motion.
 * Tracking pauses while the element is off screen.
 */
export default function useSpotlight(ref, { parallax = false } = {}) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof window === 'undefined' || !window.matchMedia) return

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduce.matches) return

    setActive(true)

    let x = 0
    let y = 0
    let nx = 0
    let ny = 0
    let raf = 0
    let listening = false

    const flush = () => {
      raf = 0
      el.style.setProperty('--mx', `${x}px`)
      el.style.setProperty('--my', `${y}px`)
      if (parallax) {
        el.style.setProperty('--par-x', nx.toFixed(3))
        el.style.setProperty('--par-y', ny.toFixed(3))
      }
    }

    const onMove = (event) => {
      const rect = el.getBoundingClientRect()
      x = event.clientX - rect.left
      y = event.clientY - rect.top
      if (parallax && rect.width && rect.height) {
        nx = (x / rect.width - 0.5) * 2
        ny = (y / rect.height - 0.5) * 2
      }
      if (!raf) raf = requestAnimationFrame(flush)
    }

    const onEnter = () => el.classList.add('is-spotlit')
    const onLeave = () => {
      el.classList.remove('is-spotlit')
      if (parallax) {
        el.style.setProperty('--par-x', '0')
        el.style.setProperty('--par-y', '0')
      }
    }

    const listen = () => {
      if (listening) return
      el.addEventListener('pointermove', onMove, { passive: true })
      listening = true
    }

    const unlisten = () => {
      if (!listening) return
      el.removeEventListener('pointermove', onMove)
      listening = false
      if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    listen()
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          listen()
        } else {
          unlisten()
          el.classList.remove('is-spotlit')
        }
      },
      { threshold: 0 }
    )
    io.observe(el)

    return () => {
      unlisten()
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
      io.disconnect()
    }
  }, [ref, parallax])

  return active
}
