const ITEMS = [
  'Entreprise locale de Saint-Jérôme',
  'Disponible 24/7 tout l\'hiver',
  'Prix fixe garanti pour la saison',
  'Assurée',
];

export default function TrustBar() {
  return (
    <div className="trust-bar">
      <div className="container trust-bar-inner">
        {ITEMS.map((item, i) => (
          <span key={item}>
            {item}
            {i < ITEMS.length - 1 && <span className="trust-bar-sep" aria-hidden="true">·</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
