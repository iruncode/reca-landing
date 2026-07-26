import { useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import TaxCredit from './components/TaxCredit';
import Zones from './components/Zones';
import ProblemsSolutions from './components/ProblemsSolutions';
import Services from './components/Services';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import MobileStickyBar from './components/MobileStickyBar';
import SubmissionTypeModal, { type SubmissionType } from './components/SubmissionTypeModal';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [prefillType, setPrefillType] = useState<SubmissionType | null>(null);

  function handleSelectType(type: SubmissionType) {
    setPrefillType(type);
    setModalOpen(false);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <a className="skip-link" href="#contenu-principal">Aller au contenu principal</a>
      <Nav />
      <main id="contenu-principal">
        <Hero onOpenModal={() => setModalOpen(true)} />
        <TrustBar />
        <TaxCredit />
        <Zones />
        <ProblemsSolutions />
        <Services />
        <ContactForm prefillType={prefillType} />
      </main>
      <Footer />
      <MobileStickyBar />
      <SubmissionTypeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleSelectType}
      />
    </>
  );
}
