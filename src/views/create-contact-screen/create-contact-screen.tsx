import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  TouchableWithoutFeedback, 
  Keyboard 
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

import { createContact } from "@/src/services/contact-service";
import { saveImageToAppStorage, takePhoto } from "@/src/services/image-service";

import styles from "./styles";

export default function NewContactScreen() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState<string | null>(null);

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

  async function handleTakePhoto() {
    const uri = await takePhoto();
    if (uri !== "") {
      setImage(uri);
    }
  }

  async function handleCreate() {
    let finalImage = null;

    if (image) {
      finalImage = await saveImageToAppStorage(image);
    }

    await createContact(name, phoneNumber, finalImage);
    router.back();
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Create New Contact</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleTakePhoto} style={styles.button}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>

        {/* ⭐ IMAGE OR PLACEHOLDER (IDENTICAL TO EDIT SCREEN) */}
        <View style={styles.imageContainer}>
          {image ? (
            <View style={styles.imageWrapper}>
              <Image style={styles.imagePreview} source={{ uri: image }} />

              {/* ❌ REMOVE IMAGE BUTTON */}
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => setImage(null)}
              >
                <Text style={styles.removeImageText}>×</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>
                {name[0]?.toUpperCase() || "?"}
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity onPress={handleCreate} style={styles.button}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
