import { db } from "./index";

export function initSettingsTable() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT
    );
  `);
}

export function saveSetting(key: string, value: string) {
  db.runSync(
    `INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)`,
    [key, value]
  );
}

export function getSetting(key: string) {
  const row = db.getFirstSync(
    `SELECT value FROM settings WHERE key = ?`,
    [key]
  ) as { value?: string } | null;

  return row?.value ?? null;
}