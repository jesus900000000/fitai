import { View, Text, TextInput, Button } from "react-native";
import { useThemeStore } from "../store/theme";
import { Colors } from "../constants/theme";

type Props = {
  exercise: string;
  setExercise: (value: string) => void;
  sets: string;
  setSets: (value: string) => void;
  reps: string;
  setReps: (value: string) => void;
  weight: string;
  setWeight: (value: string) => void;
  duration: string;
  setDuration: (value: string) => void;
  estimatedCaloriesBurned: string;
  setEstimatedCaloriesBurned: (value: string) => void;
  notes: string;
  setNotes: (value: string) => void;
  onAutofill: () => void;
  onAddWorkout: () => void;
};

export default function WorkoutForm({
  exercise,
  setExercise,
  sets,
  setSets,
  reps,
  setReps,
  weight,
  setWeight,
  duration,
  setDuration,
  estimatedCaloriesBurned,
  setEstimatedCaloriesBurned,
  notes,
  setNotes,
  onAutofill,
  onAddWorkout,
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
      <Text style={{ color: colors.text, fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
        Add Workout
      </Text>

      <TextInput
        placeholder="Exercise name"
        placeholderTextColor={colors.textMuted}
        value={exercise}
        onChangeText={setExercise}
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
        placeholder="Sets"
        placeholderTextColor={colors.textMuted}
        value={sets}
        onChangeText={setSets}
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
        placeholder="Reps"
        placeholderTextColor={colors.textMuted}
        value={reps}
        onChangeText={setReps}
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
        placeholder="Weight"
        placeholderTextColor={colors.textMuted}
        value={weight}
        onChangeText={setWeight}
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
        placeholder="Duration minutes"
        placeholderTextColor={colors.textMuted}
        value={duration}
        onChangeText={setDuration}
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
        placeholder="Estimated calories burned"
        placeholderTextColor={colors.textMuted}
        value={estimatedCaloriesBurned}
        onChangeText={setEstimatedCaloriesBurned}
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
        placeholder="Notes"
        placeholderTextColor={colors.textMuted}
        value={notes}
        onChangeText={setNotes}
        multiline
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.background,
          color: colors.text,
          padding: 12,
          borderRadius: 12,
          minHeight: 90,
          textAlignVertical: "top",
        }}
      />

      <View style={{ gap: 10, marginTop: 4 }}>
        <Button title="Future AI Voice Input" onPress={onAutofill} />
        <Button title="Add Workout" onPress={onAddWorkout} />
      </View>
    </View>
  );
}