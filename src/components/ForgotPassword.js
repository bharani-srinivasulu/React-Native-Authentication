import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  Image,
} from 'react-native';

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      wrongCredentials: '',
      successMessage: ''
    }
  }

  static navigationOptions = {
    title: 'Recover Account'
  };

  validateInputCredentials(email) {
    var array = [
      'bharani@gmail.com',
      'bharani@enroco.com'
    ]

    if( array.includes(email) ) {
      return true
    }

    return false
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  verifyEmail(navigate) {
    var email = this.emailInput._lastNativeText
    this.setState({ successMessage: '' })

    if(email == null) {
      this.setState({wrongCredentials: 'Fields cannot be empty'})
    }

    else if (this.validateEmail(email)){
      if(this.validateInputCredentials(email)) {
        this.setState({wrongCredentials: ''})
        this.setState({successMessage: 'Password reset link with instructions is mailed successfully!'})
        Keyboard.dismiss();
      }
      else {
        this.setState({wrongCredentials: 'Account doesn\'t exist'})
      }
    }

    else
      this.setState({wrongCredentials: 'Enter correct input format'})

    this.emailInput.clear()
  }

  errorMessage() {
    return this.state.wrongCredentials
  }

  render() {
    const { navigate } = this.props.navigation;
    
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="never">

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../../images/logo.jpg')} />
        </View>
        {
          !this.state.successMessage ?
            <KeyboardAvoidingView style={styles.formContainer}>
              <Text style={styles.title}> Forgot your password ? Enter your email address below</Text>
              <View>
                <Text style={styles.errorMessage}>
                  {this.state.wrongCredentials ? this.errorMessage() : ''}
                </Text>
              </View>

              <TextInput
                placeholder="Enter email/phone"
                placeholderTextColor="#fff"
                returnKeyType="go"
                keyboardType="email-address"
                autoCapitalize="none"
                autoFocus={true}
                underlineColorAndroid='transparent'
                ref={(input) => this.emailInput = input}
                style={styles.textInput} />

              <TouchableOpacity
                style={styles.buttonContainer}
                ref="loginButton"
                onPress={this.verifyEmail.bind(this, navigate)}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView> :

            <View>
              <Text style={styles.successMessage}>
                {this.state.successMessage ?
                  <Text>
                    <Text>{this.state.successMessage}</Text>
                    <Text style={{color: '#b71f6c', fontWeight: 'bold'}} onPress={() => this.emailInput.focus()}> Resend? </Text> 
                  </Text> : ''
                }
              </Text>
            </View>
        }
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
    marginBottom: 30
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
  errorMessage: {
    color: 'red',
    marginTop: -10,
    textAlign: 'center',
    fontSize: 18,
  },
  successMessage: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    margin: 20
  }
})
