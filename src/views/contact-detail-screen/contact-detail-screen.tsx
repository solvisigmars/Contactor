import { useLocalSearchParams, useFocusEffect } from 'expo-router';
import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';

import { getContact } from '@/src/services/contact-service';
import { Contact } from '@/src/types/Contact';
import EditContactButton from '@/src/components/edit-contact-button/edit-contact-button';
import styles from './styles';

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
  if (!contact) {
    return (
      <View style={styles.center}>
        <Text>Contact not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* PHOTO OR PLACEHOLDER */}
      {contact.image ? (
        <Image source={{ uri: contact.image }} style={styles.photo} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.textPlaceholder}>
            {contact.name[0].toUpperCase()}
          </Text>
        </View>
      )}

      {/* NAME & PHONE */}
      <Text style={styles.name}>{contact.name}</Text>
      <Text style={styles.phone}>{contact.phoneNumber}</Text>

      {/* EDIT BUTTON */}
      <EditContactButton filename={id as string} />
    </View>
  );
}
