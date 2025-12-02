import { Directory, File, Paths } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

export const CONTACT_PHOTO_DIR = new Directory(
  Paths.document,
  "contact-photos"
);

enum PermissionType {
  Camera,
  CameraRoll,
}

const getPermission = async (
  PermissionTypes: PermissionType[]
): Promise<void> => {
  if (PermissionTypes.includes(PermissionType.Camera)) {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Camera permission not granted");
    }

    if (PermissionTypes.includes(PermissionType.CameraRoll)) {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Media library permission not granted");
      }
    }
  }
};

export const takePhoto = async (): Promise<string> => {
  try{
    await getPermission ([PermissionType.Camera, PermissionType.CameraRoll]);

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      base64: true,
      aspect: [1,1] as [number, number],
      allowsEditing: true,
    });

    if (result.canceled) {
      return "";
    }
    return result.assets[0].uri
  } catch (error) {
    console.error("Error taking photo,", error)
  }

  return "";
};

// Ensure directory exists
async function ensureDir() {
  if (!CONTACT_PHOTO_DIR.exists) {
    CONTACT_PHOTO_DIR.create();
  }
}

export async function saveImageToAppStorage(
  sourceUri: string
): Promise<string> {
  await ensureDir();

  const parts = sourceUri.split("/");
  const originalName = parts[parts.length - 1];
  const newFile = new File(CONTACT_PHOTO_DIR.uri, originalName);

  const sourceFile = new File(sourceUri);

  // Copy into the app folder
  sourceFile.copy(newFile);

  return newFile.uri; // Permanent location
}
