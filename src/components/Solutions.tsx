const SOLUTIONS = [
  {
    title: 'On passe dès 5 cm — automatiquement.',
    text: "Pas besoin d'appeler. Dès que l'accumulation atteint 5 cm, votre entrée est sur notre route. Vous partez travailler : c'est déjà fait.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    title: 'Bordages municipaux : inclus.',
    text: 'Les jours de forte neige, on revient enlever les débris laissés par les chasse-neige de la Ville. Votre entrée reste dégagée — pour vrai.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12l5 5L20 6" />
      </svg>
    ),
  },
  {
    title: 'Un déneigeur dédié à votre propriété.',
    text: 'La même équipe, le même équipement, qui connaît votre entrée et ses obstacles. Fini le travail à moitié fait.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="4" />
        <path d="M2 21v-2a4 4 0 014-4h6a4 4 0 014 4v2" />
        <path d="M17 3.6a4 4 0 010 6.8" />
        <path d="M22 21v-2a4 4 0 00-3-3.87" />
      </svg>
    ),
  },
  {
    title: 'Disponibles 24/7, toute la saison.',
    text: "Tempête de nuit, de fin de semaine ou du jour de l'An : on est en route. Entrée glacée? On offre aussi l'épandage de sable et de sel.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8v4l3 2" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
];

export default function Solutions() {
  return (
    <section id="solutions" style={{ background: 'var(--ice)' }}>
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Nos solutions</span>
          <h2>Groupe Réca : on s'occupe de vous. Vraiment.</h2>
        </div>
        <div className="solutions-grid">
          {SOLUTIONS.map((solution, i) => (
            <div className="solution-card" key={solution.title}>
              <span className="solution-num mono">{String(i + 1).padStart(2, '0')}</span>
              <div className="solution-icon" aria-hidden="true">{solution.icon}</div>
              <h3>{solution.title}</h3>
              <p>{solution.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
