import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native';

const Start = ({ navigation }) => {

 const [name, setName] = useState('');
 const [background, setBackground] = useState('');
 const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
 const image = require('../images/background-image.png');

 return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <Text style={styles.appTitle}>React Chat App</Text>
        <View style={styles.signinBox}>
          <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder='Your name'
            />
          <Text style={styles.chooseColor}>Choose a Background Color</Text>
          <View style={styles.buttonColorBox}>
           {colors.map((color, index) => (
             <TouchableOpacity
               key={index}
               style={[
                 styles.colorButton,
                 { backgroundColor: color },
                 background === color && styles.selectedColor,
               ]}
               onPress={() => setBackground(color)}
             />
           ))}
         </View>
         <TouchableOpacity
           style={styles.button}
           onPress={() => navigation.navigate('Chat', { name: name, background: background})}
         >
           <Text style={styles.buttonText}>Start Chatting</Text>
         </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: "center",
   alignItems: "center"
 },
 backgroundImage: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center', 
  height: '100%',
  width: '100%',
 },
 appTitle: {
  flex: 1,
  margin: 25,
  fontSize: 45,
  fontWeight: '600',
  color: '#FFFFFF'
 },
signinBox: {
  // backgroundColor: '#ffffff', 
  backgroundColor: '#f2f2f2',
  borderRadius: 4,
  width: '88%',
  height: '50%', 
  alignItems: 'center',
  justifyContent: 'space-around', 
},
chooseColor: {
  fontSize: 16,
  fontWeight: '300',
  color: '#757083',
  opacity: 100
},
 textInput: {
  width: "88%",
  padding: 15,
  borderWidth: 1,
  marginTop: 15,
  marginBottom: 15,
  fontSize: 16,
  fontWeight: '300',
  color: '#757083',
  opacity: 50
},
buttonColorBox:{
  flexDirection: 'row',
  justifyContent: 'center',
},
colorButton: {
  width: 50,
  height: 50,
  borderRadius: 25,
  margin: 5
},
button: {
  alignItems: 'center',
  backgroundColor: '#757083',
  borderRadius: 4,
  height: '20%',
  justifyContent: 'center',
  padding: 10,
  width: '88%',
},
buttonText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#ffffff'
}
});

export default Start;