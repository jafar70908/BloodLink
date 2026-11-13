import React, { useEffect } from 'react';
import { BloodstreamBackground } from './components/background/BloodstreamBackground';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileBottomBar } from './components/layout/MobileBottomBar';
import { ToastContainer } from './components/layout/ToastContainer';
import { EmergencySosModal } from './components/modals/EmergencySosModal';
import { ContactDonorModal } from './components/modals/ContactDonorModal';

// Content Sections
import { HeroSection } from './components/sections/HeroSection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { FindDonorSection } from './components/sections/FindDonorSection';
import { UrgentRequestsSection } from './components/sections/UrgentRequestsSection';
import { BecomeDonorWizard } from './components/sections/BecomeDonorWizard';
import { BloodBankSection } from './components/sections/BloodBankSection';
import { AwarenessSection } from './components/sections/AwarenessSection';
import { ImpactSection } from './components/sections/ImpactSection';

import { useBloodlink } from './context/BloodlinkContext';
import { BgVariant } from './types';

export const AppContent: React.FC = () => {
  const { bgVariant, setBgVariant } = useBloodlink();

  // Per-section variant switching via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const variantAttr = entry.target.getAttribute('data-bg') as BgVariant;
            if (variantAttr && variantAttr !== bgVariant) {
              setBgVariant(variantAttr);
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    const sections = document.querySelectorAll('section[data-bg]');
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, [bgVariant, setBgVariant]);

  return (
    <div className="relative min-h-screen text-[#FFF9F7]">
      {/* 1. Living Bloodstream Background (Mounted once at root layout) */}
      <BloodstreamBackground variant={bgVariant} />

      {/* 2. Top Navigation */}
      <Navbar />

      {/* 3. Main Page Content (relative z-10) */}
      <main className="relative z-10">
        <HeroSection />
        <HowItWorksSection />
        <FindDonorSection />
        <UrgentRequestsSection />
        <BecomeDonorWizard />
        <BloodBankSection />
        <AwarenessSection />
        <ImpactSection />
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Mobile Sticky Bottom Action Bar */}
      <MobileBottomBar />

      {/* 6. Modals & Notifications */}
      <EmergencySosModal />
      <ContactDonorModal />
      <ToastContainer />
    </div>
  );
};
