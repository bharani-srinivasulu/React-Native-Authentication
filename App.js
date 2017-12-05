/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image } from 'react-native';
import LoginPage from './src/components/LoginPage';
import SignUpPage from './src/components/SignUpPage';
import {StackNavigator} from 'react-navigation';

class App extends Component {
  static navigationOptions = {
    title: 'Welcome Page',
    headerLeft: null
  };

  render() {
    return (
      <View style={styles.viewstyle}>
        <Text style={styles.textstyle}>
          Welcome to Banksy! Explore here
        </Text>
        <Image style={styles.logo} source={require('./images/logo.jpg')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewstyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textstyle: {
    color: '#ab1969',
  },
  logo: {
    width: 500,
    height: 500,
  }
})

const Navigation = StackNavigator({
  Login: { screen: LoginPage },
  SignUp: { screen: SignUpPage },
  Welcome_Page: {screen: App},
});

export default Navigation;
