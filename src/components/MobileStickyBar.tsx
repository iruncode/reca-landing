import { PhoneIcon } from './icons';

interface MobileStickyBarProps {
  onOpenModal: () => void;
}

export default function MobileStickyBar({ onOpenModal }: MobileStickyBarProps) {
  return (
    <div className="mobile-sticky-bar" aria-hidden={false}>
      <a className="sticky-btn sticky-btn-call" href="tel:+15793681280">
        <PhoneIcon size={18} /> Appeler
      </a>
      <button type="button" className="sticky-btn sticky-btn-form" onClick={onOpenModal}>
        Soumission gratuite
      </button>
    </div>
  );
}
