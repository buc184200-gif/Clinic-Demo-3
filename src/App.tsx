/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import Lenis from 'lenis';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroAndStory } from '@/sections/HeroAndStory';
import { Conditions } from '@/sections/Conditions';
import { Diagnostics } from '@/sections/Diagnostics';
import { Treatments } from '@/sections/Treatments';
import { KneeExperience } from '@/sections/KneeExperience';
import { PatientJourney } from '@/sections/PatientJourney';
import { Specialists } from '@/sections/Specialists';
import { RecoveryMetrics } from '@/sections/RecoveryMetrics';
import { MovementComparison } from '@/sections/MovementComparison';
import { Testimonials } from '@/sections/Testimonials';
import { Contact } from '@/sections/Contact';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-axis-black min-h-screen text-axis-white font-sans selection:bg-axis-mint selection:text-axis-black overflow-x-hidden">
      <LoadingScreen />
      <Navbar />
      
      <main>
        <HeroAndStory />
        <Conditions />
        <Diagnostics />
        <Treatments />
        <KneeExperience />
        <PatientJourney />
        <Specialists />
        <RecoveryMetrics />
        <MovementComparison />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
