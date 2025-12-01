import { background, blue } from "@/src/styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
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
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: background,
    borderColor: "black",
    marginBottom: 10,
    justifyContent: "center"
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "black",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold"
  },
  button: {
    width: 100,
    height: 30,
    borderRadius:20 ,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: blue
  }
})