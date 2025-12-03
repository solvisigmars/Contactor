import { getAllContacts } from "@/src/services/contact-service";
import { importContactFromOs } from "@/src/services/import-contact-service";
import { Contact } from "@/src/types/Contact";
import { Alert, Button } from "react-native";

interface ImportFromOsButtonProps {
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

export default function ImportFromOsButton({
  setContacts,
}: ImportFromOsButtonProps) {
  async function handleImport() {
    try {
      await importContactFromOs();
      const updated = await getAllContacts();
      setContacts(updated);

      Alert.alert("Success", "Contacts imported!");
    } catch (e: any) {
      Alert.alert("Import failed", e.message);
    }
  }
  return <Button title="Import from OS" onPress={handleImport} />;
}
