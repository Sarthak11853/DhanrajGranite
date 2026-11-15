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
8. [Where your details are saved in Supabase](#8-where-your-details-are-saved-in-supabase)
9. [Inquiry emails](#9-inquiry-emails)
10. [Your own domain name (www.yourname.com)](#10-your-own-domain-name)
11. [Changing things that are *not* in the Admin Panel](#11-changing-things-that-are-not-in-the-admin-panel)
12. [Problems & solutions (FAQ)](#12-problems--solutions-faq)
13. [Costs and limits](#13-costs-and-limits)
14. [Keeping it safe](#14-keeping-it-safe)
15. [For developers](#15-for-developers)

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

When a customer fills the **Request a quote** form, it appears here **and is emailed to you** (see [section 9](#9-inquiry-emails)). The gold number on the tab shows how many are **new**.

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

The **Google Maps link** powers the **Get directions** button on each location (already set for Universal Stone, Dahisar and Mira Road).

*How to get a Google Maps link:* open Google Maps → find your shop → **Share** → **Copy link** → paste it. If left blank, the website searches the address on Google Maps automatically.

### 4.8 Resources

Helpful articles (care guides, comparisons). Title, Source (website name), Label, Link (must start with `https://`). They open in a new tab.

### 4.9 Site & About

All the general text of the website, in six sections (tap a chip at the top to jump):

| Section | What you can change |
| --- | --- |
| **Business & contact** | Business name, year established, phone numbers, **WhatsApp number** (digits only with country code, e.g. `919392537240`), email, cities line, Instagram & Facebook links (icons appear in the footer when filled), **Logo** |
| **Inquiry emails** | Email addresses that receive every quote request (one per line; first = main). See [section 9](#9-inquiry-emails) |
| **Homepage** | The big title (3 parts: line 1, the gold italic word, and the rest), intro paragraph, **background image**, the 4 numbers (35+ Years…), collection heading, the “Ready to specify your project?” band, footer description |
| **About page** | Title, Our story, Our essence, Our craft, About image |
| **Factory specifications** | The boxes on the Capabilities page (Monthly capacity, Max slab size…). **+ Add row** / ✕ to remove |
| **Catalogue options** | One per line: colour families, finishes, applications, gallery categories, project types (quote form). These control the filter buttons and form dropdowns and their order |

When you change anything, a bar slides up at the bottom: **Save changes** or **Undo**.

**Changing the logo:** Site & About → Business & contact → **Logo** → upload. Best: a PNG with a transparent background, wide shape. Click **Remove** to show the built-in typed “DG | DHANRAJ GRANITE” logo instead.

### 4.10 Account

- **Inquiry emails → Send test email** — sends a test inquiry email (also used once to activate emails, see [section 9](#9-inquiry-emails)).
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
| See who asked for a quote | **Inquiries** tab — and your email inbox |
| Change who receives inquiry emails | **Site & About → Inquiry emails** |
| Change a “Get directions” link | **Outlets** → edit → **Google Maps link** |
| Download inquiries to Excel | **Inquiries → Export CSV** |
| Give a staff member admin access | [Step 7.9](#79-add-or-remove-another-admin-later) |
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

Until you do this, the site is in **demo mode**: it works, but changes are saved only in your own browser and customers don’t see them. This setup takes about **30–40 minutes, once**.

**You need:** a computer (a laptop is easier than a phone for this), your email, and your GitHub login. Keep this guide open in one tab and Supabase/GitHub in another.

> Supabase sometimes renames buttons slightly. If a name doesn’t match exactly, look for the closest one — the order of steps stays the same.

**Overview — what you will do**

| Step | Where | Result |
| --- | --- | --- |
| 7.1 | GitHub | Website code on your `main` branch |
| 7.2 | Supabase | A free database project in Mumbai |
| 7.3 | Supabase → SQL Editor | Tables, security rules and photo folder created |
| 7.4 | Supabase → Authentication | Your admin login created and approved |
| 7.5 | Supabase → Project Settings + GitHub | Website connected to the database |
| 7.6 | GitHub Pages or Netlify | Website online with a public address |
| 7.7 | Supabase → URL Configuration | “Forgot password” emails work |
| 7.8 | Admin Panel | Catalogue loaded, inquiry emails activated |

### 7.1 Put the website on your `main` branch

The website was built on a separate branch called `claude/brave-tesla-yado4k`. Copy it into `main`:

1. Open `https://github.com/Sarthak11853/DhanrajGranite` and sign in.
2. Click the **Pull requests** tab → green **New pull request** button.
3. Set **base:** `main` and **compare:** `claude/brave-tesla-yado4k`.
4. Click **Create pull request** → give it any title (e.g. “Website”) → **Create pull request** again.
5. Click **Merge pull request** → **Confirm merge**. ✅ Done when you see a purple “Merged” label.

### 7.2 Create a free Supabase project

1. Go to **[supabase.com](https://supabase.com)** → click **Start your project**.
2. Sign up. Easiest: **Continue with GitHub** (uses the same GitHub account). Or use email + password and confirm the email Supabase sends you.
3. If asked to create an **organization**: Name `Dhanraj Granite`, Type *Company* or *Personal*, Plan **Free** → **Create organization**.
4. Click **New project** and fill in:
   - **Project name:** `dhanraj-granite`
   - **Database password:** click **Generate a password**, then **copy it and save it** somewhere safe (notes app / password manager). You will rarely need it, but keep it.
   - **Region:** **South Asia (Mumbai)** — fastest for Indian customers.
   - Leave everything else as it is.
5. Click **Create new project**. Wait 1–3 minutes while it says “Setting up project”.
6. ✅ Done when you see the project dashboard with a left-side menu (Table Editor, SQL Editor, Authentication, Storage…).

### 7.3 Create the database tables (copy–paste once)

1. In a new tab, open the file on GitHub: `supabase/schema.sql` (in your repository → folder **supabase** → **schema.sql**).
2. Click the **Copy raw file** button (two overlapping squares, top-right of the file box). The whole file is now copied.
3. In Supabase, left menu → **SQL Editor** (icon looks like `>_`).
4. Click **+ New query** (or **New SQL snippet**). An empty editor opens.
5. Click inside it and **paste** (Ctrl+V on Windows, Cmd+V on Mac).
6. Click **Run** (bottom-right, or press Ctrl+Enter).
   - If a warning appears about “destructive operations” or “this query may…”, click **Run this query** / **Confirm** — the file only *creates* things.
7. ✅ You should see **“Success. No rows returned”**.
8. Check: left menu → **Table Editor**. You should see **4 tables**: `admins`, `content`, `inquiries`, `settings`. Left menu → **Storage** → you should see a bucket named **`media`** marked *Public*.

### 7.4 Create your admin login

**a) Create the user**
1. Left menu → **Authentication** → **Users**.
2. Click **Add user** → **Create new user**.
3. **Email:** your email (e.g. `dhanrajstones@gmail.com`). **Password:** a strong password you will remember (at least 8 characters, mix letters and numbers).
4. ✅ Tick **Auto Confirm User** (so no confirmation email is needed).
5. Click **Create user**. It appears in the list.

**b) Give that email admin rights**
1. Left menu → **SQL Editor** → **+ New query**.
2. Paste this line, **replacing the email with the exact email you just used**:
   ```sql
   insert into public.admins (email) values ('dhanrajstones@gmail.com');
   ```
3. Click **Run** → ✅ “Success. No rows returned”.
4. Check: **Table Editor → admins** shows your email.

To add a second admin (e.g. Naresh ji), repeat **a)** and **b)** with their email.

**c) Stop strangers from creating accounts (important)**
1. Left menu → **Authentication** → **Sign In / Providers** (in some versions: **Providers → Email** or **Settings**).
2. Find **Allow new users to sign up** → switch it **OFF** → **Save**.

### 7.5 Connect the website to Supabase

**a) Copy two values from Supabase**
1. Left menu → **Project Settings** (gear ⚙️ icon at the bottom).
2. Open **Data API** (older versions: **API**). Copy the **Project URL** — it looks like `https://abcdefghijklmnop.supabase.co`. Paste it into a notes app for now.
3. Open **API Keys**. Copy the **Publishable key** (starts with `sb_publishable_`).
   - If you only see **anon** / **service_role** (a “Legacy API keys” tab), copy the **anon public** key (a long text starting with `eyJ`). Either works.
   - ⚠️ **Never** copy the **secret** or **service_role** key into the website.

**b) Paste them into the website (on GitHub)**
1. On GitHub, open your repository → folder **assets** → **js** → **config.js**.
2. Click the **✏️ pencil** icon (top-right of the file, “Edit this file”).
3. Find these two lines near the bottom:
   ```js
   supabaseUrl: '',
   supabaseAnonKey: '',
   ```
4. Put your values **between the two quote marks** so they look like:
   ```js
   supabaseUrl: 'https://abcdefghijklmnop.supabase.co',
   supabaseAnonKey: 'sb_publishable_AbCdEf123...',
   ```
   Don’t delete the quote marks `'` or the commas `,`. No spaces inside the quotes.
5. Click the green **Commit changes…** button → leave *“Commit directly to the main branch”* selected → **Commit changes**.

### 7.6 Publish the website (free)

Pick **one** option.

**Option A — GitHub Pages** (simplest; the repository must be **Public**, unless you have a paid GitHub plan)
1. Repository → **Settings** (top tabs) → **Pages** (left menu).
2. Under **Build and deployment** → **Source:** *Deploy from a branch*.
3. **Branch:** select `main` and folder `/ (root)` → **Save**.
4. Wait 1–3 minutes, refresh the page. A box shows **“Your site is live at https://sarthak11853.github.io/DhanrajGranite/”**. Click **Visit site**.
5. From now on, any change you commit on GitHub goes online by itself within a few minutes.

*To make the repository public:* Settings → General → scroll to **Danger Zone** → **Change visibility** → Public. (The code becomes viewable by anyone; your data and passwords are in Supabase, not in the code.)

**Option B — Netlify** (works with **private** repositories, free)
1. Go to **[netlify.com](https://www.netlify.com)** → **Sign up** → **with GitHub**.
2. **Add new site** → **Import an existing project** → **GitHub** → allow access → choose **DhanrajGranite**.
3. **Branch to deploy:** `main`. **Build command:** leave **empty**. **Publish directory:** leave **empty**.
4. Click **Deploy**. In ~1 minute you get an address like `https://random-name-123.netlify.app`.
5. Rename it: **Site configuration** → **Change site name** → e.g. `dhanrajgranite` → `https://dhanrajgranite.netlify.app`.

### 7.7 Make “Forgot password” emails work

Supabase → **Authentication** → **URL Configuration**:
1. **Site URL:** your website address, e.g. `https://sarthak11853.github.io/DhanrajGranite/` → **Save**.
2. **Redirect URLs** → **Add URL** → `https://sarthak11853.github.io/DhanrajGranite/admin.html` → **Save**.

(Use your Netlify address or own domain instead, if you use those.)

### 7.8 First login, load the catalogue, activate emails

1. Open `your-website-address/admin.html` (or tap **Admin** at the bottom of the website).
2. Sign in with the **email and password from step 7.4**. ✅ The badge at the top now says **LIVE** (green dot).
3. A banner says the database is empty → click **Load starter content** → **Load**. This copies all products, gallery photos, capabilities, outlets and text into your database.
4. Open the customer website on your phone — everything is there. Change something in the admin, refresh the site: your change appears.
5. **Activate inquiry emails** (see [section 9](#9-inquiry-emails)): **Account → Send test email** → open the “Activate Form” email in `dhanrajstones@gmail.com` → click **Activate Form** → press **Send test email** again → both inboxes receive a test.
6. Send a real test from the website’s **Contact** page and check that it appears in **Inquiries** *and* in both email inboxes.

**Made changes in demo mode you want to keep?** *Before* step 7.5, open the admin in that same browser → **Account → Download backup**. After going live → **Account → Restore from file** → choose that file. Demo photos move into Supabase automatically.

### 7.9 Add or remove another admin later

- **Add:** do step 7.4 a) and b) with their email.
- **Remove:** SQL Editor → run
  ```sql
  delete from public.admins where email = 'their-email@example.com';
  ```
  and optionally delete them in **Authentication → Users** (⋯ menu → Delete user).

---

## 8. Where your details are saved in Supabase

Everything lives in **your own Supabase project** — open [supabase.com](https://supabase.com) → **Dashboard** → click **dhanraj-granite**. You normally never need to touch it (use the Admin Panel instead), but here is where each thing is:

| What | Where in Supabase | How it looks |
| --- | --- | --- |
| **Products, Capabilities, Gallery, Milestones, Testimonials, Outlets, Resources** | **Table Editor → `content`** | One row per item. Column **`collection`** says which list it belongs to (`products`, `gallery`, …). Column **`data`** holds the details (name, finish, colour, photo link…). **`visible`** = shown on site or hidden. **`sort`** = order. |
| **Site text & settings** (phone, WhatsApp, email list for inquiries, homepage text, About text, logo, filters…) | **Table Editor → `settings`** | A single row (id = 1); column **`data`** holds all values. |
| **Customer inquiries** (quote requests) | **Table Editor → `inquiries`** | One row per request: date, status, name, phone, email, product, finish, sq.ft, quantity, location, message. |
| **Who can use the Admin Panel** | **Table Editor → `admins`** | List of allowed emails. |
| **Admin logins & passwords** | **Authentication → Users** | Emails of users. Passwords are stored encrypted — nobody (not even you) can read them; they can only be reset. |
| **Photos you upload from the Admin Panel** | **Storage → `media`** | Folders such as `products/`, `gallery/`, `settings/`. Each photo has a public link used by the website. |
| **Photos that came with the website** | Not in Supabase — in the GitHub repository folder **`assets/img/`** | — |

**Handy things you can do in Supabase**
- **Download inquiries as a spreadsheet:** Table Editor → `inquiries` → **Export** (or ⋯) → **Export to CSV**. (The Admin Panel’s *Export CSV* button does the same.)
- **See database size / usage:** **Project Settings → Usage** (or the **Usage** page in the organization).
- **Automatic backups:** the free plan doesn’t include downloadable daily backups — use **Admin → Account → Download backup** monthly.
- ⚠️ Avoid editing or deleting rows directly in the Table Editor unless you know what you’re doing — use the Admin Panel.

---

## 9. Inquiry emails

Every time a customer submits the **Request a quote** form, three things happen at once:
1. It is saved in **Admin → Inquiries** (and in Supabase → `inquiries`).
2. An **email** with all the details is sent to the addresses in **Admin → Site & About → Inquiry emails** — currently **dhanrajstones@gmail.com** (main) and **Nareshchoudhary17170@gmail.com** (copy).
3. The customer sees a thank-you message with an optional “Also send on WhatsApp” button.

You can simply **reply** to the email to answer the customer (if they entered their email).

**How it works:** emails are sent by **FormSubmit** (formsubmit.co), a free service — no account, no password. Emails come from `FormSubmit` with the subject **“New quote request — *customer name* · *product*”**.

**One-time activation (required)**
1. After the website is online, open **Admin → Account → Inquiry emails** → **Send test email**.
   *(Do this on the live website address, not on a test copy — FormSubmit links the activation to the website address.)*
2. Within a minute, **dhanrajstones@gmail.com** receives an email from FormSubmit titled **“Action Required: Activate FormSubmit…”**. Check **Spam** and **Promotions** if you don’t see it.
3. Open it and click **Activate Form**.
4. Back in the admin, press **Send test email** again. ✅ Both addresses receive “[TEST] New quote request…”.
5. In Gmail, if it landed in Spam, open it and click **Not spam** — and optionally create a filter (search `from:formsubmit` → *Create filter* → *Never send it to Spam*).

**Change who gets emails:** Admin → **Site & About → Inquiry emails** → one email per line (first line = main address) → **Save changes**. If you change the **first** address, repeat the activation steps above for that new address. Leave the box empty to switch emails off.

**Optional — hide the main address from spammers:** after activation, FormSubmit sends a second email with a random code (like `a1b2c3d4e5f6…`). Paste that code in place of the first email line. Emails keep going to the same inbox.

**Good to know**
- Emails work even before Supabase is connected — useful because in demo mode inquiries are only saved in the customer’s own browser.
- If the email service is ever down, the inquiry is still saved in the Admin Panel (and vice-versa), so you never lose a lead.
- FormSubmit is free; it’s meant for normal business volumes (dozens of inquiries a day is fine).
- Email addresses listed here are part of the website’s public settings, so a determined bot could find them. Use the code trick above for the main address if spam becomes a problem.

---

## 10. Your own domain name

1. Buy a domain (e.g. `dhanrajgranite.com`) from GoDaddy, Hostinger, Namecheap, Google/Squarespace Domains, etc.
2. Connect it:
   - **GitHub Pages:** repository → **Settings → Pages → Custom domain** → type `www.dhanrajgranite.com` → Save. GitHub shows the DNS records to add at your domain seller (a `CNAME` record for `www` pointing to `sarthak11853.github.io`, and four `A` records for the bare domain). Then tick **Enforce HTTPS**.
   - **Netlify:** **Domain management → Add a domain** and follow the steps shown.
3. DNS changes can take a few hours to start working.
4. Update Supabase **URL Configuration** (step 7.7) with the new address.

---

## 11. Changing things that are *not* in the Admin Panel

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
| Add a new editable field (e.g. *Price*) | see [section 15](#15-for-developers) | — |

---

## 12. Problems & solutions (FAQ)

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

**I’m not receiving inquiry emails.**
- Did you complete the one-time **Activate Form** step? ([section 9](#9-inquiry-emails)) Press **Account → Send test email** — if activation is still needed, the admin tells you.
- Check **Spam** / **Promotions** in Gmail and mark it **Not spam**.
- Check the addresses in **Site & About → Inquiry emails** (one per line, no typos).
- The inquiry is always also in **Admin → Inquiries**, so nothing is lost.

**The quote form says “Could not send right now”.** Usually a temporary internet problem — the customer can use the WhatsApp button. If it keeps happening, check Supabase is not paused.

**Two products have the same name.** That’s fine when the finish is different — each has its own link and card label (e.g. *Ivory Fantasy – Polished* and *– Leather*).

**Where do I see website visitors / analytics?** Not included. You can add free Google Analytics or Cloudflare Web Analytics later (a developer can paste their snippet into `index.html`).

---

## 13. Costs and limits

| Service | Cost | Free limits (approx., check their pricing pages) |
| --- | --- | --- |
| GitHub (file storage) | Free | — |
| GitHub Pages / Netlify (hosting) | Free | Plenty for a business site |
| Supabase (database, photos, logins) | Free plan | ~500 MB database (thousands of products), ~1 GB photo storage (several thousand photos), monthly bandwidth limit; may pause after ~1 week of no activity |
| FormSubmit (inquiry emails) | Free | Normal business volumes |
| Own domain (optional) | ~₹800–₹1,500 / year | — |

If you ever outgrow the free plan, Supabase’s paid plan can be enabled without changing the website.

---

## 14. Keeping it safe

- Use a **strong admin password** and don’t share it. Give staff their **own** login (step 7.9) so you can remove access later.
- Keep **“Allow new users to sign up”** turned **OFF** in Supabase.
- The *publishable / anon* key in `config.js` is meant to be public — the database rules only allow admins to change anything, and customers can only *send* inquiries, never read them.
- **Never** put the *secret / service_role* key or the database password in any website file.
- Download a **backup** monthly (Account → Download backup) and export inquiries (Inquiries → Export CSV).

---

## 15. For developers

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
assets/js/notify.js     inquiry email via FormSubmit (recipients from settings.notifyEmails)
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
- Inquiry submit runs `store.submitInquiry` and `emailInquiry` in parallel (`Promise.allSettled`); the customer sees success if either succeeds.
- To send emails server-side instead (hiding recipients), add a Supabase Database Webhook on `inquiries` INSERT → Edge Function → an email API such as Resend, and clear `notifyEmails`.
