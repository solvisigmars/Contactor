import { useLocalSearchParams, useFocusEffect, router } from "expo-router";
import React, { useState, useCallback } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { getContact, updateContact } from "@/src/services/contact-service";
import { saveImageToAppStorage } from "@/src/services/image-service";
import { Contact } from "@/src/types/Contact";

import styles from "./styles";

export default function EditContactScreen() {
  const { id } = useLocalSearchParams(); // filename (e.g. Anna-uuid.json)

  const [contact, setContact] = useState<Contact | null>(null);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState<string | null>(null);

  // Load the contact every time this screen is focused
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function load() {
        if (!id) return;
        const data = await getContact(id as string);

        if (isActive) {
          setContact(data);
          setName(data.name);
          setPhoneNumber(data.phoneNumber);
          setImage(data.image ?? null);
        }
      }

      load();
      return () => {
        isActive = false;
      };
    }, [id])
  );

  async function pickImage() {
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  async function saveChanges() {
    if (!contact) return; // safety

    let finalImage = contact.image;

    // If user picked a NEW image, save it permanently
    if (image && image !== contact.image) {
      finalImage = await saveImageToAppStorage(image);
    }

    await updateContact(id as string, {
      id: contact.id,
      name,
      phoneNumber,
      image: finalImage,
    });

    router.back(); // go back to detail screen (now updated)
  }

  if (!contact) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Contact</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />

      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        placeholder="Phone number"
      />

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Change Image</Text>
      </TouchableOpacity>

      <Image
        style={styles.imagePreview}
        source={
          image ? { uri: image } : require("@/assets/images/icon.png")
        }
      />

      <TouchableOpacity onPress={saveChanges} style={styles.button}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}
