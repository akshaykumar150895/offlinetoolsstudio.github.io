# Offline Tools Studio website

Official informational website for **Offline Tools Studio** — *Simple tools. More freedom.*
Plain HTML, CSS and JavaScript; no build step, no dependencies, no backend. It is not a donation or store site.

## Structure
- `index.html` – Home, Our Apps, About, Philosophy, Contact
- `privacy.html` – Privacy approach and links to app privacy policies
- `js/config.js` – **central configuration** (edit this)
- `js/main.js`, `css/styles.css`, `assets/`
- `.nojekyll` – serve files as-is on GitHub Pages

## Configuration values you need to provide (`js/config.js`)
- `supportEmail` – support email address
- `youtubeUrl` – YouTube channel URL
- `socialLinks` – list of `{ label, url }`
- `apps[0].googlePlayUrl` – real Google Play URL (until set, the card shows "coming soon", not a published claim)
- `apps[0].privacyUrl` – app privacy policy URL
- `assets` / `apps[].icon` – replace logo, favicon, Open Graph image and app icon (the SVGs provided are placeholders)
- Optional: once the final domain is known, make `og:image` an absolute URL and add `og:url` in the HTML `<head>` (some platforms require absolute URLs). Favicon and Open Graph paths are in the HTML `<head>`; studio name/tagline are also in the HTML for SEO.

Empty values are hidden or shown as "Coming soon"; nothing is invented.

## Add another app
Add another object to `apps` in `js/config.js` with the same fields.

## Preview locally
`python3 -m http.server 8000` then open http://localhost:8000

## Publish on GitHub Pages
1. Push to the `main` branch of `offlinetoolsstudio.github.io`.
2. In **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. The site will be available at `https://offlinetoolsstudio.github.io/` (repository name must match the account name).

All asset paths are relative, so the site also works under a project sub-path.
