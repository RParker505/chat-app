import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const TextInputWithIcon = ({ iconName, iconSize, iconColor, style, ...props }) => {
  return (
    <View style={styles1.inputContainer}>
      <Icon name={iconName} size={iconSize} color={iconColor} style={styles1.icon} />
      <TextInput
        style={styles1.textInput}
        {...props}
      />
    </View>
  );
};

const styles1 = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 0,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 50
  }
});

const Start = ({ navigation }) => {

 const [name, setName] = useState('');
 const [background, setBackground] = useState('');
 const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

 return (
    <ImageBackground
      source={{ uri: "https://i.ibb.co/dW0mdvR/background.png" }}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.appTitle}>ChitChat</Text>
          <View style={styles.signinBox}>
            <TextInputWithIcon
              iconName="user"
              iconSize={20}
              iconColor="#757083"
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
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
 );
}

const styles = StyleSheet.create({
 backgroundImage: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
 },
 container: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center"
},
scrollViewContent: {
  flexGrow: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
 appTitle: {
  flex: 1,
  margin: 25,
  fontSize: 45,
  fontWeight: '600',
  color: '#FFFFFF'
 },
signinBox: { 
  backgroundColor: '#f2f2f2',
  borderRadius: 4,
  padding: 5,
  width: '88%',
  height: '44%', 
  alignItems: 'center',
  justifyContent: 'space-around',
  marginBottom: 25 
},
chooseColor: {
  fontSize: 16,
  fontWeight: '300',
  color: '#757083',
  opacity: 100
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
selectedColor:{
  borderColor: '#19b9bf',
  borderWidth: 4,
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