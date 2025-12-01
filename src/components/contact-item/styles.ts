import { StyleSheet } from "react-native";

export default StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#808080"
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "black"
  },
  placeholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D3D3D3"
  },
  textPlaceholer: {
    fontWeight: "bold",
    fontSize: 18,
  },
  nameText:{
    fontSize: 16
  }
})