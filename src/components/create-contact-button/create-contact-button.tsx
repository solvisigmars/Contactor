import { router } from "expo-router";
import React from "react";
import { Button } from "react-native";

export default function CreateContactButton() {
  return <Button 
  title = "Add new contact" 
  onPress = { () => router.push("/contact/new-contact") } />;
}