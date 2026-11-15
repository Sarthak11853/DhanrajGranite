// Data layer shared by the customer site and the admin panel.
//
// Two interchangeable backends:
//   • Supabase (free hosted Postgres + storage + auth) when config.js has keys.
//     Changes made in the admin panel are visible to every visitor instantly.
//   • Demo mode (browser localStorage) when it does not. Fully functional,
//     but changes live only in the browser where they were made.

import config from './config.js';
import { SETTINGS as SEED_SETTINGS, COLLECTIONS as SEED } from './seed.js';

export const COLLECTIONS = Object.keys(SEED);
export const DEFAULT_SETTINGS = SEED_SETTINGS;

const SUPABASE_SDK = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.117.3/+esm';
const LS_DATA = 'dg:data:v2';
const LS_CACHE = 'dg:cache:v2';
const LS_PW = 'dg:demo-pw';
const SS_AUTH = 'dg:demo-auth';
export const DEMO_PASSWORD = 'dhanraj123';

export const mode = config.supabaseUrl && config.supabaseAnonKey ? 'supabase' : 'demo';

/* ------------------------------------------------------------------ utils */

export function uid() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

const ls = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set(k, v) { localStorage.setItem(k, JSON.stringify(v)); },
  del(k) { try { localStorage.removeItem(k); } catch { /* ignore */ } },
};

function hash(str) {
  // Tiny non-cryptographic hash — demo mode only, nothing secret is stored.
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(36);
}

const bySort = (a, b) => (a.sort ?? 0) - (b.sort ?? 0) || String(a.created_at).localeCompare(String(b.created_at));

export function mergeSettings(s) {
  const out = { ...DEFAULT_SETTINGS };
  for (const [k, v] of Object.entries(s || {})) if (v !== undefined && v !== null) out[k] = v;
  return out;
}

function splitItem(item) {
  const { id, sort, visible, created_at, updated_at, collection, ...data } = item;
  return { id, sort, visible, data };
}

const fromRow = (r) => ({ ...r.data, id: r.id, sort: r.sort, visible: r.visible, created_at: r.created_at });

/* ------------------------------------------------------- image handling */

export async function compressImage(file, maxDim = 1800, quality = 0.82) {
  if (!file.type.startsWith('image/')) throw new Error('Please choose an image file.');
  if (file.type === 'image/svg+xml' || file.type === 'image/gif') return file;
  const url = URL.createObjectURL(file);
  try {
    const im = await new Promise((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = () => rej(new Error('This image could not be read. Try a JPG or PNG.'));
      i.src = url;
    });
    const scale = Math.min(1, maxDim / Math.max(im.naturalWidth, im.naturalHeight));
    const w = Math.round(im.naturalWidth * scale);
    const h = Math.round(im.naturalHeight * scale);
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(im, 0, 0, w, h);
    return await new Promise((res) => c.toBlob(res, 'image/jpeg', quality));
  } finally {
    URL.revokeObjectURL(url);
  }
}

const blobToDataUrl = (blob) => new Promise((res, rej) => {
  const r = new FileReader();
  r.onload = () => res(r.result);
  r.onerror = rej;
  r.readAsDataURL(blob);
});

/* ------------------------------------------------------- demo backend */

let memory = null; // in-memory copy; also the fallback when localStorage is unavailable

// Another tab (e.g. the customer site) wrote new data — drop our stale copy.
if (mode === 'demo' && typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => { if (e.key === LS_DATA && e.newValue) memory = null; });
}

function demoSeed() {
  const now = new Date().toISOString();
  const content = {};
  for (const col of COLLECTIONS) {
    content[col] = SEED[col].map((d, i) => ({ ...d, id: uid(), sort: (i + 1) * 10, visible: true, created_at: now }));
  }
  return { settings: {}, content, inquiries: [] };
}

function demoLoad() {
  if (memory) return memory;
  const d = ls.get(LS_DATA);
  if (d && d.content) {
    for (const col of COLLECTIONS) d.content[col] ||= [];
    d.inquiries ||= [];
    memory = d;
    return d;
  }
  memory = demoSeed();
  demoPersist();
  return memory;
}

