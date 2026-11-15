// Dhanraj Granite — customer site (hash-routed single page app)

import { store } from './store.js';
import { esc, safeUrl, slug, waLink, mapsLink, icon, toast, lockScroll, logo, reducedMotion, debounce, digits } from './ui.js';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

let D = store.cached();
let lastJson = D ? JSON.stringify(D) : '';
let currentPath = null;

const NAV = [
  ['', 'Home'], ['products', 'Products'], ['capabilities', 'Capabilities'], ['about', 'About'],
  ['gallery', 'Gallery'], ['outlets', 'Outlets'], ['resources', 'Resources'], ['contact', 'Contact'],
];

const productFilters = { q: '', color: 'All', finish: 'All', application: 'All', open: false };
let galleryFilter = 'All';

/* ================================================================ routing */

function parseHash() {
  const h = location.hash.replace(/^#\/?/, '');
  const [path, qs] = h.split('?');
  return { path: (path || '').replace(/\/+$/, ''), params: new URLSearchParams(qs || '') };
}

const PAGES = {
  '': { title: null, render: pageHome },
  products: { title: 'Products', render: pageProducts },
  capabilities: { title: 'Capabilities', render: pageCapabilities },
  about: { title: 'About', render: pageAbout },
  gallery: { title: 'Gallery', render: pageGallery },
  outlets: { title: 'Outlets', render: pageOutlets },
  resources: { title: 'Resources', render: pageResources },
  contact: { title: 'Request a quote', render: pageContact },
};

async function route({ soft = false } = {}) {
  const { path, params } = parseHash();
  const page = PAGES[path] || PAGES[''];
  const main = $('#app');

  if (path === currentPath && !soft) { syncProductModal(params); return; }

  const first = currentPath === null;
  const changingPage = path !== currentPath;
  currentPath = path;
  closeMenu();

  if (!first && changingPage && !soft && !reducedMotion()) {
    main.classList.add('is-leaving');
    await wait(260);
  }

  const y = window.scrollY;
  main.innerHTML = page.render(D, params);
  document.title = page.title ? `${page.title} — ${D.settings.brand}` : `${D.settings.brand} — ${D.settings.heroLine1} ${D.settings.heroAccent} ${D.settings.heroLine2}`;
  updateChrome(path);
  enhance(main, { soft });

  if (soft) window.scrollTo(0, y);
  else if (changingPage && !first) window.scrollTo({ top: 0, behavior: 'instant' });

  main.classList.remove('is-leaving');
  syncProductModal(params);
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* ============================================================ components */

const img = (src, alt = '', cls = '', eager = false) =>
  `<img class="lazy ${cls}" src="${esc(safeUrl(src))}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;

const pageHeadHtml = (eyebrow, h1Html, lead) => `
  <section class="page-head">
    <div class="container">
      <span class="eyebrow" data-reveal>${esc(eyebrow)}</span>
      <h1 data-reveal style="--d:.08s">${h1Html}</h1>
      ${lead ? `<p class="lead" data-reveal style="--d:.16s">${esc(lead)}</p>` : ''}
    </div>
  </section>`;
const pageHead = (eyebrow, title, accent, lead) =>
  pageHeadHtml(eyebrow, `${esc(title)}${accent ? ` <em>${esc(accent)}</em>` : ''}`, lead);

function productMsg(p) {
  return `Hello ${D.settings.brand}, I'm interested in ${p.name}${p.finish ? ` (${p.finish}${p.thickness ? `, ${p.thickness}` : ''})` : ''}. Could you share price and availability?`;
}

// The same stone can be sold in several finishes, so name + finish identifies a product.
const pKey = (p) => slug([p.name, p.finish].filter(Boolean).join(' ')) || p.id;
const pLabel = (p) => (p.finish ? `${p.name} (${p.finish})` : p.name);
const pPhotos = (p) => [p.image, ...(Array.isArray(p.photos) ? p.photos : [])].filter(Boolean);

function productCard(p, i = 0) {
  const more = pPhotos(p).length - 1;
  return `
  <article class="card" style="animation-delay:${Math.min(i, 12) * 0.05}s">
    <a href="${hrefWith({ p: pKey(p) })}" class="card__media" aria-label="View ${esc(pLabel(p))}">
      ${img(p.image, pLabel(p))}
      ${p.finish ? `<span class="card__tag">${esc(p.finish)}</span>` : ''}
      ${more > 0 ? `<span class="card__count">+${more} photo${more > 1 ? 's' : ''}</span>` : ''}
      <span class="card__peek">${icon.arrow}</span>
    </a>
    <div class="card__body">
      <h3 class="card__title"><a href="${hrefWith({ p: pKey(p) })}">${esc(p.name)}</a></h3>
      <div class="card__meta">${esc([p.application || p.color, p.origin].filter(Boolean).join(' · '))}</div>
      <div class="card__actions">
        <a class="specs" href="${hrefWith({ p: pKey(p) })}">View specs</a>
        <a class="pill-wa" href="${waLink(D.settings.whatsapp, productMsg(p))}" target="_blank" rel="noopener" aria-label="Enquire about ${esc(p.name)} on WhatsApp">${icon.whatsapp}<span>Enquire</span></a>
      </div>
    </div>
  </article>`;
}

function hrefWith(extra) {
  const { path, params } = parseHash();
  const p = new URLSearchParams(params);
  for (const [k, v] of Object.entries(extra)) v == null ? p.delete(k) : p.set(k, v);
  const qs = p.toString();
  return `#/${path}${qs ? `?${qs}` : ''}`;
}

function statsBand(stats) {
  if (!stats?.length) return '';
  return `
  <section class="stats">
    <div class="container stats__grid">
      ${stats.slice(0, 4).map((s, i) => `
        <div class="stat" data-reveal style="--d:${i * 0.08}s">
          <b data-count="${esc(s.value)}">${esc(s.value)}</b>
          <span>${esc(s.label)}</span>
        </div>`).join('')}
    </div>
  </section>`;
}

function ctaBand() {
  const s = D.settings;
  return `
  <section class="section cta">
    <div class="cta__bg">${img('assets/img/cta.jpg')}</div>
    <div class="container">
      <span class="eyebrow" data-reveal>Let’s build together</span>
      <h2 data-reveal style="--d:.08s">${esc(s.ctaTitle)}</h2>
      <p data-reveal style="--d:.16s">${esc(s.ctaText)}</p>
      <div data-reveal style="--d:.24s"><a class="btn" href="#/contact">Start your project ${icon.arrow}</a></div>
    </div>
  </section>`;
}

function testimonialsBlock(list) {
  if (!list?.length) return '';
  return `
  <section class="section section--dark">
    <div class="container">
      <div class="section__head">
        <div>
          <span class="eyebrow" data-reveal>What clients say</span>
          <h2 data-reveal style="--d:.08s">Why they come<br>back to Dhanraj.</h2>
        </div>
        ${list.length > 1 ? `<div class="quotes__nav" data-reveal>
          <button class="round" data-q="prev" aria-label="Previous testimonial">${icon.left}</button>
          <button class="round" data-q="next" aria-label="Next testimonial">${icon.right}</button>
        </div>` : ''}
      </div>
      <div class="quotes" data-reveal style="--d:.12s">
        <div class="quotes__track">
          ${list.map((t, i) => `
          <figure class="quote ${i === 0 ? 'is-on' : ''}" aria-hidden="${i !== 0}">
            ${icon.quote}
            <div class="quote__stars" aria-label="${Number(t.rating) || 5} out of 5 stars">${icon.star.repeat(Math.max(1, Math.min(5, Number(t.rating) || 5)))}</div>
            <blockquote>“${esc(t.quote)}”</blockquote>
            <footer>
              <span class="avatar">${t.photo ? img(t.photo, '') : esc((t.name || '?').replace(/^(Ar\.|Mr\.|Ms\.|Mrs\.|Dr\.)\s*/i, '').charAt(0))}</span>
              <span><b>${esc(t.name)}</b><small>${esc([t.role, t.location].filter(Boolean).join(' · '))}</small></span>
            </footer>
          </figure>`).join('')}
        </div>
        ${list.length > 1 ? `<div class="dots">${list.map((_, i) => `<button class="${i === 0 ? 'is-on' : ''}" data-dot="${i}" aria-label="Show testimonial ${i + 1}"></button>`).join('')}</div>` : ''}
      </div>
    </div>
  </section>`;
}

/* ================================================================= pages */

function pageHome(d) {
  const s = d.settings;
  const featured = d.products.filter((p) => p.featured);
  const showcase = (featured.length ? featured : d.products).slice(0, 8);
  return `
  <section class="hero">
    <div class="hero__bg">${img(s.heroImage || 'assets/img/hero.jpg', '', '', true)}</div>
    <div class="container hero__content">
      <span class="eyebrow fade-up">${esc(s.heroEyebrow)}</span>
      <h1>
        <span class="line"><span>${esc(s.heroLine1)}</span></span>
        <span class="line"><span>${s.heroAccent ? `<em>${esc(s.heroAccent)}</em> ` : ''}${esc(s.heroLine2)}</span></span>
      </h1>
      <p class="fade-up d1">${esc(s.heroText)}</p>
      <div class="hero__ctas fade-up d2">
        <a class="btn" href="#/products">Explore catalogue ${icon.arrow}</a>
        <a class="btn btn--ghost" href="#/contact">Request a quote</a>
      </div>
    </div>
    <span class="hero__scroll" aria-hidden="true">SCROLL</span>
  </section>
  ${statsBand(s.stats)}

  ${showcase.length ? `
  <section class="section">
    <div class="container">
      <div class="section__head">
        <div>
          <span class="eyebrow" data-reveal>${esc(s.collectionEyebrow)}</span>
          <h2 data-reveal style="--d:.08s">${esc(s.collectionTitle)}</h2>
        </div>
        <a class="link-arrow" href="#/products" data-reveal>View all products ${icon.right}</a>
      </div>
      <div class="grid grid--4">
        ${showcase.map((p, i) => `<div data-reveal style="--d:${(i % 4) * 0.08}s">${productCard(p)}</div>`).join('')}
      </div>
    </div>
  </section>` : ''}

  ${d.capabilities.length ? `
  <section class="section section--dark">
    <div class="container process">
      <div>
        <span class="eyebrow" data-reveal>Our process</span>
        <h2 data-reveal style="--d:.08s">From quarry<br><em>to surface.</em></h2>
        <p class="lead" data-reveal style="--d:.16s">Every slab moves through five rigorous stages — monitored by stonecraft masters and finished to architectural tolerance.</p>
        <div style="margin-top:32px;--d:.24s" data-reveal><a class="btn btn--ghost" href="#/capabilities">Explore capabilities ${icon.arrow}</a></div>
      </div>
      <div class="process__list">
        ${d.capabilities.slice(0, 4).map((c, i) => `
          <div class="process__item" data-reveal style="--d:${i * 0.08}s">
            <b>${esc(c.step || String(i + 1).padStart(2, '0'))}</b>
            <h3>${esc(c.title)}</h3>
            <p>${esc(c.description)}</p>
          </div>`).join('')}
      </div>
    </div>
  </section>` : ''}

  ${d.gallery.length ? `
  <section class="section">
    <div class="container">
      <div class="section__head">
        <div>
          <span class="eyebrow" data-reveal>Gallery</span>
          <h2 data-reveal style="--d:.08s">Projects in <em>stone.</em></h2>
        </div>
        <a class="link-arrow" href="#/gallery" data-reveal>View full gallery ${icon.right}</a>
      </div>
      <div class="masonry">${d.gallery.slice(0, 6).map((g, i) => galleryTile(g, i)).join('')}</div>
    </div>
  </section>` : ''}

  ${testimonialsBlock(d.testimonials)}
  ${ctaBand()}`;
}

function galleryTile(g, i) {
  return `
    <button class="tile" data-lb="${i}" data-reveal style="--d:${(i % 3) * 0.08}s" aria-label="Open ${esc(g.title)}">
      ${img(g.image, g.title)}
      <span class="tile__cap"><small>${esc(g.category)}</small><b>${esc(g.title)}</b></span>
    </button>`;
}

/* ---------------------------------------------------------------- products */

function optionsFor(key, settingsList) {
  const present = new Set(D.products.map((p) => p[key]).filter(Boolean));
  const ordered = (settingsList || []).filter((x) => present.has(x));
  for (const v of present) if (!ordered.includes(v)) ordered.push(v);
  return ordered;
}

function filteredProducts() {
  const f = productFilters;
  const q = f.q.trim().toLowerCase();
  return D.products.filter((p) =>
    (f.color === 'All' || p.color === f.color) &&
    (f.finish === 'All' || p.finish === f.finish) &&
    (f.application === 'All' || p.application === f.application) &&
    (!q || [p.name, p.color, p.finish, p.application, p.origin, p.description].join(' ').toLowerCase().includes(q)));
}

function pageProducts(d) {
  const s = d.settings;
  const f = productFilters;
  const active = ['color', 'finish', 'application'].filter((k) => f[k] !== 'All').length;
  const row = (key, label, list) => {
    const opts = optionsFor(key, list);
    if (!opts.length) return '';
    return `<div class="filter-row"><span>${label}</span><div class="chips">
      ${['All', ...opts].map((o) => `<button class="chip ${f[key] === o ? 'is-on' : ''}" data-filter="${key}" data-value="${esc(o)}">${esc(o)}</button>`).join('')}
    </div></div>`;
  };
  return `
  ${pageHead('Catalogue', 'Granite', 'slabs & tiles.', 'Browse our collection by colour family, finish, and application. Request a quote or enquire on WhatsApp for any product.')}
  <section class="section section--tight">
    <div class="container">
      <div class="tools">
        <label class="search">${icon.search}<span class="sr-only">Search granite</span>
          <input type="search" id="pSearch" placeholder="Search granite…" value="${esc(f.q)}" autocomplete="off">
        </label>
        <button class="toggle-filters" id="pToggle" aria-expanded="${f.open}" aria-controls="pFilters">${icon.filter} ${f.open ? 'Hide' : 'Show'} filters ${active ? `<span class="count">${active}</span>` : ''}</button>
      </div>
      <div class="filters ${f.open ? 'is-open' : ''}" id="pFilters"><div><div class="filters__in">
        ${row('color', 'Colour', s.colors)}
        ${row('finish', 'Finish', s.finishes)}
        ${row('application', 'Use', s.applications)}
      </div></div></div>
      <div id="pResults">${productResults()}</div>
    </div>
  </section>
  ${ctaBand()}`;
}

function productResults() {
  const list = filteredProducts();
  if (!list.length) {
    return `<div class="empty"><h3>No granite matches.</h3><p>Try a different search or clear the filters.</p>
      <p style="margin-top:20px"><button class="btn btn--line btn--sm" data-clear>Clear filters</button></p></div>`;
  }
  return `<p class="result-count">${list.length} ${list.length === 1 ? 'product' : 'products'}</p>
    <div class="grid grid--3 stagger">${list.map((p, i) => productCard(p, i)).join('')}</div>`;
}

function refreshProducts() {
  const r = $('#pResults');
  if (!r) return;
  r.innerHTML = productResults();
  bindImages(r);
}

function syncFilterUi() {
  $$('[data-filter]').forEach((c) => c.classList.toggle('is-on', productFilters[c.dataset.filter] === c.dataset.value));
  const t = $('#pToggle');
  if (!t) return;
  const active = ['color', 'finish', 'application'].filter((k) => productFilters[k] !== 'All').length;
  const badge = $('.count', t);
  if (badge) badge.outerHTML = '';
  if (active) t.insertAdjacentHTML('beforeend', `<span class="count">${active}</span>`);
}

/* --------------------------------------------------------- product modal */

const modal = {
  el: null,
  open: false,
  pushed: false,
  show(html, label) {
    this.el ||= $('#modal');
    const panel = $('.modal__panel', this.el);
    panel.innerHTML = `<button class="modal__close" data-close aria-label="Close">${icon.close}</button>${html}`;
    panel.setAttribute('aria-label', label || 'Details');
    bindImages(panel);
    if (!this.open) {
      this.open = true;
      this.lastFocus = document.activeElement;
      lockScroll(true);
      this.el.setAttribute('aria-hidden', 'false');
      requestAnimationFrame(() => this.el.classList.add('is-open'));
      setTimeout(() => $('.modal__close', panel)?.focus({ preventScroll: true }), 60);
    }
    panel.scrollTop = 0;
  },
  hide() {
    this.pushed = false;
    if (!this.open) return;
    this.open = false;
    this.el.classList.remove('is-open');
    this.el.setAttribute('aria-hidden', 'true');
    lockScroll(false);
    this.lastFocus?.focus?.({ preventScroll: true });
  },
};

function syncProductModal(params) {
  const key = params.get('p');
  if (!key) { modal.hide(); return; }
  const p = D.products.find((x) => pKey(x) === key || x.id === key || slug(x.name) === key);
  if (!p) { modal.hide(); return; }
  const rows = [['Origin', p.origin], ['Finish', p.finish], ['Thickness', p.thickness], ['Application', p.application], ['Density', p.density], ['Colour', p.color]]
    .filter(([, v]) => v);
  const photos = pPhotos(p);
  modal.show(`
    <div class="qv">
      <div class="qv__media">
        <button class="qv__main" data-zoom="0" aria-label="View ${esc(pLabel(p))} full screen">
          ${img(p.image, pLabel(p))}
          <span class="qv__zoom">${icon.search} Tap to zoom</span>
        </button>
        ${photos.length > 1 ? `<div class="qv__thumbs">${photos.map((u, i) => `
          <button class="${i === 0 ? 'is-on' : ''}" data-photo="${i}" aria-label="Photo ${i + 1}">${img(u, '')}</button>`).join('')}</div>` : ''}
      </div>
      <div class="qv__body">
        <span class="eyebrow">${esc(p.application || p.color || 'Granite')}</span>
        <h2 id="modalTitle">${esc(p.name)}</h2>
        ${p.description ? `<p class="desc">${esc(p.description)}</p>` : ''}
        <dl class="specs-grid">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
        <div class="qv__actions">
          <a class="btn btn--wa" href="${waLink(D.settings.whatsapp, productMsg(p))}" target="_blank" rel="noopener">${icon.whatsapp} WhatsApp</a>
          <a class="btn" href="#/contact?product=${encodeURIComponent(pLabel(p))}">Request quote</a>
        </div>
      </div>
    </div>`, pLabel(p));
  modal.product = p;
}

function showPhoto(i) {
  const p = modal.product;
  if (!p) return;
  const photos = pPhotos(p);
  const main = $('.qv__main');
  const im = $('img', main);
  im.classList.remove('loaded');
  im.src = safeUrl(photos[i]);
  if (im.complete) im.classList.add('loaded'); else im.onload = () => im.classList.add('loaded');
  main.dataset.zoom = i;
  $$('[data-photo]').forEach((b) => b.classList.toggle('is-on', Number(b.dataset.photo) === i));
}

function closeProductModal() {
  if (modal.pushed && history.length > 1) { modal.pushed = false; history.back(); return; }
  modal.pushed = false;
  history.replaceState(null, '', hrefWith({ p: null }));
  modal.hide();
}

/* ----------------------------------------------------------- capabilities */

function pageCapabilities(d) {
  const s = d.settings;
  return `
  ${pageHeadHtml('Capabilities', 'The journey from <em style="display:inline;color:var(--gold)">rock</em> to room.', 'Precise stages — monowire block dressing, multi-blade cutting, resin reinforcement, CNC profiling, and quality inspection — handled under one roof.')}
  <section class="section">
    <div class="container steps">
      ${d.capabilities.map((c, i) => `
      <article class="step">
        <div class="step__media" data-reveal>${img(c.image, c.title)}</div>
        <div data-reveal style="--d:.1s">
          <div class="step__num">${esc(c.step || String(i + 1).padStart(2, '0'))}</div>
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.description)}</p>
        </div>
      </article>`).join('') || '<p class="empty">Our process will be shared here soon.</p>'}
    </div>
  </section>
  ${s.factorySpecs?.length ? `
  <section class="section section--dark">
    <div class="container">
      <div class="section__head"><div><span class="eyebrow" data-reveal>Infrastructure</span><h2 data-reveal style="--d:.08s">Factory specifications</h2></div></div>
      <div class="spec-cards">
        ${s.factorySpecs.map((f, i) => `<div class="spec-card" data-reveal style="--d:${i * 0.08}s"><small>${esc(f.label)}</small><b>${esc(f.value)}</b></div>`).join('')}
      </div>
    </div>
  </section>` : ''}
  ${ctaBand()}`;
}

