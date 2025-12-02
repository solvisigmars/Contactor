import { Directory, File, Paths } from "expo-file-system";

export const CONTACT_PHOTO_DIR = new Directory(Paths.document, "contact-photos");

// Ensure directory exists
async function ensureDir() {
  if (!CONTACT_PHOTO_DIR.exists) {
    CONTACT_PHOTO_DIR.create();
  }
}

export async function saveImageToAppStorage(sourceUri: string): Promise<string> {
  await ensureDir();

  const parts = sourceUri.split("/");
  const originalName = parts[parts.length - 1];
  const newFile = new File(CONTACT_PHOTO_DIR.uri, originalName);

  const sourceFile = new File(sourceUri);

  // Copy into the app folder
  sourceFile.copy(newFile);

  return newFile.uri; // Permanent location
}
