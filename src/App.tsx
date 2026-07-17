import Nav from './components/Nav';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Services from './components/Services';
import WhyReca from './components/WhyReca';
import Zones from './components/Zones';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenu-principal">Aller au contenu principal</a>
      <Nav />
      <main id="contenu-principal">
        <Hero />
        <HowItWorks />
        <Services />
        <WhyReca />
        <Zones />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
