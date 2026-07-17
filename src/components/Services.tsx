import { CheckIcon } from './icons';

export default function Services() {
  return (
    <section id="services" style={{ background: 'var(--ice)' }}>
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Nos services</span>
          <h2>Résidentiel &amp; commercial</h2>
          <p>Deux offres pensées pour des besoins différents, avec le même engagement de fiabilité.</p>
        </div>
        <div className="services-grid">
          <article className="service-card residentiel">
            <div className="service-icon" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11l9-7 9 7" />
                <path d="M5 10v10h14V10" />
              </svg>
            </div>
            <h3>Résidentiel</h3>
            <p>Entrées, allées et perrons dégagés avant que vous partiez le matin. Forfait saisonnier à prix fixe.</p>
            <ul>
              <li><CheckIcon /> Entrée de garage et allée piétonne</li>
              <li><CheckIcon /> Perron et accès à la porte principale</li>
              <li><CheckIcon /> Passage de finition après le chasse-neige municipal</li>
              <li><CheckIcon /> Tarif fixe pour la saison, sans surprise</li>
            </ul>
          </article>
          <article className="service-card commercial">
            <div className="service-icon" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="3" width="16" height="18" rx="1" />
                <line x1="8" y1="7" x2="8" y2="7.01" />
                <line x1="12" y1="7" x2="12" y2="7.01" />
                <line x1="16" y1="7" x2="16" y2="7.01" />
                <line x1="8" y1="11" x2="8" y2="11.01" />
                <line x1="12" y1="11" x2="12" y2="11.01" />
                <line x1="16" y1="11" x2="16" y2="11.01" />
                <line x1="9" y1="21" x2="9" y2="16" />
                <line x1="15" y1="21" x2="15" y2="16" />
              </svg>
            </div>
            <h3>Commercial</h3>
            <p>Stationnements et accès dégagés avant l'ouverture, pour limiter les risques de chute et garder votre commerce accessible.</p>
            <ul>
              <li><CheckIcon /> Stationnements et voies de circulation</li>
              <li><CheckIcon /> Accès livraison et entrées de service</li>
              <li><CheckIcon /> Dégagement avant l'heure d'ouverture</li>
              <li><CheckIcon /> Entrepreneur assuré, contrat sur mesure</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
