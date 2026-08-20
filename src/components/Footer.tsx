import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-axis-secondary border-t border-axis-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <div 
              className="flex flex-col cursor-pointer mb-6"
              onClick={scrollToTop}
            >
              <span className="text-xl font-medium tracking-wide text-axis-text">AXIS</span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-axis-muted">
                Spine & Mobility Institute
              </span>
            </div>
            <p className="text-sm text-axis-muted leading-relaxed max-w-xs">
              A world-class private orthopaedic institute combining advanced biomechanics technology with luxury healthcare.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h5 className="text-sm tracking-widest text-axis-text uppercase mb-6">Expertise</h5>
            <ul className="space-y-4">
              <li><a href="#conditions" className="text-sm text-axis-muted hover:text-axis-green transition-colors inline-flex items-center">Conditions <ArrowUpRight className="w-3 h-3 ml-1 opacity-50" /></a></li>
              <li><a href="#treatments" className="text-sm text-axis-muted hover:text-axis-green transition-colors inline-flex items-center">Treatments <ArrowUpRight className="w-3 h-3 ml-1 opacity-50" /></a></li>
              <li><a href="#technology" className="text-sm text-axis-muted hover:text-axis-green transition-colors inline-flex items-center">Diagnostics <ArrowUpRight className="w-3 h-3 ml-1 opacity-50" /></a></li>
              <li><a href="#specialists" className="text-sm text-axis-muted hover:text-axis-green transition-colors inline-flex items-center">Specialists <ArrowUpRight className="w-3 h-3 ml-1 opacity-50" /></a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h5 className="text-sm tracking-widest text-axis-text uppercase mb-6">Connect</h5>
            <ul className="space-y-4">
              <li><a href="#contact" className="text-sm text-axis-muted hover:text-axis-green transition-colors inline-flex items-center">Book Appointment <ArrowUpRight className="w-3 h-3 ml-1 opacity-50" /></a></li>
              <li><a href="#" className="text-sm text-axis-muted hover:text-axis-green transition-colors inline-flex items-center">Patient Portal <ArrowUpRight className="w-3 h-3 ml-1 opacity-50" /></a></li>
              <li><a href="#" className="text-sm text-axis-muted hover:text-axis-green transition-colors inline-flex items-center">Refer a Patient <ArrowUpRight className="w-3 h-3 ml-1 opacity-50" /></a></li>
              <li><a href="#" className="text-sm text-axis-muted hover:text-axis-green transition-colors inline-flex items-center">Contact Us <ArrowUpRight className="w-3 h-3 ml-1 opacity-50" /></a></li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h5 className="text-sm tracking-widest text-axis-text uppercase mb-6">Social</h5>
            <ul className="space-y-4 mb-8">
              <li><a href="#" className="text-sm text-axis-muted hover:text-axis-text transition-colors">Instagram</a></li>
              <li><a href="#" className="text-sm text-axis-muted hover:text-axis-text transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-sm text-axis-muted hover:text-axis-text transition-colors">Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-axis-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-axis-muted">
            © 2026 AXIS Spine & Mobility Institute. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-xs text-axis-muted">
            <a href="#" className="hover:text-axis-text transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-axis-text transition-colors">Terms</a>
            <a href="#" className="hover:text-axis-text transition-colors">Accessibility</a>
            <a href="#" className="hover:text-axis-text transition-colors">Medical Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
