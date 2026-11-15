// Dhanraj Granite — admin panel
// Every list here is generated from SCHEMAS below. To add a new field to a
// section (e.g. "price" on products), add one line to its `fields` array and
// show it on the customer site in app.js — no database change is needed.

import { store, DEFAULT_SETTINGS, DEMO_PASSWORD } from './store.js';
import { esc, safeUrl, icon, toast, lockScroll, fmtDate, waLink, digits } from './ui.js';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const root = $('#root');

/* ================================================================ schemas */

const SCHEMAS = {
  products: {
    label: 'Products', one: 'Product', title: 'name', thumb: 'image', duplicate: true,
    sub: (x) => [x.color, x.finish, x.application, x.thickness].filter(Boolean).join(' · '),
    tags: (x) => (x.featured ? [['Homepage', 'gold']] : []),
    fields: [
      { k: 'name', label: 'Name', req: true, full: true, ph: 'e.g. Ivory Fantasy' },
      { k: 'color', label: 'Colour family', type: 'list', opts: 'colors' },
      { k: 'finish', label: 'Finish', type: 'list', opts: 'finishes' },
      { k: 'application', label: 'Application', type: 'list', opts: 'applications' },
      { k: 'origin', label: 'Origin', ph: 'India' },
      { k: 'thickness', label: 'Thickness', ph: '18mm' },
      { k: 'density', label: 'Density', ph: '2.79 g/cm³' },
      { k: 'description', label: 'Short description', type: 'textarea', full: true, ph: 'Optional — a line or two about the stone.' },
      { k: 'image', label: 'Photo', type: 'image', req: true, full: true },
      { k: 'featured', label: 'Show in the homepage collection', type: 'toggle', full: true },
    ],
    defaults: () => ({ origin: 'India', thickness: '18mm', density: '2.79 g/cm³', finish: 'Polished' }),
  },
  capabilities: {
    label: 'Capabilities', one: 'Step', title: 'title', thumb: 'image',
    sub: (x) => x.step && `Step ${x.step}`,
    fields: [
      { k: 'step', label: 'Step no.', ph: '01' },
      { k: 'title', label: 'Title', req: true },
      { k: 'description', label: 'Description', type: 'textarea', req: true, full: true },
      { k: 'image', label: 'Image', type: 'image', full: true },
    ],
  },
  gallery: {
    label: 'Gallery', one: 'Image', title: 'title', thumb: 'image',
    sub: (x) => x.category,
    fields: [
      { k: 'title', label: 'Title', req: true },
      { k: 'category', label: 'Category', type: 'list', opts: 'galleryCategories' },
      { k: 'image', label: 'Image', type: 'image', req: true, full: true },
    ],
  },
  milestones: {
    label: 'Milestones', one: 'Milestone', title: 'title', thumb: 'image', initial: 'year',
    sub: (x) => x.year,
    fields: [
      { k: 'year', label: 'Year', req: true, ph: 'e.g. 1997' },
      { k: 'title', label: 'Title', req: true, ph: 'e.g. Expansion to Mumbai' },
      { k: 'description', label: 'Description', type: 'textarea', full: true },
      { k: 'image', label: 'Image (optional)', type: 'image', full: true },
    ],
  },
  testimonials: {
    label: 'Testimonials', one: 'Testimonial', title: 'name', thumb: 'photo',
    sub: (x) => [x.role, x.location].filter(Boolean).join(' · '),
    fields: [
      { k: 'name', label: 'Client name', req: true },
      { k: 'role', label: 'Role / project', ph: 'Residential Client' },
      { k: 'location', label: 'Location', ph: 'Mumbai' },
      { k: 'rating', label: 'Rating', type: 'select', options: ['5', '4', '3'] },
      { k: 'quote', label: 'Review', type: 'textarea', req: true, full: true },
      { k: 'photo', label: 'Photo (optional)', type: 'image', full: true },
    ],
    defaults: () => ({ rating: '5' }),
  },
  outlets: {
    label: 'Outlets', one: 'Outlet', title: 'name',
    sub: (x) => [x.type, x.phone].filter(Boolean).join(' · '),
    fields: [
      { k: 'name', label: 'Name', req: true, full: true },
      { k: 'type', label: 'Type', type: 'list', options: ['Manufacturing Unit', 'Corporate Office', 'Warehouse', 'Showroom'] },
      { k: 'phone', label: 'Phone', type: 'tel' },
      { k: 'address', label: 'Address', type: 'textarea', req: true, full: true },
      { k: 'hours', label: 'Hours', ph: 'Mon–Sun · 9:00 AM – 6:00 PM', full: true },
      { k: 'mapsUrl', label: 'Google Maps link', type: 'url', full: true, hint: 'Optional — if blank, the address is searched on Google Maps.' },
    ],
  },
  resources: {
    label: 'Resources', one: 'Resource', title: 'title',
    sub: (x) => [x.source, x.category].filter(Boolean).join(' · '),
    fields: [
      { k: 'title', label: 'Title', req: true, full: true },
      { k: 'source', label: 'Source', req: true, ph: 'e.g. Houzz' },
      { k: 'category', label: 'Label', ph: 'e.g. Care' },
      { k: 'url', label: 'Link', type: 'url', req: true, full: true, ph: 'https://' },
    ],
  },
};

