const REASONS = [
  {
    title: 'Seuil de 5 cm',
    text: "Intervention déclenchée avant que la neige ne devienne un obstacle réel.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    title: 'Avant 07:00, garanti',
    text: 'Vous partez le matin sur une surface dégagée — chaque fois, sans exception.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8v4l3 2" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    title: 'Opérateurs locaux',
    text: 'Une équipe qui connaît le secteur Saint-Jérôme et les Laurentides, rue par rue.',
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
    title: 'Entrepreneur assuré',
    text: 'Assurance responsabilité civile en vigueur, pour votre tranquillité d\'esprit.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 4v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-4z" />
      </svg>
    ),
  },
  {
    title: 'Prix fixe pour la saison',
    text: "Un tarif convenu à l'avance, peu importe le nombre de tempêtes.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.6 12a8.6 8.6 0 11-3.4-6.86" />
        <path d="M21 3v6h-6" />
      </svg>
    ),
  },
  {
    title: 'Réponse rapide',
    text: 'Une soumission claire, rapidement — et une équipe qui répond quand ça compte.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13" />
        <path d="M22 2l-7 20-4-9-9-4 20-7z" />
      </svg>
    ),
  },
];

export default function WhyReca() {
  return (
    <section id="pourquoi">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Pourquoi RÉCA</span>
          <h2>Six raisons de nous faire confiance</h2>
        </div>
        <div className="why-grid">
          {REASONS.map((reason) => (
            <div className="why-card" key={reason.title}>
              <div className="why-icon" aria-hidden="true">{reason.icon}</div>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
