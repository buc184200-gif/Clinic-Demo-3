import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export function MovementComparison() {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  
  // Use a percentage (0 to 100) for the slider position
  const [sliderPos, setSliderPos] = useState(50);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPos(Math.max(0, sliderPos - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPos(Math.min(100, sliderPos + 5));
    }
  };

  return (
    <section className="py-32 relative bg-axis-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl tracking-tight mb-6 text-center">
            Experience the difference that <br />
            <span className="font-serif italic text-gradient">movement can make.</span>
          </h2>
        </div>

        <div 
          ref={containerRef}
          className="relative w-full max-w-5xl mx-auto h-[60vh] min-h-[400px] rounded-3xl overflow-hidden cursor-ew-resize select-none border border-axis-white/10"
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          onPointerLeave={() => setIsDragging(false)}
          onPointerMove={handlePointerMove}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          role="slider"
          aria-valuenow={sliderPos}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Before and after movement comparison"
        >
          {/* Before (Left Side - Underneath) */}
          <div className="absolute inset-0 bg-axis-secondary flex items-center justify-center">
            <div className="relative w-full h-full flex flex-col items-center justify-center opacity-70 grayscale">
               <svg viewBox="0 0 200 400" className="w-[40%] h-[70%] max-w-sm">
                 <path d="M100,50 Q130,150 110,250 L100,350" stroke="#65706A" strokeWidth="8" fill="none" strokeLinecap="round" />
                 <circle cx="100" cy="50" r="20" fill="#FFFFFF" stroke="#65706A" strokeWidth="4" />
               </svg>
               <div className="absolute bottom-10 left-10 text-axis-muted">
                 <span className="text-[10px] uppercase tracking-widest block mb-1">Before Treatment</span>
                 <p className="text-sm">Restricted Posture & Reduced Range</p>
               </div>
            </div>
          </div>

          {/* After (Right Side - Clipped on top) */}
          <div 
            className="absolute inset-0 bg-axis-card flex items-center justify-center border-r border-axis-green/20 shadow-[10px_0_30px_rgba(23,107,77,0.05)]"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <div className="relative w-full h-full flex flex-col items-center justify-center">
               <svg viewBox="0 0 200 400" className="w-[40%] h-[70%] max-w-sm drop-shadow-[0_0_15px_rgba(23,107,77,0.1)]">
                 <path d="M100,50 Q100,150 100,250 L100,350" stroke="#176B4D" strokeWidth="8" fill="none" strokeLinecap="round" />
                 <circle cx="100" cy="50" r="20" fill="#FFFFFF" stroke="#176B4D" strokeWidth="4" />
                 <path d="M100,150 L60,200 M100,150 L140,200" stroke="#0D4F38" strokeWidth="6" fill="none" strokeLinecap="round" />
               </svg>
               <div className="absolute bottom-10 right-10 text-right text-axis-text">
                 <span className="text-[10px] uppercase tracking-widest text-axis-green block mb-1">After Treatment</span>
                 <p className="text-sm">Improved Posture & Full Range</p>
               </div>
            </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-axis-green/30 z-10"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-axis-card rounded-full border border-axis-border flex items-center justify-center shadow-lg backdrop-blur-md text-axis-green">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" className="opacity-50" />
                <polyline points="9 18 15 12 9 6" className="opacity-50" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
