import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useThemeStore } from "../store/theme";
import { Colors } from "../constants/theme";

type Props = {
  totalCaloriesIn: number;
  totalCaloriesOut: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  totalWater: number;
  latestWeight: number;
};

export default function StatsCard({
  totalCaloriesIn,
  totalCaloriesOut,
  totalProtein,
  totalCarbs,
  totalFats,
  totalWater,
  latestWeight,
}: Props) {
  const theme = useThemeStore((s) => s.theme);
  const colors = theme === "dark" ? Colors.dark : Colors.light;

  return (
    <View
      style={{
        gap: 20,
        backgroundColor: colors.card,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
        marginBottom: 20,
      }}
    >
      <Text style={{ color: colors.text, fontSize: 18, fontWeight: "bold", textAlign: "center"}}>
        Daily Stats
      </Text>

      <View style={{ gap: 8 }}>
        <Text style={{ color: colors.text }}>Calories In: {totalCaloriesIn}</Text>
        <Text style={{ color: colors.text }}>Calories Out: {totalCaloriesOut}</Text>
        <Text style={{ color: colors.text }}>
          Net Calories: {totalCaloriesIn - totalCaloriesOut}
        </Text>
        <Text style={{ color: colors.text }}>Protein: {totalProtein}g</Text>
        <Text style={{ color: colors.text }}>Carbs: {totalCarbs}g</Text>
        <Text style={{ color: colors.text }}>Fats: {totalFats}g</Text>
        <Text style={{ color: colors.text }}>Water: {totalWater}ml</Text>
        <Text style={{ color: colors.text }}>Weight: {latestWeight || 0}</Text>
      </View>

      <LineChart
        data={{
          labels: ["In", "Out", "Pro", "Carb", "Fat", "Wt"],
          datasets: [
            {
              data: [
                totalCaloriesIn,
                totalCaloriesOut,
                totalProtein,
                totalCarbs,
                totalFats,
                latestWeight,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width - 72}
        height={220}
        fromZero
        bezier
        style={{
          borderRadius: 16,
        }}
        chartConfig={{
          backgroundColor: colors.card,
          backgroundGradientFrom: colors.card,
          backgroundGradientTo: colors.card,
          decimalPlaces: 0,
          color: (opacity = 1) => {
            if (theme === "dark") {
              return `rgba(167, 139, 250, ${opacity})`;
            }
            return `rgba(124, 58, 237, ${opacity})`;
          },
          labelColor: (opacity = 1) => {
            if (theme === "dark") {
              return `rgba(243, 244, 246, ${opacity})`;
            }
            return `rgba(17, 24, 39, ${opacity})`;
          },
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: colors.primary,
          },
          propsForBackgroundLines: {
            stroke: colors.border,
            strokeDasharray: "",
          },
        }}
      />
    </View>
  );
}