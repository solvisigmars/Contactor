import { Contact } from "../types/Contact";
import {
  deleteContactFile,
  listContactFiles,
  readContactFile,
  writeContactFile
} from "./filesystem-service";
import { saveImageToAppStorage } from "./image-service";
import { generateUUID } from "./uuid-service";

export async function getAllContacts(): Promise<Contact[]> {
  const files = await listContactFiles();

  const contacts: Contact[] = [];

  for (const fileName of files) {
    const contact = await readContactFile(fileName);

    contacts.push({
      ...contact,
      filename: fileName, 
    });
  }

  return contacts.sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" })
  );
}



// Create new contact
export async function createContact(
  name: string,
  phoneNumber: string,
  image: string | null
) {
  const id = generateUUID();
  const filename = `${name}-${id}.json`;

  let finalImage = null;

  if (image) {
    finalImage = await saveImageToAppStorage(image);
  }

  const newContact: Contact = {
    id,
    name,
    phoneNumber,
    image: finalImage,
  };

  await writeContactFile(filename, newContact);

  return newContact;
}

export async function updateContact(
  filename: string,
  updatedContact: Contact
) {
  await writeContactFile(filename, updatedContact);
}

export async function deleteContact(filename: string) {
  await deleteContactFile(filename);
}

export async function getContact(filename: string): Promise<Contact> {
  return await readContactFile(filename);
}