function demoPersist() {
  try {
    ls.set(LS_DATA, memory);
  } catch {
    throw new Error('Browser storage is full. Use smaller images, or connect Supabase to store unlimited content.');
  }
}

const demo = {
  async loadPublic() {
    const d = demoLoad();
    const out = { settings: mergeSettings(d.settings) };
    for (const col of COLLECTIONS) out[col] = d.content[col].filter((x) => x.visible !== false).sort(bySort);
    return out;
  },
  async list(col) { return [...demoLoad().content[col]].sort(bySort); },
  async save(col, item) {
    const d = demoLoad();
    const list = d.content[col];
    const now = new Date().toISOString();
    if (item.id) {
      const i = list.findIndex((x) => x.id === item.id);
      if (i >= 0) list[i] = { ...list[i], ...item, updated_at: now };
      else list.push({ ...item, created_at: now });
    } else {
      const sort = item.sort ?? Math.max(0, ...list.map((x) => x.sort || 0)) + 10;
      item = { visible: true, ...item, id: uid(), sort, created_at: now };
      list.push(item);
    }
    demoPersist();
    return list.find((x) => x.id === item.id);
  },
  async remove(col, id) {
    const d = demoLoad();
    d.content[col] = d.content[col].filter((x) => x.id !== id);
    demoPersist();
  },
  async setSort(col, changes) {
    const d = demoLoad();
    for (const { id, sort } of changes) {
      const it = d.content[col].find((x) => x.id === id);
      if (it) it.sort = sort;
    }
    demoPersist();
  },
  async getSettings() { return mergeSettings(demoLoad().settings); },
  async saveSettings(s) { demoLoad().settings = { ...s }; demoPersist(); },
  async submitInquiry(data) {
    const d = demoLoad();
    d.inquiries.unshift({ ...data, id: uid(), status: 'new', created_at: new Date().toISOString() });
    demoPersist();
  },
  async listInquiries() { return [...demoLoad().inquiries]; },
  async updateInquiry(id, patch) {
    const it = demoLoad().inquiries.find((x) => x.id === id);
    if (it) Object.assign(it, patch);
    demoPersist();
  },
  async removeInquiry(id) {
    const d = demoLoad();
    d.inquiries = d.inquiries.filter((x) => x.id !== id);
    demoPersist();
  },
  async uploadImage(file) {
    const blob = await compressImage(file, 1100, 0.74);
    return blobToDataUrl(blob);
  },
  async replaceAll({ settings, content }) {
    const d = demoLoad();
    d.settings = settings || {};
    const now = new Date().toISOString();
    for (const col of COLLECTIONS) {
      d.content[col] = (content?.[col] || []).map((x, i) => ({
        visible: true, sort: (i + 1) * 10, created_at: now, ...x, id: x.id || uid(),
      }));
    }
    demoPersist();
  },
  async resetDemo() { memory = demoSeed(); demoPersist(); },
  subscribe(cb) {
    const h = (e) => { if (e.key === LS_DATA) { memory = null; cb(); } };
    window.addEventListener('storage', h);
    return () => window.removeEventListener('storage', h);
  },
  auth: {
    async session() { try { return sessionStorage.getItem(SS_AUTH) ? { user: { email: 'admin (demo)' } } : null; } catch { return null; } },
    async signIn(_email, password) {
      const stored = ls.get(LS_PW);
      const ok = stored ? stored === hash(password) : password === DEMO_PASSWORD;
      if (!ok) throw new Error('Incorrect password.');
      try { sessionStorage.setItem(SS_AUTH, '1'); } catch { /* ignore */ }
    },
    async signOut() { try { sessionStorage.removeItem(SS_AUTH); } catch { /* ignore */ } },
    async changePassword(current, next) {
      const stored = ls.get(LS_PW);
      const ok = stored ? stored === hash(current) : current === DEMO_PASSWORD;
      if (!ok) throw new Error('Current password is incorrect.');
      ls.set(LS_PW, hash(next));
    },
    async resetPassword() {
      ls.del(LS_PW);
      return 'Demo password reset to the default.';
    },
    onRecovery() {},
    async setNewPassword() {},
  },
};

/* --------------------------------------------------- supabase backend */

