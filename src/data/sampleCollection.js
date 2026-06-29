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
    "data": {
      "id": "swsh1-35",
      "name": "Cinderace",
      "supertype": "Pokémon",
      "subtypes": ["Stage 2"],
      "hp": "170",
      "types": ["Fire"],
      "evolvesFrom": "Raboot",
      "attacks": [
        {
          "name": "Pyro Ball",
          "cost": ["Fire"],
          "convertedEnergyCost": 1,
          "damage": "50",
          "text": "Your opponent's Active Pokémon is now Burned."
        }, {
          "name": "Burning Kick",
          "cost": [
            "Fire", "Fire"
          ],
          "convertedEnergyCost": 2,
          "damage": "160",
          "text": "Discard all Energy from this Pokémon."
        }
      ],
      "weaknesses": [
        {
          "type": "Water",
          "value": "×2"
        }
      ],
      "retreatCost": ["Colorless"],
      "convertedRetreatCost": 1,
      "set": {
        "id": "swsh1",
        "name": "Sword & Shield",
        "series": "Sword & Shield",
        "printedTotal": 202,
        "total": 216,
        "legalities": {
          "unlimited": "Legal",
          "expanded": "Legal"
        },
        "ptcgoCode": "SSH",
        "releaseDate": "2020/02/07",
        "updatedAt": "2020/08/14 09:35:00",
        "images": {
          "symbol": "https://images.pokemontcg.io/swsh1/symbol.png",
          "logo": "https://images.pokemontcg.io/swsh1/logo.png"
        }
      },
      "number": "35",
      "artist": "Naoki Saito",
      "rarity": "Rare Holo",
      "flavorText": "It juggles a pebble with its feet, turning it into a burning soccer ball. Its sh" +
          "ots strike opponents hard and leave them scorched.",
      "nationalPokedexNumbers": [815],
      "legalities": {
        "unlimited": "Legal",
        "expanded": "Legal"
      },
      "regulationMark": "D",
      "images": {
        "small": "https://images.pokemontcg.io/swsh1/35.png",
        "large": "https://images.pokemontcg.io/swsh1/35_hires.png"
      },
      "tcgplayer": {
        "url": "https://prices.pokemontcg.io/tcgplayer/swsh1-35",
        "updatedAt": "2026/06/29",
        "prices": {
          "reverseHolofoil": {
            "low": 0.25,
            "mid": 0.56,
            "high": 2.0,
            "market": 0.51,
            "directLow": 0.5
          },
          "holofoil": {
            "low": 0.24,
            "mid": 0.45,
            "high": 2.49,
            "market": 0.44,
            "directLow": 0.5
          }
        }
      },
      "cardmarket": {
        "url": "https://prices.pokemontcg.io/cardmarket/swsh1-35",
        "updatedAt": "2026/02/24",
        "prices": {
          "averageSellPrice": 0.89,
          "lowPrice": 0.19,
          "trendPrice": 0.72,
          "germanProLow": 0.0,
          "suggestedPrice": 0.0,
          "reverseHoloSell": 0.72,
          "reverseHoloLow": 0.2,
          "reverseHoloTrend": 0.77,
          "lowPriceExPlus": 0.19,
          "avg1": 0.45,
          "avg7": 0.92,
          "avg30": 0.75,
          "reverseHoloAvg1": 0.8,
          "reverseHoloAvg7": 0.67,
          "reverseHoloAvg30": 0.84
        }
      }
    }
  }, {
    id: "base1-4",
    name: "Charizard",
    set: "Base Set",
    number: "4",
    rarity: "Rare Holo",
    types: ["Fire"],
    image: "https://images.pokemontcg.io/base1/4.png",
    condition: "Excellent",
    addedAt: Date.now() - 86400000 * 7
  }, {
    id: "sv3pt5-191",
    name: "Gardevoir ex",
    set: "Paldean Fates",
    number: "191",
    rarity: "Special Illustration Rare",
    types: ["Psychic"],
    image: "https://images.pokemontcg.io/sv3pt5/191.png",
    condition: "Mint",
    addedAt: Date.now() - 86400000 * 1
  }, {
    id: "swsh12-160",
    name: "Umbreon VMAX",
    set: "Evolving Skies",
    number: "160",
    rarity: "Rare Ultra",
    types: ["Dark"],
    image: "https://images.pokemontcg.io/swsh12/160.png",
    condition: "Near Mint",
    addedAt: Date.now() - 86400000 * 10
  }, {
    id: "sv1-198",
    name: "Miraidon ex",
    set: "Scarlet & Violet",
    number: "198",
    rarity: "Illustration Rare",
    types: [
      "Electric", "Dragon"
    ],
    image: "https://images.pokemontcg.io/sv1/198.png",
    condition: "Mint",
    addedAt: Date.now() - 86400000 * 2
  }, {
    id: "swsh9-186",
    name: "Arceus VSTAR",
    set: "Brilliant Stars",
    number: "186",
    rarity: "Rare Ultra",
    types: ["Colorless"],
    image: "https://images.pokemontcg.io/swsh9/186.png",
    condition: "Near Mint",
    addedAt: Date.now() - 86400000 * 5
  }
];
