# Dhanraj Granite — Website & Admin Panel

**A complete guide written for non-technical people.** You don't need to know any coding to run this website day to day. Everything you will usually change (products, photos, text, phone numbers, gallery, etc.) is done from the **Admin Panel** using simple forms — on your phone or computer.

---

## Contents

1. [What you have](#1-what-you-have)
2. [Words you will see (mini dictionary)](#2-words-you-will-see-mini-dictionary)
3. [Opening the Admin Panel](#3-opening-the-admin-panel)
4. [Using the Admin Panel — tab by tab](#4-using-the-admin-panel--tab-by-tab)
   - [Inquiries](#41-inquiries-quote-requests-from-customers) · [Products](#42-products) · [Capabilities](#43-capabilities) · [Gallery](#44-gallery) · [Milestones](#45-milestones) · [Testimonials](#46-testimonials) · [Outlets](#47-outlets) · [Resources](#48-resources) · [Site & About](#49-site--about) · [Account](#410-account)
5. [Quick answers: “How do I…?”](#5-quick-answers-how-do-i)
6. [Taking good photos](#6-taking-good-photos)
7. [Going live — one-time setup (database + publishing)](#7-going-live--one-time-setup)
8. [Your own domain name (www.yourname.com)](#8-your-own-domain-name)
9. [Changing things that are *not* in the Admin Panel](#9-changing-things-that-are-not-in-the-admin-panel)
10. [Problems & solutions (FAQ)](#10-problems--solutions-faq)
11. [Costs and limits](#11-costs-and-limits)
12. [Keeping it safe](#12-keeping-it-safe)
13. [For developers](#13-for-developers)

---

## 1. What you have

The website has **two parts**:

| Part | Who uses it | Address (after publishing) |
| --- | --- | --- |
| **Customer website** | Your customers | `your-website-address/` |
| **Admin Panel** | You and your staff | `your-website-address/admin.html` (also the small **“Admin”** link at the very bottom of every page) |

**Customer website pages:** Home · Products (search, filters, photo zoom, WhatsApp enquiry) · Capabilities · About · Gallery · Outlets · Resources · Contact (quote form). A green WhatsApp button floats on every page.

**Admin Panel can:** add / edit / delete / hide / reorder everything shown on the site, upload photos straight from your phone, read and manage quote requests, change all text and contact details, change the logo, and make backups.

The site works on phones, tablets and computers, and loads fast because photos are automatically shrunk.

---

## 2. Words you will see (mini dictionary)

| Word | Meaning in plain words |
| --- | --- |
| **GitHub** | The website where the website’s files are stored (like Google Drive for website code). Your repository is `Sarthak11853/DhanrajGranite`. |
| **Repository / repo** | The folder on GitHub that holds all the website files. |
| **Branch** | A version of the files. The main version is usually called `main`. |
| **Pull request (PR)** | A request to copy changes from one branch into `main`. You click **Merge** to accept it. |
| **Supabase** | A free online database. It stores your products, photos, text and inquiries so every customer sees the same thing. |
| **Hosting / publishing** | Putting the website on the internet so people can open it. We use free hosting (GitHub Pages or Netlify). |
| **Demo mode** | The site works, but changes are saved **only in your own browser**. Customers don’t see them. Used before Supabase is connected. |
| **Live mode** | Supabase is connected. Changes appear for **everyone** within seconds. |
| **Domain** | Your own web address, e.g. `dhanrajgranite.com`. Optional, costs roughly ₹800–₹1,500/year. |

---

## 3. Opening the Admin Panel

1. Open your website, scroll to the very bottom, and tap **Admin**. (Or type `/admin.html` after your website address.)
2. Sign in:
   - **Demo mode** (before going live): only a password is asked. Default password: **`dhanraj123`**. Change it in **Account**.
   - **Live mode**: enter the **email and password** you created in Supabase (see [section 7](#7-going-live--one-time-setup)).
3. Tip for phones: open the admin page in Chrome/Safari, tap **Share → Add to Home Screen**. It then opens like an app.

At the top you’ll see a badge: **DEMO MODE** (yellow dot) or **LIVE** (green dot). If it says Demo mode, customers are *not* seeing your changes yet.

**Sign out:** top-right **Sign out**. **View site:** top-right **View site** (opens the customer site in a new tab).

**Forgot your password?**
- Live mode: type your email on the login screen and tap **Forgot password?** — a reset link arrives by email. (One-time setting needed: [step 7.7](#77-make-forgot-password-emails-work).)
- Demo mode: tapping **Forgot password?** resets it back to `dhanraj123`.

---

## 4. Using the Admin Panel — tab by tab

Every list works the same way. Learn it once:

| Button on each row | What it does |
| --- | --- |
| ↑ ↓ arrows | Move the item up/down. **The order here = the order on the website.** |
| 👁 eye | **Hide / show** on the website without deleting (great for sold-out stones). Hidden rows look faded and say *Hidden*. |
| ⧉ copy *(products only)* | **Duplicate** — makes a copy so you only change what’s different (e.g. same stone, different finish). |
| ✎ pencil (or tap the name) | **Edit** |
| 🗑 bin | **Delete** forever (asks you to confirm) |

- **Add** button: top-right of every list (e.g. **+ Add product**).
- **Search** box: top-right, filters the list as you type.
- In any form, fields with a gold **\*** are required. Press **Save** (or Ctrl+S on a computer). If you close a form with unsaved changes, it asks before throwing them away.
- Every item has a switch **“Visible on the website”** at the bottom of its form.

### 4.1 Inquiries (quote requests from customers)

When a customer fills the **Request a quote** form, it appears here. The gold number on the tab shows how many are **new**.

- Tap a row to open full details (phone, email, product, finish, square feet, quantity, location, message).
- Buttons inside: **WhatsApp** (opens a chat with a ready greeting), **Call**, **Email**.
- **Mark as:** `new` → `contacted` → `quoted` → `closed`. Use the chips at the top to see only one status.
- **Export CSV** downloads all inquiries as a spreadsheet file — opens in Excel / Google Sheets.
- **Refresh** checks for brand-new inquiries.

### 4.2 Products

**Add a product**
1. **Products → + Add product**.
2. **Name** — e.g. `Ivory Fantasy`.
3. **Finish** — e.g. `Polished` or `Leather`. *Same stone in two finishes = two separate products* (e.g. “Ivory Fantasy – Polished” and “Ivory Fantasy – Leather”). Tip: create one, then use **Duplicate** and change the finish and photo.
4. **Colour family** — used for the colour filter on the Products page. Choose from the list or type a new one (e.g. `Green & Blue`) — new ones automatically appear as filters.
5. **Application** (optional) — e.g. Countertops, Flooring. Also becomes a filter.
6. **Origin, Thickness, Density** (optional) — shown in the product’s detail window. Leave blank if unknown; blank fields are simply not shown.
7. **Short description** (optional).
8. **Main photo** — tap the box to take/choose a photo, or drag a file onto it. This photo shows on the product card.
9. **Extra photos** (optional) — tap **+ Add** to add more angles. On the website customers see small thumbnails and can tap to zoom. Use the ‹ arrow to reorder, ✕ to remove.
10. **Show in the homepage collection** — switch ON for products you want on the home page (4 looks best, up to 8 are shown).
11. **Save**. It’s on the website immediately (in live mode).

**Edit / hide / delete / reorder** — see the table at the top of section 4.

**What customers see:** product cards with the finish label, a **View specs** link that opens a detail window (photos, specs, **WhatsApp** and **Request quote** buttons), and a green **Enquire** button that opens WhatsApp with the product name already typed.

### 4.3 Capabilities

The steps of your process shown on the **Capabilities** page (and the first 4 on the home page): Step number (e.g. `01`), Title, Description, Image (e.g. machine photos).

### 4.4 Gallery

Project and factory photos on the **Gallery** page (first 6 also on the home page). Each has a **Title**, a **Category** (e.g. Countertops, Flooring, Exterior, Factory — these become the filter buttons) and an **Image**. Customers tap a photo to see it full-screen and swipe through.

### 4.5 Milestones

Your history timeline on the **About** page: Year, Title, Description, optional Image.

### 4.6 Testimonials

Customer reviews shown on the home and About pages as a sliding carousel: Client name, Role/project, Location, Rating (stars), Review text, optional photo. ⚠️ Please only publish genuine reviews.

### 4.7 Outlets

Your locations on the **Outlets** page and the Contact page: Name, Type (Manufacturing Unit / Corporate Office / Warehouse / Showroom…), Phone, Address, Hours, Google Maps link.

*How to get a Google Maps link:* open Google Maps → find your shop → **Share** → **Copy link** → paste it. If left blank, the website searches the address on Google Maps automatically.

### 4.8 Resources

Helpful articles (care guides, comparisons). Title, Source (website name), Label, Link (must start with `https://`). They open in a new tab.

### 4.9 Site & About

All the general text of the website, in five sections (tap a chip at the top to jump):

| Section | What you can change |
| --- | --- |
| **Business & contact** | Business name, year established, phone numbers, **WhatsApp number** (digits only with country code, e.g. `919392537240`), email, cities line, Instagram & Facebook links (icons appear in the footer when filled), **Logo** |
| **Homepage** | The big title (3 parts: line 1, the gold italic word, and the rest), intro paragraph, **background image**, the 4 numbers (35+ Years…), collection heading, the “Ready to specify your project?” band, footer description |
| **About page** | Title, Our story, Our essence, Our craft, About image |
| **Factory specifications** | The boxes on the Capabilities page (Monthly capacity, Max slab size…). **+ Add row** / ✕ to remove |
| **Catalogue options** | One per line: colour families, finishes, applications, gallery categories, project types (quote form). These control the filter buttons and form dropdowns and their order |

When you change anything, a bar slides up at the bottom: **Save changes** or **Undo**.

**Changing the logo:** Site & About → Business & contact → **Logo** → upload. Best: a PNG with a transparent background, wide shape. Click **Remove** to show the built-in typed “DG | DHANRAJ GRANITE” logo instead.

### 4.10 Account

- **Change password** — enter current and new password (at least 8 characters).
- **Download backup** — saves *all* website content (products, gallery, text…) as one file on your device. **Do this once a month and before big changes.** (Inquiries are not included — use *Export CSV* on the Inquiries tab.)
- **Restore from file** — puts a backup back. Replaces current content.
- **Load starter content** — resets content to the original catalogue that came with the website.
- **Reset demo** — (demo mode only) clears your browser’s demo changes.

---

## 5. Quick answers: “How do I…?”

| I want to… | Do this |
| --- | --- |
| Add a new granite | Products → **+ Add product** → name, finish, colour, photo → **Save** |
| Add the same granite in another finish | On the existing product row tap **⧉ Duplicate** → change finish & photo → Save |
| Remove a sold-out stone temporarily | Tap the **👁 eye** on its row (tap again to bring it back) |
| Delete a product forever | **🗑** on its row → **Delete** |
| Change the order of products | **↑ ↓** arrows |
| Choose which products show on the home page | Edit product → switch **Show in the homepage collection** |
| Add more photos to a product | Edit product → **Extra photos → + Add** |
| Add a new colour/finish filter | Just type it in a product’s Colour/Finish box, or add it in **Site & About → Catalogue options** |
| Change phone / WhatsApp / email | **Site & About → Business & contact** |
| Change the home page headline or photo | **Site & About → Homepage** |
| Change the logo | **Site & About → Business & contact → Logo** |
| Add a project photo | **Gallery → + Add image** |
| Add a new shop/branch | **Outlets → + Add outlet** |
| See who asked for a quote | **Inquiries** tab |
| Download inquiries to Excel | **Inquiries → Export CSV** |
| Give a staff member admin access | [Step 7.8](#78-add-another-admin-staff-member) |
| Make a backup | **Account → Download backup** |

---

## 6. Taking good photos

- **Daylight**, no flash, avoid strong reflections on polished slabs.
- Take the **whole slab** for the main photo, and a **close-up** of the pattern as an extra photo.
- Hold the phone **sideways (landscape)** for slabs.
- Any size is fine — the Admin Panel shrinks photos automatically before uploading (max ~1800 px), so pages stay fast. Very large files (over 10 MB) may be refused — just retake or screenshot.
- JPG and PNG work everywhere. iPhone photos (HEIC) are converted automatically by the phone when uploading through the browser.

The photos that came with the website are stored in the `assets/img/` folder (products, gallery, capabilities, factory, brand). Photos you upload from the Admin Panel in live mode are stored in Supabase (Storage → `media`).

---

## 7. Going live — one-time setup

Until you do this, the site is in **demo mode** (changes only on your browser). This takes about **20–30 minutes, once**. You need: a computer, your email, and your GitHub login.

> Supabase’s menus sometimes get renamed slightly. If a button name doesn’t match exactly, look for the closest one.

### 7.1 Put the website on your `main` branch

The website was built on a separate branch. On GitHub:
1. Open `https://github.com/Sarthak11853/DhanrajGranite`.
2. If you see a yellow bar “*claude/… had recent pushes*”, click **Compare & pull request** → **Create pull request** → **Merge pull request** → **Confirm merge**.
   (Or go to **Pull requests → New pull request**, choose the `claude/…` branch, then create and merge.)

### 7.2 Create a free Supabase project

1. Go to **[supabase.com](https://supabase.com)** → **Start your project** → sign up (using GitHub or email is easiest).
2. Click **New project**.
   - **Name:** `dhanraj-granite`
   - **Database password:** click **Generate a password** and save it somewhere safe (you rarely need it).
   - **Region:** choose **Mumbai (ap-south-1)** — fastest for India.
   - Plan: **Free**.
3. Click **Create new project** and wait 1–2 minutes until it’s ready.

### 7.3 Create the database tables (copy–paste once)

1. On GitHub, open the file [`supabase/schema.sql`](supabase/schema.sql) → click the **Copy raw file** button (two-squares icon, top-right of the file).
2. In Supabase, left menu → **SQL Editor** → **New query**.
3. Paste (Ctrl+V / Cmd+V) → click **Run** (bottom-right). You should see “Success. No rows returned”.

This creates: the content tables, the inquiries table, the security rules, and a public photo folder named `media`. Running it again later is harmless.

### 7.4 Create your admin login

1. Supabase left menu → **Authentication** → **Users** → **Add user** → **Create new user**.
2. Enter **your email** and a **strong password**. Tick **Auto Confirm User**. Click **Create user**.
3. Give that email admin rights: **SQL Editor → New query**, paste this (with *your* email), and **Run**:
   ```sql
   insert into public.admins (email) values ('your-email@example.com');
   ```
4. **Important:** **Authentication → Sign In / Providers** (or *Providers → Email*) → turn **OFF** “Allow new users to sign up” → **Save**. (Only people you add can log in.)

### 7.5 Connect the website to Supabase

1. In Supabase: **Project Settings** (gear icon) → **Data API** (or **API**). Copy the **Project URL** (looks like `https://abcdefghijkl.supabase.co`).
2. Then **Project Settings → API Keys**. Copy the **Publishable key** (starts with `sb_publishable_…`).
   If you only see a “Legacy API keys” tab, copy the **anon public** key (starts with `eyJ…`). Either works.
   ⚠️ **Never** use the *secret* / *service_role* key.
3. On GitHub, open [`assets/js/config.js`](assets/js/config.js) → click the **✏️ pencil** (Edit this file).
4. Paste your two values **between the quote marks**, so it looks like:
   ```js
   export default {
     supabaseUrl: 'https://abcdefghijkl.supabase.co',
     supabaseAnonKey: 'sb_publishable_xxxxxxxxxxxxxxxxxxxx',
   };
   ```
   Keep the quote marks `'` and the commas.
5. Click **Commit changes…** → keep “Commit directly to the main branch” → **Commit changes**.

### 7.6 Publish the website (free)

Pick **one** option.

**Option A — GitHub Pages** (simplest; requires the repository to be **Public**, or a paid GitHub plan for private repos)
1. On GitHub: repository → **Settings** → **Pages** (left menu).
2. **Source:** *Deploy from a branch*. **Branch:** `main`, folder `/ (root)` → **Save**.
3. Wait 1–3 minutes and refresh. A link appears: `https://sarthak11853.github.io/DhanrajGranite/`. That’s your website!
4. Every time you edit a file on GitHub, the site updates by itself within a few minutes.

**Option B — Netlify** (works with **private** repositories, free)
1. Go to **[netlify.com](https://www.netlify.com)** → sign up with GitHub.
2. **Add new site → Import an existing project → GitHub** → choose `DhanrajGranite`.
3. **Branch:** `main`. **Build command:** leave empty. **Publish directory:** leave empty (or `/`). → **Deploy**.
4. You get an address like `https://something.netlify.app` (you can rename it in *Site configuration → Change site name*). It updates automatically when GitHub changes.

*(Cloudflare Pages and Vercel work the same way — no build command needed.)*

### 7.7 Make “Forgot password” emails work

Supabase → **Authentication → URL Configuration**:
- **Site URL:** your website address, e.g. `https://sarthak11853.github.io/DhanrajGranite/`
- **Redirect URLs → Add URL:** `https://sarthak11853.github.io/DhanrajGranite/admin.html` → **Save**.

(Use your Netlify or own-domain address instead if you use those.)

### 7.8 Add another admin (staff member)

1. Supabase → **Authentication → Users → Add user → Create new user** (their email + a password, tick *Auto Confirm*).
2. **SQL Editor → New query**:
   ```sql
   insert into public.admins (email) values ('staff-email@example.com');
   ```
3. To **remove** someone’s access:
   ```sql
   delete from public.admins where email = 'staff-email@example.com';
   ```
   (Optionally also delete them in Authentication → Users.)

### 7.9 First login & load the catalogue

1. Open `your-website-address/admin.html` → sign in with your Supabase email & password. The badge now says **LIVE**.
2. A banner says the database is empty → click **Load starter content**. This copies all the products, gallery, capabilities and text into your database.
3. Done! Open the customer site on your phone — it shows everything. Edit something in the admin and refresh the site: it’s there.

**Did you make changes in demo mode that you want to keep?** *Before* step 7.5, open the admin in that same browser → **Account → Download backup**. After going live → **Account → Restore from file** → choose that file. Photos you uploaded in demo mode are moved into Supabase automatically.

---

## 8. Your own domain name

1. Buy a domain (e.g. `dhanrajgranite.com`) from GoDaddy, Hostinger, Namecheap, Google/Squarespace Domains, etc.
2. Connect it:
   - **GitHub Pages:** repository → **Settings → Pages → Custom domain** → type `www.dhanrajgranite.com` → Save. GitHub shows the DNS records to add at your domain seller (a `CNAME` record for `www` pointing to `sarthak11853.github.io`, and four `A` records for the bare domain). Then tick **Enforce HTTPS**.
   - **Netlify:** **Domain management → Add a domain** and follow the steps shown.
3. DNS changes can take a few hours to start working.
4. Update Supabase **URL Configuration** (step 7.7) with the new address.

---

## 9. Changing things that are *not* in the Admin Panel

A few fixed words and the design colours live in the code files. You can still change them from GitHub’s website — no software needed:

1. Open the file on GitHub → **✏️ pencil** → press **Ctrl+F** (Cmd+F on Mac) and search for the exact words you see on the website → change only the words between the quote marks → **Commit changes**.
2. If something breaks, every change is saved in history: open the file → **History** → pick the previous version → you can copy the old text back.

| What | File | Search for |
| --- | --- | --- |
| Page headings like “Granite *slabs & tiles.*”, “Projects in *stone.*”, “Visit us *in person.*”, “Why they come back to Dhanraj.”, “From quarry *to surface.*” and the small text under them | `assets/js/app.js` | the heading words |
| Menu names (Home, Products…) | `assets/js/app.js` | `const NAV` |
| WhatsApp pre-filled messages | `assets/js/app.js` | `I'm interested in` / `I have a question` |
| Colours (navy, gold, background) | `assets/css/main.css` | the first lines: `--navy`, `--gold`, `--paper` (colour codes like `#c6a052`) |
| Fonts | `index.html` & `admin.html` (Google Fonts link) and `assets/css/main.css` (`--serif`, `--sans`) | `fonts.googleapis.com` |
| Browser tab title & Google description | `index.html` | `<title>` and `name="description"` |
| Tab icon / phone home-screen icon | replace `assets/img/brand/favicon.png` (64×64) and `apple-touch-icon.png` (180×180) | — |
| Image shown when the link is shared on WhatsApp/Facebook | replace `assets/img/brand/share.jpg` (1200×630) | — |
| Big hero background default | upload a new one in **Site & About → Homepage** (no code needed) | — |
| Add a new editable field (e.g. *Price*) | see [section 13](#13-for-developers) | — |

---

## 10. Problems & solutions (FAQ)

**My changes don’t show for customers.**
- Check the badge in the admin: if it says **DEMO MODE**, Supabase isn’t connected yet → [section 7](#7-going-live--one-time-setup).
- Make sure the item is **visible** (not faded/“Hidden”).
- On the customer site, pull down to refresh / press F5. Open pages update by themselves within seconds in live mode.

**I changed `config.js` but the site still says demo mode.** Wait 2–5 minutes for the hosting to update, then refresh with **Ctrl+Shift+R** (computer) or close and reopen the tab (phone). Check the URL and key are inside quote marks with the comma at the end of the line.

**Login says “This account is not on the admin list”.** Run the `insert into public.admins …` command (step 7.4) with exactly the same email.

**Login says “Database is not set up yet”.** Run `supabase/schema.sql` (step 7.3).

**Login says “Invalid login credentials”.** Wrong email or password. Use **Forgot password?**, or in Supabase → Authentication → Users → ⋯ → *Send password recovery* / reset.

**Photo upload fails.** Make sure it’s an image file (JPG/PNG), under 10 MB, and you’re signed in. Try again on Wi-Fi.

**The website shows “We’ll be right back.”** The database couldn’t be reached. Check your internet. On the free plan, Supabase may **pause a project after about a week with no activity** — log in to supabase.com, open the project, and click **Restore project**. Visitors using the site keep it active.

**I deleted something by mistake.** Use **Account → Restore from file** with your latest backup. (This is why monthly backups matter.)

**The quote form says “Could not send right now”.** Usually a temporary internet problem — the customer can use the WhatsApp button. If it keeps happening, check Supabase is not paused.

**Two products have the same name.** That’s fine when the finish is different — each has its own link and card label (e.g. *Ivory Fantasy – Polished* and *– Leather*).

**Where do I see website visitors / analytics?** Not included. You can add free Google Analytics or Cloudflare Web Analytics later (a developer can paste their snippet into `index.html`).

---

## 11. Costs and limits

| Service | Cost | Free limits (approx., check their pricing pages) |
| --- | --- | --- |
| GitHub (file storage) | Free | — |
| GitHub Pages / Netlify (hosting) | Free | Plenty for a business site |
| Supabase (database, photos, logins) | Free plan | ~500 MB database (thousands of products), ~1 GB photo storage (several thousand photos), monthly bandwidth limit; may pause after ~1 week of no activity |
| Own domain (optional) | ~₹800–₹1,500 / year | — |

If you ever outgrow the free plan, Supabase’s paid plan can be enabled without changing the website.

---

## 12. Keeping it safe

- Use a **strong admin password** and don’t share it. Give staff their **own** login (step 7.8) so you can remove access later.
- Keep **“Allow new users to sign up”** turned **OFF** in Supabase.
- The *publishable / anon* key in `config.js` is meant to be public — the database rules only allow admins to change anything, and customers can only *send* inquiries, never read them.
- **Never** put the *secret / service_role* key or the database password in any website file.
- Download a **backup** monthly (Account → Download backup) and export inquiries (Inquiries → Export CSV).

---

## 13. For developers

**Stack:** static HTML/CSS/vanilla JS (ES modules), no build step. Data layer: Supabase (Postgres + Storage + Auth + Realtime) via `@supabase/supabase-js` from jsDelivr; falls back to `localStorage` “demo mode” when `config.js` is empty.

**Run locally**
```bash
python3 -m http.server 8080
```
Open `http://localhost:8080` (site) and `http://localhost:8080/admin.html` (admin, demo password `dhanraj123`).

**Files**
```
index.html              customer site shell
admin.html              admin shell
assets/css/main.css     design tokens (top of file) + site styles
assets/css/admin.css    admin styles
assets/js/config.js     Supabase URL + publishable key (empty = demo mode)
assets/js/app.js        customer SPA: hash router, pages, filters, quick view, lightbox, quote form
assets/js/admin.js      admin SPA; SCHEMAS + SETTINGS_GROUPS define every editable field
assets/js/store.js      data layer (Supabase / demo), image compression, backup/restore
assets/js/seed.js       starter content (also used by “Load starter content”)
assets/js/ui.js         helpers: escaping, icons, toasts, logo
assets/img/             bundled photos: products/ gallery/ capabilities/ factory/ brand/
supabase/schema.sql     tables, RLS policies, storage bucket, realtime publication
```

**Data model**
- `content(id, collection, data jsonb, sort, visible, created_at, updated_at)` — one table for all lists; `collection` ∈ products, capabilities, gallery, milestones, testimonials, outlets, resources.
- `settings(id=1, data jsonb)` — site-wide text/options, merged over defaults in `seed.js`.
- `inquiries(...)` — anon may `insert` only; admins full access.
- `admins(email)` + `is_admin()` — RLS gate for all writes and for storage uploads.

**Add a new field** (example: product price)
1. `assets/js/admin.js` → `SCHEMAS.products.fields` → add `{ k: 'price', label: 'Price per sq.ft', ph: '₹ 120' },`
2. `assets/js/app.js` → in `syncProductModal`, add `['Price', p.price]` to `rows` (and/or show it in `productCard`).
No database migration is needed (fields live in `data jsonb`).

**Add a new list/collection:** add it to `COLLECTIONS` in `seed.js`, a schema in `SCHEMAS`, a tab in `TABS` (admin.js), render it in `app.js`, and add the name to the `collection` check constraint in `schema.sql`.

**Notes**
- Demo storage keys are versioned (`dg:data:v2`); bump to reseed demo browsers after changing `seed.js`.
- Customer site caches the last public payload in `localStorage` for instant first paint, then revalidates and subscribes to Realtime changes.
- Uploaded images are resized client-side to ≤1800 px JPEG before upload.
