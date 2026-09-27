import { useEffect } from 'react'

export function usePauseOffscreen() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined

    const targets = Array.from(document.querySelectorAll('main > section, footer'))
    if (!targets.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-anim-paused', !entry.isIntersecting)
        })
      },
      { threshold: 0 },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])
}
