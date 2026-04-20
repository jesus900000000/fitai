import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useThemeStore } from "../store/theme"; // adjust path




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
  const bg = theme === "dark" ? "#111" : "#fff";
  const text = theme === "dark" ? "#fff" : "#000";
  const card = theme === "dark" ? "#222" : "#f5f5f5";
  return (
    <View style={{ gap: 20 }}>
      <Text>Calories In: {totalCaloriesIn}</Text>
      <Text>Calories Out: {totalCaloriesOut}</Text>
      <Text>Net Calories: {totalCaloriesIn - totalCaloriesOut}</Text>
      <Text>Protein: {totalProtein}g</Text>
      <Text>Carbs: {totalCarbs}g</Text>
      <Text>Fats: {totalFats}g</Text>
      <Text>Water: {totalWater}ml</Text>
      <Text>Weight: {latestWeight || 0}</Text>

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
        width={Dimensions.get("window").width - 40}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
          labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
        }}
        bezier
      />
    </View>
  );
}