import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: true }}>
        
        <Stack.Screen
          name="index"
          options={{ title: "Contacts" }}
        />

        <Stack.Screen
          name="contact/new-contact"
          options={{ headerShown: true, title: "New Contact", headerBackTitle: "" }}
        />

        <Stack.Screen
          name="contact/[id]"
          options={{ headerShown: true, title: "Contact Details", headerBackTitle: "" }}
        />

        <Stack.Screen
          name="contact/[id]/edit"
          options={{ headerShown: true, title: "Edit Contacts", headerBackTitle: "" }}
        />

      </Stack>
    </GestureHandlerRootView>
  );
}
