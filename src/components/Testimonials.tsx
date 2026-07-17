const TESTIMONIALS = [
  {
    initials: 'MC',
    name: 'Marie C.',
    loc: 'Résidentiel — Bellefeuille',
    quote: "Chaque matin de tempête, mon entrée est dégagée avant que je parte travailler. Je n'ai jamais eu à appeler pour demander un passage.",
  },
  {
    initials: 'PL',
    name: 'Patrick L.',
    loc: 'Commercial — Saint-Jérôme',
    quote: "Notre stationnement commercial est dégagé avant l'ouverture, sans exception. Ça évite bien des maux de tête côté sécurité.",
  },
  {
    initials: 'SD',
    name: 'Sophie D.',
    loc: 'Résidentiel — Mirabel',
    quote: "Le prix fixe pour la saison m'a évité les mauvaises surprises de l'an dernier. Service constant, équipe fiable.",
  },
];

export default function Testimonials() {
  return (
    <section id="temoignages">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Avis clients</span>
          <h2>Ce que nos clients disent</h2>
        </div>
        <div className="testi-grid">
          {TESTIMONIALS.map((t) => (
            <figure className="testi-card" key={t.name}>
              <div className="testi-stars" aria-hidden="true">★★★★★</div>
              <blockquote className="testi-quote">« {t.quote} »</blockquote>
              <figcaption className="testi-who">
                <div className="testi-avatar" aria-hidden="true">{t.initials}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-loc">{t.loc}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
