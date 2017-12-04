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
  StatusBar,
  AppRegistry
} from 'react-native';
import SignUpPage from './SignUpPage';


export default class LoginPage extends Component {
  static navigationOptions = {
    title: 'Login Page'
  };

  render() {
    const { navigate } = this.props.navigation;
    return(
      <KeyboardAvoidingView style={styles.container}>

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../../images/logo.jpg')} />
          <Text style={styles.title}> Welcome to Banksy! Login here </Text>
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
            returnKeyType="go"
            secureTextEntry={true}
            ref={(input) => this.passwordInput = input}
            underlineColorAndroid='transparent'
            style={styles.textInput} />

          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigate('Welcome_Page')}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.linkText} onPress={() => navigate('SignUp')}> CREATE A NEW ACCOUNT </Text>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
  },
  logoContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 5,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    opacity: 1,
  },
  formContainer: {
    flex:2,
    padding: 20,
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
  linkText: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  }
})
