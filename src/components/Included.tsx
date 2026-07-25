import { CheckIcon } from './icons';

const INCLUDED = [
  "Des passages illimités dès 5 cm d'accumulation, tempête après tempête",
  'L\'enlèvement des bordages et débris laissés par les chasse-neige municipaux les jours de forte neige',
  "Un déneigeur dédié, avec de l'équipement de pointe bien entretenu",
  'Une disponibilité 7 jours sur 7, 24 h sur 24, tout l\'hiver',
  'En option : épandage de sable et de sel (déglaçage) · enlèvement de bordages seulement',
];

export default function Included() {
  return (
    <section id="inclus">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Ce qui est inclus</span>
          <h2>Un contrat Groupe Réca, c'est :</h2>
        </div>
        <div className="included-layout">
          <ul className="included-list">
            {INCLUDED.map((item) => (
              <li key={item}><CheckIcon /> {item}</li>
            ))}
          </ul>
          <div className="guarantees-box">
            <h3>Nos garanties</h3>
            <p><CheckIcon /> <strong>Prix fixe garanti</strong> — le prix de votre soumission ne bougera pas, peu importe le nombre de tempêtes.</p>
            <p><CheckIcon /> <strong>Aucuns frais cachés</strong> — pas de supplément surprise en février.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
