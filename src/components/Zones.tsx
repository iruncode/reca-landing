import { MapPinIcon } from './icons';

const ZONES = [
  'Saint-Jérôme (centre-ville)',
  'Bellefeuille',
  'Saint-Antoine',
  'Lafontaine',
  'Mirabel',
  'Secteurs avoisinants',
];

export default function Zones() {
  return (
    <section id="zones" className="zones-section">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow" style={{ color: 'var(--cyan)' }}>Territoire</span>
          <h2>Zones desservies</h2>
          <p>Groupe RÉCA dessert Saint-Jérôme et les secteurs environnants.</p>
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
          Votre adresse n'apparaît pas ici?{' '}
          <a href="#contact" style={{ color: 'var(--cyan)', textDecoration: 'underline' }}>Écrivez-nous</a> — nous
          étendons régulièrement notre territoire.
        </p>
      </div>
    </section>
  );
}
