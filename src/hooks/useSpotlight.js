import { useCallback } from 'react'

const queue = new Map()
let frame = 0

const flush = () => {
  frame = 0
  queue.forEach((point, node) => {
    const rect = node.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    const x = ((point.x - rect.left) / rect.width) * 100
    const y = ((point.y - rect.top) / rect.height) * 100
    node.style.setProperty('--mx', `${x.toFixed(1)}%`)
    node.style.setProperty('--my', `${y.toFixed(1)}%`)
  })
  queue.clear()
}

const schedule = () => {
  if (!frame) frame = requestAnimationFrame(flush)
}

export function useSpotlight() {
  const onPointerMove = useCallback((event) => {
    if (event.pointerType === 'touch') return
    queue.set(event.currentTarget, { x: event.clientX, y: event.clientY })
    schedule()
  }, [])

  const onPointerLeave = useCallback((event) => {
    const node = event.currentTarget
    queue.delete(node)
    node.style.setProperty('--mx', '50%')
    node.style.setProperty('--my', '0%')
  }, [])

  return { onPointerMove, onPointerLeave }
}
