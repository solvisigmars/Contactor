import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerBackTitleVisible: false }}>
        
        <Stack.Screen
          name="index"
          options={{ title: "Contacts" }}
        />

        <Stack.Screen
          name="contact/new-contact"
          options={{ title: "New Contact", headerBackTitleVisible: false }}
        />

        <Stack.Screen
          name="contact/[id]"
          options={{ title: "Contact Info", headerBackTitleVisible: false }}
        />

        <Stack.Screen
          name="contact/[id]/edit"
          options={{ title: "Edit Contact", headerBackTitleVisible: false }}
        />

      </Stack>
    </GestureHandlerRootView>
  );
}
