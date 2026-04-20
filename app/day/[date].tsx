import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput, Button } from "react-native";
import { db } from "../../db";
import { parseMealText, parseWorkoutText } from "../../lib/parser";
import MealForm from "../../components/MealForm";
import WorkoutForm from "../../components/WorkoutForm";
import EntryList from "../../components/EntryList";
import StatsCard from "../../components/StatsCard";
import { useThemeStore } from "../../store/theme"; // adjust path


export default function DayScreen() {

const theme = useThemeStore((s) => s.theme);
const bg = theme === "dark" ? "#111" : "#fff";
const text = theme === "dark" ? "#fff" : "#000";
const card = theme === "dark" ? "#222" : "#f5f5f5";
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
    const mealRows = db.getAllSync("SELECT * FROM meal_entries WHERE date = ?", [date]);
    const workoutRows = db.getAllSync("SELECT * FROM workout_entries WHERE date = ?", [date]);
    const waterRows = db.getAllSync("SELECT * FROM water_entries WHERE date = ?", [date]);
    const weightRows = db.getAllSync("SELECT * FROM body_weight_entries WHERE date = ?", [date]);

    setWeightEntries(weightRows as any[]);
    setMeals(mealRows as any[]);
    setWorkouts(workoutRows as any[]);
    setWaterEntries(waterRows as any[]);
  };

  useEffect(() => {
    loadData();
  }, [date]);

  const addWeight = () => {
    if (!dailyWeight.trim()) {
      alert("Enter weight");
      return;
    }

    db.runSync(
      `INSERT INTO body_weight_entries (date, weight) VALUES (?, ?)`,
      [date, Number(dailyWeight || 0)]
    );

    setDailyWeight("");
    loadData();
  };

  const deleteWeight = (id: number) => {
    db.runSync("DELETE FROM body_weight_entries WHERE id = ?", [id]);
    loadData();
  };




  const addMeal = () => {
    if (!mealName.trim()) {
      alert("Enter a food name");
      return;
    }

    db.runSync(
      `INSERT INTO meal_entries (date, meal_type, name, calories, protein, carbs, fats)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        date,
        mealType,
        mealName.trim(),
        Number(calories || 0),
        Number(protein || 0),
        Number(carbs || 0),
        Number(fats || 0),
      ]
    );

    setMealName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFats("");
    loadData();
  };

  const addWater = () => {
    if (!waterAmount.trim()) {
      alert("Enter water amount");
      return;
    }

    db.runSync(
      `INSERT INTO water_entries (date, amount_ml) VALUES (?, ?)`,
      [date, Number(waterAmount || 0)]
    );

    setWaterAmount("");
    loadData();
  };

  const addWorkout = () => {
    if (!exercise.trim()) {
      alert("Enter an exercise name");
      return;
    }

    db.runSync(
      `INSERT INTO workout_entries (date, exercise_name, sets, reps, weight, duration_minutes, estimated_calories_burned, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        date,
        exercise.trim(),
        Number(sets || 0),
        Number(reps || 0),
        Number(weight || 0),
        Number(duration || 0),
        Number(estimatedCaloriesBurned || 0),
        notes.trim(),
      ]
    );

    setExercise("");
    setSets("");
    setReps("");
    setWeight("");
    setDuration("");
    setEstimatedCaloriesBurned("");
    setNotes("");
    loadData();
  };

  const deleteMeal = (id: number) => {
    db.runSync("DELETE FROM meal_entries WHERE id = ?", [id]);
    loadData();
  };

  const deleteWorkout = (id: number) => {
    db.runSync("DELETE FROM workout_entries WHERE id = ?", [id]);
    loadData();
  };

  const deleteWater = (id: number) => {
    db.runSync("DELETE FROM water_entries WHERE id = ?", [id]);
    loadData();
  };

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

  const totalCaloriesIn = meals.reduce((sum, m) => sum + Number(m.calories || 0), 0);
  const totalCaloriesOut = workouts.reduce(
    (sum, w) => sum + Number(w.estimated_calories_burned || 0),
    0
  );
  const totalProtein = meals.reduce((sum, m) => sum + Number(m.protein || 0), 0);
  const totalCarbs = meals.reduce((sum, m) => sum + Number(m.carbs || 0), 0);
  const totalFats = meals.reduce((sum, m) => sum + Number(m.fats || 0), 0);
  const totalWater = waterEntries.reduce((sum, w) => sum + Number(w.amount_ml || 0), 0);

  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 60 }}>
      <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 16 }}>{date}</Text>

      <View style={{ flexDirection: "row", gap: 8, marginBottom: 20 }}>
        <Pressable onPress={() => setTab("meals")} style={{ padding: 10, borderWidth: 1 }}>
          <Text>Meals</Text>
        </Pressable>
        <Pressable onPress={() => setTab("workouts")} style={{ padding: 10, borderWidth: 1 }}>
          <Text>Workouts</Text>
        </Pressable>
        <Pressable onPress={() => setTab("stats")} style={{ padding: 10, borderWidth: 1 }}>
          <Text>Stats</Text>
        </Pressable>
      </View>

      {tab === "meals" && (
        <>
          <MealForm
            mealType={mealType}
            setMealType={setMealType}
            mealName={mealName}
            setMealName={setMealName}
            calories={calories}
            setCalories={setCalories}
            protein={protein}
            setProtein={setProtein}
            carbs={carbs}
            setCarbs={setCarbs}
            fats={fats}
            setFats={setFats}
            water={""}
            setWater={() => { }}
            onAutofill={autofillMealFromText}
            onAddMeal={addMeal}
          />

          <EntryList type="meals" items={meals} onDelete={deleteMeal} />

          <View style={{ marginTop: 20, gap: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Water</Text>
            <TextInput
              placeholder="Water amount ml"
              value={waterAmount}
              onChangeText={setWaterAmount}
              keyboardType="numeric"
              style={{ borderWidth: 1, padding: 10 }}
            />
            <Button title="Add Water" onPress={addWater} />
            <EntryList type="water" items={waterEntries} onDelete={deleteWater} />
          </View>
        </>
      )}

      {tab === "workouts" && (
        <>
          <WorkoutForm
            exercise={exercise}
            setExercise={setExercise}
            sets={sets}
            setSets={setSets}
            reps={reps}
            setReps={setReps}
            weight={weight}
            setWeight={setWeight}
            duration={duration}
            setDuration={setDuration}
            estimatedCaloriesBurned={estimatedCaloriesBurned}
            setEstimatedCaloriesBurned={setEstimatedCaloriesBurned}
            notes={notes}
            setNotes={setNotes}
            onAutofill={autofillWorkoutFromText}
            onAddWorkout={addWorkout}
          />
          <EntryList type="workouts" items={workouts} onDelete={deleteWorkout} />
        </>
      )}

      {tab === "stats" && (
        <>
          <StatsCard
            totalCaloriesIn={totalCaloriesIn}
            totalCaloriesOut={totalCaloriesOut}
            totalProtein={totalProtein}
            totalCarbs={totalCarbs}
            totalFats={totalFats}
            totalWater={totalWater}
            latestWeight={latestWeight}
          />

          <View style={{ marginBottom: 20, gap: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Daily Weight</Text>
            <TextInput
              placeholder="Weight"
              value={dailyWeight}
              onChangeText={setDailyWeight}
              keyboardType="numeric"
              style={{ borderWidth: 1, padding: 10 }}
            />
            <Button title="Add Weight" onPress={addWeight} />

            <EntryList type="weight" items={weightEntries} onDelete={deleteWeight} />
          </View>
        </>

      )}
    </ScrollView>
  );
}