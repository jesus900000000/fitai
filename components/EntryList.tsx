import { View, Text, Button } from "react-native";
import { useThemeStore } from "../store/theme"; // adjust path


type Props = {
  type: "meals" | "workouts" | "water" | "weight";
  items: any[];
  onDelete: (id: number) => void;
};

export default function EntryList({ type, items, onDelete }: Props) {
  const theme = useThemeStore((s) => s.theme);
  const bg = theme === "dark" ? "#111" : "#fff";
  const text = theme === "dark" ? "#fff" : "#000";
  const card = theme === "dark" ? "#222" : "#f5f5f5";
  return (
    <View style={{ gap: 10, marginTop: 16 }}>
      {items.map((item) => (
        <View key={item.id} style={{ borderWidth: 1, padding: 10, gap: 6 }}>
          {type === "meals" && (
            <>
              <Text>{item.meal_type}: {item.name}</Text>
              <Text>
                {item.calories} cal | P {item.protein} C {item.carbs} F {item.fats}
              </Text>
              <Button title="Delete Meal" onPress={() => onDelete(item.id)} />
            </>
          )}

          {type === "workouts" && (
            <>
              <Text>{item.exercise_name}</Text>
              <Text>{item.sets} sets x {item.reps} reps @ {item.weight} lbs</Text>
              <Text>Duration: {item.duration_minutes} min</Text>
              <Text>Burned: {item.estimated_calories_burned} cal</Text>
              <Text>Notes: {item.notes || "None"}</Text>
              <Button title="Delete Workout" onPress={() => onDelete(item.id)} />
            </>
          )}

          {type === "water" && (
            <>
              <Text>{item.amount_ml} ml water</Text>
              <Button title="Delete Water" onPress={() => onDelete(item.id)} />
            </>
          )}

          {type === "weight" && (
            <>
              <Text>{item.weight} lbs</Text>
              <Button title="Delete Weight" onPress={() => onDelete(item.id)} />
            </>
          )}
        </View>
      ))}
    </View>
  );
}