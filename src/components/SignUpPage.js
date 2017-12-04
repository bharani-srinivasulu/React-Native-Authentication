import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar
} from 'react-native';


export default class SignUpPage extends Component {
  static navigationOptions = {
    title: 'Signup Page'
  };

  render() {
    return(
      <KeyboardAvoidingView style={styles.container}>

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../../images/logo.jpg')} />
          <Text style={styles.title}> Welcome to Banksy! Sign up here </Text>
        </View>

        <View style={styles.formContainer}>
        
          <TextInput
            placeholder="Enter email/phone"
            placeholderTextColor="#fff"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            underlineColorAndroid='transparent'
            style={styles.textInput} />

          <TextInput
            placeholder="Enter password"
            placeholderTextColor="#fff"
            returnKeyType="next"
            ref={(input) => this.passwordInput = input}
            onSubmitEditing={() => this.confirmPasswordInput.focus()}
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            style={styles.textInput} />

          <TextInput
            placeholder="Confirm password"
            placeholderTextColor="#fff"
            returnKeyType="go"
            secureTextEntry={true}
            ref={(input) => this.confirmPasswordInput = input}
            underlineColorAndroid='transparent'
            style={styles.textInput} />

          <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
            <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 5,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    opacity: 1,
  },
  textInput: {
    height: 40,
    marginBottom: 20,
    fontSize: 15,
    color: '#fff',
    backgroundColor: '#34c2db',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: '#346Edb',
    paddingVertical: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  formContainer: {
    flex:2,
    padding: 20,
  }
})
