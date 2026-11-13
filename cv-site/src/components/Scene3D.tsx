import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function NetworkGraph({ mouse }: { mouse: { nx: number; ny: number } }) {
  const group = useRef<THREE.Group>(null)
  const nodes = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * Math.PI * 2
      const r = 1.4 + (i % 5) * 0.22
      const y = Math.sin(i * 1.7) * 0.85
      pts.push(new THREE.Vector3(Math.cos(a) * r * 0.9, y, Math.sin(a) * r * 0.7))
    }
    return pts
  }, [])

  const links = useMemo(() => {
    const pairs: [THREE.Vector3, THREE.Vector3][] = []
    for (let i = 0; i < nodes.length; i++) {
      pairs.push([nodes[i], nodes[(i + 3) % nodes.length]])
      if (i % 2 === 0) pairs.push([nodes[i], nodes[(i + 7) % nodes.length]])
    }
    return pairs
  }, [nodes])

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = t * 0.12 + mouse.nx * 0.45
    group.current.rotation.x = 0.25 + mouse.ny * 0.3
  })

  return (
    <group ref={group} position={[1.6, 0.1, 0]} scale={1.15}>
      {links.map((pair, i) => (
        <Line
          key={i}
          points={pair}
          color="#6fb8ae"
          lineWidth={1}
          transparent
          opacity={0.28}
        />
      ))}
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[i % 4 === 0 ? 0.045 : 0.028, 12, 12]} />
          <meshBasicMaterial color={i % 4 === 0 ? '#9fd8d0' : '#6fb8ae'} />
        </mesh>
      ))}
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh>
          <icosahedronGeometry args={[0.55, 0]} />
          <meshBasicMaterial color="#6fb8ae" wireframe transparent opacity={0.45} />
        </mesh>
      </Float>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.55, 0.008, 8, 96]} />
        <meshBasicMaterial color="#8fa3b5" transparent opacity={0.25} />
      </mesh>
    </group>
  )
}

export function Scene3D({
  mouse,
  enabled,
}: {
  mouse: { nx: number; ny: number }
  enabled: boolean
}) {
  if (!enabled) {
    return <div className="scene3d scene3d-static" aria-hidden="true" />
  }

  return (
    <div className="scene3d" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <NetworkGraph mouse={mouse} />
      </Canvas>
    </div>
  )
}
