import { motion } from 'framer-motion';
import { Scan, Activity, Eye } from 'lucide-react';

export function Diagnostics() {
  return (
    <section id="technology" className="py-32 relative bg-axis-graphite overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl tracking-tight mb-8">
              See movement <br />
              <span className="font-serif italic text-gradient">differently.</span>
            </h2>
            
            <p className="text-lg text-axis-white/70 font-light leading-relaxed mb-12">
              Our specialists combine advanced imaging, motion analysis and clinical expertise to understand how your spine and joints behave during real movement.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-axis-surface border border-axis-white/10 flex items-center justify-center shrink-0 mr-6">
                  <Scan className="w-4 h-4 text-axis-mint" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">3D Posture Scanning</h4>
                  <p className="text-sm text-axis-white/50 leading-relaxed">High-resolution optical mapping to identify structural imbalances without radiation.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-axis-surface border border-axis-white/10 flex items-center justify-center shrink-0 mr-6">
                  <Activity className="w-4 h-4 text-axis-mint" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Dynamic Gait Analysis</h4>
                  <p className="text-sm text-axis-white/50 leading-relaxed">Sensors track joint angles and pressure distribution while walking or running.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-axis-surface border border-axis-white/10 flex items-center justify-center shrink-0 mr-6">
                  <Eye className="w-4 h-4 text-axis-mint" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Digital Spinal Mapping</h4>
                  <p className="text-sm text-axis-white/50 leading-relaxed">Advanced software creates a precise functional map of your intervertebral movement.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative aspect-square lg:aspect-auto lg:h-[600px] flex items-center justify-center bg-axis-main rounded-3xl border border-axis-border overflow-hidden">
            {/* Minimal Abstract Motion Figure */}
            <div className="relative w-full h-full flex items-center justify-center">
              <svg viewBox="0 0 400 600" className="w-[80%] h-[80%] max-w-sm drop-shadow-[0_0_15px_rgba(23,107,77,0.15)]">
                {/* Scanning Line */}
                <motion.line 
                  x1="0" y1="0" x2="400" y2="0"
                  stroke="#176B4D" strokeWidth="2"
                  animate={{ y: [0, 600, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="opacity-50"
                />
                
                {/* Abstract Spine/Torso */}
                <motion.path
                  d="M200,100 Q220,250 200,400"
                  stroke="#18211D"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  animate={{ d: ["M200,100 Q220,250 200,400", "M200,100 Q180,250 200,400", "M200,100 Q220,250 200,400"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="opacity-40"
                />
                
                {/* Hips */}
                <motion.path
                  d="M160,400 L240,400"
                  stroke="#18211D"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className="opacity-40"
                />
                
                {/* Legs (Walking motion) */}
                <motion.path
                  d="M170,400 L160,500 L180,580"
                  stroke="#65706A"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                  animate={{ d: ["M170,400 L160,500 L180,580", "M170,400 L180,500 L160,580", "M170,400 L160,500 L180,580"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path
                  d="M230,400 L240,500 L220,580"
                  stroke="#176B4D"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                  animate={{ d: ["M230,400 L240,500 L220,580", "M230,400 L220,500 L240,580", "M230,400 L240,500 L220,580"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />

                {/* Nodes/Joints */}
                <circle cx="200" cy="100" r="15" fill="#FFFFFF" stroke="#18211D" strokeWidth="3" />
                <circle cx="200" cy="400" r="8" fill="#176B4D" />
                
                <motion.circle cx="160" cy="500" r="6" fill="#FFFFFF" stroke="#65706A" strokeWidth="2" 
                  animate={{ cx: [160, 180, 160] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
                />
                <motion.circle cx="240" cy="500" r="6" fill="#FFFFFF" stroke="#176B4D" strokeWidth="2" 
                  animate={{ cx: [240, 220, 240] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
                />
              </svg>
            </div>
            
            {/* UI overlay accents */}
            <div className="absolute top-6 left-6 flex flex-col space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-axis-green">Telemetry</span>
              <span className="text-xs text-axis-muted font-mono">ACTIVE SCAN</span>
            </div>
            <div className="absolute bottom-6 right-6 flex flex-col items-end space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-axis-green">Gait Balance</span>
              <span className="text-xs text-axis-muted font-mono">94.2%</span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
