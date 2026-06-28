import { useState } from "react";
import { typeColor } from "../utils/typeColors";

const CONDITIONS = ["Mint", "Near Mint", "Excellent", "Good", "Played"];

export default function SearchResultRow({ card, inBinder, onAdd }) {
  const [condition, setCondition] = useState("Near Mint");
  const [imgError, setImgError] = useState(false);

  return (
    <div className="result-row">
      {imgError || !card.images?.large ? (
        <div className="result-thumb-placeholder" aria-hidden="true" />
      ) : (
        <img
          className="result-thumb"
          src={card.images.large}
          alt={card.name}
          onError={() => setImgError(true)}
        />
      )}

      <div className="result-info">
        <div className="result-name">{card.name}</div>
        <div className="result-meta">
          {card.set?.name ?? "Unknown set"} · #{card.number ?? "?"} · {card.rarity ?? "Unknown"}
        </div>
      </div>

      {card.types && card.types.length > 0 && (
        <span
          className="type-badge"
          style={{
            background: typeColor(card.types[0]) + "22",
            color: typeColor(card.types[0]),
          }}
        >
          {card.types.join(", ")}
        </span>
      )}

      {inBinder ? (
        <span className="in-binder-label">In binder</span>
      ) : (
        <>
          <select
            className="cond-select"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            aria-label={`Condition for ${card.name}`}
          >
            {CONDITIONS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <button
            className="add-btn-sm"
            onClick={() => onAdd(card, condition)}
          >
            + Add
          </button>
        </>
      )}
    </div>
  );
}
