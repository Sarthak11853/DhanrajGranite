# Dhanraj Granite

A calm, minimal website for Dhanraj Granite, with an **admin panel** for managing the catalogue. Whatever you add, edit, hide or delete in the admin panel shows up on the customer site.

- **Customer site** (`index.html`): Home, Products (search, filters, quick view, WhatsApp enquiry), Capabilities, About, Gallery (lightbox), Outlets, Resources, and a Request‑a‑Quote form.
- **Admin panel** (`admin.html`, also linked as “Admin” in the footer):
  - **Inquiries**: quote requests, with status (new / contacted / quoted / closed), one‑tap WhatsApp, call or email, and CSV export.
  - **Products, Capabilities, Gallery, Milestones, Testimonials, Outlets, Resources**: add, edit, delete, duplicate, reorder, show or hide, and upload photos straight from your phone.
  - **Site & About**: homepage text, numbers, contact details, About text, factory specs, and the filter options (colours, finishes, applications).
  - **Account**: change your password, download or restore a backup, load the starter content.

There is no build step. It's plain HTML, CSS and JavaScript, so any static host can serve it, including free ones.

---

## 1. Try it right now (demo mode)

With `assets/js/config.js` left empty, the site runs in **demo mode**:

- Everything works, but admin changes are saved **only in the browser you make them in**.
- The admin password is `dhanraj123` (you can change it in **Account**).

To run it on your computer:

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080> for the site and <http://localhost:8080/admin.html> for the admin panel.

## 2. Go live with a free database (Supabase)

This makes your admin changes appear for **every customer**. It also stores uploaded photos and lets you log in securely from any device. Supabase's free plan is enough for this site.

1. Create an account at **[supabase.com](https://supabase.com)**, then click **New project**. Pick a region near India, such as Mumbai.
2. In your project, open **SQL Editor → New query**. Paste the whole of [`supabase/schema.sql`](supabase/schema.sql) and press **Run**.
3. Open **Authentication → Users → Add user → Create new user**. Enter your email and a strong password, and tick **Auto Confirm User**.
4. Back in **SQL Editor**, give that email admin rights:
   ```sql
   insert into public.admins (email) values ('you@example.com');
   ```
   Repeat this for anyone else who should be able to edit the site.
5. Recommended: in **Authentication → Sign In / Providers**, turn off **Allow new users to sign up**.
6. Open **Project Settings → API**. Copy the **Project URL** and the **anon public** key into [`assets/js/config.js`](assets/js/config.js):
   ```js
   export default {
     supabaseUrl: 'https://YOUR-PROJECT.supabase.co',
     supabaseAnonKey: 'eyJhbGciOi...',
   };
   ```
   The anon key is meant to be public. The database rules only let signed‑in admins change anything.
7. Deploy (step 3 below), open `/admin.html` and sign in with your email and password.
8. The database starts empty. Click **Load starter content**, then edit or replace the items with your own photos.
   - To keep edits you made in demo mode: before connecting, use **Account → Download backup**. After connecting, use **Account → Restore from file**. Demo‑mode photos are moved into Supabase storage automatically.

**Forgot password?** On the admin login screen, type your email and tap **Forgot password?**. Supabase sends a reset link. For the link to work, add your website address under **Authentication → URL Configuration → Redirect URLs**.

## 3. Publish the website (free)

Choose one of these:

- **GitHub Pages**: open the repository's **Settings → Pages**. Set *Source* to **Deploy from a branch**, then pick your branch and `/ (root)`. The site appears at `https://<user>.github.io/<repo>/`.
- **Netlify** or **Cloudflare Pages**: import the repository. Leave the build command empty and set the publish directory to `/`.
- **Vercel**: import the repository with the *Other* framework preset and no build command.

A custom domain such as `dhanrajgranite.com` can be connected in any of them.

## Day‑to‑day editing

| I want to… | Where |
| --- | --- |
| Add a new granite | Admin → **Products** → *Add product*, fill the name and upload a photo, then **Save** |
| Take a sold‑out stone off the site without deleting it | Click the 👁 eye icon on its row, or untick *Visible on the website* |
| Choose what appears on the homepage | Edit a product and turn on *Show in the homepage collection* |
| Change the order | Use the ↑ ↓ arrows on each row |
| Add a new colour family / finish | Type it straight into the product form, or list it under **Site & About → Catalogue options** |
| Change phone, WhatsApp, email | **Site & About → Business & contact** |
| See quote requests | **Inquiries** (the gold badge shows how many are new) |

Photos are resized automatically on upload, so the site stays fast on phones.

## Project structure

```
index.html            customer site
admin.html            admin panel
assets/css/main.css   site styles (colours and fonts are variables at the top)
assets/css/admin.css  admin styles
assets/js/config.js   ← your Supabase keys go here
assets/js/app.js      customer site pages and interactions
assets/js/admin.js    admin panel (the SCHEMAS list defines every editable field)
assets/js/store.js    data layer: Supabase or demo (browser storage)
assets/js/seed.js     starter content
assets/img/           placeholder stone textures. Replace them with real photos from the admin panel
supabase/schema.sql   database tables, security rules, photo storage
```

**Adding a new field** (for example a price on products): add one line to `SCHEMAS.products.fields` in `assets/js/admin.js`, then display it in `assets/js/app.js`. No database change is needed.
