'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useLanguage } from '@/context/LanguageContext'


export default function Hero() {
  const { t, lang } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section id="home" className="relative h-screen w-full bg-black overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: !isMobile }}
      >
        <AnimatedStars isMobile={isMobile} />
        <ambientLight intensity={0.5} />
        <pointLight color={'#00ffff'} intensity={1} position={[10, 10, 10]} />
        <PointLightAnimation />
        <PlasmaSphere isMobile={isMobile} />

        {!isMobile && (
          <EffectComposer multisampling={0}>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.75}
              intensity={1.2}
            />
          </EffectComposer>
        )}
      </Canvas>

      {/* Description */}
      <div className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-10 text-white text-center px-4 ${lang === 'ar' ? 'font-arabic' : ''}`}>
        <h1 className="text-4xl md:text-7xl font-bold mb-4">
          {t.hero.hi} <span className="text-cyan-400 fira-code">{t.hero.name}</span>
        </h1>
        <p className="text-md md:text-2xl mb-8 text-gray-300">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="#contact"
            className="px-8 py-4 bg-cyan-500 text-black font-semibold rounded-full hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >
            {t.hero.button}
          </a>


        </div>
      </div>
    </section>
  )
}

function PointLightAnimation() {
  const lightRef = useRef()
  useFrame(({ clock }) => {
    lightRef.current.position.x = Math.sin(clock.getElapsedTime()) * 10
    lightRef.current.position.z = Math.cos(clock.getElapsedTime()) * 10
  })
  return <pointLight ref={lightRef} color="#ff00ff" intensity={1} />
}

function PlasmaSphere({ isMobile }) {
  const meshRef = useRef()
  const { camera, mouse } = useThree()

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()

    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = elapsedTime
      // Rotate the sphere
      meshRef.current.rotation.y = elapsedTime * 0.2
      meshRef.current.rotation.z = elapsedTime * 0.1
    }

    // Move the camera - disable on mobile for better performance
    if (!isMobile) {
      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05
      camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.05
      camera.lookAt(0, 0, 0)
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uColor1: { value: new THREE.Color('#00ffff') },
          uColor2: { value: new THREE.Color('#ff00ff') },
        }}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  )
}

function AnimatedStars({ isMobile }) {
  const starsRef = useRef()

  useFrame(() => {
    if (starsRef.current) {
      // Rotate the stars
      starsRef.current.rotation.y += 0.0005
    }
  })

  return (
    <group ref={starsRef}>
      <Stars
        radius={100}   // حجم مجال النجوم
        depth={100}     // عمق المجال
        count={isMobile ? 1000 : 3000}   // عدد النجوم - reduced on mobile
        factor={5}     // حجم النجوم
        saturation={5}
        fade={true}
      />
    </group>
  )
}

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;

  uniform float uTime;

  void main() {
    vUv = uv;
    vNormal = normal;

    vec3 pos = position;

    float waveFreq = 3.5;
    float waveAmp = 0.1;
    float waveSpeed = 2.5;

    float displacement = sin(waveFreq * pos.y + uTime * waveSpeed) * waveAmp;
    pos += normal * displacement;
    pos.x += sin(pos.y * 3.0 + uTime * 0.8) * 0.05;
    pos.y += cos(pos.x * 3.0 + uTime * 0.8) * 0.05;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;

  varying vec2 vUv;
  varying vec3 vNormal;

  float noise(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 54.53))) * 43758.5453);
  }

  void main() {
    float strength = noise(vec3(vUv * 5.0, uTime * 1.5));
    float pulse = sin(uTime * 4.0 + vUv.y * 10.0) * 0.5 + 0.6;

    vec3 color = mix(uColor1, uColor2, pulse);

    float glow = smoothstep(0.5, 0.0, length(vUv - 0.5));

    gl_FragColor = vec4(color * glow * strength, glow * strength);
  }
`
