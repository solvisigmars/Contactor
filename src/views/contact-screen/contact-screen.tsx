import { Contact } from "@/src/types/Contact";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";


import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function ContactsScreen() {
  const [ contacts, setContacts ] = useState<Contact[]>([]);
  const [ search, setSearch ] = useState("");

  // (Temporary) load fake contacts for UI testing
  const tempContacts = [
    { id: "1", name: "Alice", phoneNumber: "111", image: null },
    { id: "2", name: "Bob", phoneNumber: "222", image: null },
    { id: "3", name: "Charlie", phoneNumber: "333", image: null }
  ];

  useFocusEffect(
    useCallback(() => {
      setContacts(tempContacts);
    }, [])
  );
  return (
    <View style= {styles.container}>
      <Text>Contacts</Text>
      {/* Render Search Bar */}
      {/* Render Contacts Lists */}
      {/* Redner Create New Contact */}

      <TouchableOpacity
        onPress={ () => router.push(`/contact/${"1"}`) } // temporary ID so teammates can test
        style={styles.button}
      >
        <Text style={styles.buttonText}>Open Contact Detail</Text>
      </TouchableOpacity>
    </View>

    
  );
}

