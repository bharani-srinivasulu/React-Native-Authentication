import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  ScrollView,
} from 'react-native';
import SignUpPage from './SignUpPage';
import App from '../../App';


export default class LoginPage extends Component {
  static navigationOptions = {
    header: null
  };

  validateInputCredentials(email,password) {
    var array = {
      'bharani@gmail.com': 'bharani',
      'bharani@enroco.com': '12'
    }

    if( array.hasOwnProperty(email) && array[email] === password ) {
      return true
    }

    return false
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  openWelcomePage(navigate) {
    var password = this.passwordInput._lastNativeText
    var email = this.emailInput._lastNativeText

    if(password == null || email == null)
      Alert.alert('Email/password cannot be empty')

    if (this.validateEmail(email)){
      if(this.validateInputCredentials(email, password)) {
        navigate('Welcome_Page');
        Keyboard.dismiss();
      }
      else
        Alert.alert('Email password combination is incorrect')
    }
    else
      Alert.alert('Enter a valid email id')
  }

  render() {
    const { navigate } = this.props.navigation;

    return(
      <ScrollView style={styles.container} keyboardShouldPersistTaps="never">

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../../images/logo.jpg')} />
          <Text style={styles.title}> Welcome to Banksy! Login here </Text>
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
            ref={(input) => this.emailInput = input}
            style={styles.textInput} />

          <TextInput
            placeholder="Enter password"
            placeholderTextColor="#fff"
            returnKeyType="send"
            secureTextEntry={true}
            ref={(input) => this.passwordInput = input}
            onSubmitEditing={this.openWelcomePage.bind(this, navigate)}
            underlineColorAndroid='transparent'
            style={styles.textInput} />

          <TouchableOpacity
            style={styles.buttonContainer}
            ref="loginButton"
            onPress={this.openWelcomePage.bind(this, navigate)}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>

          <Text style={styles.linkText} onPress={() => navigate('SignUp')}> CREATE A NEW ACCOUNT </Text>
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
  logoContainer: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    opacity: 1,
  },
  formContainer: {
    flex:1,
    padding: 20,
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
  linkText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  }
})
