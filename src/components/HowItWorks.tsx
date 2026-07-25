const STEPS = [
  {
    num: 'ÉTAPE 01',
    title: 'Demandez votre soumission (2 minutes)',
    text: "Votre adresse, votre type d'entrée, vos coordonnées. C'est tout.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12l5 5L20 6" />
      </svg>
    ),
  },
  {
    num: 'ÉTAPE 02',
    title: 'Recevez votre prix fixe sous 24 h',
    text: 'Un prix clair, pour toute la saison, sans frais cachés. Sans engagement.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8v4l3 2" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    num: 'ÉTAPE 03',
    title: 'Signez et rangez la pelle',
    text: 'Un seul paiement en début de saison, et vous êtes couverts de la première à la dernière neige.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.85 2.85 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
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
          <h2>Votre hiver sans pelle, en 3 étapes.</h2>
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
        <p className="steps-note">
          Paiement possible en un seul versement ou en 2 versements (octobre et janvier).
        </p>
      </div>
    </section>
  );
}
