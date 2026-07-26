import { useEffect, useRef } from 'react';

export type SubmissionType = 'residentiel' | 'commercial';

interface SubmissionTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: SubmissionType) => void;
}

export default function SubmissionTypeModal({ isOpen, onClose, onSelect }: SubmissionTypeModalProps) {
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
    <div
      className="submission-modal-overlay"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="submission-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="submission-modal-title"
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
        <h2 id="submission-modal-title">Votre soumission est pour...</h2>
        <div className="submission-modal-choices">
          <button
            type="button"
            className="submission-modal-choice"
            onClick={() => onSelect('residentiel')}
          >
            Particulier
          </button>
          <button
            type="button"
            className="submission-modal-choice"
            onClick={() => onSelect('commercial')}
          >
            Commercial
          </button>
        </div>
      </div>
    </div>
  );
}