const SETTINGS_GROUPS = [
  { id: 'business', title: 'Business & contact', note: 'Shown in the header, footer, contact page and WhatsApp buttons.', fields: [
    { k: 'brand', label: 'Business name', req: true },
    { k: 'established', label: 'Established (year)' },
    { k: 'phone', label: 'Primary phone', type: 'tel' },
    { k: 'phone2', label: 'Second phone', type: 'tel' },
    { k: 'whatsapp', label: 'WhatsApp number', hint: 'Digits only with country code, e.g. 919392537240' },
    { k: 'email', label: 'Email', type: 'email' },
    { k: 'cities', label: 'Cities line', ph: 'Mumbai · Madurai' },
    { k: 'instagram', label: 'Instagram link', type: 'url' },
    { k: 'facebook', label: 'Facebook link', type: 'url' },
  ] },
  { id: 'home', title: 'Homepage', note: 'The first thing customers see.', fields: [
    { k: 'heroEyebrow', label: 'Small heading above title', full: true },
    { k: 'heroLine1', label: 'Title — line 1', ph: 'Quarried with care.' },
    { k: 'heroAccent', label: 'Title — gold italic word', ph: 'Finished' },
    { k: 'heroLine2', label: 'Title — rest of line 2', ph: 'with precision.', full: true },
    { k: 'heroText', label: 'Intro paragraph', type: 'textarea', full: true },
    { k: 'heroImage', label: 'Background image', type: 'image', full: true, hint: 'A dark, calm photo works best behind white text.' },
    { k: 'stats', label: 'Numbers band (up to 4)', type: 'pairs', a: 'value', b: 'label', aPh: '35+', bPh: 'Years of craft', max: 4, full: true },
    { k: 'collectionEyebrow', label: 'Collection — small heading' },
    { k: 'collectionTitle', label: 'Collection — title' },
    { k: 'ctaTitle', label: 'Call-to-action title', full: true },
    { k: 'ctaText', label: 'Call-to-action text', type: 'textarea', full: true },
    { k: 'footerText', label: 'Footer description', type: 'textarea', full: true },
  ] },
  { id: 'about', title: 'About page', note: 'Milestones are edited in the Milestones tab.', fields: [
    { k: 'aboutTitle', label: 'Title', ph: 'Rooted in stone,' },
    { k: 'aboutAccent', label: 'Title — italic part', ph: 'since 1991.' },
    { k: 'aboutStory', label: 'Our story (main paragraph)', type: 'textarea', full: true, rows: 6 },
    { k: 'aboutEssence', label: 'Our essence', type: 'textarea', full: true },
    { k: 'aboutCraft', label: 'Our craft', type: 'textarea', full: true },
    { k: 'aboutImage', label: 'About image', type: 'image', full: true },
  ] },
  { id: 'factory', title: 'Factory specifications', note: 'Shown on the Capabilities page.', fields: [
    { k: 'factorySpecs', label: 'Specifications', type: 'pairs', a: 'label', b: 'value', aPh: 'Monthly capacity', bPh: '180,000 sq.ft', max: 8, full: true },
  ] },
  { id: 'options', title: 'Catalogue options', note: 'One per line. These power the filters on the Products and Gallery pages and the choices in the quote form.', fields: [
    { k: 'colors', label: 'Colour families', type: 'lines' },
    { k: 'finishes', label: 'Finishes', type: 'lines' },
    { k: 'applications', label: 'Applications', type: 'lines' },
    { k: 'galleryCategories', label: 'Gallery categories', type: 'lines' },
    { k: 'projectTypes', label: 'Project types (quote form)', type: 'lines', full: true },
  ] },
];

const TABS = [
  ['inquiries', 'Inquiries'], ['products', 'Products'], ['capabilities', 'Capabilities'], ['gallery', 'Gallery'],
  ['milestones', 'Milestones'], ['testimonials', 'Testimonials'], ['outlets', 'Outlets'], ['resources', 'Resources'],
  ['settings', 'Site & About'], ['account', 'Account'],
];
const STATUSES = ['new', 'contacted', 'quoted', 'closed'];

/* ================================================================== state */

let S = { ...DEFAULT_SETTINGS };
const lists = {};
let inquiries = [];
let inqFilter = 'all';
const search = {};
let tab = 'inquiries';
let emptyDb = false;

function tabFromHash() {
  const h = location.hash.slice(1);
  return TABS.some(([k]) => k === h) ? h : null;
}

/* ================================================================== login */

function renderLogin(msg = '') {
  const demo = store.mode === 'demo';
  root.innerHTML = `
  <div class="login">
    <a class="login__back" href="index.html">${icon.left} Back to site</a>
    <div class="login__box">
      <span class="logo__mark">DG</span>
      <h1>${esc(S.brand)}</h1>
      <small>Admin portal</small>
      <form class="login__card" id="loginForm" novalidate>
        ${demo ? '' : `<div class="field"><label for="lg-email">Email</label><input id="lg-email" name="email" type="email" autocomplete="username" required></div>`}
        <div class="field"><label for="lg-pw">Password</label>
          <div class="pw-wrap"><input id="lg-pw" name="password" type="password" autocomplete="current-password" required placeholder="Enter password">
          <button type="button" data-peek aria-label="Show password">${icon.eye}</button></div>
        </div>
        <div class="login__err" id="loginErr" role="alert">${esc(msg)}</div>
        <button class="btn btn--block" type="submit">Sign in</button>
        <button class="login__link" type="button" id="forgot">Forgot password?</button>
        ${demo ? `<div class="login__hint">Demo mode — default password <code>${DEMO_PASSWORD}</code>. Change it in Account after signing in.</div>` : ''}
      </form>
    </div>
  </div>`;
  const form = $('#loginForm');
  setTimeout(() => (demo ? $('#lg-pw') : $('#lg-email')).focus(), 50);
  $('[data-peek]', form).addEventListener('click', (e) => {
    const i = $('#lg-pw');
    i.type = i.type === 'password' ? 'text' : 'password';
    e.currentTarget.innerHTML = i.type === 'password' ? icon.eye : icon.eyeOff;
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = $('button[type=submit]', form);
    const err = $('#loginErr');
    err.textContent = '';
    btn.disabled = true;
    btn.textContent = 'Signing in…';
    try {
      await store.auth.signIn(form.email?.value.trim(), form.password.value);
      await renderShell();
    } catch (ex) {
      err.textContent = ex.message;
      btn.disabled = false;
      btn.textContent = 'Sign in';
    }
  });
  $('#forgot').addEventListener('click', async () => {
    const email = form.email?.value.trim();
    if (!demo && !email) { $('#loginErr').textContent = 'Enter your email above, then tap “Forgot password?”.'; return; }
    try { toast(await store.auth.resetPassword(email)); } catch (ex) { toast(ex.message, 'err'); }
  });
}

function renderRecovery() {
  closeDrawer(true);
  root.innerHTML = `
  <div class="login"><div class="login__box">
    <span class="logo__mark">DG</span><h1>Set a new password</h1><small>Admin portal</small>
    <form class="login__card" id="recForm">
      <div class="field"><label for="rc1">New password</label><input id="rc1" type="password" minlength="8" autocomplete="new-password" required></div>
      <div class="field"><label for="rc2">Confirm password</label><input id="rc2" type="password" minlength="8" autocomplete="new-password" required></div>
      <div class="login__err" id="recErr" role="alert"></div>
      <button class="btn btn--block" type="submit">Save password</button>
    </form>
  </div></div>`;
  $('#recForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const a = $('#rc1').value;
    if (a.length < 8) { $('#recErr').textContent = 'Use at least 8 characters.'; return; }
    if (a !== $('#rc2').value) { $('#recErr').textContent = 'Passwords do not match.'; return; }
    try {
      await store.auth.setNewPassword(a);
      toast('Password updated');
      history.replaceState(null, '', location.pathname);
      renderShell();
    } catch (ex) { $('#recErr').textContent = ex.message; }
  });
}

/* ================================================================== shell */

