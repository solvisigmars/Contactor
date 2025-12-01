import {
  deleteContactFile,
  listContactFiles,
  readContactFile,
  writeContactFile
} from "./filesystem-service";

import { generateUUID } from "./uuid-service";

export interface Contact {
  id: string;         // UUID
  name: string;
  phoneNumber: string;
  photo: string | null; // URI path
}

// Load all contacts
export async function getAllContacts(): Promise<Contact[]> {
  const files = await listContactFiles();

  const contacts: Contact[] = [];

  for (const fileName of files) {
    const contact = await readContactFile(fileName);
    contacts.push(contact);
  }

  // Sort alphabetically ascending
  return contacts.sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" })
  );
}

// Create new contact
export async function createContact(
  name: string,
  phoneNumber: string,
  photo: string | null
) {
  const id = generateUUID();
  const fileName = `${name}-${id}.json`;

  const newContact: Contact = {
    id,
    name,
    phoneNumber,
    photo,
  };

  await writeContactFile(fileName, newContact);

  return newContact;
}

// Update existing contact
export async function updateContact(
  filename: string,
  updatedContact: Contact
) {
  await writeContactFile(filename, updatedContact);
}

// Delete a contact
export async function deleteContact(filename: string) {
  await deleteContactFile(filename);
}

// Load single contact by filename
export async function getContact(filename: string): Promise<Contact> {
  return await readContactFile(filename);
}
