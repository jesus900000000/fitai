import { View, Text, TextInput, Pressable, Button } from "react-native";
import { useThemeStore } from "../store/theme";
import { Colors } from "../constants/theme";

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
  const colors = theme === "dark" ? Colors.dark : Colors.light;

  return (
    <View
      style={{
        gap: 10,
        backgroundColor: colors.card,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 14,
      }}
    >
      <Text style={{ color: colors.text, fontSize: 18, fontWeight: "bold", textAlign: "center"}}>
        Add Meal
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
        {["breakfast", "lunch", "dinner", "snack"].map((type) => {
          const selected = mealType === type;

          return (
            <Pressable
              key={type}
              onPress={() => setMealType(type)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderWidth: 1,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: selected ? colors.primary : colors.background,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: selected ? "#FFFFFF" : colors.text,
                  fontWeight: "600",
                  textTransform: "capitalize",
                }}
              >
                {type}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <TextInput
        placeholder="Food name"
        placeholderTextColor={colors.textMuted}
        value={mealName}
        onChangeText={setMealName}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.background,
          color: colors.text,
          padding: 12,
          borderRadius: 12,
        }}
      />

      <TextInput
        placeholder="Calories"
        placeholderTextColor={colors.textMuted}
        value={calories}
        onChangeText={setCalories}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.background,
          color: colors.text,
          padding: 12,
          borderRadius: 12,
        }}
      />

      <TextInput
        placeholder="Protein"
        placeholderTextColor={colors.textMuted}
        value={protein}
        onChangeText={setProtein}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.background,
          color: colors.text,
          padding: 12,
          borderRadius: 12,
        }}
      />

      <TextInput
        placeholder="Carbs"
        placeholderTextColor={colors.textMuted}
        value={carbs}
        onChangeText={setCarbs}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.background,
          color: colors.text,
          padding: 12,
          borderRadius: 12,
        }}
      />

      <TextInput
        placeholder="Fats"
        placeholderTextColor={colors.textMuted}
        value={fats}
        onChangeText={setFats}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.background,
          color: colors.text,
          padding: 12,
          borderRadius: 12,
        }}
      />

      <View style={{ gap: 10, marginTop: 4 }}>
        <Button title="Future AI Voice Input" onPress={onAutofill} />
        <Button title="Add Meal" onPress={onAddMeal} />
      </View>
    </View>
  );
}