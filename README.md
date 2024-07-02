# React Native Mobile Chat App
<img width="329" alt="chat-app-homescreen" src="https://github.com/RParker505/chat-app/assets/147425968/a5f9ee0f-ffe4-47ac-afab-ce79fe1d0149">

## Objective
To build a chat app for mobile devices using React Native. The app provides users with a chat interface and options to share images and their location. It is optimized for both Android and iOS devices. Expo was used to develop the app and Google Firestore to store the chat messages and images/map views.
## User Stories
- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.
## Key Features
- A page where users can enter their name and choose a background color for the chat screen before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- Provide users with two additional communication features: sending images (either from device library or device camera) and location data.
- Data gets stored online and offline, allowing users to access the chat and previous messages even when they are offline.
## Dependencies
- "@expo/metro-runtime": "~3.2.1",
- "@react-native-async-storage/async-storage": "1.23.1",
- "@react-native-community/netinfo": "11.3.1",
- "@react-navigation/native": "^6.1.17",
- "@react-navigation/native-stack": "^6.9.26",
- "expo": "~51.0.12",
- "expo-image-picker": "~15.0.6",
- "expo-location": "~17.0.1",
- "expo-status-bar": "~1.12.1",
- "firebase": "^10.3.1",
- "react": "18.2.0",
- "react-dom": "18.2.0",
- "react-native": "0.74.2",
- "react-native-gifted-chat": "^2.4.0",
- "react-native-maps": "1.14.0",
- "react-native-safe-area-context": "4.10.1",
- "react-native-screens": "3.31.1",
- "react-native-vector-icons": "^10.1.0",
- "react-native-web": "~0.19.10"
## Installation
- Clone this repository
- Install Node.js. _To avoid any potential conflicts, it is recommended to use version 16.19.0._
- Install Expo by running __npm install -g expo-cli__ in the terminal
- Navigate to the chat-app folder and run __npm install__
- Set up Firebase for your project:
  - Sign in at Google Firebase
  - Create a project
  - Set up Firestore Database (select "production mode")
  - On the "Rules" tab, adjust "allow read, write: if false;" to "allow read, write: if __true__;"
  - Register app(</>) in Project Overview
- Navigate to the chat-app folder in the terminal and install Firebase using __npm install firebase__
- Initialize Firebase by copying and pasting the provided Firebase configuration into App.js
- Download the Expo Go app on your mobile device (or an emulator like Android Studio) and open
  - _Make sure you are connected to WiFi!_
- In the terminal run __npm start__ or __expo start__ from the project directory
- You should now be able to use the chat app on your mobile device or emulator
- Happy coding!
