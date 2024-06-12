import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, SystemMessage } from "react-native-gifted-chat";

const Chat = ({route, navigation}) => {

const { name, background } = route.params;
const [messages, setMessages] = useState([]);

// Called when a user sends a message, appends new message to newMessages array, which is then appended to original list of messages
const onSend = (newMessages) => {
  setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
}

//set bubble colors to contrast chosen background color
const getBubbleColors = (background) => {
  switch (background) {
    case '#090C08':
    case '#474056':
      return {
        leftBubbleBackground: '#FFFFFF', // white bubble for incoming messages
        leftBubbleText: '#000000',       // black text on white bubble
        rightBubbleBackground: '#0000FF', // bright blue bubble for outgoing messages
        rightBubbleText: '#FFFFFF',      // white text on blue bubble
        systemMessageColor: '#FFFFFF',   // white text for system message
      };
    case '#8A95A5':
    case '#B9C6AE':
      return {
        leftBubbleBackground: '#FFFFFF', // white bubble for incoming messages
        leftBubbleText: '#000000',       // black text on white bubble
        rightBubbleBackground: '#000000', // black bubble for outgoing messages
        rightBubbleText: '#FFFFFF',      // white text on black bubble
        systemMessageColor: '#000000',   // black text for system message
      };
    default:
      return {
        leftBubbleBackground: '#FFFFFF',
        leftBubbleText: '#000000',
        rightBubbleBackground: '#000000',
        rightBubbleText: '#FFFFFF',
        systemMessageColor: '#000000',
      };
  }
};

const {
  leftBubbleBackground,
  leftBubbleText,
  rightBubbleBackground,
  rightBubbleText,
  systemMessageColor
} = getBubbleColors(background);

// change default colors of sender and receiver bubbles
const renderBubble = (props) => {
  return <Bubble
    {...props}
    wrapperStyle={{
      left: {
        backgroundColor: leftBubbleBackground,
      },
      right: {
        backgroundColor: rightBubbleBackground,
      },
    }}
    textStyle={{
      left: {
        color: leftBubbleText,
      },
      right: {
        color: rightBubbleText,
      },
    }}
  />
};

const renderSystemMessage = (props) => (
  <SystemMessage
    {...props}
    textStyle={{ color: systemMessageColor }}
  />
);

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
      renderSystemMessage={renderSystemMessage}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1
      }}
    />
    { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : <KeyboardAvoidingView behavior="padding" /> } 
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