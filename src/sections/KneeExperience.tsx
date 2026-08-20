import { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { KneeModel } from '@/3d/KneeModel';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

function KneeFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center text-axis-mint font-medium tracking-widest text-sm uppercase z-50">
      Loading knee model...
    </div>
  );
}

export function KneeExperience() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!triggerRef.current) return;

    const st = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      }
    });

    return () => st.kill();
  }, []);

  return (
    <section ref={triggerRef} className="relative w-full bg-axis-black lg:h-[300vh]">
      <div className="lg:sticky lg:top-0 left-0 w-full lg:h-screen flex flex-col lg:flex-row items-center overflow-hidden">
        
        {/* Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:pl-12 lg:pl-24 relative z-10 pt-24 pb-12 lg:py-0 pointer-events-none lg:h-full">
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
            Inside every <br />
            <span className="font-serif italic text-gradient">movement.</span>
          </h2>
          <p className="text-lg text-axis-white/70 font-light leading-relaxed max-w-md mb-12">
            The knee coordinates bone, cartilage, muscles and ligaments through every step, turn and landing.
          </p>
          
          <div className="space-y-6">
            <div className={cn("transition-opacity duration-500", scrollProgress > 0.3 && scrollProgress < 0.6 || window.innerWidth < 1024 ? "opacity-100" : "opacity-30")}>
              <span className="text-[10px] uppercase tracking-widest text-axis-grey">01 / Structure</span>
              <h4 className="text-lg font-medium text-axis-mint mt-1">Patella</h4>
            </div>
            <div className={cn("transition-opacity duration-500", scrollProgress >= 0.5 && scrollProgress < 0.8 || window.innerWidth < 1024 ? "opacity-100" : "opacity-30")}>
              <span className="text-[10px] uppercase tracking-widest text-axis-grey">02 / Support</span>
              <h4 className="text-lg font-medium text-axis-mint mt-1">Ligaments (ACL/PCL)</h4>
            </div>
            <div className={cn("transition-opacity duration-500", scrollProgress >= 0.7 || window.innerWidth < 1024 ? "opacity-100" : "opacity-30")}>
              <span className="text-[10px] uppercase tracking-widest text-axis-grey">03 / Cushion</span>
              <h4 className="text-lg font-medium text-axis-mint mt-1">Meniscus & Cartilage</h4>
            </div>
          </div>
        </div>

        {/* 3D Canvas */}
        <div className="relative w-full h-[50vh] lg:h-full lg:w-1/2">
          <Suspense fallback={<KneeFallback />}>
            <Canvas
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
              className="w-full h-full"
            >
              <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={40} />
              
              <ambientLight intensity={0.7} />
              <spotLight position={[5, 10, 5]} angle={0.2} penumbra={1} intensity={2} color="#E8EFE8" />
              <pointLight position={[-5, 0, -5]} intensity={1.5} color="#FFFFFF" />
              <pointLight position={[0, 0, 5]} intensity={scrollProgress > 0.5 || window.innerWidth < 1024 ? 2 : 0} color="#176B4D" distance={8} />

              <KneeModel scrollProgress={scrollProgress} />
              
              <ContactShadows 
                position={[0, -4, 0]} 
                opacity={0.15} 
                scale={10} 
                blur={2} 
                far={10} 
                color="#18211D"
              />
            </Canvas>
          </Suspense>
        </div>
        
      </div>
    </section>
  );
}
