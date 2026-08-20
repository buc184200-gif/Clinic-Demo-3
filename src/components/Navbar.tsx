import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Conditions', href: '#conditions' },
  { name: 'Treatments', href: '#treatments' },
  { name: 'Technology', href: '#technology' },
  { name: 'Specialists', href: '#specialists' },
  { name: 'Recovery', href: '#recovery' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
          isScrolled ? 'py-4' : 'py-6'
        )}
      >
        <div
          className={cn(
            'absolute inset-0 transition-opacity duration-500',
            isScrolled ? 'bg-axis-black/80 backdrop-blur-xl border-b border-axis-white/5 opacity-100' : 'opacity-0'
          )}
        />
        
        <div className="relative max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex flex-col cursor-pointer"
            onClick={() => scrollTo('#home')}
          >
            <span className="text-xl font-medium tracking-wide">AXIS</span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-axis-grey">
              Spine & Mobility Institute
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.href)}
                className="text-sm text-axis-white/70 hover:text-axis-white transition-colors"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => scrollTo('#contact')}
              className="hidden md:inline-flex px-5 py-2.5 bg-axis-green text-axis-card text-sm font-medium rounded-xl hover:bg-axis-dark-green transition-colors shrink-0 whitespace-nowrap shadow-sm"
            >
              Book Assessment
            </button>
            <button
              className="lg:hidden p-2 -mr-2 text-axis-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-axis-black/95 backdrop-blur-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6">
              <div className="flex flex-col">
                <span className="text-xl font-medium tracking-wide">AXIS</span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-axis-mint">
                  Spine & Mobility Institute
                </span>
              </div>
              <button
                className="p-2 -mr-2 text-axis-white/70 hover:text-axis-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="flex-1 px-8 py-12 flex flex-col justify-center space-y-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(item.href)}
                  className="text-3xl font-serif text-left text-axis-white/90 hover:text-axis-mint transition-colors"
                >
                  {item.name}
                </motion.button>
              ))}
              
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => scrollTo('#contact')}
                className="mt-8 px-6 py-4 bg-axis-white text-axis-black text-lg font-medium rounded-full w-full max-w-sm"
              >
                Book Movement Assessment
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
