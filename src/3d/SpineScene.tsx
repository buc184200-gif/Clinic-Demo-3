import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { SpineModel } from './SpineModel';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SceneProps {
  scrollProgress: number;
}

function SpineFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center text-axis-mint font-medium tracking-widest text-sm uppercase z-50">
      Loading spine model...
    </div>
  );
}

export function SpineScene({ scrollProgress }: SceneProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full h-full relative">
      <Suspense fallback={<SpineFallback />}>
        <Canvas
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={isMobile ? 60 : 45} />
          
          <color attach="background" args={['#F8F7F2']} />
          
          {/* Cinematic Lighting */}
          <ambientLight intensity={0.7} />
          <spotLight 
            position={[10, 20, 10]} 
            angle={0.15} 
            penumbra={1} 
            intensity={2} 
            color="#E8EFE8" // Soft sage accent
            castShadow
          />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color="#FFFFFF" />
          <pointLight 
            position={[0, scrollProgress > 0.4 ? -5 : 5, 2]} 
            intensity={scrollProgress > 0.4 ? 2 : 0.5} 
            color="#176B4D" // Green scanning light
            distance={10} 
          />

          <SpineModel scrollProgress={scrollProgress} isMobile={isMobile} />
          
          <ContactShadows 
            position={[0, -14, 0]} 
            opacity={0.15} 
            scale={20} 
            blur={2} 
            far={15} 
            color="#18211D"
          />
        </Canvas>
      </Suspense>
      
      {/* Soft circular glow overlay */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
        <div className="w-[80%] h-[80%] max-w-lg max-h-lg rounded-full bg-axis-mint/20 blur-[100px]" />
      </div>
    </div>
  );
}
