import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { MapPinIcon, MailIcon, PhoneIcon } from './icons';
import type { SubmissionType } from './SubmissionTypeModal';

type Step = 1 | 2 | 3 | 'done';

type TypeEntree =
  | ''
  | 'Entrée simple (1-2 autos)'
  | 'Entrée double (3-4 autos)'
  | 'Grande entrée ou en pente'
  | 'Multilogement ou commercial';

const TYPE_ENTREE_OPTIONS: { value: TypeEntree; label: string }[] = [
  { value: 'Entrée simple (1-2 autos)', label: 'Entrée simple (1-2 autos)' },
  { value: 'Entrée double (3-4 autos)', label: 'Entrée double (3-4 autos)' },
  { value: 'Grande entrée ou en pente', label: 'Grande entrée ou en pente' },
  { value: 'Multilogement ou commercial', label: 'Multilogement ou commercial' },
];

const SERVICE_OPTIONS = ['Déneigement complet', 'Sable et sel', 'Bordages seulement'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface WizardData {
  adresse: string;
  typeEntree: TypeEntree;
  services: string[];
  prenom: string;
  telephone: string;
  courriel: string;
  site_web: string;
}

const INITIAL_DATA: WizardData = {
  adresse: '',
  typeEntree: '',
  services: ['Déneigement complet'],
  prenom: '',
  telephone: '',
  courriel: '',
  site_web: '',
};

interface ContactFormProps {
  prefillType?: SubmissionType | null;
}

export default function ContactForm({ prefillType }: ContactFormProps) {
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<WizardData>(INITIAL_DATA);
  const [stepError, setStepError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (prefillType === 'commercial') {
      setData((d) => ({ ...d, typeEntree: 'Multilogement ou commercial' }));
    }
  }, [prefillType]);

  function update<K extends keyof WizardData>(key: K, value: WizardData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function toggleService(service: string) {
    setData((d) => ({
      ...d,
      services: d.services.includes(service)
        ? d.services.filter((s) => s !== service)
        : [...d.services, service],
    }));
  }

  function goNext() {
    if (step === 1) {
      if (data.adresse.trim() === '') {
        setStepError('Merci d\'indiquer votre adresse.');
        return;
      }
      setStepError('');
      setStep(2);
    } else if (step === 2) {
      if (data.typeEntree === '') {
        setStepError("Merci de choisir un type d'entrée.");
        return;
      }
      setStepError('');
      setStep(3);
    }
  }

  function goBack() {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    setStepError('');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (data.site_web.trim() !== '') {
      setStep('done');
      return;
    }

    if (data.prenom.trim() === '' || data.telephone.trim() === '' || !EMAIL_RE.test(data.courriel.trim())) {
      setStepError('Merci de remplir tous les champs obligatoires avec un courriel valide.');
      return;
    }

    setStepError('');
    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adresse: data.adresse.trim(),
          typeEntree: data.typeEntree,
          services: data.services,
          prenom: data.prenom.trim(),
          telephone: data.telephone.trim(),
          courriel: data.courriel.trim(),
          site_web: data.site_web,
        }),
      });
      if (!res.ok) throw new Error('request-failed');
      setStep('done');
    } catch {
      setSubmitError("L'envoi a échoué. Réessayez, ou contactez-nous directement par téléphone ou courriel ci-dessous.");
    } finally {
      setSubmitting(false);
    }
  }

  const stepNumber = step === 'done' ? 3 : step;

  return (
    <section id="contact" className="cta-section">
      <div className="container cta-grid">
        <div className="cta-side">
          <h2>Votre soumission gratuite</h2>
          <div className="mono-list">
            <div><PhoneIcon /> <a href="tel:+15793681280">(579) 368-1280</a></div>
            <div><MailIcon /> <a href="mailto:info@groupereca.ca">info@groupereca.ca</a></div>
            <div><MapPinIcon /> <span>962 rue Labelle, Saint-Jérôme, QC J7Z 5N1</span></div>
          </div>
        </div>

        <form id="contact-form" onSubmit={handleSubmit} noValidate>
          {step !== 'done' && (
            <>
              <p className="wizard-microcopy">Gratuit · Sans engagement · Réponse en 24 h</p>
              <div className="wizard-progress" role="group" aria-label={`Étape ${stepNumber} sur 3`}>
                {[1, 2, 3].map((n) => (
                  <span key={n} className={`wizard-dot${n <= stepNumber ? ' is-done' : ''}`} aria-hidden="true" />
                ))}
                <span className="visually-hidden">Étape {stepNumber} sur 3</span>
              </div>
            </>
          )}

          {step === 1 && (
            <div className="wizard-step">
              <h3 className="wizard-step-title">Où est l'entrée à déneiger ?</h3>
              <div className="field">
                <label htmlFor="adresse">Adresse de la propriété <span className="required">*</span></label>
                <input
                  type="text"
                  id="adresse"
                  autoComplete="street-address"
                  value={data.adresse}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => update('adresse', e.target.value)}
                />
              </div>
              {stepError && <p className="form-status error">{stepError}</p>}
              <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={goNext}>
                Continuer
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="wizard-step">
              <h3 className="wizard-step-title">Parlez-nous de votre entrée</h3>
              <div className="choice-cards" role="radiogroup" aria-label="Type d'entrée">
                {TYPE_ENTREE_OPTIONS.map((opt) => (
                  <label key={opt.value} className={`choice-card${data.typeEntree === opt.value ? ' is-selected' : ''}`}>
                    <input
                      type="radio"
                      name="typeEntree"
                      value={opt.value}
                      checked={data.typeEntree === opt.value}
                      onChange={() => update('typeEntree', opt.value)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
              <p className="field-label-standalone">Services souhaités</p>
              <div className="choice-checkboxes">
                {SERVICE_OPTIONS.map((service) => (
                  <label key={service} className={`choice-checkbox${data.services.includes(service) ? ' is-selected' : ''}`}>
                    <input
                      type="checkbox"
                      checked={data.services.includes(service)}
                      onChange={() => toggleService(service)}
                    />
                    {service}
                  </label>
                ))}
              </div>
              {stepError && <p className="form-status error">{stepError}</p>}
              <div className="wizard-actions">
                <button type="button" className="btn btn-outline" onClick={goBack}>Retour</button>
                <button type="button" className="btn btn-primary" onClick={goNext}>Continuer</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="wizard-step">
              <h3 className="wizard-step-title">Où envoyer votre soumission ?</h3>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="prenom">Prénom <span className="required">*</span></label>
                  <input
                    type="text"
                    id="prenom"
                    autoComplete="given-name"
                    value={data.prenom}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => update('prenom', e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="telephone">Téléphone <span className="required">*</span></label>
                  <input
                    type="tel"
                    id="telephone"
                    autoComplete="tel"
                    value={data.telephone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => update('telephone', e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="courriel">Courriel <span className="required">*</span></label>
                <input
                  type="email"
                  id="courriel"
                  autoComplete="email"
                  value={data.courriel}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => update('courriel', e.target.value)}
                />
              </div>

              {/* Piège à robots — laissé vide par les visiteurs humains */}
              <div className="honeypot-field" aria-hidden="true">
                <label htmlFor="site_web">Ne pas remplir ce champ</label>
                <input
                  type="text"
                  id="site_web"
                  tabIndex={-1}
                  autoComplete="off"
                  value={data.site_web}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => update('site_web', e.target.value)}
                />
              </div>

              {stepError && <p className="form-status error">{stepError}</p>}
              {submitError && <p className="form-status error">{submitError}</p>}
              <div className="wizard-actions">
                <button type="button" className="btn btn-outline" onClick={goBack}>Retour</button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Envoi en cours…' : 'Recevoir ma soumission gratuite'}
                </button>
              </div>
            </div>
          )}

          {step === 'done' && (
            <div className="wizard-step wizard-done" role="status" aria-live="polite">
              <h3 className="wizard-step-title">C'est fait, {data.prenom || ''} !</h3>
              <p>
                Votre demande est entre les mains de notre équipe. Vous recevrez votre soumission d'ici 24 h. Besoin
                d'une réponse tout de suite? Appelez-nous : <a href="tel:+15793681280" style={{ color: 'var(--navy)', fontWeight: 600 }}>(579) 368-1280</a>.
              </p>
            </div>
          )}

          <p className="form-note">
            En cas de problème d'envoi, écrivez-nous directement à{' '}
            <a href="mailto:info@groupereca.ca" style={{ color: 'var(--navy)', fontWeight: 600 }}>info@groupereca.ca</a> ou
            appelez le <a href="tel:+15793681280" style={{ color: 'var(--navy)', fontWeight: 600 }}>(579) 368-1280</a>.
          </p>
        </form>
      </div>
    </section>
  );
}
