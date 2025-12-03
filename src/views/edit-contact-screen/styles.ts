import { background, blue, darkGray } from "@/src/styles/colors";
import { StyleSheet } from "react-native";


export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: darkGray,
  },
  
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    backgroundColor: "#eee",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    fontSize: 16,
  },

  button: {
    backgroundColor: blue,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
  },


  imageWrapper: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
  },
  

  removeImageButton: {
    position: "absolute",
    top: 5,          
    right: 13,        
    backgroundColor: "rgba(0,0,0,0.55)",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  
  removeImageText: {
    color: "white",
    fontSize: 16,     
    lineHeight: 16,
    fontWeight: "400" 
  },

  placeholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
  },

  placeholderText: {
    fontSize: 48,      
    fontWeight: "600",
    color: "#555",
  },

  
});
