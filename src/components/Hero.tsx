import Snow from './Snow';
import Gauge from './Gauge';

export default function Hero() {
  return (
    <section className="hero" id="accueil">
      <Snow />
      <div className="container hero-inner">
        <div>
          <span className="eyebrow mono">Saint-Jérôme · Laurentides</span>
          <h1>
            La neige tombe.<br />Nous sommes déjà <span className="accent">en route</span>.
          </h1>
          <p className="hero-lede">
            Groupe RÉCA surveille l'accumulation en continu. Dès <strong className="mono">5&nbsp;cm</strong>, un
            opérateur dédié est déployé sur votre propriété — dégagement garanti avant{' '}
            <strong className="mono">07:00</strong>, résidentiel comme commercial.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#contact">Demander une soumission gratuite</a>
            <a className="btn btn-ghost" href="tel:+15793681280">Appeler (579) 368-1280</a>
          </div>
          <div className="hero-trust">
            <div><span className="num">5 cm</span><span className="label">Seuil de déclenchement</span></div>
            <div><span className="num">07:00</span><span className="label">Dégagement garanti</span></div>
            <div><span className="num">24/7</span><span className="label">Surveillance en tempête</span></div>
          </div>
        </div>

        <Gauge />
      </div>
    </section>
  );
}