let sbPromise = null;
const recoveryCbs = [];
let recoveryPending = false;
function sb() {
  sbPromise ||= import(SUPABASE_SDK).then(({ createClient }) => {
    const c = createClient(config.supabaseUrl, config.supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });
    // Registered immediately so a password-reset link is never missed.
    c.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') { recoveryPending = true; recoveryCbs.forEach((f) => f()); }
    });
    return c;
  });
  return sbPromise;
}

function check({ data, error }) {
  if (error) throw new Error(error.message || 'Database error');
  return data;
}

async function uploadBlob(blob, folder = 'uploads') {
  const c = await sb();
  const ext = blob.type === 'image/png' ? 'png' : blob.type === 'image/svg+xml' ? 'svg' : blob.type === 'image/gif' ? 'gif' : 'jpg';
  const path = `${folder}/${Date.now()}-${uid().slice(0, 8)}.${ext}`;
  check(await c.storage.from('media').upload(path, blob, { contentType: blob.type || 'image/jpeg', cacheControl: '31536000', upsert: false }));
  return c.storage.from('media').getPublicUrl(path).data.publicUrl;
}

async function dataUrlToStorage(v, folder) {
  if (typeof v !== 'string' || !v.startsWith('data:image')) return v;
  const blob = await (await fetch(v)).blob();
  return uploadBlob(blob, folder);
}

const remote = {
  async loadPublic() {
    const c = await sb();
    const [rows, settings] = await Promise.all([
      c.from('content').select('*').eq('visible', true).order('sort').order('created_at'),
      c.from('settings').select('data').eq('id', 1).maybeSingle(),
    ]);
    const out = { settings: mergeSettings(check(settings)?.data) };
    for (const col of COLLECTIONS) out[col] = [];
    for (const r of check(rows)) if (out[r.collection]) out[r.collection].push(fromRow(r));
    return out;
  },
  async list(col) {
    const c = await sb();
    return check(await c.from('content').select('*').eq('collection', col).order('sort').order('created_at')).map(fromRow);
  },
  async save(col, item) {
    const c = await sb();
    const { id, sort, visible, data } = splitItem(item);
    if (id) {
      const row = check(await c.from('content')
        .update({ data, sort, visible, updated_at: new Date().toISOString() })
        .eq('id', id).select().single());
      return fromRow(row);
    }
    let s = sort;
    if (s == null) {
      const top = check(await c.from('content').select('sort').eq('collection', col).order('sort', { ascending: false }).limit(1));
      s = (top[0]?.sort || 0) + 10;
    }
    const row = check(await c.from('content').insert({ collection: col, data, sort: s, visible: visible ?? true }).select().single());
    return fromRow(row);
  },
  async remove(_col, id) {
    const c = await sb();
    check(await c.from('content').delete().eq('id', id));
  },
  async setSort(_col, changes) {
    const c = await sb();
    await Promise.all(changes.map(({ id, sort }) => c.from('content').update({ sort }).eq('id', id).then(check)));
  },
  async getSettings() {
    const c = await sb();
    return mergeSettings(check(await c.from('settings').select('data').eq('id', 1).maybeSingle())?.data);
  },
  async saveSettings(s) {
    const c = await sb();
    check(await c.from('settings').upsert({ id: 1, data: s, updated_at: new Date().toISOString() }));
  },
  async submitInquiry(data) {
    const c = await sb();
    // No .select(): visitors may insert inquiries but never read them back.
    check(await c.from('inquiries').insert(data));
  },
  async listInquiries() {
    const c = await sb();
    return check(await c.from('inquiries').select('*').order('created_at', { ascending: false }));
  },
  async updateInquiry(id, patch) {
    const c = await sb();
    check(await c.from('inquiries').update(patch).eq('id', id));
  },
  async removeInquiry(id) {
    const c = await sb();
    check(await c.from('inquiries').delete().eq('id', id));
  },
  async uploadImage(file, folder) {
    const blob = await compressImage(file);
    return uploadBlob(blob, folder);
  },
  async replaceAll({ settings, content }) {
    const c = await sb();
    // Move any embedded (demo-mode) images into storage first.
    const s = { ...(settings || {}) };
    for (const k of Object.keys(s)) s[k] = await dataUrlToStorage(s[k], 'settings');
    const rows = [];
    for (const col of COLLECTIONS) {
      const list = content?.[col] || [];
      for (let i = 0; i < list.length; i++) {
        const { data, sort, visible } = splitItem(list[i]);
        for (const k of Object.keys(data)) {
          data[k] = Array.isArray(data[k])
            ? await Promise.all(data[k].map((v) => dataUrlToStorage(v, col)))
            : await dataUrlToStorage(data[k], col);
        }
        rows.push({ collection: col, data, sort: sort ?? (i + 1) * 10, visible: visible ?? true });
      }
    }
    check(await c.from('content').delete().not('id', 'is', null));
    if (rows.length) check(await c.from('content').insert(rows));
    check(await c.from('settings').upsert({ id: 1, data: s, updated_at: new Date().toISOString() }));
  },
  async resetDemo() { throw new Error('Not available when connected to Supabase.'); },
  subscribe(cb) {
    let ch;
    let t;
    const fire = () => { clearTimeout(t); t = setTimeout(cb, 400); };
    sb().then((c) => {
      ch = c.channel('dg-public')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'content' }, fire)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, fire)
        .subscribe();
    }).catch(() => {});
    return () => ch?.unsubscribe();
  },
  auth: {
    async session() {
      const c = await sb();
      const { data } = await c.auth.getSession();
      if (!data.session) return null;
      const { data: ok } = await c.rpc('is_admin');
      return ok ? data.session : null;
    },
    async signIn(email, password) {
      const c = await sb();
      check(await c.auth.signInWithPassword({ email, password }));
      const { data: ok, error } = await c.rpc('is_admin');
      if (error || !ok) {
        await c.auth.signOut();
        throw new Error(error ? 'Database is not set up yet — run supabase/schema.sql.' : 'This account is not on the admin list.');
      }
    },
    async signOut() { const c = await sb(); await c.auth.signOut(); },
    async changePassword(current, next) {
      const c = await sb();
      const { data } = await c.auth.getUser();
      const email = data?.user?.email;
      const re = await c.auth.signInWithPassword({ email, password: current });
      if (re.error) throw new Error('Current password is incorrect.');
      check(await c.auth.updateUser({ password: next }));
    },
    async resetPassword(email) {
      const c = await sb();
      check(await c.auth.resetPasswordForEmail(email, { redirectTo: location.origin + location.pathname }));
      return 'If that email is an admin account, a reset link is on its way.';
    },
    onRecovery(cb) {
      recoveryCbs.push(cb);
      if (recoveryPending) cb();
      sb();
    },
    async setNewPassword(pw) {
      const c = await sb();
      check(await c.auth.updateUser({ password: pw }));
    },
  },
};

