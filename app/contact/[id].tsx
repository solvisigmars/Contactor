import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function ContactDetailScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View style = {{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Contact detail for ID: { id }</Text>
    </View>
  );
}