import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Login from './LoginPage';


export default class SignUpPage extends Component {
  static navigationOptions = {
    title: 'Signup Page',
  };

  render() {
    const { goBack } = this.props.navigation;

    return(
      <ScrollView style={styles.container} keyboardShouldPersistTaps="never">

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../../images/logo.jpg')} />
          <Text style={styles.title}> Welcome to Banksy! Sign up here </Text>
        </View>

        <KeyboardAvoidingView style={styles.formContainer}>
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

          <Text style={styles.linkText} onPress={() => goBack()}> AlREADY HAVE AN ACCOUNT? SIGN IN </Text>
        </KeyboardAvoidingView>
      </ScrollView>
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
    marginBottom: 20,
  },
  logoContainer: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 18,
    color: '#fff',
    backgroundColor: '#34c2db',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: '#346Edb',
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  formContainer: {
    flex:2,
    padding: 20,
  },
  linkText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 20,
  }
})
