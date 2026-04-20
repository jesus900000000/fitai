import { Stack } from "expo-router";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { View } from "react-native";
import { auth } from "../lib/firebase";
import { initDatabase } from "../db";
import { initSettingsTable, getSetting } from "../db/settings";
import { useAuthStore } from "../store/auth";
import { useThemeStore } from "../store/theme";


export default function RootLayout() {
  const setUser = useAuthStore((s) => s.setUser);
  const setLoading = useAuthStore((s) => s.setLoading);
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  useEffect(() => {
    initDatabase();
    initSettingsTable();

    const savedTheme = getSetting("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }

    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsub;
  }, [setUser, setLoading, setTheme]);

  return (
    <View style={{ flex: 1, backgroundColor: theme === "dark" ? "#111" : "#fff" }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme === "dark" ? "#111" : "#fff",
          },
        }}
      />
    </View>
  );
}