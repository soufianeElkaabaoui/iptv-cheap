# Intended GSAP integration (Stage 3)

`gsap` and official `@gsap/react` are installed. Stage 1 imports neither into
pages and runs no animations. Use the official [React integration guidance](https://gsap.com/resources/React/)
and [matchMedia documentation](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/).

Keep layouts, pages, content, and SEO as Server Components. Add a small
`"use client"` boundary only around the section that needs motion. Register
`useGSAP` and use refs to scope targets. Setup belongs inside the hook; avoid
server-render animation calls. The planned lifecycle skeleton is:

```tsx
"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Inside the future section component:
const scope = useRef<HTMLDivElement>(null);
useGSAP(() => {
  const media = gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)", () => {
    // Only the requested section's future animation is created here.
  }, scope);
  return () => media.revert();
}, { scope, dependencies: [], revertOnUpdate: true });
// Render content normally, with ref={scope} on this section's wrapper.
```

`useGSAP` reverts its scoped context on unmount. Declare meaningful dependencies
and use `revertOnUpdate: true` when setup depends on changing values. Wrap later
animation-producing handlers in `contextSafe`; remove event listeners and clean
up timers explicitly. `matchMedia.revert()` restores state when preferences
change or the component unmounts.

Content and focus targets must be visible and usable without JavaScript or
motion. Do not hide essential content in initial CSS. Reduced motion skips
nonessential animations and retains the same content. Prefer transforms and
opacity, avoid expensive layout animation, and load/register additional plugins
only when a requested section requires them. No page-wide client conversion or
unmeasured Lighthouse claims.

## Implemented header enhancement

The Stage 3 header follows this pattern in HeaderNavigation: scoped useGSAP, a
native details/summary disclosure, contextSafe toggle handling, matchMedia for
mobile/no-preference motion, and explicit tween/listener cleanup. Essential
navigation stays server-rendered and works without JavaScript. Reduced motion
receives the same content without the opening effect.

## Implemented reference-based hero

HeroEntrance keeps the server-rendered copy and contact visible and adds a short,
transform-only entrance. HeroShowcase renders decorative images and thumbnails
on the server, then enhances manual artwork selection after hydration.

Selected images crossfade using CSS with motion-reduce:transition-none. A scoped
useGSAP/matchMedia setup adds a small transform-only desktop artwork settle and reverts
it on selection changes, preference changes, and unmount. No autoplay, timers,
scroll listeners, pinning, global GSAP cleanup, or ScrollTrigger import is needed
for this layout. Inactive artwork and selector focus remain independent.

Below 1024 pixels the artwork has its own bounded area above the copy. These
viewports skip artwork zoom so important parts of the subject remain in frame;
the text entrance and reduced-motion crossfade behavior stay the same.

HeaderSurface uses native IntersectionObserver and ResizeObserver to follow the
hero boundary without continuous scroll handlers or a GSAP plugin. This is a
surface change with no animation. Observers disconnect on route changes/unmount;
the approved white surface remains the server/no-JavaScript fallback.
