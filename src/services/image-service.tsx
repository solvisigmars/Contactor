import { Directory, File, Paths } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Alert, Linking } from "react-native";

export const CONTACT_PHOTO_DIR = new Directory(
  Paths.document,
  "contact-photos"
);

enum PermissionType {
  Camera,
  CameraRoll,
}

/**
 * Request permissions safely.
 * Instead of throwing an error (which crashes the app),
 * this version shows alert and returns false.
 */
const getPermission = async (
  PermissionTypes: PermissionType[]
): Promise<boolean> => {
  // Camera permission
  if (PermissionTypes.includes(PermissionType.Camera)) {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Camera Permission Needed",
        "Please enable camera access in Settings to take a photo.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ]
      );
      return false;
    }
  }

  // Photo library permission
  if (PermissionTypes.includes(PermissionType.CameraRoll)) {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Photo Library Permission Needed",
        "Please enable photo library access in Settings.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ]
      );
      return false;
    }
  }

  return true;
};

/**
 * SAFELY choose camera
 */
export const takePhoto = async (): Promise<string> => {
  // Request permissions
  const ok = await getPermission([
    PermissionType.Camera,
    PermissionType.CameraRoll,
  ]);

  if (!ok) return ""; // Stop if denied

  // Open camera
  const result = await ImagePicker.launchCameraAsync({
    quality: 0.8,
    base64: true,
    aspect: [1, 1] as [number, number],
    allowsEditing: true,
  });

  if (result.canceled) {
    return "";
  }

  return result.assets[0].uri;
};

// Ensure directory exists
async function ensureDir() {
  if (!CONTACT_PHOTO_DIR.exists) {
    CONTACT_PHOTO_DIR.create();
  }
}

/**
 * Save image inside app storage
 */
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