async function renderShell() {
  tab = tabFromHash() || tab;
  const live = store.mode === 'supabase';
  root.innerHTML = `
  <header class="ad-top">
    <div class="container ad-top__in">
      <div class="ad-brand"><span class="logo__mark">DG</span><div><small>Internal</small><b>Admin Dashboard</b></div></div>
      <span class="mode ${live ? 'mode--live' : ''} hide-sm" title="${live ? 'Connected to Supabase — changes are live for every visitor.' : 'Demo mode — changes are saved in this browser only.'}"><i></i>${live ? 'Live' : 'Demo mode'}</span>
      <a class="top-link" href="index.html" target="_blank" rel="noopener">${icon.ext}<span class="hide-sm">View site</span></a>
      <button class="top-link" id="signOut">${icon.logout}<span class="hide-sm">Sign out</span></button>
    </div>
    <div class="container"><nav class="tabs" id="tabs" aria-label="Sections"></nav></div>
  </header>
  <main class="ad-main"><div class="container" id="view"></div></main>`;
  $('#signOut').addEventListener('click', async () => { await store.auth.signOut(); renderLogin(); });

  try { S = await store.getSettings(); } catch (e) { toast(e.message, 'err'); }
  try { inquiries = await store.listInquiries(); } catch (e) { inquiries = []; console.error(e); }
  if (live) { try { emptyDb = await store.isEmpty(); } catch { emptyDb = false; } }
  renderTabs();
  renderView();
}

function renderTabs() {
  const n = inquiries.filter((x) => x.status === 'new').length;
  $('#tabs').innerHTML = TABS.map(([k, l]) =>
    `<a class="tab ${k === tab ? 'is-on' : ''}" href="#${k}">${l}${k === 'inquiries' && n ? `<span class="badge">${n}</span>` : ''}</a>`).join('');
  const on = $('.tab.is-on');
  on?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
}

function banners() {
  let out = '';
  if (store.mode === 'demo') {
    out += `<div class="banner"><span><b>Demo mode.</b> Changes are saved in this browser only. Connect a free Supabase database to publish them to every customer — see the Account tab.</span><a class="btn btn--line btn--sm" href="#account">How to go live</a></div>`;
  } else if (emptyDb) {
    out += `<div class="banner"><span><b>Your database is empty.</b> Load the starter catalogue to begin, then edit or replace each item.</span><button class="btn btn--sm" data-starter>Load starter content</button></div>`;
  }
  return out;
}

function renderView() {
  const v = $('#view');
  if (!v) return;
  v.style.animation = 'none';
  void v.offsetWidth;
  v.style.animation = '';
  if (tab === 'inquiries') return viewInquiries(v);
  if (tab === 'settings') return viewSettings(v);
  if (tab === 'account') return viewAccount(v);
  return viewCollection(v, tab);
}

/* ============================================================ collections */

async function viewCollection(v, col) {
  const sc = SCHEMAS[col];
  v.innerHTML = `${banners()}
    <div class="ad-head">
      <div><h2>${sc.label}</h2><small id="count">Loading…</small></div>
      <div class="ad-head__actions">
        <label class="ad-search">${icon.search}<span class="sr-only">Search</span><input type="search" id="q" placeholder="Search ${sc.label.toLowerCase()}…" value="${esc(search[col] || '')}"></label>
        <button class="btn btn--sm" data-add>${icon.plus} Add ${sc.one.toLowerCase()}</button>
      </div>
    </div>
    <div class="ad-list" id="list"><div class="ad-empty skel" style="height:240px"></div></div>`;
  $('#q').addEventListener('input', (e) => { search[col] = e.target.value; renderList(col); });
  try {
    lists[col] = await store.list(col);
    renderList(col);
  } catch (e) {
    $('#list').innerHTML = `<div class="ad-empty"><h3>Could not load.</h3><p>${esc(e.message)}</p></div>`;
  }
}

function renderList(col) {
  const sc = SCHEMAS[col];
  const list = $('#list');
  if (!list || tab !== col) return;
  const all = lists[col] || [];
  const q = (search[col] || '').trim().toLowerCase();
  const items = q ? all.filter((it) => sc.fields.some((f) => String(it[f.k] ?? '').toLowerCase().includes(q))) : all;
  const hidden = all.filter((x) => x.visible === false).length;
  $('#count').textContent = `${all.length} ${all.length === 1 ? 'item' : 'items'}${hidden ? ` · ${hidden} hidden` : ''}${q ? ` · ${items.length} shown` : ''}`;
  if (!items.length) {
    list.innerHTML = `<div class="ad-empty"><h3>${q ? 'Nothing matches.' : `No ${sc.label.toLowerCase()} yet.`}</h3><p>${q ? 'Try another search.' : `Add your first ${sc.one.toLowerCase()} to show it on the site.`}</p>${q ? '' : `<p style="margin-top:18px"><button class="btn btn--sm" data-add>${icon.plus} Add ${sc.one.toLowerCase()}</button></p>`}</div>`;
    return;
  }
  list.innerHTML = items.map((it, i) => {
    const thumb = sc.thumb && it[sc.thumb];
    const tags = [...(sc.tags ? sc.tags(it) : []), ...(it.visible === false ? [['Hidden', '']] : [])];
    const initial = esc(String(it[sc.initial || sc.title] || '?').slice(0, sc.initial ? 4 : 1));
    return `
    <div class="ad-row ${it.visible === false ? 'is-hidden' : ''}" data-id="${esc(it.id)}" style="animation-delay:${Math.min(i, 15) * 0.025}s">
      <div class="ad-row__thumb" ${sc.initial && !thumb ? 'style="font-size:13px"' : ''}>${thumb ? `<img src="${esc(safeUrl(thumb))}" alt="" loading="lazy">` : initial}</div>
      <button class="ad-row__main" data-act="edit"><b>${esc(it[sc.title] || 'Untitled')}</b><span>${esc((sc.sub && sc.sub(it)) || '')}</span></button>
      <div class="tags">${tags.map(([t, k]) => `<span class="tag ${k ? `tag--${k}` : ''}">${t}</span>`).join('')}</div>
      <div class="row-actions">
        <button class="ib" data-act="up" title="Move up" aria-label="Move up" ${i === 0 || q ? 'disabled' : ''}>${icon.up}</button>
        <button class="ib" data-act="down" title="Move down" aria-label="Move down" ${i === items.length - 1 || q ? 'disabled' : ''}>${icon.down}</button>
        <button class="ib" data-act="vis" title="${it.visible === false ? 'Show on site' : 'Hide from site'}" aria-label="${it.visible === false ? 'Show on site' : 'Hide from site'}">${it.visible === false ? icon.eyeOff : icon.eye}</button>
        ${sc.duplicate ? `<button class="ib" data-act="dup" title="Duplicate" aria-label="Duplicate">${icon.copy}</button>` : ''}
        <button class="ib" data-act="edit" title="Edit" aria-label="Edit">${icon.edit}</button>
        <button class="ib ib--danger" data-act="del" title="Delete" aria-label="Delete">${icon.trash}</button>
      </div>
    </div>`;
  }).join('');
}

