import { useState } from 'react';
import { motion } from 'framer-motion';
import { Modal } from '@/components/Modal';
import { Plus } from 'lucide-react';

const treatmentsList = [
  {
    id: 1,
    title: 'Physiotherapy and Rehabilitation',
    description: 'Targeted exercises to restore mobility and strength.',
    duration: '4-8 weeks',
    details: {
      purpose: 'To rebuild muscular support around the joints, improve flexibility, and correct movement mechanics to prevent future injury.',
      conditions: ['Post-surgery recovery', 'Sports injuries', 'Chronic back pain', 'Joint instability'],
      appointment: 'Initial assessment: 60 minutes. Follow-ups: 45 minutes.',
      recovery: 'Gradual improvement over several weeks. Requires active participation and home exercises.'
    }
  },
  {
    id: 2,
    title: 'Minimally Invasive Spine Treatment',
    description: 'Advanced techniques with reduced recovery times.',
    duration: 'Day case procedure',
    details: {
      purpose: 'To relieve nerve compression or stabilize the spine using small incisions, specialized instruments, and advanced imaging guidance.',
      conditions: ['Herniated discs', 'Spinal stenosis', 'Sciatica'],
      appointment: 'Pre-op consultation: 45 minutes. Procedure duration varies.',
      recovery: 'Typically home the same day. Most patients return to light activities within 1-2 weeks.'
    }
  },
  {
    id: 3,
    title: 'Joint Injection Therapy',
    description: 'Targeted pain relief and anti-inflammatory treatment.',
    duration: '30 min session',
    details: {
      purpose: 'To deliver powerful anti-inflammatory medication or joint lubricants directly into the affected area for rapid symptom relief.',
      conditions: ['Osteoarthritis', 'Tendonitis', 'Severe joint inflammation'],
      appointment: 'Procedure takes 15-30 minutes, often guided by ultrasound.',
      recovery: 'Immediate resting for 24 hours. Full effects typically felt within 3-5 days.'
    }
  },
  {
    id: 4,
    title: 'Posture Correction',
    description: 'Biomechanical adjustment for long-term structural health.',
    duration: 'Ongoing program',
    details: {
      purpose: 'To retrain the nervous system and musculature to maintain neutral spine alignment, reducing chronic stress on tissues.',
      conditions: ['Neck and shoulder tension', 'Chronic lower back pain', 'Headaches caused by tension'],
      appointment: 'Initial mapping: 60 minutes. Guided sessions: 45 minutes.',
      recovery: 'Requires daily mindful practice. Significant postural changes take 3-6 months.'
    }
  }
];

export function Treatments() {
  const [selectedTreatment, setSelectedTreatment] = useState<typeof treatmentsList[0] | null>(null);

  return (
    <section id="treatments" className="py-32 relative bg-axis-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl tracking-tight mb-6">
              Treatment designed <br />
              <span className="font-serif italic text-gradient">around your movement.</span>
            </h2>
          </div>
          <p className="text-axis-white/50 max-w-sm text-sm">
            Our approach blends advanced surgical precision with conservative therapies to ensure the most effective, least invasive path to recovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {treatmentsList.map((treatment, i) => (
            <motion.div
              key={treatment.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-axis-black rounded-2xl p-6 sm:p-8 border border-axis-white/5 hover:border-axis-white/20 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 cursor-pointer"
              onClick={() => setSelectedTreatment(treatment)}
            >
              <div className="flex-1">
                <span className="inline-block px-3 py-1 rounded-full bg-axis-surface text-axis-mint text-[10px] uppercase tracking-widest mb-4">
                  {treatment.duration}
                </span>
                <h3 className="text-xl font-medium mb-2 group-hover:text-axis-mint transition-colors">{treatment.title}</h3>
                <p className="text-sm text-axis-white/50">{treatment.description}</p>
              </div>
              
              <div className="w-12 h-12 rounded-full bg-axis-surface border border-axis-white/10 flex items-center justify-center shrink-0 text-axis-white/70 group-hover:bg-axis-white group-hover:text-axis-black transition-all">
                <Plus className="w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Modal isOpen={!!selectedTreatment} onClose={() => setSelectedTreatment(null)}>
        {selectedTreatment && (
          <div className="space-y-8">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-axis-surface border border-axis-white/10 text-axis-mint text-[10px] uppercase tracking-widest mb-4">
                {selectedTreatment.duration}
              </span>
              <h2 className="text-3xl font-serif text-axis-white">{selectedTreatment.title}</h2>
            </div>
            
            <div className="bg-axis-black/50 p-6 rounded-xl border border-axis-white/5">
              <h4 className="text-sm tracking-widest text-axis-mint uppercase mb-3">Treatment Purpose</h4>
              <p className="text-sm text-axis-white/80 leading-relaxed font-light">
                {selectedTreatment.details.purpose}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm tracking-widest text-axis-grey uppercase mb-3">Suitable For</h4>
                <ul className="space-y-2">
                  {selectedTreatment.details.conditions.map((condition, i) => (
                    <li key={i} className="flex items-center text-sm text-axis-white/70">
                      <div className="w-1 h-1 rounded-full bg-axis-white/30 mr-3" />
                      {condition}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm tracking-widest text-axis-grey uppercase mb-2">Typical Appointment</h4>
                  <p className="text-sm text-axis-white/70">{selectedTreatment.details.appointment}</p>
                </div>
                <div>
                  <h4 className="text-sm tracking-widest text-axis-grey uppercase mb-2">Recovery Guidance</h4>
                  <p className="text-sm text-axis-white/70">{selectedTreatment.details.recovery}</p>
                </div>
              </div>
            </div>
            
            <div className="pt-8 mt-4 border-t border-axis-white/10 flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={() => {
                  setSelectedTreatment(null);
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 bg-axis-green text-axis-card text-sm font-medium rounded-xl shadow-md hover:bg-axis-dark-green transition-colors"
              >
                Book Consultation
              </button>
              <p className="text-xs text-axis-white/40 text-center sm:text-left">
                Treatment plans are personalized following a comprehensive clinical assessment.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
