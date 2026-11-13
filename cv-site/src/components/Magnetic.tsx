import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from 'framer-motion'
import { useRef } from 'react'

type Props = HTMLMotionProps<'a'> & {
  strength?: number
  enabled?: boolean
}

export function Magnetic({
  children,
  strength = 0.35,
  enabled = true,
  className,
  ...rest
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.35 })

  const onMove = (e: React.PointerEvent) => {
    if (!enabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(dx * strength)
    y.set(dy * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    >
      {children}
    </motion.a>
  )
}
