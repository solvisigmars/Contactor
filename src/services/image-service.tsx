import { Directory, File, Paths } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Alert, Linking } from "react-native";
import { generateUUID } from "./uuid-service";


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
): Promise<boolean> => {
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


export const takePhoto = async (): Promise<string> => {
  // Request permissions
  const ok = await getPermission([
    PermissionType.Camera,
    PermissionType.CameraRoll,
  ]);

  if (!ok) return ""; 

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

async function ensureDir() {
  if (!CONTACT_PHOTO_DIR.exists) {
    CONTACT_PHOTO_DIR.create();
  }
}


export async function saveImageToAppStorage(
  sourceUri: string
): Promise<string> {
  await ensureDir();

  const extension = sourceUri.split(".").pop() || "jpg";
  const uniqueName = `${generateUUID()}.${extension}`;

  const newFile = new File(CONTACT_PHOTO_DIR.uri, uniqueName);
  const sourceFile = new File(sourceUri);

  sourceFile.copy(newFile);

  return newFile.uri; 
}