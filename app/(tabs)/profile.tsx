import { View, Text, Button, Image, TextInput, ScrollView } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { saveSetting, getSetting } from "../../db/settings";
import { useThemeStore } from "../../store/theme";
import { db } from "../../db";

export default function ProfileScreen() {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  const bg = theme === "dark" ? "#111" : "#fff";
  const text = theme === "dark" ? "#fff" : "#000";
  const card = theme === "dark" ? "#222" : "#f5f5f5";

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [startWeight, setStartWeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weightChange, setWeightChange] = useState(0);

  useEffect(() => {
    const savedImage = getSetting("profile_image");
    const savedTheme = getSetting("theme");
    const savedName = getSetting("profile_name");
    const savedHeight = getSetting("profile_height");
    const savedStartWeight = getSetting("profile_start_weight");
    const savedAge = getSetting("profile_age");
    const savedGender = getSetting("profile_gender");

    if (savedImage) setImageUri(savedImage);
    if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
    if (savedName) setName(savedName);
    if (savedHeight) setHeight(savedHeight);
    if (savedStartWeight) setStartWeight(savedStartWeight);
    if (savedAge) setAge(savedAge);
    if (savedGender) setGender(savedGender);

    const latestWeight = db.getFirstSync(
      `SELECT weight FROM body_weight_entries ORDER BY date DESC, id DESC LIMIT 1`
    ) as { weight?: number } | null;

    if (latestWeight?.weight != null) {
      setCurrentWeight(String(latestWeight.weight));
      if (savedStartWeight) {
        setWeightChange(Number(latestWeight.weight) - Number(savedStartWeight));
      }
    }
  }, [setTheme]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handlePickImage = async () => {
    await ImagePicker.requestMediaLibraryPermissionsAsync();

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      saveSetting("profile_image", uri);
    }
  };

  const saveProfile = () => {
    saveSetting("profile_name", name);
    saveSetting("profile_height", height);
    saveSetting("profile_start_weight", startWeight);
    saveSetting("profile_age", age);
    saveSetting("profile_gender", gender);
    alert("Profile saved");
  };

  const weightArrow = weightChange < 0 ? "↓" : weightChange > 0 ? "↑" : "→";

  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 12, backgroundColor: bg }}>
      <Text style={{ fontSize: 26, fontWeight: "bold", color: text }}>Profile</Text>

      <View style={{ alignItems: "center", marginBottom: 10 }}>
        <Image
          source={
            imageUri
              ? { uri: imageUri }
              : { uri: "https://ui-avatars.com/api/?name=User&background=cccccc&color=000000&size=256" }
          }
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      </View>

      <Button title="Change Profile Picture" onPress={handlePickImage} />

      <View style={{ backgroundColor: card, padding: 12, borderRadius: 12, gap: 10 }}>
        <TextInput
          placeholder="Name"
          placeholderTextColor={theme === "dark" ? "#aaa" : "#666"}
          value={name}
          onChangeText={setName}
          style={{ borderWidth: 1, padding: 10, color: text, borderColor: "#888" }}
        />
        <TextInput
          placeholder="Height (ex: 5'6 or 167 cm)"
          placeholderTextColor={theme === "dark" ? "#aaa" : "#666"}
          value={height}
          onChangeText={setHeight}
          style={{ borderWidth: 1, padding: 10, color: text, borderColor: "#888" }}
        />
        <TextInput
          placeholder="Starting Weight"
          placeholderTextColor={theme === "dark" ? "#aaa" : "#666"}
          value={startWeight}
          onChangeText={setStartWeight}
          keyboardType="numeric"
          style={{ borderWidth: 1, padding: 10, color: text, borderColor: "#888" }}
        />
        <TextInput
          placeholder="Age"
          placeholderTextColor={theme === "dark" ? "#aaa" : "#666"}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          style={{ borderWidth: 1, padding: 10, color: text, borderColor: "#888" }}
        />
        <TextInput
          placeholder="Gender"
          placeholderTextColor={theme === "dark" ? "#aaa" : "#666"}
          value={gender}
          onChangeText={setGender}
          style={{ borderWidth: 1, padding: 10, color: text, borderColor: "#888" }}
        />
        <Button title="Save Profile" onPress={saveProfile} />
      </View>

      <View style={{ backgroundColor: card, padding: 12, borderRadius: 12, gap: 6 }}>
        <Text style={{ color: text, fontWeight: "bold" }}>Weight Summary</Text>
        <Text style={{ color: text }}>Starting Weight: {startWeight || "Not set"}</Text>
        <Text style={{ color: text }}>Current Weight: {currentWeight || "No entries yet"}</Text>
        <Text style={{ color: text }}>
          Change: {weightArrow} {Math.abs(weightChange).toFixed(1)}
        </Text>
      </View>

      <Button
        title={`Theme: ${theme}`}
        onPress={() => {
          const next = theme === "light" ? "dark" : "light";
          setTheme(next);
          saveSetting("theme", next);
        }}
      />

      <Button title="Logout" onPress={handleLogout} />
    </ScrollView>
  );
}