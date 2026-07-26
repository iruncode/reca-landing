const PAIRS = [
  {
    problem: {
      title: 'Le réveil à 5 h 45.',
      text: "Il est tombé 20 cm pendant la nuit. Avant même votre premier café, vous avez 40 minutes de pelletage devant vous — et une réunion à 8 h 30.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="13" r="8" />
          <path d="M12 9v4l3 2" />
          <path d="M5 3L2 6M19 3l3 3" />
        </svg>
      ),
    },
    solution: {
      title: 'On passe dès 5 cm — automatiquement.',
      text: "Pas besoin d'appeler. Dès que l'accumulation atteint 5 cm, votre entrée est sur notre route. Vous partez travailler : c'est déjà fait.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      ),
    },
  },
  {
    problem: {
      title: 'Le mur du chasse-neige.',
      text: 'Vous venez de finir de déblayer. La charrue de la Ville passe… et referme votre entrée avec un bordage de neige durcie, deux fois plus lourde.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 20h20" />
          <path d="M4 20V9l4-3 4 3v11" />
          <path d="M12 20V13l4-2.5 4 2.5v7" />
        </svg>
      ),
    },
    solution: {
      title: 'Bordages municipaux : inclus.',
      text: 'Les jours de forte neige, on revient enlever les débris laissés par les chasse-neige de la Ville. Votre entrée reste dégagée — pour vrai.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12l5 5L20 6" />
        </svg>
      ),
    },
  },
  {
    problem: {
      title: 'Votre dos (et votre cœur).',
      text: "Pelleter de la neige mouillée est un effort brutal, dur pour le dos comme pour le cœur. Ce n'est pas un risque à prendre — surtout pas tout un hiver.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.8 8.6c0 4.8-8.8 10.4-8.8 10.4S3.2 13.4 3.2 8.6a4.6 4.6 0 018.8-1.9 4.6 4.6 0 018.8 1.9z" />
        </svg>
      ),
    },
    solution: {
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
  },
  {
    problem: {
      title: 'Le déneigeur fantôme.',
      text: 'Vous avez déjà payé quelqu\'un « de confiance »… qui ne répondait plus au téléphone au milieu de janvier. Cette année, exigez un vrai contrat avec une vraie entreprise.',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" opacity="0.35" />
          <path d="M2 2l20 20" />
        </svg>
      ),
    },
    solution: {
      title: 'Disponibles 24/7, toute la saison.',
      text: "Tempête de nuit, de fin de semaine ou du jour de l'An : on est en route. Entrée glacée? On offre aussi l'épandage de sable et de sel.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8v4l3 2" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
    },
  },
];

export default function ProblemsSolutions() {
  return (
    <section id="problemes-solutions">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Ça vous dit quelque chose?</span>
          <h2>L'hiver à Saint-Jérôme, vous le connaissez trop bien. Voici comment on règle chaque problème.</h2>
        </div>
        <div className="ps-grid">
          {PAIRS.map((pair, i) => (
            <div className="problem-solution-pair" key={pair.problem.title}>
              <span className="ps-num mono">{String(i + 1).padStart(2, '0')}</span>
              <div className="ps-problem">
                <div className="ps-icon" aria-hidden="true">{pair.problem.icon}</div>
                <h3>{pair.problem.title}</h3>
                <p>{pair.problem.text}</p>
              </div>
              <div className="ps-arrow" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14" />
                  <path d="M19 12l-7 7-7-7" />
                </svg>
              </div>
              <div className="ps-solution">
                <div className="ps-icon" aria-hidden="true">{pair.solution.icon}</div>
                <h3>{pair.solution.title}</h3>
                <p>{pair.solution.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
