const BASE_URL = "https://api.pokemontcg.io/v2";

/**
 * Search for cards by name using the Pokémon TCG API.
 *
 * The API is free to use without a key (up to 1,000 requests/day).
 * For higher limits, get a free API key at https://dev.pokemontcg.io
 * and set it in a .env file:
 *
 *   VITE_POKEMON_TCG_API_KEY=your-key-here
 * @param {string} name - Card name to search for
 * @param {number} pageSize - Number of results to return (max 250)
 * @param {number} page - Specific page to request
 * @param {string} rarity - Optional rarity filter
 * @returns {Promise<Object>} Search response with cards and pagination metadata
 */
export async function searchCards(name, pageSize = 12, page = 1, rarity = "") {
  const queryParts = [];
  if (name) {
    queryParts.push(`name:"${name}"`);
  }
  if (rarity) {
    queryParts.push(`rarity:"${rarity}"`);
  }

  const query = queryParts.length ? queryParts.join(" ") : "*";
  const encoded = encodeURIComponent(query);
  const url = `${BASE_URL}/cards?q=${encoded}&pageSize=${pageSize}&page=${page}&orderBy=-set.releaseDate`;

  const headers = {};
  const apiKey = import.meta.env.VITE_POKEMON_TCG_API_KEY;
  if (apiKey) {
    headers["X-Api-Key"] = apiKey;
  }

  const res = await fetch(url, { headers });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return {
    cards: data.data ?? [],
    totalCount: data.totalCount ?? data.count ?? 0,
    page: data.page ?? page,
    pageSize: data.pageSize ?? pageSize,
  };
}

/**
 * Fetch a single card by its ID.
 *
 * @param {string} id - Card ID (e.g. "xy1-1", "swsh1-35")
 * @returns {Promise<Object>} Card object from the API
 */
export async function getCard(id) {
  const headers = {};
  const apiKey = import.meta.env.VITE_POKEMON_TCG_API_KEY;
  if (apiKey) {
    headers["X-Api-Key"] = apiKey;
  }

  const res = await fetch(`${BASE_URL}/cards/${id}`, { headers });

  if (!res.ok) {
    throw new Error(`Card not found: ${id}`);
  }

  const data = await res.json();
  return data.data;
}
