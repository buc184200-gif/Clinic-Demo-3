import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';

export function Contact() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <section id="contact" className="relative bg-axis-secondary overflow-hidden">
      {/* CTA Header */}
      <div className="py-32 relative border-b border-axis-border">
        {/* Abstract Background pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wave" width="100" height="20" patternUnits="userSpaceOnUse">
                <path d="M0,10 Q25,20 50,10 T100,10" fill="none" stroke="#176B4D" strokeWidth="0.5" className="opacity-30"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave)" />
          </svg>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl tracking-tight mb-8 text-axis-text">
            Your next movement <br />
            <span className="font-serif italic text-gradient">starts here.</span>
          </h2>
          <p className="text-xl text-axis-muted font-light max-w-2xl mx-auto mb-12">
            Schedule a specialist assessment and take the first step toward stronger, more confident movement.
          </p>
        </div>
      </div>

      {/* Form & Info */}
      <div className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Form */}
          <div className="bg-axis-card p-8 sm:p-12 rounded-3xl border border-axis-border shadow-sm">
            <h3 className="text-2xl font-serif mb-8 text-axis-text">Request an Appointment</h3>
            
            {formState === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center h-full min-h-[400px]"
              >
                <div className="w-16 h-16 rounded-full bg-axis-green/10 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-axis-green" />
                </div>
                <h4 className="text-2xl font-serif mb-2 text-axis-text">Request Received</h4>
                <p className="text-axis-muted max-w-sm">
                  Thank you. Our patient coordination team will contact you shortly to confirm your appointment time.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs tracking-widest text-axis-muted uppercase block">Full Name</label>
                    <input required type="text" id="name" className="w-full bg-axis-main border border-axis-border rounded-xl px-4 py-3 text-axis-text focus:outline-none focus:border-axis-green focus:ring-1 focus:ring-axis-green transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-xs tracking-widest text-axis-muted uppercase block">Phone Number</label>
                    <input required type="tel" id="phone" className="w-full bg-axis-main border border-axis-border rounded-xl px-4 py-3 text-axis-text focus:outline-none focus:border-axis-green focus:ring-1 focus:ring-axis-green transition-colors" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs tracking-widest text-axis-muted uppercase block">Email Address</label>
                  <input required type="email" id="email" className="w-full bg-axis-main border border-axis-border rounded-xl px-4 py-3 text-axis-text focus:outline-none focus:border-axis-green focus:ring-1 focus:ring-axis-green transition-colors" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="concern" className="text-xs tracking-widest text-axis-muted uppercase block">Main Concern</label>
                    <select required id="concern" className="w-full bg-axis-main border border-axis-border rounded-xl px-4 py-3 text-axis-text focus:outline-none focus:border-axis-green focus:ring-1 focus:ring-axis-green transition-colors appearance-none">
                      <option value="">Select concern...</option>
                      <option value="back">Back pain</option>
                      <option value="neck">Neck pain</option>
                      <option value="knee">Knee injury</option>
                      <option value="sports">Sports injury</option>
                      <option value="joint">Joint pain</option>
                      <option value="posture">Posture problem</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="date" className="text-xs tracking-widest text-axis-muted uppercase block">Preferred Date</label>
                    <input type="date" id="date" className="w-full bg-axis-main border border-axis-border rounded-xl px-4 py-3 text-axis-text focus:outline-none focus:border-axis-green focus:ring-1 focus:ring-axis-green transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs tracking-widest text-axis-muted uppercase block">Additional Notes</label>
                  <textarea id="message" rows={4} className="w-full bg-axis-main border border-axis-border rounded-xl px-4 py-3 text-axis-text focus:outline-none focus:border-axis-green focus:ring-1 focus:ring-axis-green transition-colors resize-none"></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={formState === 'loading'}
                  className="w-full px-8 py-4 bg-axis-green text-axis-card text-sm font-medium rounded-xl hover:bg-axis-dark-green transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {formState === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-axis-card/50 border-t-axis-card rounded-full animate-spin" />
                  ) : (
                    "Submit Request"
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center lg:pl-12">
            <div className="mb-12">
              <h3 className="text-3xl font-serif mb-6 text-axis-text">AXIS Spine & Mobility Institute</h3>
              <p className="text-axis-muted leading-relaxed max-w-md">
                A world-class private orthopaedic facility dedicated to advanced biomechanics, spinal health, and sports injury recovery.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-axis-green shrink-0 mt-1" />
                <div>
                  <h5 className="font-medium mb-1 text-axis-text">Location</h5>
                  <p className="text-axis-muted text-sm leading-relaxed">
                    24 Meridian Health Avenue<br />
                    Dubai Healthcare District<br />
                    Dubai, UAE
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-axis-green shrink-0 mt-1" />
                <div>
                  <h5 className="font-medium mb-1 text-axis-text">Phone</h5>
                  <p className="text-axis-muted text-sm leading-relaxed">+971 4 555 0284</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-axis-green shrink-0 mt-1" />
                <div>
                  <h5 className="font-medium mb-1 text-axis-text">Email</h5>
                  <p className="text-axis-muted text-sm leading-relaxed">care@axismobility.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-axis-green shrink-0 mt-1" />
                <div>
                  <h5 className="font-medium mb-1 text-axis-text">Hours</h5>
                  <p className="text-axis-muted text-sm leading-relaxed">Monday – Saturday<br />8:00 AM – 8:00 PM</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-12 w-full h-48 bg-axis-card rounded-2xl border border-axis-border relative overflow-hidden flex items-center justify-center">
               <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxIiBmaWxsPSIjRjRGMkVEIj48L2NpcmNsZT4KPC9zdmc+')] mix-blend-overlay" />
               <MapPin className="w-8 h-8 text-axis-green/20" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
