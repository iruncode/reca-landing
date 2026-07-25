import Snow from './Snow';
import Gauge from './Gauge';

export default function Hero() {
  return (
    <section className="hero" id="accueil">
      <Snow />
      <div className="container hero-inner">
        <div>
          <span className="eyebrow mono">Déneigement résidentiel · Saint-Jérôme et les environs</span>
          <h1>
            Déneigement résidentiel à Saint-Jérôme : cet hiver, ne pelletez <span className="accent">plus jamais</span>.
          </h1>
          <p className="hero-lede">
            Dès <strong className="mono">5&nbsp;cm</strong> de neige, on passe — automatiquement. Bordages du
            chasse-neige municipal inclus. Prix fixe pour toute la saison, aucune surprise.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#contact">Obtenir ma soumission gratuite →</a>
            <a className="btn btn-ghost" href="tel:+15793681280">Appeler (579) 368-1280</a>
          </div>
          <p className="hero-microcopy">2 minutes · Sans engagement · Réponse en 24 h</p>
          <div className="hero-trust">
            <div><span className="num">5 cm</span><span className="label">Seuil de déclenchement</span></div>
            <div><span className="num">Inclus</span><span className="label">Bordages municipaux</span></div>
            <div><span className="num">24/7</span><span className="label">7 jours sur 7, tout l'hiver</span></div>
          </div>
        </div>

        <Gauge />
      </div>
    </section>
  );
}
