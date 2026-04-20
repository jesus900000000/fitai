export function parseMealText(text: string) {
  const lower = text.toLowerCase();

  let quantity = 1;
  const quantityMatch = lower.match(/(\d+)/);
  if (quantityMatch) quantity = Number(quantityMatch[1]);

  let food = text;
  if (lower.includes("egg")) food = "boiled egg";

  let meal_type = "snack";
  if (lower.includes("breakfast")) meal_type = "breakfast";
  else if (lower.includes("lunch")) meal_type = "lunch";
  else if (lower.includes("dinner")) meal_type = "dinner";

  if (food === "boiled egg") {
    return {
      meal_type,
      name: `${quantity} boiled egg${quantity > 1 ? "s" : ""}`,
      calories: 78 * quantity,
      protein: 6.3 * quantity,
      carbs: 0.6 * quantity,
      fats: 5.3 * quantity,
    };
  }

  return {
    meal_type,
    name: text,
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  };
}

export function parseWorkoutText(text: string) {
  const lower = text.toLowerCase();

  const setsMatch = lower.match(/(\d+)\s*sets?/);
  const repsMatch = lower.match(/(\d+)\s*reps?/);

  const sets = setsMatch ? Number(setsMatch[1]) : 0;
  const reps = repsMatch ? Number(repsMatch[1]) : 0;

  let exercise_name = text;
  if (lower.includes("bench")) exercise_name = "bench press";

  const estimated_calories_burned =
    sets > 0 && reps > 0 ? Math.round(sets * reps * 0.5) : 0;

  return {
    exercise_name,
    sets,
    reps,
    weight: 0,
    duration_minutes: 0,
    estimated_calories_burned,
    notes: "",
  };
}