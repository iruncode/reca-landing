import { PhoneIcon } from './icons';

export default function MobileStickyBar() {
  return (
    <div className="mobile-sticky-bar" aria-hidden={false}>
      <a className="sticky-btn sticky-btn-call" href="tel:+15793681280">
        <PhoneIcon size={18} /> Appeler
      </a>
      <a className="sticky-btn sticky-btn-form" href="#contact">
        Soumission gratuite
      </a>
    </div>
  );
}
