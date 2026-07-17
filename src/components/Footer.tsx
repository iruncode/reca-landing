import { MapPinIcon, MailIcon, PhoneIcon } from './icons';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <img src="/logo-reca.png" alt="Groupe RÉCA" style={{ filter: 'brightness(0) invert(1)' }} />
            <p style={{ color: 'rgba(245,248,252,0.65)', fontSize: '0.9rem', maxWidth: '34ch' }}>
              Déneigement résidentiel et commercial à Saint-Jérôme et dans les Laurentides.
            </p>
          </div>
          <div>
            <h4>Navigation</h4>
            <ul>
              <li><a href="#comment-ca-marche">Comment ça marche</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#pourquoi">Pourquoi RÉCA</a></li>
              <li><a href="#zones">Zones desservies</a></li>
              <li><a href="#contact">Soumission</a></li>
            </ul>
          </div>
          <div>
            <h4>Coordonnées</h4>
            <ul>
              <li className="contact-line"><PhoneIcon size={16} /><a href="tel:+15793681280">(579) 368-1280</a></li>
              <li className="contact-line"><MailIcon size={16} /><a href="mailto:info@groupereca.ca">info@groupereca.ca</a></li>
              <li className="contact-line"><MapPinIcon size={16} /><span>962 rue Labelle, Saint-Jérôme, QC J7Z 5N1</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Groupe RÉCA. Tous droits réservés.</span>
          <span>Déneigement résidentiel &amp; commercial — Saint-Jérôme, QC</span>
        </div>
      </div>
    </footer>
  );
}