/* ------------------------------------------------------------------ about */

function pageAbout(d) {
  const s = d.settings;
  return `
  ${pageHead('About us', s.aboutTitle, s.aboutAccent, '')}
  <section class="section">
    <div class="container">
      <div class="about-grid">
        <div class="media" data-reveal>${img(s.aboutImage || 'assets/img/stone-5.jpg', 'Dhanraj Granite')}</div>
        <div data-reveal style="--d:.1s">
          <span class="eyebrow">Our story</span>
          <p class="story" style="margin-top:20px">${esc(s.aboutStory)}</p>
        </div>
      </div>
      <div class="duo">
        <article data-reveal><span class="eyebrow">Our essence</span><h3>A family of innovators.</h3><p>${esc(s.aboutEssence)}</p></article>
        <article data-reveal style="--d:.1s"><span class="eyebrow">Our craft</span><h3>Precision, piece by piece.</h3><p>${esc(s.aboutCraft)}</p></article>
      </div>
    </div>
  </section>
  ${statsBand(s.stats)}
  ${d.milestones.length ? `
  <section class="section section--dark" style="border-top:1px solid var(--line-light)">
    <div class="container">
      <div class="section__head"><div><span class="eyebrow" data-reveal>Milestones</span><h2 data-reveal style="--d:.08s">Three decades <em>in stone.</em></h2></div></div>
      <div class="timeline">
        ${d.milestones.map((m, i) => `
        <div class="tl" data-reveal style="--d:${Math.min(i, 4) * 0.06}s">
          <div class="tl__year">${esc(m.year)}</div>
          <div class="tl__body">
            <div><h3>${esc(m.title)}</h3><p>${esc(m.description)}</p></div>
            ${m.image ? img(m.image, m.title) : ''}
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>` : ''}
  ${testimonialsBlock(d.testimonials)}
  ${ctaBand()}`;
}

/* ---------------------------------------------------------------- gallery */

function galleryList() {
  return galleryFilter === 'All' ? D.gallery : D.gallery.filter((g) => g.category === galleryFilter);
}

function pageGallery(d) {
  const present = new Set(d.gallery.map((g) => g.category).filter(Boolean));
  const cats = (d.settings.galleryCategories || []).filter((c) => present.has(c));
  for (const c of present) if (!cats.includes(c)) cats.push(c);
  if (galleryFilter !== 'All' && !present.has(galleryFilter)) galleryFilter = 'All';
  return `
  ${pageHead('Gallery', 'Projects in', 'stone.', 'Kitchens, staircases, lobbies and landscapes — a selection of spaces shaped with Dhanraj granite.')}
  <section class="section section--tight">
    <div class="container">
      ${cats.length > 1 ? `<div class="chips" style="margin-bottom:32px" data-reveal>
        ${['All', ...cats].map((c) => `<button class="chip ${galleryFilter === c ? 'is-on' : ''}" data-gcat="${esc(c)}">${esc(c)}</button>`).join('')}
      </div>` : ''}
      <div class="masonry" id="gGrid">${galleryList().map((g, i) => galleryTile(g, i)).join('') || '<p class="empty">New projects coming soon.</p>'}</div>
    </div>
  </section>
  ${ctaBand()}`;
}

/* ---------------------------------------------------------------- outlets */

function outletCard(o, i) {
  return `
  <article class="outlet" data-reveal style="--d:${(i % 2) * 0.1}s">
    <span class="eyebrow">${esc(o.type)}</span>
    <h3>${esc(o.name)}</h3>
    <ul>
      ${o.address ? `<li>${icon.pin}<span>${esc(o.address)}</span></li>` : ''}
      ${o.phone ? `<li>${icon.phone}<a href="tel:${esc(digits(o.phone))}">${esc(o.phone)}</a></li>` : ''}
      ${o.hours ? `<li>${icon.clock}<span>${esc(o.hours)}</span></li>` : ''}
    </ul>
    <a class="maps" href="${esc(mapsLink(o))}" target="_blank" rel="noopener">Open in maps ${icon.ext}</a>
  </article>`;
}

function pageOutlets(d) {
  return `
  ${pageHead('Outlets & facilities', 'Visit us', 'in person.', 'Our manufacturing unit in Madurai and locations in Mumbai welcome your visit.')}
  <section class="section section--tight">
    <div class="container grid grid--2">${d.outlets.map(outletCard).join('') || '<p class="empty">Locations coming soon.</p>'}</div>
  </section>
  ${ctaBand()}`;
}

/* -------------------------------------------------------------- resources */

function pageResources(d) {
  return `
  ${pageHead('Resources', 'Read, learn,', 'specify better.', 'A curated reading list from the web — care, selection, specification, and inspiration.')}
  <section class="section section--tight">
    <div class="container grid grid--2">
      ${d.resources.map((r, i) => `
      <a class="res" href="${esc(safeUrl(r.url))}" target="_blank" rel="noopener" data-reveal style="--d:${(i % 2) * 0.08}s">
        <div class="res__top"><div><small>${esc(r.category || 'Article')}</small><h3 style="margin-top:10px">${esc(r.title)}</h3></div>${icon.arrow}</div>
        <small>${esc(r.source)}</small>
      </a>`).join('') || '<p class="empty">Articles coming soon.</p>'}
    </div>
  </section>`;
}

/* ---------------------------------------------------------------- contact */

function pageContact(d, params) {
  const s = d.settings;
  const pre = params.get('product') || '';
  const opt = (list, sel = '') => list.map((v) => `<option ${v === sel ? 'selected' : ''}>${esc(v)}</option>`).join('');
  const products = [...new Set(d.products.map(pLabel))];
  if (pre && !products.includes(pre)) products.unshift(pre);
  return `
  ${pageHead('Contact', 'Request a', 'quote.', 'Share your project details and we’ll return a precise quote with available slabs within 24 hours.')}
  <section class="section section--tight">
    <div class="container contact">
      <div id="formWrap" data-reveal>
        <form class="form" id="quoteForm" novalidate>
          <div class="field"><label for="f-name">Name <b>*</b></label><input id="f-name" name="name" autocomplete="name" placeholder="Your full name" maxlength="120" required></div>
          <div class="field"><label for="f-phone">Phone <b>*</b></label><input id="f-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+91" maxlength="30" required></div>
          <div class="field field--full"><label for="f-email">Email</label><input id="f-email" name="email" type="email" inputmode="email" autocomplete="email" placeholder="you@domain.com" maxlength="160"></div>
          <div class="field"><label for="f-product">Product of interest</label><select id="f-product" name="product"><option value="">— Select —</option>${opt(products, pre)}<option>Not sure yet</option></select></div>
          <div class="field"><label for="f-type">Project type</label><select id="f-type" name="project_type"><option value="">— Select —</option>${opt(s.projectTypes || [])}</select></div>
          <div class="field field--third"><label for="f-finish">Slab finish</label><select id="f-finish" name="finish"><option value="">— Select —</option>${opt(s.finishes || [])}</select></div>
          <div class="field field--third field--half-sm"><label for="f-sqft">Square feet</label><input id="f-sqft" name="sqft" inputmode="numeric" placeholder="e.g. 450" maxlength="20"></div>
          <div class="field field--third field--half-sm"><label for="f-qty">Quantity (slabs)</label><input id="f-qty" name="quantity" inputmode="numeric" placeholder="e.g. 12" maxlength="20"></div>
          <div class="field field--full"><label for="f-loc">Project location</label><input id="f-loc" name="location" placeholder="City, Country" maxlength="120"></div>
          <div class="field field--full"><label for="f-msg">Message</label><textarea id="f-msg" name="message" placeholder="Tell us about your project — sizes, finishes, timeline…" maxlength="2000"></textarea></div>
          <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
          <div class="field field--full"><button class="btn" type="submit" style="justify-self:start">Submit inquiry ${icon.arrow}</button></div>
        </form>
      </div>
      <aside data-reveal style="--d:.1s">
        <div class="aside-card">
          <h4>Direct contact</h4>
          <ul>
            ${s.phone ? `<li>${icon.phone}<a href="tel:${esc(digits(s.phone))}">${esc(s.phone)}</a></li>` : ''}
            ${s.phone2 ? `<li>${icon.phone}<a href="tel:${esc(digits(s.phone2))}">${esc(s.phone2)}</a></li>` : ''}
            ${s.email ? `<li>${icon.mail}<a href="mailto:${esc(s.email)}">${esc(s.email)}</a></li>` : ''}
          </ul>
          <a class="btn btn--wa btn--block btn--sm" style="margin-top:22px" href="${waLink(s.whatsapp, `Hello ${s.brand}, I'd like a quote.`)}" target="_blank" rel="noopener">${icon.whatsapp} Chat on WhatsApp</a>
        </div>
        ${d.outlets.length ? `
        <div class="aside-card">
          <h4>Visit a location</h4>
          <div class="field"><select id="outletPick" aria-label="Choose a location">${d.outlets.map((o, i) => `<option value="${i}">${esc(o.name)}</option>`).join('')}</select></div>
          <div id="outletInfo" style="margin-top:16px">${outletMini(d.outlets[0])}</div>
        </div>` : ''}
      </aside>
    </div>
  </section>`;
}

function outletMini(o) {
  return `<ul>
    ${o.address ? `<li>${icon.pin}<span>${esc(o.address)}</span></li>` : ''}
    ${o.phone ? `<li>${icon.phone}<a href="tel:${esc(digits(o.phone))}">${esc(o.phone)}</a></li>` : ''}
    ${o.hours ? `<li>${icon.clock}<span>${esc(o.hours)}</span></li>` : ''}
    <li>${icon.ext}<a href="${esc(mapsLink(o))}" target="_blank" rel="noopener" style="color:#8a6d2c">Open in Google Maps</a></li>
  </ul>`;
}

async function submitQuote(form) {
  const fd = Object.fromEntries(new FormData(form).entries());
  if (fd.website) return; // honeypot
  $$('.field', form).forEach((f) => { f.classList.remove('has-error'); $('.err', f)?.remove(); });
  const errs = {};
  if ((fd.name || '').trim().length < 2) errs.name = 'Please enter your name.';
  if (digits(fd.phone).replace(/\D/g, '').length < 7) errs.phone = 'Please enter a valid phone number.';
  if (fd.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.email)) errs.email = 'Please check this email address.';
  for (const [k, m] of Object.entries(errs)) {
    const f = form.elements[k].closest('.field');
    f.classList.add('has-error');
    f.insertAdjacentHTML('beforeend', `<span class="err">${m}</span>`);
  }
  if (Object.keys(errs).length) { form.elements[Object.keys(errs)[0]].focus(); return; }

  const btn = $('button[type=submit]', form);
  btn.disabled = true;
  btn.innerHTML = 'Sending…';
  const data = {
    name: fd.name.trim(), phone: fd.phone.trim(), email: fd.email.trim(), product: fd.product, project_type: fd.project_type,
    finish: fd.finish, sqft: fd.sqft.trim(), quantity: fd.quantity.trim(), location: fd.location.trim(), message: fd.message.trim(),
  };
  try {
    await store.submitInquiry(data);
    const summary = [`Hello ${D.settings.brand}, I just sent a quote request.`, `Name: ${data.name}`, data.product && `Product: ${data.product}`,
      data.finish && `Finish: ${data.finish}`, data.sqft && `Area: ${data.sqft} sq.ft`, data.location && `Location: ${data.location}`].filter(Boolean).join('\n');
    $('#formWrap').innerHTML = `
      <div class="success">
        <div class="tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div>
        <h3>Thank you, ${esc(data.name.split(' ')[0])}.</h3>
        <p>Your inquiry has reached our team. We’ll get back to you within 24 hours with pricing and slab availability.</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <a class="btn btn--wa btn--sm" href="${waLink(D.settings.whatsapp, summary)}" target="_blank" rel="noopener">${icon.whatsapp} Also send on WhatsApp</a>
          <a class="btn btn--line btn--sm" href="#/products">Keep browsing</a>
        </div>
      </div>`;
    $('#formWrap').scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'center' });
  } catch (e) {
    toast('Could not send right now — please try WhatsApp or call us.', 'err');
    btn.disabled = false;
    btn.innerHTML = `Submit inquiry ${icon.arrow}`;
  }
}

/* ================================================================ chrome */

function renderChrome() {
  const s = D.settings;
  $('#brand').innerHTML = logo('', s.logo, s.brand);
  $('#nav').innerHTML = NAV.map(([p, l]) => `<a href="#/${p}" data-path="${p}">${l}</a>`).join('');
  $('#mobileNav').innerHTML = NAV.map(([p, l], i) => `<a href="#/${p}" data-path="${p}" style="transition-delay:${0.15 + i * 0.04}s">${l}</a>`).join('');
  $('#mobileFoot').innerHTML = `
    ${s.phone ? `<a class="plain" href="tel:${esc(digits(s.phone))}">${icon.phone} ${esc(s.phone)}</a>` : ''}
    ${s.email ? `<a class="plain" href="mailto:${esc(s.email)}">${icon.mail} ${esc(s.email)}</a>` : ''}
    <a class="btn btn--block" href="#/contact">Request quote ${icon.arrow}</a>`;
  const hp = $('#headerPhone');
  hp.href = `tel:${digits(s.phone)}`;
  hp.innerHTML = s.phone ? `${icon.phone} ${esc(s.phone)}` : '';
  const fab = $('#fab');
  fab.href = waLink(s.whatsapp, `Hello ${s.brand}, I have a question.`);
  fab.innerHTML = icon.whatsapp;
  fab.hidden = !s.whatsapp;

  $('#footer').innerHTML = `
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          ${logo('logo--lg', s.logo, s.brand)}
          <p>${esc(s.footerText)}</p>
          ${s.instagram || s.facebook ? `<div class="socials">
            ${s.instagram ? `<a href="${esc(safeUrl(s.instagram))}" target="_blank" rel="noopener" aria-label="Instagram">${icon.instagram}</a>` : ''}
            ${s.facebook ? `<a href="${esc(safeUrl(s.facebook))}" target="_blank" rel="noopener" aria-label="Facebook">${icon.facebook}</a>` : ''}
          </div>` : ''}
        </div>
        <div>
          <h4>Explore</h4>
          <ul>${NAV.slice(1, 7).map(([p, l]) => `<li><a href="#/${p}">${l}</a></li>`).join('')}</ul>
        </div>
        <div>
          <h4>Reach us</h4>
          <ul>
            ${s.cities ? `<li><span>${icon.pin} ${esc(s.cities)}</span></li>` : ''}
            ${s.phone ? `<li><a href="tel:${esc(digits(s.phone))}">${icon.phone} ${esc(s.phone)}</a></li>` : ''}
            ${s.phone2 ? `<li><a href="tel:${esc(digits(s.phone2))}">${icon.phone} ${esc(s.phone2)}</a></li>` : ''}
            ${s.email ? `<li><a href="mailto:${esc(s.email)}">${icon.mail} ${esc(s.email)}</a></li>` : ''}
          </ul>
        </div>
      </div>
      <div class="footer__bar">
        <span>© ${new Date().getFullYear()} ${esc(s.brand)}. All rights reserved.</span>
        <span><a href="admin.html" style="margin-right:22px">Admin</a><span class="est">EST. ${esc(s.established)} · INDIA</span></span>
      </div>
    </div>`;
}

function updateChrome(path) {
  $$('#nav a, #mobileNav a').forEach((a) => a.classList.toggle('is-active', a.dataset.path === path));
  onScroll();
}

let lastY = 0;
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    const y = window.scrollY;
    const h = $('#header');
    h.classList.toggle('is-clear', currentPath === '' && y < 40);
    const menuOpen = document.documentElement.classList.contains('menu-open');
    h.classList.toggle('is-hidden', !menuOpen && !modal.open && y > 400 && y > lastY + 4);
    if (y < lastY - 4 || y < 400) h.classList.remove('is-hidden');
    lastY = y;
    const bg = $('.hero__bg');
    if (bg && !reducedMotion() && y < window.innerHeight * 1.2) bg.style.transform = `translate3d(0, ${y * 0.22}px, 0)`;
  });
}

function closeMenu() {
  const root = document.documentElement;
  if (!root.classList.contains('menu-open')) return;
  root.classList.remove('menu-open');
  $('#burger').setAttribute('aria-expanded', 'false');
  $('#burger').setAttribute('aria-label', 'Open menu');
  $('#mobileMenu').setAttribute('aria-hidden', 'true');
  lockScroll(false);
}

function toggleMenu() {
  const root = document.documentElement;
  if (root.classList.contains('menu-open')) return closeMenu();
  root.classList.add('menu-open');
  $('#burger').setAttribute('aria-expanded', 'true');
  $('#burger').setAttribute('aria-label', 'Close menu');
  $('#mobileMenu').setAttribute('aria-hidden', 'false');
  $('#header').classList.remove('is-hidden');
  lockScroll(true);
}

/* ============================================================= behaviour */

let revealObs;
function enhance(root, { soft }) {
  bindImages(root);

  const items = $$('[data-reveal]', root);
  if (soft || reducedMotion() || !('IntersectionObserver' in window)) {
    items.forEach((el) => { el.style.transition = 'none'; el.classList.add('is-in'); });
    requestAnimationFrame(() => items.forEach((el) => { el.style.transition = ''; }));
  } else {
    revealObs?.disconnect();
    revealObs = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); revealObs.unobserve(e.target); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach((el) => revealObs.observe(el));
  }

  setupCounters(root, soft);
  setupQuotes(root);
}

function bindImages(root) {
  $$('img.lazy', root).forEach((im) => {
    if (im.complete && im.naturalWidth) im.classList.add('loaded');
    else {
      im.addEventListener('load', () => im.classList.add('loaded'), { once: true });
      im.addEventListener('error', () => { im.classList.add('loaded'); im.style.visibility = 'hidden'; }, { once: true });
    }
  });
}

function setupCounters(root, soft) {
  const els = $$('[data-count]', root);
  if (!els.length || soft || reducedMotion() || !('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      obs.unobserve(e.target);
      const el = e.target;
      const m = /^(\D*)([\d,.]+)(.*)$/.exec(el.dataset.count);
      if (!m) continue;
      const [, pre, num, post] = m;
      const target = parseFloat(num.replace(/,/g, ''));
      const decimals = (num.split('.')[1] || '').length;
      const comma = num.includes(',');
      const t0 = performance.now();
      const dur = 1800;
      const fmt = (v) => {
        const s = v.toFixed(decimals);
        return comma ? Number(s).toLocaleString('en-US', { minimumFractionDigits: decimals }) : s;
      };
      const step = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - k, 4);
        el.textContent = `${pre}${fmt(target * eased)}${post}`;
        if (k < 1) requestAnimationFrame(step);
      };
      el.textContent = `${pre}${fmt(0)}${post}`;
      requestAnimationFrame(step);
    }
  }, { threshold: 0.4 });
  els.forEach((el) => obs.observe(el));
}

let quoteTimer;
function setupQuotes(root) {
  clearInterval(quoteTimer);
  const box = $('.quotes', root);
  if (!box) return;
  const slides = $$('.quote', box);
  const dots = $$('[data-dot]', box);
  if (slides.length < 2) return;
  let i = 0;
  let paused = false;
  const go = (n) => {
    const prev = i;
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => {
      s.classList.toggle('is-on', k === i);
      s.classList.toggle('is-prev', k === prev && k !== i);
      s.setAttribute('aria-hidden', String(k !== i));
    });
    dots.forEach((d, k) => d.classList.toggle('is-on', k === i));
  };
  box.closest('section').addEventListener('click', (e) => {
    const q = e.target.closest('[data-q]');
    const d = e.target.closest('[data-dot]');
    if (q) go(i + (q.dataset.q === 'next' ? 1 : -1));
    if (d) go(Number(d.dataset.dot));
  });
  box.addEventListener('pointerenter', () => { paused = true; });
  box.addEventListener('pointerleave', () => { paused = false; });
  swipe(box, (dir) => go(i + dir));
  if (!reducedMotion()) quoteTimer = setInterval(() => { if (!paused && !document.hidden) go(i + 1); }, 7000);
}

function swipe(el, cb) {
  let x0 = null;
  let y0 = null;
  el.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  el.addEventListener('touchend', (e) => {
    if (x0 == null) return;
    const dx = e.changedTouches[0].clientX - x0;
    const dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) cb(dx < 0 ? 1 : -1);
    x0 = null;
  }, { passive: true });
}

/* --------------------------------------------------------------- lightbox */

const lb = {
  list: [], i: 0, open: false,
  el: null,
  build() {
    this.el = $('#lightbox');
    this.el.innerHTML = `
      <span class="lb-count"></span>
      <button class="round lb-close" aria-label="Close">${icon.close}</button>
      <button class="round lb-prev" aria-label="Previous image">${icon.left}</button>
      <figure><img alt=""><figcaption><small></small><b></b></figcaption></figure>
      <button class="round lb-next" aria-label="Next image">${icon.right}</button>`;
    this.el.addEventListener('click', (e) => {
      if (e.target.closest('.lb-close') || e.target === this.el) this.hide();
      else if (e.target.closest('.lb-prev')) this.go(this.i - 1);
      else if (e.target.closest('.lb-next')) this.go(this.i + 1);
    });
    swipe(this.el, (d) => this.go(this.i + d));
  },
  show(list, i) {
    if (!this.el) this.build();
    this.list = list;
    this.open = true;
    this.lastFocus = document.activeElement;
    lockScroll(true);
    this.el.setAttribute('aria-hidden', 'false');
    this.el.classList.add('is-open');
    $('.lb-prev', this.el).hidden = $('.lb-next', this.el).hidden = list.length < 2;
    this.go(i, true);
    $('.lb-close', this.el).focus({ preventScroll: true });
  },
  go(n, instant) {
    this.i = (n + this.list.length) % this.list.length;
    const g = this.list[this.i];
    const im = $('img', this.el);
    const apply = () => {
      im.src = safeUrl(g.image);
      im.alt = g.title || '';
      $('figcaption small', this.el).textContent = g.category || '';
      $('figcaption b', this.el).textContent = g.title || '';
      $('.lb-count', this.el).textContent = `${String(this.i + 1).padStart(2, '0')} / ${String(this.list.length).padStart(2, '0')}`;
      im.classList.remove('is-swapping');
    };
    if (instant || reducedMotion()) apply();
    else { im.classList.add('is-swapping'); setTimeout(apply, 220); }
    [1, -1].forEach((d) => { const nb = this.list[(this.i + d + this.list.length) % this.list.length]; if (nb) new Image().src = safeUrl(nb.image); });
  },
  hide() {
    if (!this.open) return;
    this.open = false;
    this.el.classList.remove('is-open');
    this.el.setAttribute('aria-hidden', 'true');
    lockScroll(false);
    this.lastFocus?.focus?.({ preventScroll: true });
  },
};

/* ------------------------------------------------------- global listeners */

function bindGlobal() {
  window.addEventListener('hashchange', () => route());
  window.addEventListener('scroll', onScroll, { passive: true });
  $('#burger').addEventListener('click', toggleMenu);

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#/"]');
    if (a) {
      // Opening a product: remember we pushed history so "close" can go back.
      if (/[?&]p=/.test(a.getAttribute('href'))) modal.pushed = true;
      if (a.getAttribute('href') === location.hash || (a.getAttribute('href') === '#/' && !location.hash)) {
        closeMenu();
        window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });
      }
    }
    if (e.target.closest('#modal [data-close]')) closeProductModal();

    const chip = e.target.closest('[data-filter]');
    if (chip) {
      productFilters[chip.dataset.filter] = chip.dataset.value;
      syncFilterUi();
      refreshProducts();
    }
    if (e.target.closest('[data-clear]')) {
      Object.assign(productFilters, { q: '', color: 'All', finish: 'All', application: 'All' });
      const si = $('#pSearch');
      if (si) si.value = '';
      syncFilterUi();
      refreshProducts();
    }
    if (e.target.closest('#pToggle')) {
      productFilters.open = !productFilters.open;
      const t = $('#pToggle');
      $('#pFilters').classList.toggle('is-open', productFilters.open);
      t.setAttribute('aria-expanded', productFilters.open);
      t.childNodes.forEach((n) => { if (n.nodeType === 3 && /filters/.test(n.textContent)) n.textContent = ` ${productFilters.open ? 'Hide' : 'Show'} filters `; });
    }

    const gc = e.target.closest('[data-gcat]');
    if (gc) {
      galleryFilter = gc.dataset.gcat;
      $$('[data-gcat]').forEach((c) => c.classList.toggle('is-on', c === gc));
      const grid = $('#gGrid');
      grid.style.opacity = '0';
      setTimeout(() => {
        grid.innerHTML = galleryList().map((g, i) => galleryTile(g, i)).join('');
        enhance(grid, { soft: true });
        grid.style.opacity = '';
      }, 250);
    }

    const thumb = e.target.closest('[data-photo]');
    if (thumb) showPhoto(Number(thumb.dataset.photo));
    const zoom = e.target.closest('[data-zoom]');
    if (zoom && modal.product) {
      const p = modal.product;
      lb.show(pPhotos(p).map((u) => ({ image: u, title: p.name, category: p.finish })), Number(zoom.dataset.zoom));
    }

    const tile = e.target.closest('[data-lb]');
    if (tile) {
      const list = currentPath === 'gallery' ? galleryList() : D.gallery;
      lb.show(list, Number(tile.dataset.lb));
    }
  });

  document.addEventListener('input', debounce((e) => {
    if (e.target.id === 'pSearch') { productFilters.q = e.target.value; refreshProducts(); }
  }, 160));

  document.addEventListener('change', (e) => {
    if (e.target.id === 'outletPick') $('#outletInfo').innerHTML = outletMini(D.outlets[Number(e.target.value)]);
  });

  document.addEventListener('submit', (e) => {
    if (e.target.id === 'quoteForm') { e.preventDefault(); submitQuote(e.target); }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lb.open) lb.hide();
      else if (modal.open) closeProductModal();
      else closeMenu();
    }
    if (lb.open && e.key === 'ArrowRight') lb.go(lb.i + 1);
    if (lb.open && e.key === 'ArrowLeft') lb.go(lb.i - 1);
  });

}

/* =================================================================== boot */

function loadingScreen() {
  $('#app').innerHTML = `
    <section class="hero"><div class="container hero__content">
      <div class="skel" style="height:14px;width:180px;opacity:.15"></div>
      <div class="skel" style="height:96px;width:min(720px,90%);margin:28px 0 18px;opacity:.12"></div>
      <div class="skel" style="height:96px;width:min(560px,70%);opacity:.12"></div>
    </div></section>`;
}

async function refresh() {
  try {
    const fresh = await store.loadPublicFresh();
    const json = JSON.stringify(fresh);
    if (json === lastJson) return;
    const firstPaint = !D;
    D = fresh;
    lastJson = json;
    renderChrome();
    if (firstPaint) route();
    else route({ soft: true });
  } catch (err) {
    console.error(err);
    if (!D) {
      $('#app').innerHTML = `<section class="page-head"><div class="container"><span class="eyebrow">Connection</span>
        <h1>We’ll be right <em>back.</em></h1><p class="lead">The catalogue could not be loaded. Please check your connection and refresh, or reach us on WhatsApp.</p></div></section>`;
    }
  }
}

function boot() {
  bindGlobal();
  const style = document.createElement('style');
  style.textContent = '#gGrid{transition:opacity .25s}';
  document.head.appendChild(style);

  if (D) {
    renderChrome();
    route();
  } else {
    loadingScreen();
  }
  refresh();
  store.subscribe(refresh);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
}

boot();
