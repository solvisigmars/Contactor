import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Contact } from "../../types/Contact";
import styles from "./styles";

type Props = { contact : Contact };

export default function ContactItem ({contact}: Props){
  return (
    <TouchableOpacity onPress={() => router.push(`/contact/${contact.id}`)}>
      <View style = {styles.row}>
        {contact.image ? (
          <Image style = {styles.thumbnail} source={{uri: contact.image}} />
        ): (
          <View style = {styles.placeholder}>
            <Text style = {styles.textPlaceholer}>contact.name[0].toUpperCase()</Text>
          </View>
        )
        }
      </View>
    </TouchableOpacity>
  )
}