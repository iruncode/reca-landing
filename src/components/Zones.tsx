import { MapPinIcon } from './icons';
import { ZONES } from '../data/zones';

export default function Zones() {
  return (
    <section id="zones" className="zones-section">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow" style={{ color: 'var(--cyan)' }}>Territoire</span>
          <h2>Nos secteurs de déneigement</h2>
          <p>Nous desservons le grand Saint-Jérôme et ses environs, dans les Laurentides.</p>
        </div>
        <div className="zones-grid">
          {ZONES.map((zone) => (
            <div className="zone-pill" key={zone}>
              <MapPinIcon />
              {zone}
            </div>
          ))}
        </div>
        <p className="zones-note">
          Votre secteur n'est pas dans la liste?{' '}
          <a href="#contact" style={{ color: 'var(--cyan)', textDecoration: 'underline' }}>Demandez quand même votre soumission</a> — nos
          routes évoluent chaque saison.
        </p>
      </div>
    </section>
  );
}
