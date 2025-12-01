import * as FileSystem from "expo-file-system/legacy";

// Folder where all contacts are stored
const CONTACTS_DIR = (FileSystem.documentDirectory ?? "") + "contacts/";

// Ensure the contacts folder exists
export async function ensureContactsDir() {
  const dir = await FileSystem.getInfoAsync(CONTACTS_DIR);

  if (!dir.exists) {
    await FileSystem.makeDirectoryAsync(CONTACTS_DIR, { intermediates: true });
  }
}

// Read a contact file (JSON)s
export async function readContactFile(filename: string) {
  await ensureContactsDir();

  const path = CONTACTS_DIR + filename;

  const content = await FileSystem.readAsStringAsync(path, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  return JSON.parse(content);
}

// Write a contact file (JSON)
export async function writeContactFile(filename: string, data: object) {
  await ensureContactsDir();

  const path = CONTACTS_DIR + filename;

  await FileSystem.writeAsStringAsync(path, JSON.stringify(data), {
    encoding: FileSystem.EncodingType.UTF8,
  });
}

// Delete a contact file
export async function deleteContactFile(filename: string) {
  await ensureContactsDir();

  const path = CONTACTS_DIR + filename;

  await FileSystem.deleteAsync(path, { idempotent: true });
}

// List all contact files
export async function listContactFiles() {
  await ensureContactsDir();

  return await FileSystem.readDirectoryAsync(CONTACTS_DIR);
}
