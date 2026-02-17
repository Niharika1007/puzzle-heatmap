import { openDB } from "idb"

const DB_NAME = "puzzleDB"
const STORE = "dailyActivity"

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "date" })
      }
    }
  })
}

export async function getAllActivity() {
  const db = await initDB()
  return await db.getAll(STORE)
}

export async function saveActivity(activity) {
  const db = await initDB()

  await db.put(STORE, {
    ...activity,
    synced: false
  })
}

export async function getUnsyncedActivity() {
  const db = await initDB()
  const all = await db.getAll(STORE)
  return all.filter(a => !a.synced)
}

export async function markSynced(date) {
  const db = await initDB()
  const entry = await db.get(STORE, date)

  if (entry) {
    entry.synced = true
    await db.put(STORE, entry)
  }
}
