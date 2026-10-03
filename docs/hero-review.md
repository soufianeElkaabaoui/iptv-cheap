# Hero review — reference layout

Branch: `feat/hero`. Base: merged Header PR #1, commit `497271c`.
The user reviewed and approved the Hero and authorized its commit, push, and
dedicated pull request. Merge requires separate, explicit authorization.
Only the homepage hero is implemented. The header's hero-specific surface is
updated as requested; its navigation and the Footer remain unchanged.

## Delivered behavior

The hero follows the supplied video’s featured-artwork layout, revised to use
the approved teal/stone palette and a dark panel spanning the entire viewport
width. The pale blue framing and outer decorative orbs are removed; the movie
backdrop stays. Side-aligned content, a WhatsApp action, and four selectable
thumbnails remain. The selected thumbnail has a teal border and check mark;
the others are dimmed. Selection changes the backdrop and position indicator
without replacing the service introduction.

- Desktop shows four thumbnails in one row; small screens use a two-column grid.
- Below 1024 pixels the artwork has a bounded area above the copy, preserving
  the primary subject instead of stretching a cover image across the whole Hero.
  Portrait crops favor the subject on the right; short landscape screens contain
  the full image. Lighter image overlays keep the subject recognizable, with
  readable copy on the dark surface below. Artwork height and copy spacing share
  one responsive CSS value, so selection does not move the text or thumbnails.
- Arabic mirrors the copy and directional keyboard navigation. Narrow screens
  use the same image orientation in both directions. At 1024 pixels and above
  the desktop composition, crop, and RTL artwork mirroring remain unchanged.
- Native buttons support click/tap, Enter/Space, Left/Right, and Home/End.
- Scoped GSAP enhances the visible content entrance and desktop artwork settle.
  Narrow screens skip zoom to preserve the subject framing. CSS
  handles the crossfade; reduced motion removes both effects, including when
  the browser preference changes while the page is open.
- No JavaScript: first backdrop, copy, and contact remain server-rendered;
  decorative thumbnails stay visible with their selector buttons disabled.
- With JavaScript, the Header is transparent over the Hero with readable light
  text. It restores the approved white surface when the Hero's bottom passes
  beneath the header; returning to the Hero restores transparency. Header height
  changes and route changes are observed with cleanup. Blog routes retain the
  approved white sticky header; the mobile menu panel stays white in both states.
  A translucent dark gradient on narrow screens keeps navigation readable when
  the brighter artwork scrolls beneath it.
- Without JavaScript, the Header keeps its approved white appearance so it
  remains readable wherever the visitor scrolls. Hero spacing clears the header.
- WhatsApp uses the existing localized inquiry and ignored local configuration.
  Missing contact configuration gives a disabled action with an explanation.
- Manual selection only: no autoplay, video, scroll pinning, fake playback,
  download, sign-in, pricing, ratings, or recommended catalog flows.

## Asset provenance

Four clean artwork crops were extracted from the user-supplied layout-reference
video. The source video was mounted read-only; it was not modified or committed.
Crops exclude the reference’s interface, branding, movie metadata, and embedded
"Trending movies" label. Images are decorative themes, not confirmed available
movies or published catalog records. Use replacement source art when desired.

Only the small WebP crops are included in the app. Extracted inspection frames,
source-processing scripts, and browser captures remain in ignored `.cache`.
Business brand/contact values and API credentials remain outside Git.

## Verification

- Lint, TypeScript, and the production build pass.
- French, Arabic, and English pass browser checks at 320, 390, 768, 1024, and
  1440 pixels: asset loading, layout overflow, contact links, selection, touch
  targets, and full-page automated WCAG accessibility checks.
- Primary subject bounds remain inside the rendered artwork area for every
  image in all locales at 320×740, 430×932, 768×1024, 844×390, and 1023×768.
  Visual inspection confirms recognizable subjects above the copy. Selection
  keeps the Hero height stable; full-page accessibility and overflow checks pass.
  The 1440-pixel desktop crop, composition, and RTL mirroring remain unchanged.
- Every artwork, keyboard/RTL navigation, rapid selection, live motion preference
  changes, navigation/remount, short landscape viewport, skip link, and contact
  keyboard access pass. No browser runtime errors were observed.
- Header checks pass on desktop/mobile in all locales: transparent/white surfaces
  at the Hero boundary, scrolling back, mobile-menu readability and keyboard
  controls in both states, resize, and Blog/Home navigation. Automated header
  accessibility checks pass in both states. Since the homepage currently contains
  only the authorized Hero, scroll-exit checks used temporary browser content,
  removed before navigation; no extra homepage section or spacer is published.
- Desktop/mobile no-JavaScript and reduced-motion checks pass in all locales.
  Actual server rendering with missing business configuration keeps the contact
  action disabled and explanatory in all locales.
- Home/blog routes, unknown-article 404s, and noindex metadata pass. Private
  business values and API keys are absent from Git-eligible files.
- After the build, the container-created file belongs to the intended WSL user
  and group (`soufiane:soufiane`, actual UID/GID `1000:1000`); local editing and
  deletion work without sudo, and the project ownership scan passes.

No Lighthouse score is claimed.

## Preview and review gate

French: http://localhost:3000/fr
Arabic: http://localhost:3000/ar
English: http://localhost:3000/en

The Hero is approved for submission from its dedicated branch. Keep the pull
request unmerged until explicitly authorized. Wait for the next requested
section before continuing Stage 3.
