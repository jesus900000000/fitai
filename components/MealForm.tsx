import { View, Text, TextInput, Pressable, Button } from "react-native";
import { useThemeStore } from "../store/theme"; // adjust path


type Props = {
  mealType: string;
  setMealType: (value: string) => void;
  mealName: string;
  setMealName: (value: string) => void;
  calories: string;
  setCalories: (value: string) => void;
  protein: string;
  setProtein: (value: string) => void;
  carbs: string;
  setCarbs: (value: string) => void;
  fats: string;
  setFats: (value: string) => void;
  water: string;
  setWater: (value: string) => void;
  onAutofill: () => void;
  onAddMeal: () => void;
};

export default function MealForm({
  mealType,
  setMealType,
  mealName,
  setMealName,
  calories,
  setCalories,
  protein,
  setProtein,
  carbs,
  setCarbs,
  fats,
  setFats,
  onAutofill,
  onAddMeal,
}: Props) {

const theme = useThemeStore((s) => s.theme);
const bg = theme === "dark" ? "#111" : "#fff";
const text = theme === "dark" ? "#fff" : "#000";
const card = theme === "dark" ? "#222" : "#f5f5f5";

  return (
    <View style={{ gap: 10 }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {["breakfast", "lunch", "dinner", "snack"].map((type) => (
          <Pressable
            key={type}
            onPress={() => setMealType(type)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderWidth: 1,
              backgroundColor: mealType === type ? "#ddd" : "#fff",
            }}
          >
            <Text>{type}</Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        placeholder="Food name"
        value={mealName}
        onChangeText={setMealName}
        style={{ borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="Calories"
        value={calories}
        onChangeText={setCalories}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="Protein"
        value={protein}
        onChangeText={setProtein}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="Carbs"
        value={carbs}
        onChangeText={setCarbs}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="Fats"
        value={fats}
        onChangeText={setFats}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10 }}
      />

      <Button title="Autofill Meal Text" onPress={onAutofill} />
      <Button title="Add Meal" onPress={onAddMeal} />
    </View>
  );
}