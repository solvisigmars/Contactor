import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { getContact } from '@/src/services/contact-service';
import { Contact } from '@/src/types/Contact';
import styles from './styles';

export default function ContactDetailScreen() {
  const { id } = useLocalSearchParams();      // filename (Anna-uuid.json)
  const router = useRouter();

  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);

  // Load the selected contact
  useEffect(() => {
    async function load() {
      if (!id) return;

      const data = await getContact(id as string);
      setContact(data);
      setLoading(false);
    }
    load();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Missing/corrupted contact file
  if (!contact) {
    return (
      <View style={styles.center}>
        <Text>Contact not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Photo */}
      {contact.image ? (
        <Image
          source={{ uri: contact.image }}
          style={styles.photo}
        />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.textPlaceholder}>
            {contact.name[0].toUpperCase()}
          </Text>
        </View>
      )}

      {/* NAME */}
      <Text style={styles.name}>{contact.name}</Text>

      {/* PHONE NUMBER */}
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
