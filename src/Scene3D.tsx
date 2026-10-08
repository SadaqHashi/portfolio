import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const mouse = new THREE.Vector2(0, 0)

function Tracker() {
  const { viewport } = useThree()
  useFrame((state) => {
    mouse.x = state.pointer.x * viewport.width * 0.15
    mouse.y = state.pointer.y * viewport.height * 0.15
  })
  return null
}

function FloatingShape({
  position,
  color,
  speed = 0.3,
  geo,
}: {
  position: [number, number, number]
  color: string
  speed?: number
  geo: 'ico' | 'oct' | 'torus' | 'dodec'
}) {
  const ref = useRef<THREE.Mesh>(null!)
  const base = useRef(position)

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed
    ref.current.rotation.x = Math.sin(t) * 0.4
    ref.current.rotation.y = Math.cos(t * 0.7) * 0.4
    ref.current.position.x = base.current[0] + mouse.x * (0.3 + speed * 0.2)
    ref.current.position.y = base.current[1] + Math.sin(t * 0.5) * 0.6 + mouse.y * (0.2 + speed * 0.15)
  })

  return (
    <mesh ref={ref} position={position}>
      {geo === 'torus' && <torusGeometry args={[1, 0.35, 8, 16]} />}
      {geo === 'oct' && <octahedronGeometry args={[1.1]} />}
      {geo === 'ico' && <icosahedronGeometry args={[1, 0]} />}
      {geo === 'dodec' && <dodecahedronGeometry args={[0.9]} />}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.12} />
    </mesh>
  )
}

export default function Scene3D() {
  return (
    <div className="scene-3d">
      <Canvas camera={{ position: [0, 0, 14], fov: 40 }} dpr={[1, 1.5]}>
        <Tracker />
        <FloatingShape position={[-5, 2.5, -2]} color="#8b5cf6" speed={0.25} geo="ico" />
        <FloatingShape position={[5, -1.5, -3]} color="#06b6d4" speed={0.2} geo="oct" />
        <FloatingShape position={[0, 4, -5]} color="#a78bfa" speed={0.15} geo="torus" />
        <FloatingShape position={[-3, -3.5, -4]} color="#67e8f9" speed={0.3} geo="dodec" />
        <FloatingShape position={[6, 3, -6]} color="#7c3aed" speed={0.18} geo="ico" />
      </Canvas>
    </div>
  )
}
