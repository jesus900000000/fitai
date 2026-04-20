import { View, TextInput, Button } from "react-native";
import { useThemeStore } from "../store/theme"; // adjust path

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
  const bg = theme === "dark" ? "#111" : "#fff";
  const text = theme === "dark" ? "#fff" : "#000";
  const card = theme === "dark" ? "#222" : "#f5f5f5";

  return (
    <View style={{ gap: 10 }}>
      <TextInput
        placeholder="Exercise name"
        value={exercise}
        onChangeText={setExercise}
        style={{ borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="Sets"
        value={sets}
        onChangeText={setSets}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="Reps"
        value={reps}
        onChangeText={setReps}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="Weight"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="Duration minutes"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="Estimated calories burned"
        value={estimatedCaloriesBurned}
        onChangeText={setEstimatedCaloriesBurned}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        style={{ borderWidth: 1, padding: 10 }}
      />

      <Button title="Autofill Workout Text" onPress={onAutofill} />
      <Button title="Add Workout" onPress={onAddWorkout} />
    </View>
  );
}