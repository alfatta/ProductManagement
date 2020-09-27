import React, { Component } from 'react';
import firebase from 'firebase';

import { Card, CardSection, Button, Header } from './common';
import { View } from 'react-native';

class Logout extends Component {
  render() { 
    return (
      <View>
        <Header title="Logout" />
        <Card>
          <CardSection>
            <Button onPress={ () => firebase.auth().signOut() }>
              Logout
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}
 
export default Logout;