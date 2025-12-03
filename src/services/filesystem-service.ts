import { Directory, File, Paths } from "expo-file-system";
import * as FileSystem from "expo-file-system/legacy";

export const CONTACTS_DIR = new Directory(Paths.document, "contacts");

export async function ensureContactsDir() {
  if (!CONTACTS_DIR.exists) {
    CONTACTS_DIR.create();
  }
}

export async function readContactFile(filename: string) {
  await ensureContactsDir();

  const file = new File(CONTACTS_DIR.uri, filename);

  if (!file.exists) {
    throw new Error(`Contact file does not exist: ${filename}`);
  }

  const content = await FileSystem.readAsStringAsync(file.uri, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  return JSON.parse(content);
}

export async function writeContactFile(filename: string, data: object) {
  await ensureContactsDir();

  const file = new File(CONTACTS_DIR.uri, filename);

  await FileSystem.writeAsStringAsync(file.uri, JSON.stringify(data), {
    encoding: FileSystem.EncodingType.UTF8,
  });
}

export async function deleteContactFile(filename: string) {
  await ensureContactsDir();

  const file = new File(CONTACTS_DIR.uri, filename);

  if (file.exists) {
    await FileSystem.deleteAsync(file.uri, { idempotent: true });
  }
}

export async function listContactFiles() {
  await ensureContactsDir();

  return CONTACTS_DIR.list()
    .filter((item) => item instanceof File)
    .map((file) => (file as File).name);
}
