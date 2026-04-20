import { db } from "../db";

export function saveNutritionResult(
  query: string,
  name: string,
  calories: number,
  protein: number,
  carbs: number,
  fats: number
) {
  db.runSync(
    `INSERT INTO nutrition_cache (query, name, calories, protein, carbs, fats)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [query, name, calories, protein, carbs, fats]
  );
}

export function getCachedNutrition(query: string) {
  return db.getAllSync(
    `SELECT * FROM nutrition_cache WHERE query LIKE ? ORDER BY id DESC LIMIT 10`,
    [`%${query}%`]
  );
}