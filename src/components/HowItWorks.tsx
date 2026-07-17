const STEPS = [
  {
    num: 'ÉTAPE 01',
    title: 'Détection à 5 cm',
    text: "Nos relevés météo locaux suivent l'accumulation en temps réel. Au seuil de 5 cm, l'intervention est déclenchée automatiquement — pas besoin de nous appeler.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="12" r="7" opacity="0.6" />
        <circle cx="12" cy="12" r="10.5" opacity="0.3" />
      </svg>
    ),
  },
  {
    num: 'ÉTAPE 02',
    title: "Déploiement d'un opérateur dédié",
    text: 'Un opérateur assigné à votre secteur se rend directement sur votre propriété, résidentielle ou commerciale, avec l\'équipement adapté.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="8" width="14" height="8" rx="1.5" />
        <path d="M15 11h4l3 3v2h-7z" />
        <circle cx="6" cy="18.5" r="1.6" />
        <circle cx="17.5" cy="18.5" r="1.6" />
      </svg>
    ),
  },
  {
    num: 'ÉTAPE 03',
    title: 'Passage de finition avant 7h',
    text: "Un second passage nettoie les surfaces avant l'heure de pointe : votre entrée ou stationnement est dégagé avant 07:00, chaque matin.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12l5 5L20 6" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="comment-ca-marche">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Le processus</span>
          <h2>Comment ça marche</h2>
          <p>Trois étapes, aucune surprise. Vous n'avez rien à demander — le service se déclenche de lui-même.</p>
        </div>
        <div className="steps">
          {STEPS.map((step) => (
            <div className="step-card" key={step.num}>
              <span className="step-num mono">{step.num}</span>
              <div className="step-icon" aria-hidden="true">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
