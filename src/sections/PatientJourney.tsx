import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const journeySteps = [
  {
    num: '01',
    title: 'Movement Assessment',
    desc: 'Your symptoms, mobility and lifestyle are evaluated in detail.'
  },
  {
    num: '02',
    title: 'Advanced Diagnosis',
    desc: 'Imaging and movement analysis identify the source of the problem.'
  },
  {
    num: '03',
    title: 'Personalised Treatment',
    desc: 'A treatment plan is designed around your condition and goals.'
  },
  {
    num: '04',
    title: 'Guided Rehabilitation',
    desc: 'Specialist rehabilitation rebuilds control, strength and confidence.'
  },
  {
    num: '05',
    title: 'Long-Term Performance',
    desc: 'Movement habits and strength programmes help reduce future problems.'
  }
];

export function PatientJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="recovery" className="py-32 relative bg-axis-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl tracking-tight mb-6">
            From assessment to <br />
            <span className="font-serif italic text-gradient">confident movement.</span>
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto" ref={containerRef}>
          {/* Background Line */}
          <div className="absolute top-0 bottom-0 left-[27px] md:left-1/2 md:-ml-px w-0.5 bg-axis-border" />
          
          {/* Animated Glowing Line */}
          <motion.div 
            className="absolute top-0 left-[27px] md:left-1/2 md:-ml-px w-0.5 bg-gradient-to-b from-axis-green to-axis-dark-green origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-16 md:space-y-24">
            {journeySteps.map((step, i) => (
              <div key={step.num} className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                
                {/* Node */}
                <div className="absolute left-[18px] md:left-1/2 md:-ml-2.5 top-0 md:top-1/2 md:-mt-2.5 w-5 h-5 rounded-full bg-axis-card border-2 border-axis-green z-10 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-axis-green" />
                </div>

                {/* Left Side (Empty on mobile, content on evens for desktop) */}
                <div className="hidden md:block w-1/2 pr-16 text-right">
                  {i % 2 === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <span className="text-[10px] uppercase tracking-widest text-axis-muted mb-2 block">{step.num}</span>
                      <h3 className="text-2xl font-serif text-axis-text mb-2">{step.title}</h3>
                      <p className="text-sm text-axis-muted">{step.desc}</p>
                    </motion.div>
                  ) : null}
                </div>

                {/* Right Side (Content for mobile, content on odds for desktop) */}
                <div className="w-full md:w-1/2 pl-16 pt-1 md:pt-0">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={i % 2 === 0 ? "md:hidden" : ""}
                  >
                    <span className="text-[10px] uppercase tracking-widest text-axis-muted mb-2 block">{step.num}</span>
                    <h3 className="text-2xl font-serif text-axis-text mb-2">{step.title}</h3>
                    <p className="text-sm text-axis-muted">{step.desc}</p>
                  </motion.div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
