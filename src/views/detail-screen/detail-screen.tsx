import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { getContact } from '@/src/services/contact-service';
import styles from './styles';

export default function ContactDetailScreen() {
  const { id } = useLocalSearchParams();     // Filename (e.g. "Anna-932jd.json")
  const router = useRouter();

  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load contact from filesystem
  useEffect(() => {
    async function load() {
      const data = await getContact(id as string);
      setContact(data);
      setLoading(false);
    }
    load();
  }, [id]);

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
      {/* PHOTO */}
      <Image
        source={
          contact.photo
            ? { uri: contact.photo }
            : require('@/assets/images/icon.png')
        }
        style={styles.photo}
      />

      {/* NAME */}
      <Text style={styles.name}>{contact.name}</Text>

      {/* PHONE */}
      <Text style={styles.phone}>{contact.phoneNumber}</Text>

      {/* EDIT BUTTON */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => router.push(`/contact/${id}/edit`)}
      >
        <Text style={styles.editButtonText}>Edit Contact</Text>
      </TouchableOpacity>
    </View>
  );
}
