import {useEffect, useState} from "react";
import {getCard} from "../utils/api";

export default function CardDetailModal({cardId, onClose}) {
  const [card,
    setCard] = useState(null);
  const [loading,
    setLoading] = useState(true);
  const [error,
    setError] = useState(null);

  useEffect(() => {
    async function fetchCardDetails() {
      try {
        setLoading(true);
        setError(null);
        const cardData = await getCard(cardId);
        setCard(cardData);
      } catch (err) {
        setError(err.message || "Failed to load card details");
      } finally {
        setLoading(false);
      }
    }

    fetchCardDetails();
  }, [cardId]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {loading
          ? (
            <div className="modal-loading">Loading card details…</div>
          )
          : error
            ? (
              <div className="modal-error">Error: {error}</div>
            )
            : card
              ? (
                <div className="modal-content">
                  <div className="modal-image-section">
                    {card.images
                      ?.large
                        ? (<img src={card.images.large} alt={card.name} className="modal-card-image"/>)
                        : (
                          <div className="modal-image-fallback">No image available</div>
                        )}
                  </div>

                  <div className="modal-info-section">
                    <h2>{card.name}</h2>

                    <div className="modal-meta">
                      <span className="meta-item">
                        <strong>Set:</strong>
                        {card.set
                          ?.name}
                        #{card.number}
                      </span>
                      {card.rarity && (
                        <span className="meta-item">
                          <strong>Rarity:</strong>
                          {card.rarity}
                        </span>
                      )}
                      {card.hp && (
                        <span className="meta-item">
                          <strong>HP:</strong>
                          {card.hp}
                        </span>
                      )}
                    </div>

                    {card.types && card.types.length > 0 && (
                      <div className="modal-types">
                        <strong>Type:</strong>
                        <div className="types-list">
                          {card
                            .types
                            .map((type, idx) => (
                              <span key={idx} className={`type-badge type-${type}`}>
                                {type}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}

                    {card.attacks
                      ?.length > 0 && (
                        <div className="modal-attacks">
                          <strong>Attacks:</strong>
                          {card
                            .attacks
                            .map((attack, idx) => (
                              <div key={idx} className="attack">
                                <div className="attack-header">
                                  {attack.cost
                                    ?.length > 0 && (
                                      <span className="attack-cost">{attack
                                          .cost
                                          .map((c) => (
                                            <span key={c} className={`type-badge type-${c}`}>
                                              {c}
                                            </span>
                                          ))}</span>
                                    )}
                                  <span className="attack-name">{attack.name}</span>
                                  {attack.damage && <span className="attack-damage">{attack.damage}</span>}
                                </div>
                                {attack.text && <p className="attack-text">{attack.text}</p>}
                              </div>
                            ))}
                        </div>
                      )}

                    {card.abilities
                      ?.length > 0 && (
                        <div className="modal-abilities">
                          <strong>Abilities:</strong>
                          {card
                            .abilities
                            .map((ability, idx) => (
                              <div key={idx} className="ability">
                                <div className="ability-name">{ability.name}</div>
                                {ability.text && <p className="ability-text">{ability.text}</p>}
                              </div>
                            ))}
                        </div>
                      )}

                    {card.weaknesses
                      ?.length > 0 && (
                        <div className="modal-weaknesses">
                          <strong>Weaknesses:</strong>
                          {card
                            .weaknesses
                            .map((w, idx) => (
                              <span key={idx} className={`type-badge type-${w.type}`}>
                                {w.type}
                                {w.value}
                              </span>
                            ))}
                        </div>
                      )}

                    {card.resistances
                      ?.length > 0 && (
                        <div className="modal-resistances">
                          <strong>Resistances:</strong>
                          {card
                            .resistances
                            .map((r, idx) => (
                              <span key={idx} className={`type-badge type-${r.type} resistance`}>
                                {r.type}
                                {r.value}
                              </span>
                            ))}
                        </div>
                      )}

                    {card.retreatCost
                      ?.length > 0 && (
                        <div className="modal-retreat">
                          <strong>Retreat Cost:</strong>
                          <span
                            className={`type-badge type-${card
                            .retreatCost
                            .join(" ")}`}>
                            {card
                              .retreatCost
                              .join(" ")}
                          </span>
                        </div>
                      )}

                    {card.artist && (
                      <div className="modal-artist">
                        <strong>Illustrator:</strong>
                        {card.artist}
                      </div>
                    )}

                    {card.flavorText && (
                      <div className="flavor-text">
                        <strong>Flavor Text:</strong>
                        <p>{card.flavorText}</p>
                      </div>
                    )}
                  </div>
                </div>
              )
              : null}

        {card
          ? (
            <div className="modal-footer">
              <a
                href={card.tcgplayer
                ?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="external-link">
                View on TCGPlayer
              </a>
            </div>
          )
          : null}
      </div>
    </div>
  );
}
