import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { router } from "expo-router";
import { useThemeStore } from "../../store/theme";
import { Colors } from "../../constants/theme";

export default function CalendarScreen() {
  const theme = useThemeStore((s) => s.theme);
  const colors = theme === "dark" ? Colors.dark : Colors.light;

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 20,
        backgroundColor: colors.background,
      }}
    >
      <Calendar
        style={{
          backgroundColor: colors.card,
          borderRadius: 16,
          margin: 12,
          padding: 6,
        }}
        theme={{
          calendarBackground: colors.card,
          backgroundColor: colors.card,
          monthTextColor: colors.text,
          textMonthFontWeight: "700",

          dayTextColor: colors.text,
          textDisabledColor: colors.textMuted,
          textSectionTitleColor: colors.textMuted,

          todayTextColor: colors.primary,
          selectedDayBackgroundColor: colors.primary,
          selectedDayTextColor: "#FFFFFF",

          arrowColor: colors.primary,
          indicatorColor: colors.primary,

          textDayFontWeight: "500",
          textMonthFontWeight: "700",
          textDayHeaderFontWeight: "600",
        }}
        onDayPress={(day) => {
          router.push(`/day/${day.dateString}`);
        }}
      />
    </View>
  );
}