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
import axios from 'axios'

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      wrongCredentials: '',
      successMessage: '',
      userId: '',
      passwordField: false ,
    }
  }

  static navigationOptions = {
    title: 'Recover Account'
  };

  fetchData(email) {
    var self = this;

    axios.get('http://10.0.2.2:3000/users')
      .then(function (response) {
        response.data.map((user) => {
          if(user['email_id'] == email) {
            self.setState({wrongCredentials: '', passwordField: true, userId: user['_id']})
          }
          else {
            self.setState({wrongCredentials: 'Account doesn\'t exist'})
          }
        });

        return true;
      })
      .catch(function (error) {
        return false
      });
  }

  updatePassword() {
    var userId = this.state.userId
    var password = this.passwordInput._lastNativeText

    axios.put('http://10.0.2.2:3000/users/' + userId, {password: password})
      .then(function (response){
        console.error(response)
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  verifyEmail() {
    var email = this.emailInput._lastNativeText
    this.setState({ successMessage: '' })

    if(email == null) {
      this.setState({wrongCredentials: 'Fields cannot be empty'})
    }

    else if (this.validateEmail(email)){
      this.fetchData(email)
      Keyboard.dismiss();
    }

    else
      this.setState({wrongCredentials: 'Enter correct input format'})

    this.emailInput.clear()
  }

  errorMessage() {
    return this.state.wrongCredentials
  }

  render() {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="never">

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../../images/logo.jpg')} />
        </View>
        {
          !this.state.passwordField ?
            <KeyboardAvoidingView style={styles.formContainer}>
              <Text style={styles.title}> Forgot your password ? Enter your email address below</Text>
              <View>
                <Text style={styles.errorMessage}>
                  {this.state.wrongCredentials ? this.errorMessage() : ''}
                </Text>
              </View>

              <TextInput
                placeholder="Enter email"
                placeholderTextColor="#fff"
                returnKeyType="send"
                keyboardType="email-address"
                autoCapitalize="none"
                autoFocus={true}
                underlineColorAndroid='transparent'
                ref={(input) => this.emailInput = input}
                style={styles.textInput} />

              <TouchableOpacity
                style={styles.buttonContainer}
                ref="loginButton"
                onPress={this.verifyEmail.bind(this)}>
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

               <TextInput
                placeholder="Enter password"
                placeholderTextColor="#fff"
                returnKeyType="send"
                autoCapitalize="none"
                autoFocus={true}
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                ref={(input) => this.passwordInput = input}
                style={styles.textInput} />

              <TouchableOpacity
                style={styles.buttonContainer}
                ref="loginButton"
                onPress={this.updatePassword.bind(this)}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
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
