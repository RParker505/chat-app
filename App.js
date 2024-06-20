import { StyleSheet, Alert } from 'react-native';
// import the screens
import Start from './components/Start';
import Chat from './components/Chat';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {

  const connectionStatus = useNetInfo();

  const firebaseConfig = {
    apiKey: "AIzaSyAwPGvKPAAWqlB23LF4M37IJOgZUQPrq5c",
    authDomain: "chat-app-afe2e.firebaseapp.com",
    projectId: "chat-app-afe2e",
    storageBucket: "chat-app-afe2e.appspot.com",
    messagingSenderId: "23687966628",
    appId: "1:23687966628:web:11931e11729176624cdb31"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Start'
      >
        <Stack.Screen
          name='Start'
          component={Start}
        />
        <Stack.Screen
          name='Chat'
        >
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