async function rowAction(col, id, act, btn) {
  const sc = SCHEMAS[col];
  const list = lists[col];
  const it = list.find((x) => x.id === id);
  if (!it) return;
  try {
    if (act === 'edit') return openEditor(col, it);
    if (act === 'up' || act === 'down') {
      const i = list.indexOf(it);
      const j = i + (act === 'up' ? -1 : 1);
      if (j < 0 || j >= list.length) return;
      [list[i], list[j]] = [list[j], list[i]];
      const changes = [];
      list.forEach((x, k) => { const s = (k + 1) * 10; if (x.sort !== s) { x.sort = s; changes.push({ id: x.id, sort: s }); } });
      renderList(col);
      await store.setSort(col, changes);
      return;
    }
    if (btn) btn.disabled = true;
    if (act === 'vis') {
      const saved = await store.save(col, { ...it, visible: it.visible === false });
      Object.assign(it, saved);
      toast(it.visible === false ? 'Hidden from the site' : 'Visible on the site');
    }
    if (act === 'dup') {
      const copy = { ...it, id: undefined, sort: undefined, created_at: undefined };
      copy[sc.title] = `${it[sc.title]} (copy)`;
      const saved = await store.save(col, copy);
      list.push(saved);
      toast('Duplicated — opening the copy');
      renderList(col);
      return openEditor(col, saved);
    }
    if (act === 'del') {
      if (!(await confirmBox(`Delete “${it[sc.title]}”?`, 'It will be removed from the website. This cannot be undone.', 'Delete'))) return;
      await store.remove(col, id);
      lists[col] = list.filter((x) => x.id !== id);
      toast('Deleted');
    }
    renderList(col);
  } catch (e) {
    toast(e.message, 'err');
    lists[col] = await store.list(col).catch(() => list);
    renderList(col);
  }
}

/* ================================================================ fields */

