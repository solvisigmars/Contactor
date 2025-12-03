import { Contact } from "@/src/types/Contact";
import React from "react";
import { FlatList } from "react-native";
import ContactItem from "../contact-item/contact-item";

type Props = {
  list: Contact[];
};

export default function ContactsList({ list }: Props) {
  return (
    <FlatList
      data={list}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ContactItem contact={item} />}
    />
  );
}
