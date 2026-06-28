/**
 * Sample collection used to pre-populate the binder on first load.
 * Replace or extend this with your own cards, or clear it entirely
 * to start with an empty binder.
 *
 * Card IDs follow the Pokémon TCG API format: {setId}-{cardNumber}
 * Full card data is available at https://api.pokemontcg.io/v2/cards/{id}
 */
export const SAMPLE_COLLECTION = [
  {
    id: "swsh1-35",
    name: "Charizard V",
    set: "Sword & Shield",
    number: "35",
    rarity: "Rare Ultra",
    types: ["Fire"],
    image: "https://images.pokemontcg.io/swsh1/35.png",
    condition: "Near Mint",
    addedAt: Date.now() - 86400000 * 3,
  },
  {
    id: "base1-4",
    name: "Charizard",
    set: "Base Set",
    number: "4",
    rarity: "Rare Holo",
    types: ["Fire"],
    image: "https://images.pokemontcg.io/base1/4.png",
    condition: "Excellent",
    addedAt: Date.now() - 86400000 * 7,
  },
  {
    id: "sv3pt5-191",
    name: "Gardevoir ex",
    set: "Paldean Fates",
    number: "191",
    rarity: "Special Illustration Rare",
    types: ["Psychic"],
    image: "https://images.pokemontcg.io/sv3pt5/191.png",
    condition: "Mint",
    addedAt: Date.now() - 86400000 * 1,
  },
  {
    id: "swsh12-160",
    name: "Umbreon VMAX",
    set: "Evolving Skies",
    number: "160",
    rarity: "Rare Ultra",
    types: ["Dark"],
    image: "https://images.pokemontcg.io/swsh12/160.png",
    condition: "Near Mint",
    addedAt: Date.now() - 86400000 * 10,
  },
  {
    id: "sv1-198",
    name: "Miraidon ex",
    set: "Scarlet & Violet",
    number: "198",
    rarity: "Illustration Rare",
    types: ["Electric", "Dragon"],
    image: "https://images.pokemontcg.io/sv1/198.png",
    condition: "Mint",
    addedAt: Date.now() - 86400000 * 2,
  },
  {
    id: "swsh9-186",
    name: "Arceus VSTAR",
    set: "Brilliant Stars",
    number: "186",
    rarity: "Rare Ultra",
    types: ["Colorless"],
    image: "https://images.pokemontcg.io/swsh9/186.png",
    condition: "Near Mint",
    addedAt: Date.now() - 86400000 * 5,
  },
];
