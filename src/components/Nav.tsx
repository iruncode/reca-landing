import { useState } from 'react';
import { MenuIcon } from './icons';

const LINKS = [
  { href: '#problemes-solutions', label: 'Comment ça marche?' },
  { href: '#services', label: 'Services' },
  { href: '#credit-impot', label: "Crédit d'impôt" },
  { href: '#zones', label: 'Zones desservies' },
];

interface NavProps {
  onOpenModal: () => void;
}

export default function Nav({ onOpenModal }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`site-nav${menuOpen ? ' menu-open' : ''}`} id="site-nav">
      <div className="nav-inner">
        <a href="#accueil" className="nav-logo" aria-label="Groupe RÉCA — retour à l'accueil">
          <img src="/logo-reca.png" alt="Groupe RÉCA" />
        </a>
        <nav className="nav-links" aria-label="Navigation principale">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <a className="nav-phone" href="tel:+15793681280" onClick={() => setMenuOpen(false)}>
            (579) 368-1280
          </a>
        </nav>
        <div className="nav-actions">
          <a className="nav-phone" href="tel:+15793681280">(579) 368-1280</a>
          <button type="button" className="btn btn-primary" onClick={onOpenModal}>Soumission gratuite</button>
          <button
            className="nav-toggle"
            id="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            aria-label="Ouvrir le menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
