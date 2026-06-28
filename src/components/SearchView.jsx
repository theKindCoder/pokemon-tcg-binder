import { useState } from "react";
import SearchResultRow from "./SearchResultRow";
import { searchCards } from "../utils/api";

export default function SearchView({ collection, onAdd }) {
  const [query, setQuery] = useState("");
  const [rarity, setRarity] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "done" | "error"
  const [errorMsg, setErrorMsg] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  async function handleSearch(targetPage = 1) {
    const q = query.trim();
    if (!q) return;

    setStatus("loading");
    setResults([]);
    setErrorMsg("");
    setPage(targetPage);

    try {
      const { cards, totalCount: nextTotalCount } = await searchCards(q, 12, targetPage, rarity);
      setResults(cards);
      setTotalCount(nextTotalCount);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message ?? "Something went wrong. Try again.");
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch(1);
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / 12));

  return (
    <div>
      <div className="search-row">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search by card name (e.g. Charizard, Pikachu VMAX…)"
          aria-label="Search for a Pokémon card"
        />
        <select
          value={rarity}
          onChange={(e) => setRarity(e.target.value)}
          aria-label="Filter by rarity"
        >
          <option value="">Any rarity</option>
          <option value="Common">Common</option>
          <option value="Uncommon">Uncommon</option>
          <option value="Rare">Rare</option>
          <option value="Rare Holo">Rare Holo</option>
          <option value="Rare Holo EX">Rare Holo EX</option>
          <option value="Rare Ultra">Rare Ultra</option>
          <option value="Illustration Rare">Illustration Rare</option>
          <option value="Special Illustration Rare">Special Illustration Rare</option>
        </select>
        <button onClick={() => handleSearch(1)} disabled={status === "loading"}>
          Search
        </button>
      </div>

      {status === "loading" && (
        <p className="status-msg">Searching the Pokémon TCG API…</p>
      )}
      {status === "error" && (
        <p className="error-msg">{errorMsg}</p>
      )}
      {status === "done" && results.length === 0 && (
        <p className="status-msg">No cards found for "{query}". Try a different name.</p>
      )}
      {status === "done" && results.length > 0 && (
        <>
          <p className="section-label">
            {totalCount} result{totalCount !== 1 ? "s" : ""} · page {page} of {totalPages}
          </p>

          {totalPages > 1 && (
            <div className="search-row" style={{ marginBottom: "1rem" }}>
              <button
                onClick={() => handleSearch(page - 1)}
                disabled={page <= 1 || status === "loading"}
              >
                Previous
              </button>
              <span style={{ margin: "0 0.75rem" }}>Page {page} of {totalPages}</span>
              <button
                onClick={() => handleSearch(page + 1)}
                disabled={page >= totalPages || status === "loading"}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      <div className="search-results">
        {results.map((card) => (
          <SearchResultRow
            key={card.id}
            card={card}
            inBinder={collection.some((c) => c.id === card.id)}
            onAdd={onAdd}
          />
        ))}
      </div>
    </div>
  );
}
