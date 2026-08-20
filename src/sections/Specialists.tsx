import { useState } from 'react';
import { motion } from 'framer-motion';
import { Modal } from '@/components/Modal';

const specialists = [
  {
    id: 1,
    name: 'Dr. Adrian Vale',
    role: 'Consultant Spine Surgeon',
    qualifications: 'MD, FRCS (Tr & Orth)',
    experience: '18+ Years',
    bio: 'Dr. Vale specializes in complex spinal reconstruction and minimally invasive spine surgery. He has pioneered several endoscopic techniques now used globally.',
    expertise: ['Minimally Invasive Discectomy', 'Spinal Fusion', 'Scoliosis Correction'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop',
    initials: 'AV'
  },
  {
    id: 2,
    name: 'Dr. Mira Khanna',
    role: 'Sports Medicine Specialist',
    qualifications: 'MBBS, MSc Sports Medicine',
    experience: '12+ Years',
    bio: 'Dr. Khanna focuses on non-operative management of sports injuries, utilizing advanced biologics and dynamic movement analysis to optimize recovery.',
    expertise: ['Regenerative Injection Therapy', 'Tendon Injuries', 'Athletic Performance'],
    image: 'https://images.unsplash.com/photo-1594824436998-fdfda029a1d4?q=80&w=800&auto=format&fit=crop',
    initials: 'MK'
  },
  {
    id: 3,
    name: 'Dr. Elias Hart',
    role: 'Orthopaedic and Joint Surgeon',
    qualifications: 'MD, PhD, FRCS',
    experience: '15+ Years',
    bio: 'Dr. Hart is an internationally recognized expert in knee and hip preservation, focusing on cartilage repair and advanced arthroscopic techniques.',
    expertise: ['ACL Reconstruction', 'Meniscal Repair', 'Joint Preservation'],
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop',
    initials: 'EH'
  },
  {
    id: 4,
    name: 'Dr. Sophia Rey',
    role: 'Lead Rehabilitation Specialist',
    qualifications: 'DPT, OCS, SCS',
    experience: '10+ Years',
    bio: 'Dr. Rey bridges the gap between early clinical recovery and high-level physical performance, designing custom biomechanical rehabilitation programs.',
    expertise: ['Post-Surgical Rehab', 'Spinal Stabilization', 'Biomechanical Correction'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
    initials: 'SR'
  }
];

export function Specialists() {
  const [selectedDoc, setSelectedDoc] = useState<typeof specialists[0] | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section id="specialists" className="py-32 relative bg-axis-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl tracking-tight mb-6">
            Expertise across every <br />
            <span className="font-serif italic text-gradient">stage of recovery.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialists.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden bg-axis-card border border-axis-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
              onClick={() => setSelectedDoc(doc)}
            >
              <div className="w-full aspect-[4/5] bg-axis-secondary relative overflow-hidden shrink-0">
                {!imageErrors[doc.id] ? (
                  <img 
                    src={doc.image} 
                    alt={doc.name} 
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    onError={() => handleImageError(doc.id)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-axis-sage text-axis-green text-4xl font-serif">
                    {doc.initials}
                  </div>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-1 bg-axis-card">
                <span className="text-[10px] uppercase tracking-widest text-axis-green mb-2 block">
                  {doc.experience}
                </span>
                <h3 className="text-xl font-serif text-axis-text mb-1">{doc.name}</h3>
                <p className="text-sm text-axis-muted mb-6 flex-1">{doc.role}</p>
                <div className="inline-flex items-center text-xs font-medium text-axis-green group-hover:text-axis-dark-green transition-colors mt-auto">
                  View Profile <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Modal isOpen={!!selectedDoc} onClose={() => setSelectedDoc(null)}>
        {selectedDoc && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <div className="w-24 h-24 rounded-full bg-axis-secondary border border-axis-border shrink-0 overflow-hidden">
                {!imageErrors[selectedDoc.id] ? (
                  <img 
                    src={selectedDoc.image} 
                    alt={selectedDoc.name} 
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-axis-sage text-axis-green text-2xl font-serif">
                    {selectedDoc.initials}
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-3xl font-serif text-axis-text mb-2">{selectedDoc.name}</h2>
                <p className="text-axis-green font-medium mb-1">{selectedDoc.role}</p>
                <p className="text-sm text-axis-muted">{selectedDoc.qualifications}</p>
              </div>
            </div>
            
            <div className="pt-6 border-t border-axis-border">
              <h4 className="text-sm tracking-widest text-axis-muted uppercase mb-4">Biography</h4>
              <p className="text-axis-text/80 leading-relaxed font-light">
                {selectedDoc.bio}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm tracking-widest text-axis-muted uppercase mb-4">Areas of Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {selectedDoc.expertise.map((item, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full bg-axis-secondary border border-axis-border text-xs text-axis-text/70">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="pt-8 mt-4 border-t border-axis-border flex items-center justify-between">
              <span className="text-sm text-axis-muted">Consultations available</span>
              <button 
                onClick={() => {
                  setSelectedDoc(null);
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-axis-green text-axis-card text-sm font-medium rounded-xl hover:bg-axis-dark-green transition-colors shadow-sm"
              >
                Book Consultation
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
