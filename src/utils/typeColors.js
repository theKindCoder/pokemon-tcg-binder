/**
 * Maps Pokémon TCG energy types to their canonical colors.
 * Used for type badges in search results and card overlays.
 */
const TYPE_COLORS = {
  Fire:       "#F08030",
  Water:      "#6890F0",
  Grass:      "#78C850",
  Psychic:    "#F85888",
  Electric:   "#F8D030",
  Fighting:   "#C03028",
  Dark:       "#705848",
  Metal:      "#B8B8D0",
  Dragon:     "#7038F8",
  Colorless:  "#A8A878",
  Fairy:      "#EE99AC",
  Lightning:  "#F8D030",
};

/**
 * Returns the hex color for a given Pokémon type.
 * Falls back to a neutral gray for unknown types.
 *
 * @param {string} type - Pokémon type name
 * @returns {string} Hex color string
 */
export function typeColor(type) {
  return TYPE_COLORS[type] ?? "#888780";
}

export { TYPE_COLORS };
