import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput, Button } from "react-native";
import { db } from "../../db";
import { parseMealText, parseWorkoutText } from "../../lib/parser";
import MealForm from "../../components/MealForm";
import WorkoutForm from "../../components/WorkoutForm";
import EntryList from "../../components/EntryList";
import StatsCard from "../../components/StatsCard";
import { useThemeStore } from "../../store/theme";
import { Colors } from "../../constants/theme";

export default function DayScreen() {
  const theme = useThemeStore((s) => s.theme);
  const colors = theme === "dark" ? Colors.dark : Colors.light;

  type TabType = "meals" | "workouts" | "stats";

  const { date } = useLocalSearchParams<{ date: string }>();
  const [tab, setTab] = useState<TabType>("meals");

  const [mealName, setMealName] = useState("");
  const [mealType, setMealType] = useState("breakfast");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");

  const [waterAmount, setWaterAmount] = useState("");

  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [estimatedCaloriesBurned, setEstimatedCaloriesBurned] = useState("");
  const [notes, setNotes] = useState("");

  const [meals, setMeals] = useState<any[]>([]);
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [waterEntries, setWaterEntries] = useState<any[]>([]);

  const [dailyWeight, setDailyWeight] = useState("");
  const [weightEntries, setWeightEntries] = useState<any[]>([]);

  const latestWeight =
    weightEntries.length > 0
      ? Number(weightEntries[weightEntries.length - 1].weight || 0)
      : 0;

  const loadData = () => {
    setMeals(db.getAllSync("SELECT * FROM meal_entries WHERE date = ?", [date]) as any[]);
    setWorkouts(db.getAllSync("SELECT * FROM workout_entries WHERE date = ?", [date]) as any[]);
    setWaterEntries(db.getAllSync("SELECT * FROM water_entries WHERE date = ?", [date]) as any[]);
    setWeightEntries(db.getAllSync("SELECT * FROM body_weight_entries WHERE date = ?", [date]) as any[]);
  };

  useEffect(() => {
    loadData();
  }, [date]);

  const addWeight = () => {
    if (!dailyWeight.trim()) return alert("Enter weight");
    db.runSync(`INSERT INTO body_weight_entries (date, weight) VALUES (?, ?)`, [date, Number(dailyWeight)]);
    setDailyWeight("");
    loadData();
  };

  const deleteWeight = (id: number) => {
    db.runSync("DELETE FROM body_weight_entries WHERE id = ?", [id]);
    loadData();
  };

  const addMeal = () => {
    if (!mealName.trim()) return alert("Enter a food name");

    db.runSync(
      `INSERT INTO meal_entries (date, meal_type, name, calories, protein, carbs, fats)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [date, mealType, mealName.trim(), Number(calories), Number(protein), Number(carbs), Number(fats)]
    );

    setMealName(""); setCalories(""); setProtein(""); setCarbs(""); setFats("");
    loadData();
  };

  const addWater = () => {
    if (!waterAmount.trim()) return alert("Enter water amount");
    db.runSync(`INSERT INTO water_entries (date, amount_ml) VALUES (?, ?)`, [date, Number(waterAmount)]);
    setWaterAmount("");
    loadData();
  };

  const addWorkout = () => {
    if (!exercise.trim()) return alert("Enter an exercise name");

    db.runSync(
      `INSERT INTO workout_entries (date, exercise_name, sets, reps, weight, duration_minutes, estimated_calories_burned, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [date, exercise.trim(), Number(sets), Number(reps), Number(weight), Number(duration), Number(estimatedCaloriesBurned), notes.trim()]
    );

    setExercise(""); setSets(""); setReps(""); setWeight(""); setDuration(""); setEstimatedCaloriesBurned(""); setNotes("");
    loadData();
  };

  const deleteMeal = (id: number) => { db.runSync("DELETE FROM meal_entries WHERE id = ?", [id]); loadData(); };
  const deleteWorkout = (id: number) => { db.runSync("DELETE FROM workout_entries WHERE id = ?", [id]); loadData(); };
  const deleteWater = (id: number) => { db.runSync("DELETE FROM water_entries WHERE id = ?", [id]); loadData(); };

  const autofillMealFromText = () => {
    const parsed = parseMealText(mealName);
    setMealType(parsed.meal_type);
    setMealName(parsed.name);
    setCalories(String(parsed.calories));
    setProtein(String(parsed.protein));
    setCarbs(String(parsed.carbs));
    setFats(String(parsed.fats));
  };

  const autofillWorkoutFromText = () => {
    const parsed = parseWorkoutText(exercise);
    setExercise(parsed.exercise_name);
    setSets(String(parsed.sets));
    setReps(String(parsed.reps));
    setWeight(String(parsed.weight));
    setDuration(String(parsed.duration_minutes));
    setEstimatedCaloriesBurned(String(parsed.estimated_calories_burned));
    setNotes(parsed.notes);
  };


  const parsedDate = new Date(date);

  const dayName = parsedDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const fullDate = parsedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });



  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        paddingTop: 60,
        backgroundColor: colors.background,
        minHeight: "100%",
      }}
    >
      {/* DATE HEADER */}
      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            textAlign: "center",
            color: colors.textMuted,
            fontSize: 16,
            fontWeight: "500",
          }}
        >
          {dayName}
        </Text>

        <Text
          style={{
            textAlign: "center",
            color: colors.text,
            fontSize: 28,
            fontWeight: "bold",
          }}
        >
          {fullDate}
        </Text>
      </View>

      {/* TABS */}
      <View style={{ flexDirection: "row", gap: 8, marginBottom: 20, justifyContent: "center",}}>
        {["meals", "workouts", "stats"].map((t) => (
          <Pressable
            key={t}
            onPress={() => setTab(t as TabType)}
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 10,
              backgroundColor: tab === t ? colors.primary : colors.card,
            }}
          >
            <Text style={{ color: tab === t ? "#fff" : colors.text }}>
              {t.toUpperCase()}
            </Text>
          </Pressable>
        ))}
      </View>

      {tab === "meals" && (
        <>
          <MealForm {...{ mealType, setMealType, mealName, setMealName, calories, setCalories, protein, setProtein, carbs, setCarbs, fats, setFats }} water={""} setWater={() => { }} onAutofill={autofillMealFromText} onAddMeal={addMeal} />

          <EntryList type="meals" items={meals} onDelete={deleteMeal} />

          <View style={{ marginTop: 20, gap: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: colors.text }}>Water</Text>

            <TextInput
              placeholder="Water amount ml"
              placeholderTextColor={colors.textMuted}
              value={waterAmount}
              onChangeText={setWaterAmount}
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                padding: 12,
                borderRadius: 12,
                borderColor: colors.border,
                color: colors.text,
                backgroundColor: colors.card,
              }}
            />

            <Button title="Add Water" onPress={addWater} />
            <EntryList type="water" items={waterEntries} onDelete={deleteWater} />
          </View>
        </>
      )}

      {tab === "workouts" && (
        <>
          <WorkoutForm {...{ exercise, setExercise, sets, setSets, reps, setReps, weight, setWeight, duration, setDuration, estimatedCaloriesBurned, setEstimatedCaloriesBurned, notes, setNotes }} onAutofill={autofillWorkoutFromText} onAddWorkout={addWorkout} />

          <EntryList type="workouts" items={workouts} onDelete={deleteWorkout} />
        </>
      )}

      {tab === "stats" && (
        <>
          <StatsCard
            totalCaloriesIn={meals.reduce((s, m) => s + Number(m.calories || 0), 0)}
            totalCaloriesOut={workouts.reduce((s, w) => s + Number(w.estimated_calories_burned || 0), 0)}
            totalProtein={meals.reduce((s, m) => s + Number(m.protein || 0), 0)}
            totalCarbs={meals.reduce((s, m) => s + Number(m.carbs || 0), 0)}
            totalFats={meals.reduce((s, m) => s + Number(m.fats || 0), 0)}
            totalWater={waterEntries.reduce((s, w) => s + Number(w.amount_ml || 0), 0)}
            latestWeight={latestWeight}
          />

          <View style={{ marginBottom: 20, gap: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: colors.text }}>Daily Weight</Text>

            <TextInput
              placeholder="Weight"
              placeholderTextColor={colors.textMuted}
              value={dailyWeight}
              onChangeText={setDailyWeight}
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                padding: 12,
                borderRadius: 12,
                borderColor: colors.border,
                color: colors.text,
                backgroundColor: colors.card,
              }}
            />

            <Button title="Add Weight" onPress={addWeight} />
            <EntryList type="weight" items={weightEntries} onDelete={deleteWeight} />
          </View>
        </>
      )}
    </ScrollView>
  );
}