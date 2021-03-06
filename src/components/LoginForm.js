import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View } from 'react-native';

import { Card, CardSection, Button, Spinner, Input, Header } from './common';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
  }
  onLoginSuccess(result) {
    console.log('Berhasil', result);
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false,
    })
  }
  onButtonPress() {
    const { email, password } = this.state
    console.log('Processing login..');

    this.setState({ error: '', loading: true })
    
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result) => this.onLoginSuccess(result))
      .catch((error) => {
        console.log('Gagal', error.code, error.message);
        this.setState({ error: error.message, loading: false })
      })
  }
  renderButton() {
    if (this.state.loading) {
      return <Spinner />
    }
    return (
      <Button onPress={ () => this.onButtonPress() }>
        Login
      </Button>
    )
  }
  render() { 
    return (
      <View>
        <Header title="Login" />
        <Card>
          <CardSection>
            <Input
              value={ this.state.email }
              onChangeText={ (email) => this.setState({ email }) }
              label="Email"
              placeholder="user@gmail.com" />
          </CardSection>
          <CardSection>
            <Input
              value={ this.state.password }
              onChangeText={ (password) => this.setState({ password }) }
              label="Password"
              placeholder="password"
              secureTextEntry />
          </CardSection>

          <Text style={{ fontSize: 18, color: 'red', alignSelf: 'center' }}>
            { this.state.error }
          </Text>

          <CardSection>
            { this.renderButton() }
          </CardSection>
        </Card>
      </View>
    );
  }
}
 
export default LoginForm;