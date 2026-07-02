# TechPhase Website Backend (CMS) — Setup Guide

Your site now has an admin panel at **techphasesolutions.com/admin.html** where every
frontend menu has a matching backend section:

| Frontend menu | Backend section | What you can edit |
|---|---|---|
| Home | Home / Hero | Badge, title, subtitle, 3 stats, "What We Offer" list |
| About Us | About Us | Heading, 3 paragraphs, badge, image, mission, vision |
| Services | Services | Add/edit/remove service cards (icon, title, description) |
| Products | Products | Product list, partner brands, image, achievement counters |
| Our Team | Our Team | Members with photos or icons, roles, social links |
| (Team page) | Testimonials | Client quotes |
| Clients | Clients | Client organisation cards |
| Contact | FAQs | Questions & answers |
| Contact | Contact & Social | Address, phone, email, hours, social links |

**How the sync works:** clicking **Save & Publish** commits `content.json` (and any
uploaded images) to your GitHub repo → Vercel auto-deploys → the live site renders the
new content. Updates appear in ~60 seconds. Every change is a git commit, so you have
full history and can roll back anything from GitHub.

---

## 1. Files to add to your GitHub repo

```
your-repo/
├── index.html        ← REPLACE (now renders content from content.json)
├── admin.html        ← NEW (the admin panel)
├── content.json      ← NEW (all site content)
├── package.json      ← unchanged
├── images/           ← NEW empty folder (uploads land here; add the .gitkeep file)
└── api/
    ├── contact.js    ← unchanged
    ├── login.js      ← NEW (admin sign-in)
    └── admin.js      ← NEW (save content / upload images)
```

## 2. Create a GitHub fine-grained token

The backend commits to your repo on your behalf, so it needs a token:

1. GitHub → click your avatar → **Settings** → **Developer settings**
   → **Personal access tokens → Fine-grained tokens** → **Generate new token**
2. Name: `techphase-cms` · Expiration: 1 year (custom)
3. **Repository access:** *Only select repositories* → choose `techphase-jobs/techphase`
4. **Permissions → Repository permissions → Contents → Read and write** (nothing else)
5. Generate and copy the token (starts with `github_pat_…`)

## 3. Add environment variables in Vercel

Project → **Settings → Environment Variables** (all environments), then **Redeploy**:

| Key | Value |
|---|---|
| `ADMIN_PASSWORD` | a strong password you choose — this is your admin login |
| `SESSION_SECRET` | any long random string (40+ chars, e.g. from a password generator) |
| `GITHUB_TOKEN` | the `github_pat_…` token from step 2 |
| `GITHUB_REPO` | `techphase-jobs/techphase` |

(Your existing `ZOHO_USER` / `ZOHO_APP_PASSWORD` stay as they are.)

## 4. Use it

1. Visit **https://techphasesolutions.com/admin.html**
2. Sign in with your `ADMIN_PASSWORD`
3. Edit any section · upload photos (auto-compressed to ≤1200px JPEG)
4. **Save & Publish** → live in ~1 minute

## Security notes

- Login is rate-slowed and uses constant-time comparison; sessions are HMAC-signed
  tokens valid 24 h, held only in your browser session.
- The GitHub token never leaves the server (Vercel env var); the browser only ever
  talks to `/api/admin`.
- Uploads are restricted to JPEG/PNG/WebP/SVG, max 4 MB, sanitised filenames.
- `admin.html` is noindex'd. For extra stealth you can rename it (e.g. `tp-console.html`).
- The static HTML remains as a built-in fallback: if `content.json` ever fails to load,
  visitors still see the full site.

## Troubleshooting

| Symptom | Fix |
|---|---|
| "Server not configured" on login | Env vars missing → add all 4, **redeploy** |
| Save fails with GitHub error | Token expired or lacks *Contents: write* on the repo |
| Changes don't appear | Wait 60–90 s for the Vercel build; hard-refresh (Ctrl+Shift+R) |
| Logged out unexpectedly | Sessions last 24 h — just sign in again |
