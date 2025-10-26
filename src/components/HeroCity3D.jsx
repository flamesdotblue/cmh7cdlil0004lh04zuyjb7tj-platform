import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import * as THREE from 'three';

function Building({ position = [0, 0, 0], height = 3, color = '#1d4ed8' }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={[1, height, 1]} />
      <meshStandardMaterial color={color} metalness={0.25} roughness={0.5} />
    </mesh>
  );
}

function City() {
  const blocks = useMemo(() => {
    const arr = [];
    for (let x = -6; x <= 6; x++) {
      for (let z = -6; z <= 6; z++) {
        const h = 0.8 + Math.abs(Math.sin(x * 0.7 + z * 0.45)) * 6 + (x === 0 && z === 0 ? 5 : 0);
        const col = new THREE.Color().setHSL(0.6 + (x + z) / 30, 0.5, 0.5).getStyle();
        arr.push(<Building key={`${x}-${z}`} position={[x * 1.4, h / 2, z * 1.4]} height={h} color={col} />);
      }
    }
    return arr;
  }, []);

  return (
    <group>
      {blocks}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>
    </group>
  );
}

export default function HeroCity3D() {
  return (
    <section className="relative h-[86vh] md:h-[92vh] w-full overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <Canvas shadows camera={{ position: [8, 8, 14], fov: 50 }}>
          <ambientLight intensity={0.45} />
          <directionalLight position={[6, 10, 6]} intensity={1} castShadow />
          <City />
          <Environment preset="city" />
          <OrbitControls enablePan={false} enableZoom={false} />
        </Canvas>
      </motion.div>
      <div className="relative z-10 h-full container mx-auto px-6 grid place-items-center text-center pointer-events-none">
        <div>
          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-semibold tracking-tight text-zinc-900 drop-shadow"
          >
            Welcome to Blue Estates
          </motion.h1>
          <motion.p
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-2xl mx-auto text-zinc-700"
          >
            Cinematic real estate journeys with immersive 3D and smooth motion.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
