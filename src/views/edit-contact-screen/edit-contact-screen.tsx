import * as ImagePicker from "expo-image-picker";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { getContact, updateContact } from "@/src/services/contact-service";
import { saveImageToAppStorage, takePhoto } from "@/src/services/image-service";
import { Contact } from "@/src/types/Contact";

import styles from "./styles";

export default function EditContactScreen() {
  const { id } = useLocalSearchParams();

  const [contact, setContact] = useState<Contact | null>(null);

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState<string | null>(null);

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

  async function handleTakePhoto() {
    const uri = await takePhoto();
    if (uri !== "") {
      setImage(uri);
    }
  }

  async function saveChanges() {
    if (!contact) return;

    let finalImage = contact.image;

    if (image && image !== contact.image) {
      finalImage = await saveImageToAppStorage(image);
    }

    if (image === null) {
      finalImage = null;
    }

    await updateContact(id as string, {
      id: contact.id,
      name,
      phoneNumber,
      image: finalImage,
    });

    router.back();
  }

  if (!contact) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Contact</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Change Image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>

        {/* ⭐ IMAGE OR PLACEHOLDER */}
        <View style={styles.imageContainer}>
          {image ? (
            <View style={styles.imageWrapper}>
              <Image style={styles.imagePreview} source={{ uri: image }} />
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

        <TouchableOpacity onPress={saveChanges} style={styles.button}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
