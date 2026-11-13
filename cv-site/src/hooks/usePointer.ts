import { useEffect, useRef, useState } from 'react'

export type PointerState = {
  x: number
  y: number
  nx: number
  ny: number
  vx: number
  vy: number
}

const idle: PointerState = { x: 0, y: 0, nx: 0, ny: 0, vx: 0, vy: 0 }

export function usePointer(enabled: boolean) {
  const [pointer, setPointer] = useState<PointerState>(idle)
  const last = useRef({ x: 0, y: 0, t: 0 })

  useEffect(() => {
    if (!enabled) return

    const onMove = (e: PointerEvent) => {
      const now = performance.now()
      const dt = Math.max(16, now - last.current.t)
      const vx = (e.clientX - last.current.x) / dt
      const vy = (e.clientY - last.current.y) / dt
      last.current = { x: e.clientX, y: e.clientY, t: now }
      setPointer({
        x: e.clientX,
        y: e.clientY,
        nx: e.clientX / window.innerWidth - 0.5,
        ny: e.clientY / window.innerHeight - 0.5,
        vx,
        vy,
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled])

  return pointer
}
