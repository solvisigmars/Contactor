import ContactsList from "@/src/components/contacts-list/contacts-list";
import CreateContactButton from "@/src/components/create-contact-button/create-contact-button";
import SearchBar from "@/src/components/search-bar/search_bar";
import { getAllContacts } from "@/src/services/contact-service";
import { Contact } from "@/src/types/Contact";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";

import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

export default function ContactsScreen() {
  const [ contacts, setContacts ] = useState<Contact[]>([]);
  const [ search, setSearch ] = useState("");

  // (Temporary) load fake contacts for UI testing
  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const all = await getAllContacts();
        setContacts(all);
      };
      load();
    }, [])
  );

  const visible : Contact[] = [];
  for (let c of contacts) {
    const name = c.name.toLowerCase();
    const query = search.toLowerCase();
    if (name.includes(query)) {
      visible.push(c);
    }
  }

  return (
    <View style= {styles.container}>
      <Text style = {styles.title}>Contacts</Text>
      {/* Render Search Bar */}
      <SearchBar search = {search} setSearch = {setSearch} />

      {/* Render Contacts Lists */}
      <ContactsList list={ visible } />
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

