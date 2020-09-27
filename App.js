import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Header } from './src/components/common';
import LoginForm from './src/components/LoginForm';
import Logout from './src/components/Logout';
import ProductList from './src/components/ProductList';

import config from './src/config';

const Drawer = createDrawerNavigator()

class App extends Component {
  state = {
    loggedIn: false
  }
  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config.firebaseConfig)
    }

    firebase.auth().onAuthStateChanged(user => {
      this.setState({ loggedIn: !!user })
    })
  }
  render() { 
    return (
      <NavigationContainer>
        <Header title="Product Management" />
        <Drawer.Navigator>
          { this.state.loggedIn ? 
            <>
              <Drawer.Screen name="Product List" component={ ProductList } />
              <Drawer.Screen name="Logout" component={ Logout } />
            </>
          :
            <>
              <Drawer.Screen name="Login" component={ LoginForm } />
            </>
          }
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
 
export default App;