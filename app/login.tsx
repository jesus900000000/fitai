import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { router, Link } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useThemeStore } from "../store/theme"; // adjust path

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/");
    } catch (e: any) {
      alert(e.message);
    }
  };

const theme = useThemeStore((s) => s.theme);
const bg = theme === "dark" ? "#111" : "#fff";
const text = theme === "dark" ? "#fff" : "#000";
const card = theme === "dark" ? "#222" : "#f5f5f5";

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20, gap: 12 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold" }}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 12 }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 12 }}
      />

      <Button title="Login" onPress={handleLogin} />
      <Link href="/signup">Create account</Link>
      <Link href="/forgot-password">Forgot password?</Link>
    </View>
  );
}