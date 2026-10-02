# Project instructions and staged workflow

## Scope and stage gates

Build an IPTV promotional site for Morocco and Europe. Customers select a
confirmed package and contact WhatsApp with a prefilled message; no payment
gateway. Prepare Arabic, French, English, and RTL.

- Stage 1: structure, placeholder routes, shell components, configuration,
  SEO foundations, Docker/ownership setup, documentation, and verification only.
  Stop for user review. Do not build complete sections, final design, marketing
  copy, real articles, or animations.
- Stage 2: only after scaffold acceptance, confirm GitHub repository name, owner,
  and visibility, then create/connect the repository and push the baseline.
  Never create a remote repository or push in Stage 1.
- Stage 3: implement one specifically requested section at a time; include
  responsive behavior, accessibility, and appropriate GSAP motion. Stop for
  feedback before another section.

## Technical requirements

Next.js App Router, strict TypeScript, Tailwind CSS; no SCSS. Server Components
by default, small Client Components only for interaction/animation. Use current
compatible stable dependencies, exact versions, and the npm lockfile. Preserve
existing files and instructions. Resolve routine setup issues autonomously.

GSAP must use official @gsap/react useGSAP with scoped refs and proper cleanup.
Respect prefers-reduced-motion; preserve access without animations; keep pages
server-rendered. Load other plugins only when needed. Follow docs/gsap.md.

Use native Metadata API for titles, descriptions, canonical/language/social
metadata, native sitemap/robots conventions, and next-seo for reusable JSON-LD.
Centralize site/SEO configuration. Publish no invented business details, ratings,
article records, production URLs, authors, or prices. Stage 1 stays unindexed.

## Docker ownership and checks

Identify the intended non-root WSL user and numeric UID/GID before writes;
inspect the filesystem and Docker namespaces. Use ./scripts/docker for ALL
installs, dev, builds, and one-off commands. It detects IDs, pre-creates mount
paths, and passes Compose's application user. Never use a privileged agent's IDs
or assume 1000:1000. See docs/docker-ownership.md for mapping and rootless guards.

Generated source, node_modules, caches, and build outputs must remain editable
and removable by the intended user without sudo. No chmod 777, routine sudo npm,
blanket recursive chown, or reliance on COPY --chown for bind mounts. Repeat the
container-create / host-owner / local-edit-delete check after installs/builds.
Remove only temporary verification artifacts.

Verify lint, TypeScript, production build, Compose startup, routes, and ownership.
Keep secrets, dependencies, outputs, and machine configuration out of Git.
Performance matters; never claim an unmeasured Lighthouse score.

## Current Stage 3 review gate

The user approved this homepage order: hero, what is included, packages/pricing,
compatible devices, how it works, FAQ, and final WhatsApp invitation, with shared
Header and Footer. The first authorized implementation is the Header only.
Add navigation destinations as their sections become available; no dead links.
Do not implement another section before user feedback. Do not commit or push
Stage 3 changes until the user has reviewed and authorized committing them.

## Branch ownership

Every task must have its own separate Git branch. Create or switch to the task
branch before modifying tracked files; never implement a task directly on main
or reuse another task's branch. Preserve existing uncommitted work when moving
it to its task branch. The current header task uses feat/header. This branch
rule does not authorize commits, pushes, or merges; honor the user's review gate.

## Local business configuration

Keep the real brand name and WhatsApp number exclusively in the ignored
.env.local file. Never put them in tracked source, example files, or documentation.
Leave .env.example values blank and use neutral/unconfigured source fallbacks.
The rendered brand and WhatsApp link remain visible to site visitors.

## Stage 3 pull requests

Every Stage 3 task must have its own pull request from its dedicated task branch.
After the user reviews and approves the task, commit the reviewed changes, push
that branch, and open its pull request. Do not combine independent tasks in one
branch or pull request. Keep local business values out of all commits and PR text.
Leave the pull request unmerged until the user explicitly authorizes merging.
