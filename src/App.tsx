import Nav from './components/Nav';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Problems from './components/Problems';
import Solutions from './components/Solutions';
import HowItWorks from './components/HowItWorks';
import Services from './components/Services';
import Included from './components/Included';
import TaxCredit from './components/TaxCredit';
import SocialProof from './components/SocialProof';
import Zones from './components/Zones';
import Faq from './components/Faq';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import MobileStickyBar from './components/MobileStickyBar';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenu-principal">Aller au contenu principal</a>
      <Nav />
      <main id="contenu-principal">
        <Hero />
        <TrustBar />
        <Problems />
        <Solutions />
        <HowItWorks />
        <Services />
        <Included />
        <TaxCredit />
        <SocialProof />
        <Zones />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
