import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { Header } from './src/components/common';
import LoginForm from './src/components/LoginForm';
import Logout from './src/components/Logout';
import ProductList from './src/components/ProductList';
import ProductCreate from './src/components/ProductCreate';

import config from './src/config';

import reducers from './src/reducers';
import ProductEdit from './src/components/ProductEdit';

const Drawer = createDrawerNavigator()

const store = createStore(reducers)

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
      <Provider store={ store }>
        <NavigationContainer>
          <Drawer.Navigator>
            { this.state.loggedIn ? 
              <>
                <Drawer.Screen name="Product List" component={ ProductList } />
                <Drawer.Screen name="Add New Product" component={ ProductCreate } />
                <Drawer.Screen name="Logout" component={ Logout } />
                <Drawer.Screen
                  name="Edit Product"
                  component={ ProductEdit }
                  options={{
                    drawerLabel: () => null,
                    title: null,
                    drawerIcon: () => null
                  }} />
              </>
            :
              <>
                <Drawer.Screen name="Login" component={ LoginForm } />
              </>
            }
          </Drawer.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
 
export default App;