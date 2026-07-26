export default function TaxCredit() {
  return (
    <section id="credit-impot" style={{ background: 'var(--navy)', color: 'var(--white)' }}>
      <div className="container tax-credit-layout">
        <div>
          <span className="eyebrow">Crédit d'impôt</span>
          <h2 style={{ color: 'var(--white)' }}>70 ans ou plus? Québec vous rembourse 40 % de votre déneigement.</h2>
          <p style={{ color: 'rgba(245,248,252,0.82)' }}>
            Le déneigement résidentiel est une dépense admissible au crédit d'impôt pour maintien à domicile des
            aînés de Revenu Québec. En 2026, ce crédit remboursable atteint <strong className="mono">40&nbsp;%</strong> des
            dépenses admissibles pour les personnes de 70 ans et plus.
          </p>
          <p style={{ color: 'rgba(245,248,252,0.82)' }}>
            Nous fournissons tous les reçus nécessaires pour votre déclaration.
          </p>
          <p className="tax-credit-finePrint">
            Le crédit peut être réduit si le revenu familial dépasse environ 72&nbsp;500&nbsp;$ (seuil 2026, indexé).
            Vérifiez votre admissibilité auprès de Revenu Québec ou de votre comptable.
          </p>
        </div>
        <div className="tax-credit-example">
          <span className="tax-credit-label">Exemple concret</span>
          <div className="tax-credit-math">
            <span className="mono">600&nbsp;$</span>
            <span aria-hidden="true">→</span>
            <span className="mono accent">≈ 360&nbsp;$</span>
          </div>
          <p>Un contrat de 600&nbsp;$ vous revient à environ 360&nbsp;$ après crédit.</p>
        </div>
      </div>
    </section>
  );
}
