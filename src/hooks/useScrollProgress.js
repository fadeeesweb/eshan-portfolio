import { useEffect } from 'react'

const clamp = (value) => Math.min(1, Math.max(0, value))

export function useScrollProgress(ref) {
  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const steps = Array.from(node.querySelectorAll('.process__step'))
    const last = Math.max(steps.length - 1, 1)
    let frame = 0
    let enabled = false

    const measure = () => {
      frame = 0
      const rect = node.getBoundingClientRect()
      const start = window.innerHeight * 0.82
      const distance = Math.max(rect.height * 0.65, 1)
      const progress = clamp((start - rect.top) / distance)

      node.style.setProperty('--p', progress)
      for (let i = 0; i < steps.length; i += 1) {
        steps[i].classList.toggle('is-lit', progress >= i / last)
      }
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    const onScroll = () => {
      if (enabled) schedule()
    }

    const onResize = () => {
      if (enabled) schedule()
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          enabled = entries[0].isIntersecting
          if (enabled) schedule()
        },
        { rootMargin: '30% 0px 30% 0px', threshold: 0 },
      )
      observer.observe(node)

      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onResize)

      return () => {
        observer.disconnect()
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onResize)
        if (frame) cancelAnimationFrame(frame)
      }
    }

    measure()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ref])
}
