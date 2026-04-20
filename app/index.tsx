import { Redirect } from "expo-router";
import { View, Text } from "react-native";
import { useAuthStore } from "../store/auth";

export default function Index() {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return user ? <Redirect href="/(tabs)/calendar" /> : <Redirect href="/login" />;
}