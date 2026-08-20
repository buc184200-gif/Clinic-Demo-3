import { useState } from 'react';
import { motion } from 'framer-motion';
import { Modal } from '@/components/Modal';
import { ArrowUpRight, ActivitySquare, AlertCircle, Bone, Target } from 'lucide-react';

const conditionsList = [
  {
    id: 1,
    title: 'Lower Back Pain',
    description: 'Persistent or acute pain in the lumbar region affecting daily movement.',
    icon: <ActivitySquare className="w-5 h-5" />,
    details: {
      overview: 'Lower back pain is one of the most common musculoskeletal issues, varying from a dull ache to a sudden, sharp sensation.',
      symptoms: ['Muscle ache', 'Shooting or stabbing pain', 'Pain that radiates down the leg', 'Pain that worsens with bending or walking'],
      diagnosis: 'Clinical examination, MRI or X-ray imaging, and functional movement assessment.',
      treatments: ['Physiotherapy', 'Minimally Invasive Interventions', 'Pain Management']
    }
  },
  {
    id: 2,
    title: 'Slipped or Herniated Disc',
    description: 'Spinal disc displacement causing nerve compression and radiating pain.',
    icon: <AlertCircle className="w-5 h-5" />,
    details: {
      overview: 'A herniated disc occurs when the soft inner core of a spinal disc pushes through a tear in the tougher exterior, potentially irritating nearby nerves.',
      symptoms: ['Arm or leg pain', 'Numbness or tingling', 'Muscle weakness in the affected area'],
      diagnosis: 'Detailed neurological examination and high-resolution MRI scanning.',
      treatments: ['Targeted Physiotherapy', 'Epidural Steroid Injections', 'Microdiscectomy (if severe)']
    }
  },
  {
    id: 3,
    title: 'Sciatica',
    description: 'Nerve pain traveling down the leg, often originating in the lower back.',
    icon: <ActivitySquare className="w-5 h-5" />,
    details: {
      overview: 'Sciatica refers to pain that radiates along the path of the sciatic nerve, which branches from your lower back through your hips and buttocks and down each leg.',
      symptoms: ['Pain radiating from lower spine to buttock and down the leg', 'Discomfort anywhere along the nerve pathway', 'Numbness or muscle weakness'],
      diagnosis: 'Physical exam checking muscle strength and reflexes, sometimes followed by imaging.',
      treatments: ['Physical Therapy', 'Prescription Medications', 'Specialized Injections']
    }
  },
  {
    id: 4,
    title: 'Neck and Shoulder Pain',
    description: 'Cervical spine issues or muscle tension restricting upper body mobility.',
    icon: <Target className="w-5 h-5" />,
    details: {
      overview: 'Pain in the neck and shoulders can arise from abnormalities in the soft tissues, bones, or joints of the cervical spine.',
      symptoms: ['Stiff neck', 'Sharp or stabbing pain in localized area', 'Pain radiating down into shoulders or arms'],
      diagnosis: 'Comprehensive physical examination, X-rays, or MRI to check for disc or nerve involvement.',
      treatments: ['Postural Correction', 'Manual Therapy', 'Ergonomic Adjustments']
    }
  },
  {
    id: 5,
    title: 'Knee Injuries',
    description: 'Ligament, meniscus, or joint surface damage requiring specialized care.',
    icon: <Bone className="w-5 h-5" />,
    details: {
      overview: 'The knee is a complex joint vulnerable to a variety of injuries, often involving torn ligaments or cartilage.',
      symptoms: ['Swelling and stiffness', 'Redness and warmth to the touch', 'Weakness or instability', 'Popping noises at the time of injury'],
      diagnosis: 'Physical examination for joint stability, X-rays, and MRI scans for soft tissue evaluation.',
      treatments: ['Rehabilitation', 'Joint Injections', 'Arthroscopic Surgery']
    }
  },
  {
    id: 6,
    title: 'Sports Injuries',
    description: 'Acute or overuse injuries affecting athletic performance and recovery.',
    icon: <ActivitySquare className="w-5 h-5" />,
    details: {
      overview: 'Injuries occurring during athletic activities, ranging from acute sprains and strains to chronic overuse injuries like tendinopathy.',
      symptoms: ['Sudden severe pain', 'Swelling', 'Inability to place weight on a lower limb', 'Restricted range of motion'],
      diagnosis: 'Dynamic movement analysis and targeted musculoskeletal imaging.',
      treatments: ['Sports-Specific Rehab', 'Regenerative Therapies', 'Surgical Intervention (when necessary)']
    }
  },
  {
    id: 7,
    title: 'Arthritis and Joint Pain',
    description: 'Degenerative changes causing inflammation and reduced joint mobility.',
    icon: <AlertCircle className="w-5 h-5" />,
    details: {
      overview: 'Arthritis involves the inflammation or degeneration of one or more joints, commonly osteoarthritis or rheumatoid arthritis.',
      symptoms: ['Joint pain', 'Stiffness, especially in the morning', 'Swelling', 'Decreased range of motion'],
      diagnosis: 'Blood tests for inflammatory markers, joint fluid analysis, and X-rays to assess cartilage loss.',
      treatments: ['Joint Lubrication Injections', 'Anti-inflammatory Management', 'Joint Replacement Consultation']
    }
  },
  {
    id: 8,
    title: 'Posture and Mobility Problems',
    description: 'Structural imbalances leading to chronic discomfort and movement limitation.',
    icon: <Target className="w-5 h-5" />,
    details: {
      overview: 'Poor posture or structural imbalances that alter biomechanics, leading to uneven wear on joints and chronic muscular pain.',
      symptoms: ['Rounded shoulders', 'Forward head posture', 'Chronic muscle fatigue', 'Back aches'],
      diagnosis: '3D posture scanning and biomechanical gait analysis.',
      treatments: ['Corrective Exercise Programs', 'Ergonomic Education', 'Manual Therapy']
    }
  }
];

