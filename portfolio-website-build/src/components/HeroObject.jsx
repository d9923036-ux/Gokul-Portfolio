import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'

function FloatingShape() {
  const meshRef = useRef(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
  })

  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.32, 128, 24]} />
        <meshStandardMaterial
          color="#3b82f6"
          metalness={0.7}
          roughness={0.25}
          wireframe
        />
      </mesh>
    </Float>
  )
}

export default function HeroObject() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 4, 4]} intensity={1.2} color="#60a5fa" />
      <FloatingShape />
    </Canvas>
  )
}
