import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, SystemMessage } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const Chat = ({route, navigation, db}) => {

const { name, background, userID } = route.params;
const [messages, setMessages] = useState([]);

// Called when a user sends a message, appends new message to newMessages array, which is then appended to original list of messages
const onSend = (newMessages) => {
  addDoc(collection(db, "messages"), newMessages[0])
}

const renderSystemMessage = (props) => (
  <SystemMessage
    {...props}
    textStyle={{ color: systemMessageColor }}
  />
);

//  Query to get the "messages" collection from the Firestore database
 useEffect(() => {
  navigation.setOptions({ title: name });
  const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
  const unsubMessages = onSnapshot(q, (docs) => {
    // Initialize an empty array to store the new messages
    let newMessages = [];
    // Iterate through each document in the snapshot
    docs.forEach(doc => {
      newMessages.push({
        id: doc.id,
        ...doc.data(),
        createdAt: new Date(doc.data().createdAt.toMillis())
      })
    })
    setMessages(newMessages);
  })
  return () => {
    if (unsubMessages) unsubMessages();
  }
 }, []);

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

 return (
  <View style={[styles.container, { backgroundColor: background }]}>
    <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      renderSystemMessage={renderSystemMessage}
      onSend={messages => onSend(messages)}
      user={{
        _id: userID,
        name: name
      }}
    />
    { <KeyboardAvoidingView behavior={Platform.OS === 'android' ? "height": "padding"} /> }
  </View>
  )
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
 }
});

export default Chat;