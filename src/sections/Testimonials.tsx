import { Star, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    treatment: 'Knee Ligament Reconstruction',
    quote: 'I returned to running with more confidence than I had before my injury. The attention to detail in my rehabilitation program was incredible.',
    rating: 5
  },
  {
    id: 2,
    name: 'James T.',
    treatment: 'Minimally Invasive Spine Surgery',
    quote: 'The team explained every stage clearly and built a recovery plan around my lifestyle. For the first time in years, I can move without constantly thinking about my back.',
    rating: 5
  },
  {
    id: 3,
    name: 'Elena R.',
    treatment: 'Posture & Mobility Correction',
    quote: 'I thought chronic shoulder pain was just a part of getting older. The specialists here changed my biomechanics entirely. Truly life-changing care.',
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-32 relative bg-axis-graphite">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl tracking-tight mb-6">
            Back to the moments <br />
            <span className="font-serif italic text-gradient">that matter.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-axis-surface rounded-2xl p-8 border border-axis-white/5 flex flex-col h-full"
            >
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-axis-amber text-axis-amber" />
                ))}
              </div>
              
              <p className="text-lg font-serif text-axis-white/90 leading-relaxed mb-8 flex-1">
                "{item.quote}"
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-axis-white/10">
                <div>
                  <h4 className="font-medium text-axis-white">{item.name}</h4>
                  <span className="text-xs text-axis-grey">{item.treatment}</span>
                </div>
                {i === 0 && (
                  <button className="w-10 h-10 rounded-full bg-axis-main border border-axis-border flex items-center justify-center hover:bg-axis-green/10 hover:text-axis-green transition-colors group">
                    <Play className="w-3 h-3 ml-0.5" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
