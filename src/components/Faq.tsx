const FAQ = [
  {
    q: 'Combien coûte un contrat de déneigement à Saint-Jérôme ?',
    a: "Chaque propriété est différente : la superficie de l'entrée, la pente, l'espace disponible pour pousser la neige et les services choisis (sable et sel, bordages) influencent le prix. C'est pourquoi nous préparons une soumission personnalisée, gratuite et sans engagement, en moins de 24 h. Une fois acceptée, votre prix est fixe pour toute la saison.",
  },
  {
    q: 'À partir de combien de centimètres de neige passez-vous ?',
    a: "Dès qu'il tombe 5 cm ou plus, notre équipe est déployée automatiquement. Vous n'avez rien à faire : pas d'appel, pas de demande — votre entrée est sur notre route.",
  },
  {
    q: 'Enlevez-vous le bordage laissé par le chasse-neige de la Ville ?',
    a: 'Oui. Les jours de fortes chutes de neige, nous enlevons aussi les débris laissés par les chasse-neige municipaux, pour que votre entrée reste réellement dégagée.',
  },
  {
    q: "Le déneigement est-il admissible à un crédit d'impôt ?",
    a: "Oui, pour les personnes de 70 ans et plus : le crédit d'impôt pour maintien à domicile des aînés de Revenu Québec couvre 40 % des dépenses admissibles en 2026, incluant le déneigement. Nous fournissons les reçus. Vérifiez votre admissibilité auprès de Revenu Québec.",
  },
  {
    q: "Quand dois-je réserver mon contrat pour l'hiver 2026-2027 ?",
    a: 'Le plus tôt possible. Chaque tracteur suit une route fixe : le nombre de places par secteur est limité, et les secteurs les plus demandés se remplissent avant les premières neiges.',
  },
  {
    q: 'Que se passe-t-il pendant une grosse tempête ?',
    a: 'En cas de tempête, vous pouvez être certains de notre passage. Nous effectuons les passages nécessaires et revenons en fin de tempête pour finaliser le travail.',
  },
  {
    q: "Offrez-vous l'épandage de sable et de sel ?",
    a: 'Oui. Notre service de déglaçage (épandage de sable et de sel) garde votre entrée et vos accès sécuritaires, même en période de verglas.',
  },
  {
    q: 'Comment se fait le paiement ?',
    a: 'Un seul paiement pratique en début de saison active votre contrat pour tout l\'hiver. Un paiement en 2 versements (octobre et janvier) est aussi possible.',
  },
  {
    q: 'Faites-vous aussi le déneigement commercial ?',
    a: 'Oui, nous desservons les résidences comme les commerces du grand Saint-Jérôme. Pour un stationnement commercial, indiquez-le simplement dans votre demande de soumission.',
  },
];

export default function Faq() {
  return (
    <section id="faq">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Questions fréquentes</span>
          <h2>Questions fréquentes sur le déneigement à Saint-Jérôme</h2>
        </div>
        <div className="faq-list">
          {FAQ.map((item) => (
            <details className="faq-item" key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
