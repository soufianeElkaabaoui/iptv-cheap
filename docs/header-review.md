# Header review — Stage 3

Branch: `feat/header`. Base commit: `20da7dd`. The user reviewed and approved
the header, including local environment configuration, and requested a pull
request for each Stage 3 task. This task is submitted from its dedicated branch;
merging requires explicit user authorization. AGENTS.md records these rules.
Only the header is implemented.

## Delivered behavior

- White sticky header with a teal accent, generic TV icon, and confirmed brand
  name supplied by the ignored `.env.local` file. Home and Blog are the current
  working destinations.
- WhatsApp contact supplied by `.env.local`, with a localized general inquiry
  in Arabic, French, or English. Package-specific messages remain unset.
- Language controls preserve Home/Blog context; pagination resets on a language
  change. Article routes go to the target language's blog until translations
  are implemented. No links point to unbuilt homepage sections.
- Desktop navigation and a native mobile disclosure below 1024 CSS pixels.
  Enter/Space toggle the disclosure. Escape closes it and restores focus.
  Outside clicks and link navigation close it. Resizing to desktop preserves
  visible keyboard focus. The skip link moves focus below the sticky header.
- Server layout, branding, and contact rendering; a small client navigation
  component handles current-route state and the disclosure enhancement.
- Scoped useGSAP opening motion only on mobile with no reduced-motion preference.
  Listeners, matchMedia, and animations are reverted on cleanup. Content remains
  available without JavaScript. No extra animation plugins or app dependencies.

## Verification

- Local business values are stored only in ignored `.env.local`; all files
  eligible for Git were checked for accidental inclusion. All three localized
  previews still render the configured brand and contact link.

- Zero-warning lint, strict TypeScript, and final production build passed.
- Chromium checks passed at 320, 390, 768, 1024, and 1440 CSS pixels, including
  all three locales, correct active links, contact number/prefilled messages,
  language changes, no horizontal overflow, native keyboard opening, Escape,
  outside clicks, rapid toggles, resize focus restoration, and runtime errors.
- Reduced-motion startup and preference changes while a menu is open passed.
- JavaScript-disabled mobile and desktop navigation/contact checks passed.
- Header axe checks for WCAG A/AA rules passed on desktop in each locale and
  mobile, including Arabic. Automated checks do not replace manual review.
- Localhost checks preserved unknown-article and invalid-pagination HTTP 404s.
- Ownership probe and full project scan passed as soufiane:soufiane (1000:1000),
  including generated outputs, test caches, and Git data. Probe files removed.
- package.json, package-lock.json, Compose, and Next configuration are unchanged.
- Browser tooling and preview images are in the ignored .cache directory.
  Browser checks used the actual localhost origin; no development-origin
  allowlist changes were required. See [Next's origin configuration](https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins).
- No Lighthouse score was measured or claimed.

## Preview

French: http://localhost:3000/fr
Arabic: http://localhost:3000/ar
English: http://localhost:3000/en

The header is approved. The remaining homepage and Footer are still placeholders.
Wait for the next requested section before continuing Stage 3.
