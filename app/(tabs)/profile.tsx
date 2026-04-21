import { View, Text, Button, Image, TextInput, ScrollView } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { saveSetting, getSetting } from "../../db/settings";
import { useThemeStore } from "../../store/theme";
import { db } from "../../db";
import { Colors } from "../../constants/theme";


export default function ProfileScreen() {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  const colors = theme === "dark" ? Colors.dark : Colors.light;

  const bg = colors.background;
  const text = colors.text;
  const card = colors.card;

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
    <ScrollView
      contentContainerStyle={{
        padding: 10,
        gap: 11,
        backgroundColor: colors.background,
        minHeight: "100%",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 26,
          fontWeight: "bold",
          color: colors.text,
          marginBottom: 4,
        }}
      >
        Profile
      </Text>

      <View style={{ alignItems: "center", marginBottom: 10 }}>
        <Image
          source={
            imageUri
              ? { uri: imageUri }
              : {
                uri: "https://ui-avatars.com/api/?name=User&background=cccccc&color=000000&size=256",
              }
          }
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: colors.border,
          }}
        />
      </View>

      <View style={{flexDirection: "row", justifyContent: "center"}}>
        <Button title="Edit Profile Picture" onPress={handlePickImage} />
        <Button title="Logout" onPress={handleLogout} />
      </View>
      
      <View
        style={{
          backgroundColor: colors.card,
          padding: 14,
          borderRadius: 16,
          gap: 10,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <TextInput
          placeholder="Name"
          placeholderTextColor={colors.textMuted}
          value={name}
          onChangeText={setName}
          style={{
            borderWidth: 1,
            padding: 12,
            color: colors.text,
            borderColor: colors.border,
            borderRadius: 12,
            backgroundColor: colors.background,
          }}
        />
        <TextInput
          placeholder="Height (ex: 5'6 or 167 cm)"
          placeholderTextColor={colors.textMuted}
          value={height}
          onChangeText={setHeight}
          style={{
            borderWidth: 1,
            padding: 12,
            color: colors.text,
            borderColor: colors.border,
            borderRadius: 12,
            backgroundColor: colors.background,
          }}
        />
        <TextInput
          placeholder="Starting Weight"
          placeholderTextColor={colors.textMuted}
          value={startWeight}
          onChangeText={setStartWeight}
          keyboardType="numeric"
          style={{
            borderWidth: 1,
            padding: 12,
            color: colors.text,
            borderColor: colors.border,
            borderRadius: 12,
            backgroundColor: colors.background,
          }}
        />
        <TextInput
          placeholder="Age"
          placeholderTextColor={colors.textMuted}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          style={{
            borderWidth: 1,
            padding: 12,
            color: colors.text,
            borderColor: colors.border,
            borderRadius: 12,
            backgroundColor: colors.background,
          }}
        />
        <TextInput
          placeholder="Gender"
          placeholderTextColor={colors.textMuted}
          value={gender}
          onChangeText={setGender}
          style={{
            borderWidth: 1,
            padding: 12,
            color: colors.text,
            borderColor: colors.border,
            borderRadius: 12,
            backgroundColor: colors.background,
          }}
        />

        <Button title="Save Profile" onPress={saveProfile} />
      </View>

      <View
        style={{
          backgroundColor: colors.card,
          padding: 14,
          borderRadius: 16,
          gap: 6,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text style={{ color: colors.text, fontWeight: "bold", fontSize: 16 }}>
          Weight Summary
        </Text>
        <Text style={{ color: colors.text }}>
          Starting Weight: {startWeight || "Not set"}
        </Text>
        <Text style={{ color: colors.text }}>
          Current Weight: {currentWeight || "No entries yet"}
        </Text>
        <Text style={{ color: colors.text }}>
          Change: {weightArrow} {Math.abs(weightChange).toFixed(1)}
        </Text>
      </View>

      <Button
        title={` ${theme}`}
        onPress={() => {
          const next = theme === "light" ? "dark" : "light";
          setTheme(next);
          saveSetting("theme", next);
        }}
      />

     
    </ScrollView>
  );
}