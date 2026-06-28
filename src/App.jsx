import { useEffect, useState } from "react";
import BinderView from "./components/BinderView";
import SearchView from "./components/SearchView";
import { loadCollection, removeCardFromCollection, saveCard } from "./utils/collectionDb";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("binder");
  const [collection, setCollection] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function init() {
      const cards = await loadCollection();
      setCollection(cards);
      setIsReady(true);
    }

    init();
  }, []);

  async function addCard(card, condition) {
    const alreadyIn = collection.some((c) => c.id === card.id);
    if (alreadyIn) return;

    const normalizedCard = {
      id: card.id,
      name: card.name,
      set: card.set?.name ?? "Unknown",
      number: card.number ?? "?",
      rarity: card.rarity ?? "Unknown",
      types: card.types ?? [],
      image: card.images?.small ?? "",
      condition,
      addedAt: Date.now(),
    };

    await saveCard(normalizedCard);
    setCollection((prev) => [normalizedCard, ...prev]);
  }

  async function removeCard(id) {
    await removeCardFromCollection(id);
    setCollection((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Pokémon TCG binder catalog</h1>
        <p>Search, add, and organize your collection.</p>
      </header>

      <div className="tabs" role="tablist">
        <button
          className={`tab ${activeTab === "binder" ? "active" : ""}`}
          role="tab"
          aria-selected={activeTab === "binder"}
          onClick={() => setActiveTab("binder")}
        >
          My binder
        </button>
        <button
          className={`tab ${activeTab === "search" ? "active" : ""}`}
          role="tab"
          aria-selected={activeTab === "search"}
          onClick={() => setActiveTab("search")}
        >
          Add cards
        </button>
      </div>

      {!isReady ? (
        <p className="status-msg">Loading your binder…</p>
      ) : activeTab === "binder" ? (
        <BinderView collection={collection} onRemove={removeCard} />
      ) : (
        <SearchView collection={collection} onAdd={addCard} />
      )}
    </div>
  );
}
