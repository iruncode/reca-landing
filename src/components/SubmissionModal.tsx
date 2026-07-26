import { useEffect, useRef } from 'react';
import ContactWizard from './ContactWizard';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmissionModal({ isOpen, onClose }: SubmissionModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    dialogRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="submission-modal-overlay" onClick={onClose}>
      <div
        ref={dialogRef}
        className="submission-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Demande de soumission gratuite"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="submission-modal-close"
          aria-label="Fermer"
          onClick={onClose}
        >
          ×
        </button>
        <ContactWizard idPrefix="modal" />
      </div>
    </div>
  );
}
