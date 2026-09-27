import { useEffect, useRef } from 'react'
import { useFinePointer, useReducedMotion } from '../hooks/useMediaQuery'

export default function CursorGlow() {
  const glowRef = useRef(null)
  const finePointer = useFinePointer()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!finePointer || reducedMotion) return undefined

    const node = glowRef.current
    if (!node) return undefined

    let frame = 0
    let settled = true
    let started = false
    const current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const target = { ...current }

    const render = () => {
      frame = 0
      const dx = target.x - current.x
      const dy = target.y - current.y

      if (Math.abs(dx) < 0.4 && Math.abs(dy) < 0.4) {
        current.x = target.x
        current.y = target.y
        node.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`
        settled = true
        return
      }

      current.x += dx * 0.22
      current.y += dy * 0.22
      node.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`
      frame = requestAnimationFrame(render)
    }

    const kick = () => {
      if (settled) settled = false
      if (!frame) frame = requestAnimationFrame(render)
    }

    const onMove = (event) => {
      if (document.hidden) return
      target.x = event.clientX
      target.y = event.clientY

      if (!started) {
        started = true
        current.x = event.clientX
        current.y = event.clientY
        settled = false
        node.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`
        node.classList.add('is-active')
        return
      }

      if (!node.classList.contains('is-active')) node.classList.add('is-active')
      if (Math.abs(target.x - current.x) > 0.4 || Math.abs(target.y - current.y) > 0.4) kick()
    }

    const onLeave = () => {
      node.classList.remove('is-active')
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [finePointer, reducedMotion])

  if (!finePointer || reducedMotion) return null

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
}
