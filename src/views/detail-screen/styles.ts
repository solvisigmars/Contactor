import { background, blue, darkGray } from "@/src/styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
    padding: 20,
    alignItems: "center",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  photo: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 20,
    backgroundColor: "#ddd",
  },

  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: darkGray,
    marginBottom: 10,
  },

  phone: {
    fontSize: 20,
    color: darkGray,
    marginBottom: 20,
  },

  editButton: {
    backgroundColor: blue,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginTop: 20,
  },

  editButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
