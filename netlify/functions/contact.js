// Fonction Netlify : reçoit le formulaire de contact et envoie un courriel via Resend.
// Nécessite la variable d'environnement RESEND_API_KEY (voir .env.example).

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const TO_EMAIL = 'info@groupereca.ca';
// Domaine d'expédition Resend : remplacer par une adresse sur un domaine vérifié
// (ex. soumission@groupereca.ca) une fois le domaine ajouté et validé dans Resend.
// En attendant, le domaine de test "onboarding@resend.dev" fonctionne pour les envois de démo.
const FROM_EMAIL = 'Groupe RÉCA <onboarding@resend.dev>';

const REQUIRED_FIELDS = ['nom', 'telephone', 'courriel', 'typePropriete', 'adresse'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, function (char) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
  });
}

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ ok: false, error: 'Méthode non autorisée.' }) };
  }

  let data;
  try {
    data = JSON.parse(event.body || '{}');
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'Corps de requête invalide.' }) };
  }

  // Piège à robots : un champ caché rempli signale un envoi automatisé.
  if (data.site_web) {
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }

  for (const field of REQUIRED_FIELDS) {
    if (!data[field] || String(data[field]).trim() === '') {
      return { statusCode: 400, body: JSON.stringify({ ok: false, error: `Champ requis manquant : ${field}` }) };
    }
  }

  if (!EMAIL_RE.test(data.courriel)) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'Courriel invalide.' }) };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY manquante dans les variables d\'environnement.');
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: 'Configuration serveur manquante.' }) };
  }

  const nom = escapeHtml(data.nom).slice(0, 200);
  const telephone = escapeHtml(data.telephone).slice(0, 60);
  const courriel = escapeHtml(data.courriel).slice(0, 200);
  const typePropriete = escapeHtml(data.typePropriete).slice(0, 60);
  const adresse = escapeHtml(data.adresse).slice(0, 300);
  const message = escapeHtml(data.message || '(aucun message)').slice(0, 2000);

  const html = `
    <h2>Nouvelle demande de soumission — Groupe RÉCA</h2>
    <p><strong>Nom :</strong> ${nom}</p>
    <p><strong>Téléphone :</strong> ${telephone}</p>
    <p><strong>Courriel :</strong> ${courriel}</p>
    <p><strong>Type de propriété :</strong> ${typePropriete}</p>
    <p><strong>Adresse :</strong> ${adresse}</p>
    <p><strong>Message :</strong><br>${message.replace(/\n/g, '<br>')}</p>
  `;

  try {
    const resendRes = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: data.courriel,
        subject: `Nouvelle demande de soumission — ${data.nom}`,
        html
      })
    });

    if (!resendRes.ok) {
      const errBody = await resendRes.text();
      console.error('Erreur API Resend :', resendRes.status, errBody);
      return { statusCode: 502, body: JSON.stringify({ ok: false, error: 'Échec de l\'envoi du courriel.' }) };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('Erreur réseau vers Resend :', err);
    return { statusCode: 502, body: JSON.stringify({ ok: false, error: 'Échec de l\'envoi du courriel.' }) };
  }
};
