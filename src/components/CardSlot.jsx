import { useState } from "react";

export default function CardSlot({ card, onRemove }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="card-slot" role="listitem" title={card.name}>
      {imgError || !card.image ? (
        <div className="card-img-fallback">
          <span className="card-fallback-name">{card.name}</span>
        </div>
      ) : (
        <img
          src={card.image}
          alt={card.name}
          loading="lazy"
          onError={() => setImgError(true)}
        />
      )}

      <span className="condition-badge">{card.condition}</span>

      <div className="card-overlay">
        <div className="card-overlay-name">{card.name}</div>
        <div className="card-overlay-set">
          {card.set} #{card.number}
        </div>
      </div>

      <button
        className="remove-btn"
        onClick={() => onRemove(card.id)}
        aria-label={`Remove ${card.name} from binder`}
      >
        ✕
      </button>
    </div>
  );
}
