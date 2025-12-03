Contactor
## Description
A modern, simple, and fully functional contact management application built using React Native and Expo.  
The app allows users to create, edit, view, and search contacts where each contact has a name, phone number, and optional photo.## Table of Contents
- Installation
- Features
- Technologies Used 
- Platform Support 
- Project Structure
- Setup Instructions
- Running the App 
- Testing
- Screenshots
- Known Issues 

## Running the app
### Navigate to project directory
`cd Contactor`
### Install dependencies
`npm install`
`npm install uuid`
`npm install react-native-get-random-values`
### Running the App
`npm start`
## Technologies Used
- React Native
- Expo
- Expo Router
- Expo FileSystem
- Expo ImagePicker
- React Native Linking API (for calling)
- UUID generation via:
  - react-native-get-random-values
  - uuid
- TypeScript
## Platform Support
### Primary Development Platform
- Primary Platform: iOS
- Test Device: Phone 17 Pro
- OS Version: iOS 26.1
### Secondary Platform Testing
- Secondary Platform: iOS
- Test Device: iPhone 14 Pro Max
- OS Version: iOS 18.6.2
- Testing Status: Comprehensive
- Known Platform-Specific Issues:
  - Placeholder text appears invisible unless `placeholderTextColor` is explicitly set.
  - Camera and gallery permissions behave differently compared to the simulator.
### Platform-Specific Features
- iOS uses native phone calling via the `Linking.openURL("tel:")` API.
- iOS requires explicit permission dialogs for:
  - Camera access
  - Photo library access
- iOS may use lighter placeholder text colors, requiring manual `placeholderTextColor` styling.

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn
- Expo CLI
- Xcode (for iOS development)
- Android Studio (optional, for Android development)
- A physical device or simulator/emulator
### Environment Setup
1. Install Node.js and npm.
2. Install Expo CLI globally:
   ```bash
   npm install -g expo-cli
## Known Issues
- iOS real device uses very light placeholder text, causing it to appear invisible unless `placeholderTextColor` is set.
- If camera or gallery permissions are denied, Expo ImagePicker fails unless permission handling is implemented (fixed in project).
- FileSystem may produce errors if images have duplicate filenames; resolved by generating unique filenames with UUIDs.


