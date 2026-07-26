import { MapPinIcon, MailIcon, PhoneIcon } from './icons';
import ContactWizard from './ContactWizard';

export default function ContactForm() {
  return (
    <section id="contact" className="cta-section">
      <div className="container cta-grid">
        <div className="cta-side">
          <h2>Votre soumission gratuite</h2>
          <div className="mono-list">
            <div><PhoneIcon /> <a href="tel:+15793681280">(579) 368-1280</a></div>
            <div><MailIcon /> <a href="mailto:info@groupereca.ca">info@groupereca.ca</a></div>
            <div><MapPinIcon /> <span>962 rue Labelle, Saint-Jérôme, QC J7Z 5N1</span></div>
          </div>
        </div>

        <ContactWizard idPrefix="page" />
      </div>
    </section>
  );
}
