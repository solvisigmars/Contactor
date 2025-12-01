import * as FileSystem from "expo-file-system";

const CONTACTS_DIR = FileSystem.documentDirectory + "contacts/";

// Ensure contacts folder exists
export async function ensureContactsDir() {
  const dir = await FileSystem.getInfoAsync(CONTACTS_DIR);

  if (!dir.exists) {
    await FileSystem.makeDirectoryAsync(CONTACTS_DIR);
  }
}

// Read a JSON contact file
export async function readContactFile(filename: string) {
  await ensureContactsDir();
  const path = CONTACTS_DIR + filename;

  const file = await FileSystem.readAsStringAsync(path);
  return JSON.parse(file);
}

// Save a JSON contact file
export async function writeContactFile(filename: string, data: object) {
  await ensureContactsDir();
  const path = CONTACTS_DIR + filename;

  await FileSystem.writeAsStringAsync(path, JSON.stringify(data));
}

// Delete a contact file
export async function deleteContactFile(filename: string) {
  const path = CONTACTS_DIR + filename;
  await FileSystem.deleteAsync(path, { idempotent: true });
}

// List all contact files
export async function listContactFiles() {
  await ensureContactsDir();
  return await FileSystem.readDirectoryAsync(CONTACTS_DIR);
}
