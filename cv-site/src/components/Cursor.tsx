import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

type Props = {
  enabled: boolean
  hovering: boolean
}

export function Cursor({ enabled, hovering }: Props) {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 420, damping: 32, mass: 0.4 })
  const rx = useSpring(x, { stiffness: 180, damping: 28, mass: 0.55 })
  const ry = useSpring(y, { stiffness: 180, damping: 28, mass: 0.55 })

  useEffect(() => {
    if (!enabled) return
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <div className="cursor-layer" aria-hidden="true">
      <motion.div
        className={`cursor-dot${hovering ? ' is-hot' : ''}`}
        style={{ translateX: sx, translateY: sy }}
      />
      <motion.div
        className={`cursor-ring${hovering ? ' is-hot' : ''}`}
        style={{ translateX: rx, translateY: ry }}
      />
    </div>
  )
}
