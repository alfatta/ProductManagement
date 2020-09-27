import React, { Component } from 'react';
import firebase from 'firebase';

import { Card, CardSection, Button } from './common';

class Logout extends Component {
  render() { 
    return (
      <Card>
        <CardSection>
          <Button onPress={ () => firebase.auth().signOut() }>
            Logout
          </Button>
        </CardSection>
      </Card>
    );
  }
}
 
export default Logout;