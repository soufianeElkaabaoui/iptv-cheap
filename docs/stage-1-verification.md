# Stage 1 verification — 2026-10-02

## Environment and ownership

- Original folder: empty; no existing project files/instructions overwritten.
- WSL2 kernel: 6.18.40.1-microsoft-standard-WSL2; project on ext4.
- Intended and executing account: soufiane, confirmed via passwd, id, and folder
  ownership. Actual local UID/GID: 1000:1000.
- Docker Desktop 4.93.0; Engine 29.8.1; Compose v5.5.1; default context.
- Docker security: seccomp and cgroupns; no rootless or daemon userns-remap.
- Bootstrap and development container maps: identity UID/GID maps. Application
  UID/GID 1000:1000 (the image labels this numeric account node).
- Initial container-created file: WSL owner soufiane:soufiane (1000:1000).
  Local user edited and deleted it without sudo before dependency installation.
- Repeated probe in the actual development container after installation/build:
  same result. Full ownership scans included source, lockfile, node_modules,
  npm/home caches, .next, and .next-build; no mismatched owner/group found.
- Only the unique probe files were deleted. Hot-reload verification restored the
  original source. No temporary verification files remain.

The default sandbox command runtime initially could not launch. Authorized
outside-sandbox execution successfully ran as the verified non-root WSL user;
this issue was resolved without changing the project ownership model.

## Dependencies and configuration

- Node 24.21.0, npm 11.19.0, image pinned by digest in compose.yaml.
- Next 16.3.8; React/React DOM 19.3.0; Tailwind 4.3.3.
- GSAP 3.15.0; @gsap/react 2.1.2; next-seo 7.3.0.
- TypeScript 6.0.3; ESLint 9.39.5; eslint-config-next 16.3.8.
- Exact direct versions and package-lock.json. Clean npm ci passed.
- Full npm ls --all passed, with no invalid peer dependencies.
- next-seo declares Next >=13.4 and React >=18.2, and its installed server JSON-LD
  component types were verified with TypeScript and the production build.
- TypeScript 7 was rejected by Next's bundled typescript-eslint tooling; ESLint
  10 violates the bundled React, import, and accessibility plugin peer ranges.
  The newest compatible stable majors are pinned. npm warns that ESLint 9 is
  deprecated upstream; track plugin support before upgrading. This is a tooling
  limitation, not a failed scaffold check. No peer overrides/legacy-peer flags.
- Launcher shell syntax and resolved Docker Compose configuration passed.

Sources: [Next installation](https://nextjs.org/docs/app/getting-started/installation),
[Next localization](https://nextjs.org/docs/app/guides/internationalization),
[Tailwind setup](https://tailwindcss.com/docs/installation/framework-guides/nextjs),
[next-seo](https://github.com/garmeeh/next-seo). Versions and peer ranges were also
checked directly against the package registry and installed package types.

## Application checks

- ESLint passed with --max-warnings=0.
- next typegen and tsc --noEmit passed with strict TypeScript.
- Final next build passed; homepage locales are prerendered. Development and
  production build outputs are separated to prevent interference.
- Compose startup/healthcheck passed; development service remains healthy.
- Host access to http://localhost:3000/en passed.
- Hot reload passed: local dictionary edit reached the container-served page,
  then the restored original content appeared without restarting the container.
- / and /blog redirect to /fr and /fr/blog, preserving the routing default.
- /fr, /ar, /en: 200, correct document lang and direction; Arabic dir=rtl.
- Every locale's blog and page=1: 200 with empty published content.
- Every locale's unknown article: HTTP 404.
- Blog page=2, page=0, nonnumeric pages, and duplicate page parameters: HTTP 404.
- Unsupported /xx locale and /fr/unknown-route: HTTP 404.
- Homepages emit noindex/nofollow; no canonical or article JSON-LD is emitted
  without confirmed production/content data.
- /robots.txt: 200, Disallow: /; /sitemap.xml: 200, empty URL set.
- No Lighthouse measurement was performed or score claimed.

## Review state

Local URL: http://localhost:3000 (French default). Arabic: /ar; English: /en.

No blocking issues remain. Business name/description, production origin,
WhatsApp number/templates, packages/prices, social image, and real articles
remain intentionally unset. No complete homepage sections, final design,
marketing copy, or actual animations were implemented. Git/GitHub baseline work
and section implementation have not started. Stage 1 is ready for review.
