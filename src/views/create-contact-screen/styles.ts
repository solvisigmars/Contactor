import { background, blue } from "@/src/styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: background,
    flex: 1,
    padding: 18,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#eee",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: blue,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  }
})