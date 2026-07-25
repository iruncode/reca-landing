import { MapPinIcon, MailIcon, PhoneIcon } from './icons';
import { ZONES } from '../data/zones';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <img src="/logo-reca.png" alt="Groupe RÉCA" style={{ filter: 'brightness(0) invert(1)' }} />
            <p className="footer-tagline">On s'occupe de vous.</p>
            <p style={{ color: 'rgba(245,248,252,0.65)', fontSize: '0.9rem', maxWidth: '34ch' }}>
              Spécialistes du déneigement résidentiel et commercial dans le grand Saint-Jérôme. Service rapide et
              fiable garantissant l'accès à votre propriété tout l'hiver.
            </p>
          </div>
          <div>
            <h4>Coordonnées</h4>
            <ul>
              <li className="contact-line">Groupe Réca inc.</li>
              <li className="contact-line"><MapPinIcon size={16} /><span>962, rue Labelle, Saint-Jérôme (Québec) J7Z 5N1</span></li>
              <li className="contact-line"><PhoneIcon size={16} /><a href="tel:+15793681280">(579) 368-1280</a></li>
              <li className="contact-line"><MailIcon size={16} /><a href="mailto:info@groupereca.ca">info@groupereca.ca</a></li>
              <li className="contact-line">Heures : 7 jours sur 7 · 24 h sur 24</li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Déneigement complet</a></li>
              <li><a href="#inclus">Enlèvement des bordages</a></li>
              <li><a href="#inclus">Épandage sable et sel</a></li>
              <li><a href="#contact">Soumission gratuite</a></li>
              <li><a href="https://groupereca.ca" target="_blank" rel="noopener noreferrer">groupereca.ca</a></li>
            </ul>
          </div>
          <div>
            <h4>Zones desservies</h4>
            <ul>
              {ZONES.map((zone) => (
                <li key={zone}>{zone}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Groupe RÉCA inc. Tous droits réservés.</span>
          <a href="https://groupereca.ca" target="_blank" rel="noopener noreferrer">Politique de confidentialité</a>
        </div>
      </div>
    </footer>
  );
}
