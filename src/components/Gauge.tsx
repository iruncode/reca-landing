import { useEffect, useState } from 'react';

const THRESHOLD_PCT = 83; // correspond au repère visuel des 5 cm

interface Phase {
  pct: number;
  cm: number;
  label: string;
  active: boolean;
  duration: number;
}

const PHASES: Phase[] = [
  { pct: 0, cm: 0.0, label: 'Surveillance active…', active: false, duration: 0 },
  { pct: THRESHOLD_PCT, cm: 5.0, label: 'Seuil de 5 cm atteint — opérateur déployé', active: true, duration: 4200 },
  { pct: THRESHOLD_PCT, cm: 5.0, label: 'Passage de finition en cours…', active: true, duration: 2400 },
  { pct: 6, cm: 0.2, label: 'Dégagement terminé avant 07:00 ✓', active: false, duration: 2600 },
];

function useReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function Gauge() {
  const reduceMotion = useReducedMotion();
  const [phaseIndex, setPhaseIndex] = useState(reduceMotion ? 1 : 0);

  useEffect(() => {
    if (reduceMotion) return;
    const phase = PHASES[phaseIndex];
    const wait = phase.duration || 3200;
    const timer = setTimeout(() => {
      setPhaseIndex((i) => (i + 1) % PHASES.length);
    }, wait);
    return () => clearTimeout(timer);
  }, [phaseIndex, reduceMotion]);

  const phase = PHASES[phaseIndex];

  return (
    <div className="gauge-card" role="group" aria-label="Démonstration du seuil d'intervention de 5 centimètres">
      <h2>Jauge d'accumulation</h2>
      <p className="gauge-sub">Simulation du déclenchement automatique</p>
      <div className="gauge-track">
        <div className="gauge-marker"><span>5 cm</span></div>
        <div className="gauge-fill" style={{ height: `${phase.pct}%` }} />
      </div>
      <div className="gauge-readout">
        <span className="value mono">{phase.cm.toFixed(1).replace('.', ',')} cm</span>
      </div>
      <p className={`gauge-status${phase.active ? ' is-active' : ''}`} aria-live="polite">
        {phase.label}
      </p>
    </div>
  );
}
