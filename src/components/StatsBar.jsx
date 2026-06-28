const RARE_LEVELS = [
  "Rare Ultra", "Illustration Rare", "Special Illustration Rare",
  "Rare Holo EX", "Rare Holo V", "Rare Rainbow",
];

export default function StatsBar({ collection }) {
  const sets = new Set(collection.map((c) => c.set)).size;
  const rares = collection.filter((c) => RARE_LEVELS.includes(c.rarity)).length;

  const typeCounts = {};
  collection.forEach((c) => {
    (c.types ?? []).forEach((t) => {
      typeCounts[t] = (typeCounts[t] ?? 0) + 1;
    });
  });
  const topType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="stats-row" aria-label="Collection summary">
      <div className="stat-chip">
        <strong>{collection.length}</strong> cards
      </div>
      <div className="stat-chip">
        <strong>{sets}</strong> sets
      </div>
      <div className="stat-chip">
        <strong>{rares}</strong> rares+
      </div>
      {topType && (
        <div className="stat-chip">
          Top type: <strong>{topType[0]}</strong>
        </div>
      )}
    </div>
  );
}
