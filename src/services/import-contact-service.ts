import * as Contacts from "expo-contacts";
import * as FileSystem from "expo-file-system/legacy";
import { Contact } from "../types/Contact";
import { CONTACTS_DIR, writeContactFile } from "./filesystem-service";
import { generateUUID } from "./uuid-service";
export async function importContactFromOs() {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permission denied")
  }

  const { data } = await Contacts.getContactsAsync({
    fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Image]
  });

  const imported: Contact[] = [];

  const dir = await FileSystem.getInfoAsync(CONTACTS_DIR.uri);
  if (!dir.exists) {
    await FileSystem.makeDirectoryAsync(CONTACTS_DIR.uri, { intermediates: true });
  }

  for (let i = 0; i < data.length; i = i + 1) {
    const c = data[i];

    if (!c.name || !c.phoneNumbers || c.phoneNumbers.length === 0) {
      continue;
    }

    const phoneNumber = c.phoneNumbers?.[0]?.number;

    if (phoneNumber === undefined || phoneNumber === null) {
      continue; 
    }

    const id = generateUUID();
    const filename = `${c.name}-${id}.json`;

    const contactObj: Contact = {
      id,
      name: c.name,
      phoneNumber: phoneNumber,
      image: c.image?.uri ?? null,
    };

    await writeContactFile(filename, contactObj);
    imported.push(contactObj);
  }

  return imported;
}
