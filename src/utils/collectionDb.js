import initSqlJs from "sql.js";
import wasmUrl from "sql.js/dist/sql-wasm.wasm?url";

const DB_STORAGE_KEY = "pokemon-tcg-binder-collection";
const DB_SCHEMA = `
  CREATE TABLE IF NOT EXISTS cards (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    setName TEXT NOT NULL,
    number TEXT NOT NULL,
    rarity TEXT NOT NULL,
    types TEXT NOT NULL,
    image TEXT NOT NULL,
    condition TEXT NOT NULL,
    addedAt INTEGER NOT NULL
  );
`;

let sqlPromise;
let sqlLib;
let dbInstance;

function encodeDb(db) {
  const bytes = db.export();
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function decodeDb(serialized) {
  const binary = atob(serialized);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function persistDb(db) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DB_STORAGE_KEY, encodeDb(db));
  } catch (error) {
    console.warn("Unable to persist collection database", error);
  }
}

export async function getCollectionDb() {
  if (dbInstance) return dbInstance;

  if (!sqlPromise) {
    sqlPromise = initSqlJs({ locateFile: () => wasmUrl }).then((SQL) => {
      sqlLib = SQL;
      const persisted = typeof window !== "undefined" ? window.localStorage.getItem(DB_STORAGE_KEY) : null;

      if (persisted) {
        try {
          const bytes = decodeDb(persisted);
          const restoredDb = new sqlLib.Database(bytes);
          restoredDb.run(DB_SCHEMA);
          dbInstance = restoredDb;
          return restoredDb;
        } catch (error) {
          console.warn("Unable to restore persisted collection database", error);
        }
      }

      const freshDb = new sqlLib.Database();
      freshDb.run(DB_SCHEMA);
      dbInstance = freshDb;
      return freshDb;
    });
  }

  return sqlPromise;
}

export async function loadCollection() {
  const db = await getCollectionDb();
  const rows = db.exec(`
    SELECT id, name, setName, number, rarity, types, image, condition, addedAt
    FROM cards
    ORDER BY addedAt DESC
  `);

  if (!rows.length) return [];

  return rows[0].values.map((row) => ({
    id: row[0],
    name: row[1],
    set: row[2],
    number: row[3],
    rarity: row[4],
    types: JSON.parse(row[5]),
    image: row[6],
    condition: row[7],
    addedAt: row[8],
  }));
}

export async function saveCard(card) {
  const db = await getCollectionDb();
  db.run(
    `
      INSERT OR IGNORE INTO cards (
        id,
        name,
        setName,
        number,
        rarity,
        types,
        image,
        condition,
        addedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      card.id,
      card.name,
      card.set,
      card.number,
      card.rarity,
      JSON.stringify(card.types ?? []),
      card.image,
      card.condition,
      card.addedAt,
    ]
  );
  persistDb(db);
  return card;
}

export async function removeCardFromCollection(id) {
  const db = await getCollectionDb();
  db.run("DELETE FROM cards WHERE id = ?", [id]);
  persistDb(db);
}