export function Conditions() {
  const [selectedCondition, setSelectedCondition] = useState<typeof conditionsList[0] | null>(null);

  return (
    <section id="conditions" className="py-32 relative bg-axis-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl tracking-tight mb-6">
            Specialist care for <br />
            <span className="font-serif italic text-gradient">complex movement conditions.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {conditionsList.map((condition) => (
            <motion.div
              key={condition.id}
              whileHover={{ y: -5 }}
              className="group relative glass-panel p-6 sm:p-8 rounded-2xl cursor-pointer overflow-hidden flex flex-col h-full border border-axis-white/5 hover:border-axis-mint/30 transition-colors"
              onClick={() => setSelectedCondition(condition)}
            >
              {/* Soft hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-axis-mint/0 to-axis-cyan/0 group-hover:from-axis-mint/5 group-hover:to-axis-cyan/5 transition-colors duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-10 h-10 rounded-full bg-axis-surface border border-axis-white/10 flex items-center justify-center text-axis-white/70 group-hover:text-axis-mint transition-colors mb-6">
                  {condition.icon}
                </div>
                <h3 className="text-xl font-medium mb-3">{condition.title}</h3>
                <p className="text-sm text-axis-white/50 leading-relaxed flex-1">
                  {condition.description}
                </p>
                
                <div className="mt-8 flex items-center text-sm font-medium text-axis-mint opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                  <span>Explore condition</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Modal isOpen={!!selectedCondition} onClose={() => setSelectedCondition(null)}>
        {selectedCondition && (
          <div className="space-y-8">
            <div className="flex items-center space-x-4 mb-2">
              <div className="w-12 h-12 rounded-full bg-axis-mint/10 border border-axis-mint/20 flex items-center justify-center text-axis-mint">
                {selectedCondition.icon}
              </div>
              <h2 className="text-3xl font-serif text-axis-white">{selectedCondition.title}</h2>
            </div>
            
            <p className="text-lg text-axis-white/80 font-light leading-relaxed">
              {selectedCondition.details.overview}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-axis-white/10">
              <div>
                <h4 className="text-sm tracking-widest text-axis-mint uppercase mb-4">Common Symptoms</h4>
                <ul className="space-y-3">
                  {selectedCondition.details.symptoms.map((symptom, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-axis-grey mt-2 mr-3 shrink-0" />
                      <span className="text-sm text-axis-white/70">{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm tracking-widest text-axis-mint uppercase mb-4">Diagnosis Approach</h4>
                <p className="text-sm text-axis-white/70 mb-6">{selectedCondition.details.diagnosis}</p>
                
                <h4 className="text-sm tracking-widest text-axis-mint uppercase mb-4">Possible Treatments</h4>
                <ul className="space-y-3">
                  {selectedCondition.details.treatments.map((treatment, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-axis-cyan mt-2 mr-3 shrink-0" />
                      <span className="text-sm text-axis-white/70">{treatment}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="pt-8 mt-4 border-t border-axis-white/10">
              <button 
                onClick={() => {
                  setSelectedCondition(null);
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 bg-axis-green text-axis-card text-sm font-medium rounded-xl shadow-md hover:bg-axis-dark-green transition-colors"
              >
                Book Assessment
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
