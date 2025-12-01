import ContactsList from "@/src/components/contacts-list/contacts-list";
import CreateContactButton from "@/src/components/create-contact-button/create-contact-button";
import SearchBar from "@/src/components/search-bar/search_bar";
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

  const visible: Contact[] = [];
  for (let c of contacts) {
    if (c.name.toLowerCase().includes(search.toLowerCase())) {
      visible.push(c);
    }
  }
  return (
    <View style= {styles.container}>
      <Text style = {styles.title}>Contacts</Text>
      {/* Render Search Bar */}
      <SearchBar search = {search} setSearch = {setSearch} />

      {/* Render Contacts Lists */}
      <ContactsList list = { visible } />
      {/* Redner Create New Contact */}
      <CreateContactButton />
      

      <TouchableOpacity
        onPress={ () => router.push(`/contact/${"1"}`) } // temporary ID so teammates can test
        style={styles.button}
      >
        <Text style={styles.buttonText}>Open Contact Detail</Text>
      </TouchableOpacity>
    </View>
  );
}

