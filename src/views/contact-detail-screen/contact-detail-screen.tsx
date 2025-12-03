import { useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import EditContactButton from "@/src/components/edit-contact-button/edit-contact-button";
import { getContact } from "@/src/services/contact-service";
import { Contact } from "@/src/types/Contact";
import styles from "./styles";

export default function ContactDetailScreen() {
  const { id } = useLocalSearchParams();
  
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
  
      async function load() {
        if (!id) return;
  
        try {
          const data = await getContact(id as string);
          if (isActive) setContact(data);
        } catch (e) {
          console.log("Error loading contact", e);
        } finally {
          if (isActive) setLoading(false);
        }
      }
  
      load();
  
      return () => {
        isActive = false;
      };
    }, [id])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!contact) {
    return (
      <View style={styles.center}>
        <Text>Contact not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.editButtonContainer}>
        <EditContactButton filename={id as string} />
      </View>

      {contact.image ? (
        <Image source={{ uri: contact.image }} style={styles.photo} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.textPlaceholder}>
            {contact.name[0].toUpperCase()}
          </Text>
        </View>
      )}

      <Text style={styles.name}>{contact.name}</Text>
      <Text style={styles.phone}>{contact.phoneNumber}</Text>

      <TouchableOpacity
        style={styles.callButton}
        onPress={() => Linking.openURL(`tel:${contact.phoneNumber}`)}
      >
        <Text style={styles.callButtonText}>Call</Text>
      </TouchableOpacity>

    </View>
  );
}
