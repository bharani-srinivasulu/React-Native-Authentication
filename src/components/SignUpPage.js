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
  AsyncStorage,
  Platform
} from 'react-native';
import axios from 'axios'
import Login from './LoginPage';

const host = Platform.select({
    ios: 'localhost',
    android: '10.0.2.2',
});

export default class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessages: '',
      successMessage: '',
    }
  }

  static navigationOptions = {
    title: 'Signup Page',
  };

  async createRecords(email, password) {
    axios.post('http://10.0.2.2:3000/addname', {
      email_id: email,
      password: password
    })
    .then(function (response) {
      console.error(response);
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  comparePasswords() {
    var email = this.emailInput._lastNativeText
    var password = this.passwordInput._lastNativeText
    var confirmPassword = this.confirmPasswordInput._lastNativeText

    this.setState({errorMessages: ''})


    if(email != null && password != null && confirmPassword != null)
      if(password != confirmPassword)
        this.setState({errorMessages: 'Passwords doesn\'t match'})
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  verifyInput() {
    var email = this.emailInput._lastNativeText
    var password = this.passwordInput._lastNativeText
    
    if(this.validateEmail(email))
      this.createRecords(email, password)
    
  }

  render() {
    const { goBack } = this.props.navigation;

    return(
      <ScrollView style={styles.container} keyboardShouldPersistTaps="never">

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../../images/logo.jpg')} />
          <Text style={styles.title}> Welcome to Banksy! Sign up here </Text>
        </View>

        <View>
          <Text style={styles.successMessage}>
          { this.state.successMessage ? this.state.successMessage : ''}
          </Text>
        </View>

        <KeyboardAvoidingView style={styles.formContainer}>
          <TextInput
            placeholder="Enter email/phone"
            placeholderTextColor="#fff"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            ref={(input) => this.emailInput = input}
            autoFocus={true}
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

          <View>
            <Text style={styles.errorMessage}>
              {this.state.errorMessages}
            </Text>
          </View>

          <TextInput
            placeholder="Confirm password"
            placeholderTextColor="#fff"
            returnKeyType="go"
            secureTextEntry={true}
            ref={(input) => this.confirmPasswordInput = input}
            underlineColorAndroid='transparent'
            onBlur={this.comparePasswords.bind(this)}
            style={styles.textInput} />

          <TouchableOpacity style={styles.buttonContainer} onPress={this.verifyInput.bind(this)}>
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
  },
  errorMessage: {
    color: 'red',
    marginTop: -10,
    textAlign: 'center',
    fontSize: 18,
  },
  successMessage: {
    color: '#008000',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center'
  }
})