function fieldHtml(f, v, prefix = 'f') {
  const id = `${prefix}_${f.k}`;
  const label = `<label for="${id}">${esc(f.label)}${f.req ? ' <b>*</b>' : ''}</label>`;
  const hint = f.hint ? `<span class="hint">${esc(f.hint)}</span>` : '';
  const cls = `field ${f.full ? 'field--full' : ''}`;
  const val = v ?? '';
  const req = f.req ? 'required' : '';
  const ph = f.ph ? `placeholder="${esc(f.ph)}"` : '';
  switch (f.type) {
    case 'textarea':
      return `<div class="${cls}">${label}<textarea id="${id}" name="${f.k}" rows="${f.rows || 3}" ${req} ${ph}>${esc(val)}</textarea>${hint}</div>`;
    case 'select':
      return `<div class="${cls}">${label}<select id="${id}" name="${f.k}">${f.options.map((o) => `<option ${String(o) === String(val) ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>${hint}</div>`;
    case 'list': {
      const opts = f.options || S[f.opts] || [];
      return `<div class="${cls}">${label}<input id="${id}" name="${f.k}" list="${id}_dl" value="${esc(val)}" ${req} ${ph} autocomplete="off">
        <datalist id="${id}_dl">${opts.map((o) => `<option value="${esc(o)}">`).join('')}</datalist>
        <span class="hint">${f.hint ? esc(f.hint) : 'Pick from the list or type a new one.'}</span></div>`;
    }
    case 'toggle':
      return `<div class="${cls}"><label class="switch"><input type="checkbox" id="${id}" name="${f.k}" ${val ? 'checked' : ''}><span class="switch__ui"></span><span>${esc(f.label)}</span></label>${hint}</div>`;
    case 'image': {
      const u = safeUrl(val);
      return `<div class="${cls}">${label}
        <div class="imgfield" data-img="${f.k}">
          <input type="hidden" name="${f.k}" value="${esc(val)}" ${req ? 'data-req' : ''}>
          <label class="drop">
            <input type="file" accept="image/*" aria-label="Upload ${esc(f.label)}">
            ${u ? `<img src="${esc(u)}" alt="">` : ''}
            <span class="drop__empty" ${u ? 'hidden' : ''}>${icon.upload}<span><b>Tap to upload</b> or drag a photo here</span><small>JPG or PNG — resized automatically</small></span>
          </label>
          <div class="imgfield__row">
            <input class="input" type="url" placeholder="…or paste an image link" value="${esc(String(val).startsWith('data:') ? '' : val)}" data-imgurl aria-label="Image link">
            ${u ? `<button type="button" class="btn btn--line btn--sm" data-imgclear>Remove</button>` : ''}
          </div>
        </div>${hint}</div>`;
    }
    case 'pairs': {
      const rows = Array.isArray(val) ? val : [];
      return `<div class="${cls}">${label}
        <div class="pairs" data-pairs="${f.k}" data-a="${f.a}" data-b="${f.b}" data-max="${f.max || 10}" data-aph="${esc(f.aPh || '')}" data-bph="${esc(f.bPh || '')}">
          ${rows.map((r) => pairRow(f, r)).join('')}
        </div>
        <button type="button" class="btn btn--line btn--sm" data-addpair="${f.k}" style="justify-self:start;margin-top:4px" ${rows.length >= (f.max || 10) ? 'hidden' : ''}>${icon.plus} Add row</button>${hint}</div>`;
    }
    case 'lines':
      return `<div class="${cls}">${label}<textarea id="${id}" name="${f.k}" rows="5">${esc((val || []).join('\n'))}</textarea>${hint}</div>`;
    default:
      return `<div class="${cls}">${label}<input id="${id}" name="${f.k}" type="${f.type || 'text'}" value="${esc(val)}" ${req} ${ph} ${f.type === 'tel' ? 'inputmode="tel"' : ''}>${hint}</div>`;
  }
}

function pairRow(f, r = {}) {
  const a = f.a || f.dataset?.a;
  const b = f.b || f.dataset?.b;
  return `<div class="pair">
    <input class="input" data-pa value="${esc(r[a] || '')}" placeholder="${esc(f.aPh || f.dataset?.aph || '')}" aria-label="${esc(a)}">
    <input class="input" data-pb value="${esc(r[b] || '')}" placeholder="${esc(f.bPh || f.dataset?.bph || '')}" aria-label="${esc(b)}">
    <button type="button" class="ib ib--danger" data-delpair aria-label="Remove row">${icon.close}</button>
  </div>`;
}

function readFields(form, fields) {
  const out = {};
  for (const f of fields) {
    if (f.type === 'toggle') out[f.k] = form.elements[f.k].checked;
    else if (f.type === 'lines') out[f.k] = form.elements[f.k].value.split('\n').map((s) => s.trim()).filter(Boolean);
    else if (f.type === 'pairs') {
      const box = $(`[data-pairs="${f.k}"]`, form);
      out[f.k] = $$('.pair', box).map((p) => ({ [f.a]: $('[data-pa]', p).value.trim(), [f.b]: $('[data-pb]', p).value.trim() }))
        .filter((r) => r[f.a] || r[f.b]);
    } else if (f.type === 'image') out[f.k] = $(`[data-img="${f.k}"] input[type=hidden]`, form).value.trim();
    else out[f.k] = form.elements[f.k].value.trim();
  }
  return out;
}

function validate(form, fields) {
  $$('.field', form).forEach((el) => { el.classList.remove('has-error'); $('.err', el)?.replaceWith(); });
  let first = null;
  for (const f of fields) {
    if (!f.req) continue;
    const v = f.type === 'image' ? $(`[data-img="${f.k}"] input[type=hidden]`, form).value : form.elements[f.k]?.value;
    const bad = !String(v || '').trim() || (f.type === 'url' && !/^https?:\/\//i.test(v));
    if (bad) {
      const el = (f.type === 'image' ? $(`[data-img="${f.k}"]`, form) : form.elements[f.k]).closest('.field');
      el.classList.add('has-error');
      el.insertAdjacentHTML('beforeend', `<span class="err">${f.type === 'image' ? 'Please add an image.' : f.type === 'url' ? 'Please enter a full link starting with https://' : 'This is required.'}</span>`);
      first ||= el;
    }
  }
  if (first) first.scrollIntoView({ block: 'center', behavior: 'smooth' });
  return !first;
}

/** Wires up image upload, pair rows and dirty tracking inside a form. */
function bindFormWidgets(form, folder, onChange) {
  const clearErr = (el) => {
    const f = el.closest('.field');
    if (f?.classList.contains('has-error')) { f.classList.remove('has-error'); $('.err', f)?.replaceWith(); }
  };
  const setImg = (box, url) => {
    $('input[type=hidden]', box).value = url;
    if (url) clearErr(box);
    const drop = $('.drop', box);
    $('img', drop)?.replaceWith();
    if (url) drop.insertAdjacentHTML('beforeend', `<img src="${esc(safeUrl(url))}" alt="">`);
    $('.drop__empty', drop).hidden = !!url;
    const row = $('.imgfield__row', box);
    $('[data-imgurl]', box).value = url.startsWith('data:') ? '' : url;
    $('[data-imgclear]', row)?.replaceWith();
    if (url) row.insertAdjacentHTML('beforeend', '<button type="button" class="btn btn--line btn--sm" data-imgclear>Remove</button>');
    onChange?.();
  };
  const upload = async (box, file) => {
    if (!file) return;
    const drop = $('.drop', box);
    drop.insertAdjacentHTML('beforeend', '<span class="drop__busy">Uploading…</span>');
    try {
      const url = await store.uploadImage(file, folder);
      setImg(box, url);
    } catch (e) {
      toast(e.message, 'err');
    } finally {
      $('.drop__busy', drop)?.replaceWith();
    }
  };
  $$('[data-img]', form).forEach((box) => {
    const drop = $('.drop', box);
    $('input[type=file]', box).addEventListener('change', (e) => { upload(box, e.target.files[0]); e.target.value = ''; });
    $('[data-imgurl]', box).addEventListener('change', (e) => setImg(box, e.target.value.trim()));
    box.addEventListener('click', (e) => { if (e.target.closest('[data-imgclear]')) setImg(box, ''); });
    ['dragenter', 'dragover'].forEach((t) => drop.addEventListener(t, (e) => { e.preventDefault(); drop.classList.add('is-over'); }));
    ['dragleave', 'drop'].forEach((t) => drop.addEventListener(t, () => drop.classList.remove('is-over')));
    drop.addEventListener('drop', (e) => { e.preventDefault(); upload(box, e.dataTransfer.files[0]); });
  });
  form.addEventListener('click', (e) => {
    const add = e.target.closest('[data-addpair]');
    if (add) {
      const box = $(`[data-pairs="${add.dataset.addpair}"]`, form);
      box.insertAdjacentHTML('beforeend', pairRow(box));
      $$('.pair', box).at(-1).querySelector('input').focus();
      add.hidden = $$('.pair', box).length >= Number(box.dataset.max);
      onChange?.();
    }
    const del = e.target.closest('[data-delpair]');
    if (del) {
      const box = del.closest('[data-pairs]');
      del.closest('.pair').replaceWith();
      $(`[data-addpair="${box.dataset.pairs}"]`, form).hidden = false;
      onChange?.();
    }
  });
  form.addEventListener('input', (e) => { if (e.target.value) clearErr(e.target); onChange?.(); });
  form.addEventListener('change', () => onChange?.());
}

/* ================================================================ drawer */

const drawer = { el: null, dirty: () => false, onClose: null, open: false };

function openDrawer(html, { dirty, onClose } = {}) {
  drawer.el ||= $('#drawer');
  const panel = $('.drawer__panel', drawer.el);
  panel.innerHTML = html;
  panel.onclick = null;
  drawer.dirty = dirty || (() => false);
  drawer.onClose = onClose;
  if (!drawer.open) {
    drawer.open = true;
    drawer.lastFocus = document.activeElement;
    lockScroll(true);
    drawer.el.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => drawer.el.classList.add('is-open'));
  }
  setTimeout(() => $('input:not([type=hidden]):not([type=file]), textarea, select', panel)?.focus({ preventScroll: true }), 350);
  return panel;
}

async function closeDrawer(force = false) {
  if (!drawer.open) return true;
  if (!force && drawer.dirty() && !(await confirmBox('Discard changes?', 'You have unsaved changes in this form.', 'Discard'))) return false;
  drawer.open = false;
  drawer.el.classList.remove('is-open');
  drawer.el.setAttribute('aria-hidden', 'true');
  lockScroll(false);
  drawer.onClose?.();
  drawer.lastFocus?.focus?.({ preventScroll: true });
  return true;
}

function openEditor(col, item) {
  const sc = SCHEMAS[col];
  const isNew = !item;
  const data = item ? { ...item } : { ...(sc.defaults ? sc.defaults() : {}) };
  const panel = openDrawer(`
    <div class="drawer__head"><h3 id="drawerTitle">${isNew ? 'Add' : 'Edit'} ${sc.one.toLowerCase()}</h3>
      <button class="ib" data-dclose aria-label="Close">${icon.close}</button></div>
    <form class="drawer__body" id="edForm" novalidate>
      <div class="ed-form">
        ${sc.fields.map((f) => fieldHtml(f, data[f.k])).join('')}
        <div class="field field--full"><label class="switch"><input type="checkbox" name="__visible" ${data.visible === false ? '' : 'checked'}><span class="switch__ui"></span><span>Visible on the website</span></label></div>
      </div>
    </form>
    <div class="drawer__foot">
      ${isNew ? '' : `<button class="btn btn--line btn--sm spacer" data-eddel style="color:#b8382a">${icon.trash} Delete</button>`}
      <button class="btn btn--line btn--sm" data-dclose>Cancel</button>
      <button class="btn btn--sm" data-edsave>Save</button>
    </div>`);
  const form = $('#edForm', panel);
  const snapshot = () => JSON.stringify({ ...readFields(form, sc.fields), v: form.elements.__visible.checked });
  const initial = snapshot();
  drawer.dirty = () => snapshot() !== initial;
  bindFormWidgets(form, col);

  const save = async () => {
    if (!validate(form, sc.fields)) return;
    const btn = $('[data-edsave]', panel);
    btn.disabled = true;
    btn.textContent = 'Saving…';
    try {
      const values = readFields(form, sc.fields);
      const saved = await store.save(col, { ...(item || {}), ...values, visible: form.elements.__visible.checked });
      const list = lists[col] || (lists[col] = []);
      const i = list.findIndex((x) => x.id === saved.id);
      if (i >= 0) list[i] = saved; else list.push(saved);
      emptyDb = false;
      toast(isNew ? `${sc.one} added` : 'Saved');
      await closeDrawer(true);
      renderList(col);
    } catch (e) {
      toast(e.message, 'err');
      btn.disabled = false;
      btn.textContent = 'Save';
    }
  };
  form.addEventListener('submit', (e) => { e.preventDefault(); save(); });
  $('[data-edsave]', panel).addEventListener('click', save);
  $('[data-eddel]', panel)?.addEventListener('click', async () => {
    if (!(await confirmBox(`Delete “${item[sc.title]}”?`, 'It will be removed from the website. This cannot be undone.', 'Delete'))) return;
    try {
      await store.remove(col, item.id);
      lists[col] = lists[col].filter((x) => x.id !== item.id);
      toast('Deleted');
      await closeDrawer(true);
      renderList(col);
    } catch (e) { toast(e.message, 'err'); }
  });
}

/* ============================================================== inquiries */

async function viewInquiries(v) {
  try { inquiries = await store.listInquiries(); } catch (e) { toast(e.message, 'err'); }
  renderTabs();
  const counts = Object.fromEntries(STATUSES.map((s) => [s, inquiries.filter((x) => (x.status || 'new') === s).length]));
  const list = inqFilter === 'all' ? inquiries : inquiries.filter((x) => (x.status || 'new') === inqFilter);
  v.innerHTML = `${banners()}
    <div class="ad-head">
      <div><h2>Inquiries</h2><small>${inquiries.length} total · ${counts.new} new</small></div>
      <div class="ad-head__actions">
        <button class="btn btn--line btn--sm" data-refresh>Refresh</button>
        <button class="btn btn--line btn--sm" data-csv ${inquiries.length ? '' : 'disabled'}>Export CSV</button>
      </div>
    </div>
    <div class="chips" style="margin-bottom:18px">
      ${['all', ...STATUSES].map((s) => `<button class="chip ${inqFilter === s ? 'is-on' : ''}" data-inqf="${s}">${s} ${s === 'all' ? inquiries.length : counts[s]}</button>`).join('')}
    </div>
    <div class="ad-list">
      ${list.map((q, i) => `
      <div class="ad-row inq-row ${(q.status || 'new') === 'new' ? 'is-new' : ''}" data-inq="${esc(q.id)}" style="animation-delay:${Math.min(i, 15) * 0.025}s">
        <span class="date">${esc(fmtDate(q.created_at))}</span>
        <button class="ad-row__main" data-act="view"><b>${esc(q.name)}</b><span>${esc([q.phone, q.email].filter(Boolean).join(' · '))}</span></button>
        <span class="prod ad-row__main" style="cursor:default"><span>${esc([q.product, q.project_type, q.location].filter(Boolean).join(' · ') || '—')}</span></span>
        <div class="tags"><span class="tag tag--${esc(q.status || 'new')}">${esc(q.status || 'new')}</span></div>
        <div class="row-actions">
          ${q.phone ? `<a class="ib" href="${waLink(digits(q.phone).replace(/^\+/, ''), `Hello ${q.name}, thank you for contacting ${S.brand}.`)}" target="_blank" rel="noopener" title="Reply on WhatsApp" aria-label="Reply on WhatsApp">${icon.whatsapp.replace('width="22" height="22"', 'width="17" height="17"')}</a>` : ''}
          <button class="ib" data-act="view" title="Open" aria-label="Open">${icon.right}</button>
          <button class="ib ib--danger" data-act="delinq" title="Delete" aria-label="Delete">${icon.trash}</button>
        </div>
      </div>`).join('') || `<div class="ad-empty"><h3>${inquiries.length ? 'Nothing here.' : 'No inquiries yet.'}</h3><p>${inquiries.length ? 'No inquiries with this status.' : 'Quote requests from the Contact page will appear here.'}</p></div>`}
    </div>`;
}

function openInquiry(q) {
  const row = (k, v, full) => (v ? `<div class="${full ? 'full' : ''}"><dt>${k}</dt><dd>${esc(v)}</dd></div>` : '');
  const phone = digits(q.phone);
  openDrawer(`
    <div class="drawer__head"><h3 id="drawerTitle">${esc(q.name)}</h3><button class="ib" data-dclose aria-label="Close">${icon.close}</button></div>
    <div class="drawer__body">
      <dl class="detail-grid">
        ${row('Received', new Date(q.created_at).toLocaleString())}
        ${row('Status', q.status || 'new')}
        ${row('Phone', q.phone)}${row('Email', q.email)}
        ${row('Product', q.product)}${row('Project type', q.project_type)}
        ${row('Finish', q.finish)}${row('Square feet', q.sqft)}
        ${row('Quantity (slabs)', q.quantity)}${row('Location', q.location)}
        ${q.message ? `<div class="full"><dt>Message</dt><dd class="msg-box">${esc(q.message)}</dd></div>` : ''}
      </dl>
      <div style="margin-top:28px"><span class="eyebrow">Mark as</span>
        <div class="status-row" style="margin-top:12px">${STATUSES.map((s) => `<button class="chip ${(q.status || 'new') === s ? 'is-on' : ''}" data-status="${s}">${s}</button>`).join('')}</div>
      </div>
      <div style="margin-top:28px;display:flex;gap:10px;flex-wrap:wrap">
        ${phone ? `<a class="btn btn--wa btn--sm" href="${waLink(phone.replace(/^\+/, ''), `Hello ${q.name}, thank you for contacting ${S.brand}${q.product ? ` about ${q.product}` : ''}.`)}" target="_blank" rel="noopener">${icon.whatsapp} WhatsApp</a>
        <a class="btn btn--line btn--sm" href="tel:${esc(phone)}">${icon.phone} Call</a>` : ''}
        ${q.email ? `<a class="btn btn--line btn--sm" href="mailto:${esc(q.email)}?subject=${encodeURIComponent(`Your quote request — ${S.brand}`)}">${icon.mail} Email</a>` : ''}
      </div>
    </div>
    <div class="drawer__foot"><button class="btn btn--line btn--sm spacer" data-delinq-d style="color:#b8382a">${icon.trash} Delete</button><button class="btn btn--sm" data-dclose>Done</button></div>`);
  const panel = $('.drawer__panel');
  panel.onclick = async (e) => {
    const st = e.target.closest('[data-status]');
    if (st) {
      try {
        await store.updateInquiry(q.id, { status: st.dataset.status });
        q.status = st.dataset.status;
        toast(`Marked ${q.status}`);
        openInquiry(q);
        viewInquiries($('#view'));
      } catch (ex) { toast(ex.message, 'err'); }
    }
    if (e.target.closest('[data-delinq-d]')) {
      if (await deleteInquiry(q)) closeDrawer(true);
    }
  };
}

async function deleteInquiry(q) {
  if (!(await confirmBox(`Delete inquiry from ${q.name}?`, 'This cannot be undone.', 'Delete'))) return false;
  try {
    await store.removeInquiry(q.id);
    toast('Inquiry deleted');
    viewInquiries($('#view'));
    return true;
  } catch (e) { toast(e.message, 'err'); return false; }
}

function exportCsv() {
  const cols = ['created_at', 'status', 'name', 'phone', 'email', 'product', 'project_type', 'finish', 'sqft', 'quantity', 'location', 'message'];
  const cell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const csv = [cols.join(','), ...inquiries.map((q) => cols.map((c) => cell(q[c])).join(','))].join('\r\n');
  download(`inquiries-${new Date().toISOString().slice(0, 10)}.csv`, `﻿${csv}`, 'text/csv');
}

function download(name, text, type) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.replaceWith(); }, 500);
}

/* =============================================================== settings */

function viewSettings(v) {
  v.innerHTML = `${banners()}
    <div class="ad-head"><div><h2>Site &amp; About</h2><small>Text, contact details and options used across the website.</small></div></div>
    <div class="set-nav">${SETTINGS_GROUPS.map((g) => `<a class="chip" href="#settings" data-jump="${g.id}">${g.title}</a>`).join('')}</div>
    <form id="setForm" novalidate>
      ${SETTINGS_GROUPS.map((g) => `
      <section class="set-card" id="sg-${g.id}">
        <h3>${g.title}</h3><p>${g.note}</p>
        <div class="set-form">${g.fields.map((f) => fieldHtml(f, S[f.k], 's')).join('')}</div>
      </section>`).join('')}
      <div class="savebar" id="savebar"><span>You have unsaved changes.</span><span style="display:flex;gap:10px"><button type="button" class="btn btn--line btn--sm" data-setreset>Undo</button><button class="btn btn--sm" type="submit">Save changes</button></span></div>
    </form>`;
  const form = $('#setForm');
  const fields = SETTINGS_GROUPS.flatMap((g) => g.fields);
  const initial = JSON.stringify(readFields(form, fields));
  const isDirty = () => JSON.stringify(readFields(form, fields)) !== initial;
  const bar = $('#savebar');
  bindFormWidgets(form, 'settings', () => bar.classList.toggle('is-on', isDirty()));
  settingsDirty = isDirty;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate(form, fields)) return;
    const btn = $('button[type=submit]', form);
    btn.disabled = true;
    try {
      const next = { ...S, ...readFields(form, fields) };
      await store.saveSettings(next);
      S = next;
      toast('Settings saved — live on the site');
      viewSettings(v);
    } catch (ex) {
      toast(ex.message, 'err');
      btn.disabled = false;
    }
  });
}
let settingsDirty = () => false;

/* ================================================================ account */

function viewAccount(v) {
  const live = store.mode === 'supabase';
  v.innerHTML = `${banners()}
    <div class="ad-head"><div><h2>Account</h2><small>Password, backups and database connection.</small></div></div>

    <section class="set-card">
      <h3>${live ? 'Connected to Supabase' : 'Go live with a free database'}</h3>
      ${live ? `<p>Every change you make here is saved to your Supabase database and appears on the website for all visitors within seconds.</p>` : `
      <p>Right now the site is in <b>demo mode</b>: your edits are stored only in this browser, so customers won’t see them. To publish edits to everyone:</p>
      <ol style="color:var(--muted);line-height:1.9;padding-left:20px;margin:0 0 18px">
        <li>Create a free project at <b>supabase.com</b>.</li>
        <li>Open <b>SQL Editor</b>, paste the contents of <code>supabase/schema.sql</code> and press Run.</li>
        <li>In <b>Authentication → Users</b>, add yourself (email + password), then run <code>insert into admins (email) values ('you@example.com');</code></li>
        <li>Copy <b>Project URL</b> and <b>anon public key</b> (Settings → API) into <code>assets/js/config.js</code> and redeploy.</li>
        <li>Optional: export a backup below now, and import it after connecting to keep your demo edits.</li>
      </ol>
      <p>Full step-by-step instructions are in <code>README.md</code>.</p>`}
    </section>

    <section class="set-card">
      <h3>Change password</h3><p>${live ? 'Use at least 8 characters.' : 'Demo password for this browser.'}</p>
      <form id="pwForm" class="set-form" style="max-width:560px" novalidate>
        <div class="field field--full"><label for="pw0">Current password</label><input id="pw0" type="password" autocomplete="current-password" required></div>
        <div class="field"><label for="pw1">New password</label><input id="pw1" type="password" autocomplete="new-password" minlength="8" required></div>
        <div class="field"><label for="pw2">Confirm new password</label><input id="pw2" type="password" autocomplete="new-password" minlength="8" required></div>
        <div class="field field--full"><button class="btn btn--sm" type="submit" style="justify-self:start">Change password</button></div>
      </form>
    </section>

    <section class="set-card">
      <h3>Backup &amp; restore</h3>
      <p>Download everything (products, gallery, text…) as one file. Restoring replaces the current content — inquiries are not affected.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn btn--sm" data-export>${icon.down} Download backup</button>
        <label class="btn btn--line btn--sm" style="cursor:pointer">${icon.upload} Restore from file<input type="file" accept="application/json,.json" data-import hidden></label>
        <button class="btn btn--line btn--sm" data-starter>Load starter content</button>
        ${live ? '' : '<button class="btn btn--line btn--sm" data-resetdemo>Reset demo</button>'}
      </div>
    </section>`;

  $('#pwForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const [a, b, c] = ['#pw0', '#pw1', '#pw2'].map((s) => $(s).value);
    if (b.length < 8) return toast('New password must be at least 8 characters.', 'err');
    if (b !== c) return toast('New passwords do not match.', 'err');
    try { await store.auth.changePassword(a, b); toast('Password changed'); e.target.reset(); } catch (ex) { toast(ex.message, 'err'); }
  });
  $('[data-import]', v).addEventListener('change', async (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    try {
      const json = JSON.parse(await file.text());
      if (!(await confirmBox('Restore this backup?', 'All current products, gallery items and site text will be replaced.', 'Restore'))) return;
      toast('Restoring… this can take a moment');
      await store.importAll(json);
      S = await store.getSettings();
      emptyDb = false;
      toast('Backup restored');
      viewAccount(v);
    } catch (ex) { toast(ex instanceof SyntaxError ? 'That file is not a valid backup.' : ex.message, 'err'); }
  });
}

/* ================================================================ confirm */

function confirmBox(title, text, ok = 'Confirm') {
  const el = $('#confirm');
  el.innerHTML = `<div class="confirm__box" role="alertdialog" aria-modal="true" aria-labelledby="cfT"><h3 id="cfT">${esc(title)}</h3><p>${esc(text)}</p>
    <div class="btns"><button class="btn btn--line btn--sm" data-no>Cancel</button><button class="btn btn--danger btn--sm" data-yes>${esc(ok)}</button></div></div>`;
  el.setAttribute('aria-hidden', 'false');
  requestAnimationFrame(() => el.classList.add('is-open'));
  setTimeout(() => $('[data-no]', el).focus(), 30);
  return new Promise((res) => {
    const done = (v) => {
      el.classList.remove('is-open');
      el.setAttribute('aria-hidden', 'true');
      el.onclick = null;
      document.removeEventListener('keydown', key, true);
      res(v);
    };
    const key = (e) => { if (e.key === 'Escape') { e.stopPropagation(); done(false); } };
    document.addEventListener('keydown', key, true);
    el.onclick = (e) => {
      if (e.target.closest('[data-yes]')) done(true);
      else if (e.target.closest('[data-no]') || e.target === el) done(false);
    };
  });
}

/* ================================================================ events */

document.addEventListener('click', async (e) => {
  if (e.target.closest('[data-dclose]')) { closeDrawer(); return; }

  const jump = e.target.closest('[data-jump]');
  if (jump) { e.preventDefault(); $(`#sg-${jump.dataset.jump}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  if (e.target.closest('[data-setreset]')) { settingsDirty = () => false; viewSettings($('#view')); }

  const add = e.target.closest('[data-add]');
  if (add && SCHEMAS[tab]) openEditor(tab, null);

  const act = e.target.closest('[data-act]');
  if (act) {
    const row = act.closest('[data-id]');
    if (row && SCHEMAS[tab]) rowAction(tab, row.dataset.id, act.dataset.act, act);
    const iq = act.closest('[data-inq]');
    if (iq) {
      const q = inquiries.find((x) => x.id === iq.dataset.inq);
      if (q && act.dataset.act === 'view') openInquiry(q);
      if (q && act.dataset.act === 'delinq') deleteInquiry(q);
    }
  }

  const f = e.target.closest('[data-inqf]');
  if (f) { inqFilter = f.dataset.inqf; viewInquiries($('#view')); }
  if (e.target.closest('[data-refresh]')) { await viewInquiries($('#view')); toast('Up to date'); }
  if (e.target.closest('[data-csv]')) exportCsv();

  if (e.target.closest('[data-export]')) {
    try {
      const data = await store.exportAll();
      download(`dhanraj-granite-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(data, null, 2), 'application/json');
    } catch (ex) { toast(ex.message, 'err'); }
  }
  if (e.target.closest('[data-starter]')) {
    if (!(await confirmBox('Load starter content?', 'Sample products, gallery, milestones and text will replace the current content. Inquiries are kept.', 'Load'))) return;
    try {
      toast('Loading starter content…');
      await store.importStarter();
      S = await store.getSettings();
      emptyDb = false;
      toast('Starter content loaded');
      renderView();
    } catch (ex) { toast(ex.message, 'err'); }
  }
  if (e.target.closest('[data-resetdemo]')) {
    if (!(await confirmBox('Reset demo?', 'All demo edits and inquiries in this browser will be cleared.', 'Reset'))) return;
    await store.resetDemo();
    S = await store.getSettings();
    inquiries = [];
    toast('Demo reset');
    renderTabs();
    renderView();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && drawer.open && !$('#confirm').classList.contains('is-open')) closeDrawer();
  if ((e.metaKey || e.ctrlKey) && e.key === 's') {
    if (drawer.open && $('[data-edsave]')) { e.preventDefault(); $('[data-edsave]').click(); }
    else if (tab === 'settings' && $('#setForm')) { e.preventDefault(); $('#setForm').requestSubmit(); }
  }
});

window.addEventListener('hashchange', async () => {
  const t = tabFromHash();
  if (!t || !$('#view')) return;
  if (tab === 'settings' && t !== 'settings' && settingsDirty() && !(await confirmBox('Leave without saving?', 'Your changes to Site & About are not saved yet.', 'Leave'))) {
    history.replaceState(null, '', '#settings');
    return;
  }
  if (drawer.open && !(await closeDrawer())) { history.replaceState(null, '', `#${tab}`); return; }
  settingsDirty = () => false;
  tab = t;
  renderTabs();
  renderView();
  window.scrollTo({ top: 0 });
});

window.addEventListener('beforeunload', (e) => {
  if ((drawer.open && drawer.dirty()) || (tab === 'settings' && settingsDirty())) { e.preventDefault(); e.returnValue = ''; }
});

/* =================================================================== boot */

(async function boot() {
  try { S = await store.getSettings(); } catch { /* defaults */ }
  store.auth.onRecovery(renderRecovery);
  if (/type=recovery/.test(location.hash)) {
    // The recovery event renders the form; if the link was invalid, fall back to login.
    setTimeout(() => { if ($('.ad-boot')) renderLogin('That reset link has expired. Request a new one.'); }, 5000);
    return;
  }
  let session = null;
  try { session = await store.auth.session(); } catch (e) { console.error(e); }
  if (session) renderShell();
  else renderLogin();
})();
