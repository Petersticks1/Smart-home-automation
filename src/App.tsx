import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { SmartHomeNarrative } from './components/sections/SmartHomeNarrative';
import { Projects } from './components/sections/Projects';
import { Testimonials } from './components/sections/Testimonials';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Services } from './components/sections/Services';
import { WhatsAppFAB } from './components/ui/WhatsAppFAB';
import { ConsultationModal } from './components/ui/ConsultationModal';

function App() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <Hero onOpenConsultation={() => setConsultationOpen(true)} />
        <SmartHomeNarrative />
        <Services />
        <Projects />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer onOpenConsultation={() => setConsultationOpen(true)} />
      <WhatsAppFAB />
      {/* Single global modal — avoids stacking context issues from GSAP pins */}
      <ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
    </>
  );
}

export default App;
