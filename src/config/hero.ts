export const heroArtworkIds = ["adventure", "animation", "family", "action"] as const;
export type HeroArtworkId = typeof heroArtworkIds[number];

// Decorative artwork cropped from the user's supplied layout reference.
// These are visual themes, not published catalog entries or availability claims.
export const heroArtwork: readonly { id: HeroArtworkId; image: string }[] = heroArtworkIds.map(id => ({
  id, image: `/assets/images/hero-showcase/${id}.webp`,
}));