/* ------------------------------------------------------------- facade */

const impl = mode === 'supabase' ? remote : demo;

export const store = {
  mode,
  ...impl,

  /** Last successfully loaded public data, for an instant first paint. */
  cached() {
    const c = ls.get(LS_CACHE);
    if (!c || !c.settings) return null;
    c.settings = mergeSettings(c.settings);
    for (const col of COLLECTIONS) c[col] ||= [];
    return c;
  },
  async loadPublicFresh() {
    const data = await impl.loadPublic();
    // Cache without heavy embedded images (demo-mode uploads).
    try {
      const lite = JSON.parse(JSON.stringify(data, (k, v) => (typeof v === 'string' && v.startsWith('data:') ? undefined : v)));
      ls.set(LS_CACHE, lite);
    } catch { /* storage full — skip cache */ }
    return data;
  },

  async exportAll() {
    const content = {};
    for (const col of COLLECTIONS) content[col] = await impl.list(col);
    return { app: 'dhanraj-granite', version: 1, exported_at: new Date().toISOString(), settings: await impl.getSettings(), content };
  },
  async importAll(json) {
    if (!json || typeof json !== 'object' || !json.content) throw new Error('That file is not a Dhanraj Granite backup.');
    await impl.replaceAll(json);
    ls.del(LS_CACHE);
  },
  async importStarter() {
    await impl.replaceAll({ settings: {}, content: SEED });
    ls.del(LS_CACHE);
  },
  async isEmpty() {
    for (const col of COLLECTIONS) if ((await impl.list(col)).length) return false;
    return true;
  },
};
