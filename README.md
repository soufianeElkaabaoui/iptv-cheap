# IPTV project

Next.js App Router project. The Stage 1 scaffold is approved; the first Stage 3
implementation is the responsive multilingual header. The reference-based homepage
hero is now implemented on its own branch for review. Other sections remain
placeholders; no real articles, package pricing, or payment flow is published.
The public GitHub baseline is [soufianeElkaabaoui/iptv-cheap](https://github.com/soufianeElkaabaoui/iptv-cheap),
on branch `main`. Stage 3 begins with one requested section at a time.

## Run in WSL2

Docker Desktop must be running with this WSL distribution integrated. Run as the
local user who owns this folder, without sudo. Node/npm on the host are optional.

```sh
./scripts/docker run --rm --no-deps web npm ci
# Copy .env.example to .env.local and fill confirmed local details.
./scripts/docker up -d
./scripts/docker logs -f web
```

Open http://localhost:3000 (redirects to `/fr`). Also available: `/ar`, `/en`,
`/{locale}/blog`, and `/{locale}/blog/{slug}`. Every article slug currently returns
404. French is a reversible default in `src/i18n/config.ts`; Arabic uses RTL.
The empty blog accepts page 1; invalid/out-of-range pages return 404.

```sh
./scripts/docker run --rm --no-deps web npm run lint
./scripts/docker run --rm --no-deps web npm run typecheck
./scripts/docker run --rm --no-deps web npm run build
./scripts/verify-ownership
./scripts/docker down
```

Build output is `.next-build`; development output is `.next`, allowing independent
builds. To inspect the production build, stop development and run:
`./scripts/docker run --rm --service-ports web npm run start -- --hostname 0.0.0.0`.
Use `./scripts/docker exec -T web …` for commands in the running container. Always
use the launcher for installs, development, builds, and one-off commands.

## Structure

- `src/app/[locale]`: localized layout, homepage, blog, article template, 404.
- `src/app/{sitemap,robots}.ts`: native discovery conventions.
- `src/components/{layout,ui,sections/home,seo}`: shells and future components.
- `src/content/blog`: typed, empty published-content collection.
- `src/config`: centralized site, packages, and WhatsApp configuration.
- `src/i18n`: typed locale settings and minimal interface dictionaries.
- `src/lib`: metadata and WhatsApp URL utilities.
- `public/assets/{images,icons,fonts}`: reserved asset directories.
- `docs`: [ownership](docs/docker-ownership.md), [GSAP pattern](docs/gsap.md),
  and [verification record](docs/stage-1-verification.md).

Native Metadata API owns titles, descriptions, canonicals, language alternates,
and social metadata. `next-seo` is used only for server-rendered JSON-LD. There
are no JSON-LD article records until real content exists. Canonicals/social URLs
are omitted until a confirmed production origin is provided. Stage 1 always
uses noindex, blocks crawlers, and returns an empty sitemap. Enable indexing only
after content and launch approval. The production origin and commercial details
remain unset. Configure the brand and WhatsApp number locally.

Package definitions and package-specific WhatsApp templates remain empty/unset.
Set SITE_NAME and WHATSAPP_NUMBER in the ignored `.env.local` file. The tracked
example leaves both blank; source code contains no business-value defaults.
The header uses a general inquiry in the selected language. Without local values,
it shows the neutral IPTV label and disables contact. After changing environment
values, recreate the development service with `./scripts/docker up -d`.
These values stay out of Git, but are visible to visitors when rendered by the site.

TypeScript 6 and ESLint 9 are the newest stable versions accepted by the bundled
Next lint plugins; newer majors currently violate their peer constraints.

Dependencies have exact versions and `package-lock.json`; use `npm ci` for a clean
install. Node 24 LTS is pinned by image digest. Machine IDs are detected, never
committed. No remote repository or push belongs to Stage 1.

## Header review

The header was reviewed and approved by the user on `feat/header`.
Every Stage 3 task uses a separate branch and pull request after user approval;
merging requires explicit authorization. See AGENTS.md. The header links to Home and
Blog. Future homepage anchors are added when their sections exist. Language
switching keeps the homepage/blog context and resets blog pagination; article
routes switch to the target language's blog listing until article translations
are implemented. A native mobile disclosure works without JavaScript; GSAP
enhances only opening motion and respects reduced-motion preferences.

Header behavior and verification: [review notes](docs/header-review.md).

## Hero review

The hero was reviewed and approved for a dedicated pull request from `feat/hero`,
based on the merged header. Merging requires explicit authorization.
It follows the user's uploaded layout: a dark featured panel,
featured artwork, side-aligned copy, and a selectable thumbnail strip. The dark
panel now fills the viewport width, using the approved teal/stone palette with
no pale blue framing. Four small WebP artwork crops come from the supplied video.
They are decorative themes, not published movie records or availability claims.

Narrow screens give the artwork a bounded area above the copy so the main subject
stays recognizable. Short landscape screens contain the full image; the desktop
composition keeps its background artwork behind the introduction.

The content and contact link render on the server. A small client component
adds manual artwork selection, native button/keyboard access, and scoped GSAP
motion. Reduced motion skips animation; without JavaScript, the first backdrop
and working contact link remain visible with static thumbnails. No autoplay,
video download, scroll pinning, payment flow, or catalog browsing is added.

The header becomes transparent over the hero and returns to its approved white
surface after the hero passes beneath it. Blog routes keep the original header
appearance, and without JavaScript the white header remains usable everywhere.

Behavior, asset provenance, and verification: [hero review notes](docs/hero-review.md).
