import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";

const Chat = ({route, navigation}) => {

const { name, background } = route.params;
const [messages, setMessages] = useState([]);

// Called when a user sends a message, appends new message to newMessages array, which is then appended to original list of messages
const onSend = (newMessages) => {
  setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
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
  ]);
}, []);

useEffect(() => {
  navigation.setOptions({ title: name });
}, []);

 return (
  <GiftedChat
    messages={messages}
    onSend={messages => onSend(messages)}
    user={{
      _id: 1
    }}
  />
  )
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 }
});

export default Chat;