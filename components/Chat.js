import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = ({route, navigation}) => {

const { name, background } = route.params;
const [messages, setMessages] = useState([]);

// Called when a user sends a message, appends new message to newMessages array, which is then appended to original list of messages
const onSend = (newMessages) => {
  setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
}

// change default colors of sender and receiver bubbles
const renderBubble = (props) => {
  return <Bubble
    {...props}
    wrapperStyle={{
      right: {
        backgroundColor: "#000"
      },
      left: {
        backgroundColor: "#FFF"
      }
    }}
  />
}

//  Called right after the Chat component mounts
 useEffect(() => {
  setMessages([
    {
      _id: 1,
      text: "Hello developer",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "React Native",
        avatar: "https://placeimg.com/140/140/any",
      },
    },
    {
      _id: 2,
      text: `${name} has entered the chat`,
      createdAt: new Date(),
      system: true,
    },
  ]);
}, [name]); //ensure effect runs when the user name changes

useEffect(() => {
  navigation.setOptions({ title: name });
}, []);

 return (
  <View style={[styles.container, { backgroundColor: background }]}>
    <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1
      }}
    />
    { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null } 
    {/* if OS is Android, add KeyboardAvoidingView */}
  </View>
  )
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
 }
});

export default Chat;