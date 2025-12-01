import { createContact } from "@/src/services/contact-service";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function NewContactScreen() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState<string | null>(null);

  async function pickImage() {
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 1 });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  return (
    <View style = {styles.container}>
      <Text style = {styles.title}>Create New Contact</Text>
      {/** Name Input */}
      <TextInput
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
        style = {styles.input}
      />
      {/** Phone input */}
      <TextInput
        placeholder="Phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>

      <Image
        source={image ? { uri: image } : require("@/assets/images/icon.png")}
        style={styles.imagePreview}
      />

      <TouchableOpacity
        onPress={async () => {
          await createContact(name, phoneNumber, image);
          router.back();
        }}
        style = {styles.button}
      >
        <Text style = {styles.buttonText}>Confirm</Text>
      </TouchableOpacity>

    </View>
  )
}