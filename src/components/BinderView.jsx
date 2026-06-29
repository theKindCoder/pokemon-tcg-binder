import { useState, useMemo } from "react";
import CardSlot from "./CardSlot";
import CardDetailModal from "./CardDetailModal";
import StatsBar from "./StatsBar";

const CONDITIONS = ["Mint", "Near Mint", "Excellent", "Good", "Played"];
const TYPES = [
  "Fire", "Water", "Grass", "Psychic", "Electric",
  "Fighting", "Dark", "Metal", "Dragon", "Colorless",
];
const RARITIES = [
  "Common", "Uncommon", "Rare", "Rare Holo", "Rare Holo EX",
  "Rare Ultra", "Illustration Rare", "Special Illustration Rare",
];

export default function BinderView({ collection, onRemove }) {
  const [filterType, setFilterType] = useState("");
  const [filterRarity, setFilterRarity] = useState("");
  const [filterCondition, setFilterCondition] = useState("");
  const [sort, setSort] = useState("added");
  const [selectedCard, setSelectedCard] = useState(null);

  const filtered = useMemo(() => {
    let cards = [...collection];
    if (filterType) cards = cards.filter((c) => c.types?.includes(filterType));
    if (filterRarity) cards = cards.filter((c) => c.rarity === filterRarity);
    if (filterCondition) cards = cards.filter((c) => c.condition === filterCondition);
    cards.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "set") return a.set.localeCompare(b.set);
      if (sort === "number") return parseInt(a.number) - parseInt(b.number);
      return b.addedAt - a.addedAt;
    });
    return cards;
  }, [collection, filterType, filterRarity, filterCondition, sort]);

  return (
    <div>
      <StatsBar collection={collection} />

      <div className="filter-row">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} aria-label="Filter by type">
          <option value="">All types</option>
          {TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
        <select value={filterRarity} onChange={(e) => setFilterRarity(e.target.value)} aria-label="Filter by rarity">
          <option value="">All rarities</option>
          {RARITIES.map((r) => <option key={r}>{r}</option>)}
        </select>
        <select value={filterCondition} onChange={(e) => setFilterCondition(e.target.value)} aria-label="Filter by condition">
          <option value="">All conditions</option>
          {CONDITIONS.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort cards">
          <option value="added">Recently added</option>
          <option value="name">Name A–Z</option>
          <option value="set">Set</option>
          <option value="number">Card number</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">No cards match your filters.</p>
      ) : (
        <div className="binder-grid" role="list">
          {filtered.map((card) => (
            <CardSlot
              key={card.id}
              card={card}
              onRemove={onRemove}
              onSelect={setSelectedCard}
            />
          ))}
        </div>
      )}

      {selectedCard && (
        <CardDetailModal
          cardId={selectedCard.id}
          cardApiData={selectedCard.apiData}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
}
