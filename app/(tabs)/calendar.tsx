import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { router } from "expo-router";
import { useThemeStore } from "../../store/theme"; // adjust path

export default function CalendarScreen() {

  const theme = useThemeStore((s) => s.theme);
  const bg = theme === "dark" ? "#111" : "#fff";
  const text = theme === "dark" ? "#fff" : "#000";
  const card = theme === "dark" ? "#222" : "#f5f5f5";

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <Calendar
        onDayPress={(day) => {
          router.push(`/day/${day.dateString}`);
        }}
      />
    </View>
  );
}