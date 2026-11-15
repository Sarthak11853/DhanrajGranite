// Emails each quote request to the addresses in Site & About → Inquiry emails.
//
// Uses FormSubmit (https://formsubmit.co), a free service that turns a form
// post into an email — no server or account needed. The very first email to
// a new main address asks that inbox to click "Activate Form" once; after
// that every inquiry arrives automatically. See README → "Inquiry emails".

const ENDPOINT = 'https://formsubmit.co/ajax/';

export function recipients(settings) {
  return (Array.isArray(settings?.notifyEmails) ? settings.notifyEmails : [])
    .map((s) => String(s).trim())
    .filter((s) => /^[^\s@/]+@[^\s@/]+\.[^\s@/]+$/.test(s) || /^[a-f0-9]{16,64}$/i.test(s)); // email, or FormSubmit alias code
}

export async function emailInquiry(settings, data, { test = false } = {}) {
  const list = recipients(settings);
  if (!list.length) return { skipped: true };
  const [to, ...cc] = list;
  const brand = settings.brand || 'Website';

  const body = {
    _subject: `${test ? '[TEST] ' : ''}New quote request — ${data.name}${data.product ? ` · ${data.product}` : ''}`,
    _template: 'table',
    _captcha: 'false',
    ...(cc.length ? { _cc: cc.join(',') } : {}),
    ...(data.email ? { _replyto: data.email } : {}),
    Name: data.name,
    Phone: data.phone,
    Email: data.email || '—',
    Product: data.product || '—',
    'Project type': data.project_type || '—',
    Finish: data.finish || '—',
    'Square feet': data.sqft || '—',
    'Quantity (slabs)': data.quantity || '—',
    Location: data.location || '—',
    Message: data.message || '—',
    'Received at': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    'Sent from': `${brand} website — ${location.origin}${location.pathname}`,
  };

  const res = await fetch(ENDPOINT + encodeURI(to), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
    keepalive: true,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || String(json.success) !== 'true') {
    throw new Error(json.message || `Email service answered ${res.status}`);
  }
  return json;
}
