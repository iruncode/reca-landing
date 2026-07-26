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
import SubmissionModal from './components/SubmissionModal';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <>
      <a className="skip-link" href="#contenu-principal">Aller au contenu principal</a>
      <Nav onOpenModal={openModal} />
      <main id="contenu-principal">
        <Hero onOpenModal={openModal} />
        <TrustBar />
        <TaxCredit />
        <Zones />
        <ProblemsSolutions />
        <Services />
        <ContactForm />
      </main>
      <Footer />
      <MobileStickyBar onOpenModal={openModal} />
      <SubmissionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
