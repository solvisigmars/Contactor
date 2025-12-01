import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600"
  }
})