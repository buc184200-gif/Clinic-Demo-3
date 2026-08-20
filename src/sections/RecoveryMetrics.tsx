import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export function RecoveryMetrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const CircularProgress = ({ value, label, color }: { value: number, label: string, color: string }) => {
    const [current, setCurrent] = useState(0);
    
    useEffect(() => {
      if (isInView) {
        let start = 0;
        const end = value;
        const duration = 2000;
        const increment = end / (duration / 16);
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCurrent(end);
            clearInterval(timer);
          } else {
            setCurrent(start);
          }
        }, 16);
        return () => clearInterval(timer);
      }
    }, [isInView, value]);

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 flex items-center justify-center mb-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#E8EFE8" strokeWidth="6" />
            <motion.circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke={color} 
              strokeWidth="6" 
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 283" }}
              animate={isInView ? { strokeDasharray: `${(current / 100) * 283} 283` } : {}}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-2xl font-serif text-axis-text">{Math.round(current)}%</span>
          </div>
        </div>
        <span className="text-xs uppercase tracking-widest text-axis-muted text-center">{label}</span>
      </div>
    );
  };

  return (
    <section className="py-32 relative bg-axis-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20" ref={ref}>
          <h2 className="text-4xl md:text-5xl tracking-tight mb-6">
            Progress you can <br />
            <span className="font-serif italic text-gradient">see.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <CircularProgress value={85} label="Range of Motion" color="#176B4D" />
          <CircularProgress value={92} label="Pain Reduction" color="#0D4F38" />
          <CircularProgress value={78} label="Core Stability" color="#65706A" />
          <CircularProgress value={88} label="Walking Confidence" color="#18211D" />
        </div>

        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-axis-white/30">
            * Recovery outcomes vary depending on condition, treatment and individual health.
          </p>
        </div>
      </div>
    </section>
  );
}
