# IPTV project — Stage 1

Minimal Next.js App Router scaffold. No finished design, marketing content,
articles, packages, payment flow, or animations. The Stage 1 scaffold is approved.
The public GitHub baseline is [soufianeElkaabaoui/iptv-cheap](https://github.com/soufianeElkaabaoui/iptv-cheap),
on branch `main`. Stage 3 begins with one requested section at a time.

## Run in WSL2

Docker Desktop must be running with this WSL distribution integrated. Run as the
local user who owns this folder, without sudo. Node/npm on the host are optional.

```sh
./scripts/docker run --rm --no-deps web npm ci
# Optional: cp .env.example .env.local, then fill only confirmed details.
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
after content and launch approval. No production domain or business data is set.

Packages and localized WhatsApp templates remain empty/unset. The URL helper
returns `null` until a valid number and approved template are supplied. Values
needed for links are public contact configuration, never secrets.

TypeScript 6 and ESLint 9 are the newest stable versions accepted by the bundled
Next lint plugins; newer majors currently violate their peer constraints.

Dependencies have exact versions and `package-lock.json`; use `npm ci` for a clean
install. Node 24 LTS is pinned by image digest. Machine IDs are detected, never
committed. No remote repository or push belongs to Stage 1.
