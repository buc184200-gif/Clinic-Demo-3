import { useEffect, useState, useRef } from 'react';
import { SpineScene } from '@/3d/SpineScene';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Activity, ShieldCheck, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function HeroAndStory() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
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

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section ref={triggerRef} className="relative w-full" id="home">
      {/* Fixed Background Canvas */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* Right side for desktop, center for mobile */}
        <div className="absolute inset-0 lg:left-1/2 lg:w-1/2 w-full h-full">
           <SpineScene scrollProgress={scrollProgress} />
        </div>
      </div>

      {/* Scrollable Content Overlay */}
      <div className="relative z-10 w-full -mt-[100vh]">
        
        {/* Stage 1: Hero */}
        <div className="min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full pt-32 pb-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 border border-axis-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm bg-axis-surface/30">
                <span className="w-2 h-2 rounded-full bg-axis-mint animate-pulse" />
                <span className="text-xs font-medium tracking-[0.15em] uppercase text-axis-white/80">
                  Advanced Spine, Joint & Sports Medicine
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] tracking-tight mb-8">
                Move without <br />
                <span className="font-serif italic text-gradient pr-4">holding back.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-axis-white/70 max-w-xl mb-12 font-light leading-relaxed">
                Precision diagnosis, specialist treatment and personalised rehabilitation designed to restore strength, movement and confidence.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-axis-green text-axis-card text-sm font-medium rounded-xl shadow-md hover:bg-axis-dark-green transition-colors w-full sm:w-auto"
                >
                  Book Movement Assessment
                </a>
                <a 
                  href="#treatments" 
                  className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-transparent border border-axis-green/20 text-axis-green text-sm font-medium rounded-xl hover:bg-axis-green/5 transition-colors group"
                >
                  <span>Explore Treatments</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Trust Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-axis-white/10">
                <div className="flex flex-col space-y-2">
                  <span className="text-3xl font-serif text-axis-white">12,000+</span>
                  <span className="text-xs tracking-wider text-axis-grey uppercase flex items-center">
                    <Users className="w-3 h-3 mr-2 text-axis-cyan" /> Patients Treated
                  </span>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-3xl font-serif text-axis-white">25+</span>
                  <span className="text-xs tracking-wider text-axis-grey uppercase flex items-center">
                    <Activity className="w-3 h-3 mr-2 text-axis-cyan" /> Specialist Procedures
                  </span>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-3xl font-serif text-axis-white">96%</span>
                  <span className="text-xs tracking-wider text-axis-grey uppercase flex items-center">
                    <ShieldCheck className="w-3 h-3 mr-2 text-axis-cyan" /> Patient Satisfaction
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stage 2 & 3 & 4: Story (The Movement System) */}
        <div id="movement-system" className="lg:min-h-[200vh] flex flex-col justify-between py-16 lg:py-32 relative">
           
           <div className="max-w-7xl mx-auto px-6 w-full lg:sticky lg:top-1/3">
             <div className="max-w-xl lg:w-1/2 lg:pr-12">
               <h2 className="text-4xl md:text-5xl tracking-tight mb-12 lg:mb-16">
                 Movement begins <br />
                 <span className="font-serif italic text-gradient">with alignment.</span>
               </h2>

               <div className="space-y-12 lg:space-y-16">
                 <div className={cn("transition-opacity duration-500", scrollProgress > 0.2 && scrollProgress < 0.5 || window.innerWidth < 1024 ? "opacity-100" : "opacity-30")}>
                   <div className="text-xs tracking-widest text-axis-mint mb-3">01 — STRUCTURE</div>
                   <p className="text-xl md:text-2xl font-light text-axis-white/90">
                     The spine provides strength, balance and support.
                   </p>
                 </div>
                 
                 <div className={cn("transition-opacity duration-500", scrollProgress >= 0.5 && scrollProgress < 0.75 || window.innerWidth < 1024 ? "opacity-100" : "opacity-30")}>
                   <div className="text-xs tracking-widest text-axis-mint mb-3">02 — MOBILITY</div>
                   <p className="text-xl md:text-2xl font-light text-axis-white/90">
                     Healthy joints allow controlled and efficient movement.
                   </p>
                 </div>
                 
                 <div className={cn("transition-opacity duration-500", scrollProgress >= 0.75 || window.innerWidth < 1024 ? "opacity-100" : "opacity-30")}>
                   <div className="text-xs tracking-widest text-axis-mint mb-3">03 — NERVE FUNCTION</div>
                   <p className="text-xl md:text-2xl font-light text-axis-white/90">
                     The nervous system connects movement, sensation and control.
                   </p>
                 </div>
               </div>
             </div>
           </div>
        </div>
        
      </div>
    </section>
  );
}
