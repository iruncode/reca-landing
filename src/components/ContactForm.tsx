import { useRef, useState, type FormEvent } from 'react';
import { MapPinIcon, MailIcon, PhoneIcon } from './icons';

type Status = { kind: 'idle' | 'success' | 'error'; message: string };

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: 'idle', message: '' });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const fd = new FormData(form);
    const honeypot = String(fd.get('site_web') ?? '').trim();

    if (honeypot !== '') {
      form.reset();
      setStatus({ kind: 'success', message: 'Merci! Votre demande a été envoyée.' });
      return;
    }

    const data = {
      nom: String(fd.get('nom') ?? '').trim(),
      telephone: String(fd.get('telephone') ?? '').trim(),
      courriel: String(fd.get('courriel') ?? '').trim(),
      typePropriete: String(fd.get('typePropriete') ?? ''),
      adresse: String(fd.get('adresse') ?? '').trim(),
      message: String(fd.get('message') ?? '').trim(),
    };

    if (!data.nom || !data.telephone || !data.courriel || !data.typePropriete || !data.adresse) {
      setStatus({ kind: 'error', message: 'Merci de remplir tous les champs obligatoires.' });
      return;
    }

    setSubmitting(true);
    setStatus({ kind: 'idle', message: '' });

    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('request-failed');
      setStatus({ kind: 'success', message: 'Merci! Votre demande a été envoyée — nous vous répondons rapidement.' });
      form.reset();
    } catch {
      setStatus({
        kind: 'error',
        message: "L'envoi a échoué. Réessayez, ou contactez-nous directement par téléphone ou courriel ci-dessous.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="cta-section">
      <div className="container cta-grid">
        <div className="cta-side">
          <span className="eyebrow">Prochaine étape</span>
          <h2>Prêt pour l'hiver?</h2>
          <p>Demandez votre soumission gratuite. Nous vous répondons rapidement pour confirmer votre secteur et votre forfait.</p>
          <div className="mono-list">
            <div><PhoneIcon /> <a href="tel:+15793681280">(579) 368-1280</a></div>
            <div><MailIcon /> <a href="mailto:info@groupereca.ca">info@groupereca.ca</a></div>
            <div><MapPinIcon /> <span>962 rue Labelle, Saint-Jérôme, QC J7Z 5N1</span></div>
          </div>
        </div>

        <form id="contact-form" ref={formRef} onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="field">
              <label htmlFor="nom">Nom complet <span className="required">*</span></label>
              <input type="text" id="nom" name="nom" autoComplete="name" required />
            </div>
            <div className="field">
              <label htmlFor="telephone">Téléphone <span className="required">*</span></label>
              <input type="tel" id="telephone" name="telephone" autoComplete="tel" required />
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="courriel">Courriel <span className="required">*</span></label>
              <input type="email" id="courriel" name="courriel" autoComplete="email" required />
            </div>
            <div className="field">
              <label htmlFor="typePropriete">Type de propriété <span className="required">*</span></label>
              <select id="typePropriete" name="typePropriete" required defaultValue="">
                <option value="" disabled>Choisir…</option>
                <option value="Résidentiel">Résidentiel</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="adresse">Adresse de la propriété <span className="required">*</span></label>
            <input type="text" id="adresse" name="adresse" autoComplete="street-address" required />
          </div>
          <div className="field">
            <label htmlFor="message">Message (optionnel)</label>
            <textarea id="message" name="message" placeholder="Détails utiles : accès, superficie, particularités du terrain…" />
          </div>

          {/* Piège à robots — laissé vide par les visiteurs humains */}
          <div className="honeypot-field" aria-hidden="true">
            <label htmlFor="site_web">Ne pas remplir ce champ</label>
            <input type="text" id="site_web" name="site_web" tabIndex={-1} autoComplete="off" />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
            {submitting ? 'Envoi en cours…' : 'Envoyer ma demande'}
          </button>
          <p className={`form-status${status.kind !== 'idle' ? ` ${status.kind}` : ''}`} role="status" aria-live="polite">
            {status.message}
          </p>
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
