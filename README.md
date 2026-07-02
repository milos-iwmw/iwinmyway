# I WIN MY WAY — Shopify theme

Custom Online Store 2.0 theme (Liquid + JSON templates + sections/blocks) built
from scratch to match the static "Blacksite" design 1:1. No Dawn/Debut base,
no page-builder apps.

## Upload it to Shopify

**Option A — Shopify CLI (recommended)**
```
npm install -g @shopify/cli
shopify theme dev --store your-store.myshopify.com     # live preview
shopify theme push --store your-store.myshopify.com    # publish
```
Run these from this folder (the folder containing `layout/`, `templates/`, etc.).

**Option B — Admin upload**
Zip the *contents* of this folder (not the folder itself — `layout/`,
`templates/`, `sections/`, `snippets/`, `config/`, `locales/`, `assets/` must
be at the root of the zip) and upload it in Shopify Admin →
Online Store → Themes → Add theme → Upload zip.

## One-time setup after upload

1. **Products** — create two products in Admin → Products:
   - **Explosive Athlete** — add one option named `Level` with values
     `JR`, `U17`, `U19`, `PRO`, `ELITE`, and set each variant's price to
     €50 / €60 / €65 / €70 / €75. Turn off "This product requires shipping"
     and don't track inventory (digital, lifetime access). Assign the
     **`product.explosive-athlete`** template to it (Admin → product →
     Theme template dropdown).
   - **Athletic Remodeling** — single variant, €399, **track inventory**
     and set available quantity to your cohort size (10–20, default 15).
     Assign the **`product.athletic-remodeling`** template.
   - The variant option values in Admin must exactly match the
     `level_value` set on each block in the theme editor's "Price levels"
     section (Explosive Athlete product page) — that's what ties the
     displayed price/features card to the real Shopify variant.
2. **Pages** — create Shopify pages for Method, Results, About, Apply and
   Online Coaching, and assign templates `page.method`, `page.results`,
   `page.about`, `page.apply`, `page.online-coaching` respectively.
3. **Notifications** — Settings → Notifications → set the customer/staff
   notification email to `info@iwinmyway.com` so the Apply form's native
   Shopify contact submissions (the backup copy) land there.
4. **Klaviyo** — install the Klaviyo: Email Marketing & SMS app, then in
   Theme settings → Lead capture (Klaviyo) paste your public API key
   (company ID) and, if you want the marketing-consent checkbox to add
   people to a list, the list ID. No secret key is ever used in the theme.
5. **Digital delivery (Explosive Athlete)** — install the free Digital
   Downloads app and attach the unlisted-YouTube-playlist PDF/access file
   to each variant.
6. **Subscriptions (Online Coaching)** — install Shopify Subscriptions (or
   Recharge) for the €300+/mo billing you'll send manually after approving
   an application — there's no public add-to-cart for this program by design.
7. **Markets / Translate & Adapt** — enable Shopify Markets and install the
   free Translate & Adapt app to add Serbian storefront copy; the theme's
   own UI strings (buttons, labels, form fields) are already translated in
   `locales/sr.json`. The header's EN/SR switch uses Shopify's real
   `localization` form — it only shows once a second language is added in
   Markets.
8. **Analytics** — install the Meta and Google & YouTube sales channel apps
   for Pixel+CAPI and GA4+Google Ads (native, server-side capable). The
   theme settings' "Analytics & pixels" group only holds a GTM container ID
   for anything extra (e.g. Clarity/Hotjar) — don't duplicate commerce
   events there, to avoid double-counting. TikTok is intentionally left
   out per current scope.
9. **Consent** — turn on Shopify's built-in Customer Privacy banner
   (Settings → Customer privacy) for GDPR/EU consent; native pixel apps
   respect it automatically.

## Structure

```
layout/theme.liquid          — <head>, fonts, GTM hook, global CSS vars from settings
sections/                    — header, footer, home sections, page-hero, product
                                sections (price-levels, cohort, tracks…), apply-form
snippets/                    — button, section-head, media-placeholder, icon-arrow, meta-social
templates/                   — index, page.*, product.*, product/collection/cart/404 fallbacks
config/                      — settings_schema.json (colors, fonts, contact, Klaviyo, pixels)
locales/                     — en.default.json, sr.json (fixed theme UI strings)
assets/                      — theme.css (full design system), theme.js, logos
```

Every section exposes its copy/stats/prices through `{% schema %}` settings
and blocks, so the client can edit everything in the Theme Editor without
touching code. Passed `shopify theme check` with zero offenses.
