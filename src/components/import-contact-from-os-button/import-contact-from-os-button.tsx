import { getAllContacts } from "@/src/services/contact-service";
import { importContactFromOs } from "@/src/services/import-contact-service";
import { Contact } from "@/src/types/Contact";
import { Alert, Button } from "react-native";

interface ImportFromOsButtonProps {
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

export default function ImportFromOsButton({setContacts}: ImportFromOsButtonProps) {
  async function handleImport() {
    try {
      await importContactFromOs();  // triggers OS import ✅ (file saving happens in the service)
      const updated = await getAllContacts(); // reload local list ✅
      setContacts(updated); // update UI ✅

      Alert.alert("Success", "Contacts imported!");
    } catch (e: any) {
      Alert.alert("Import failed", e.message);
    }
  }
  return (
    <Button 
      title = "Import from OS" 
      onPress = {handleImport}
    />
  )
}