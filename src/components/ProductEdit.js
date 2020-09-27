import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Card, CardSection, Button, Header } from './common';

import ProductForm from './ProductForm';
import { View } from 'react-native';

class ProductEdit extends Component {
  onButtonPress() {
    const data = this.props.form
    const url = 'https://simple-ecommerce-9999.herokuapp.com/api/v1/product/' + data.id

    axios.patch(url, data)
      .then(() => {
        this.props.dispatch({ type: 'RESET_PRODUCT' })
        this.props.navigation.navigate('Product List')
      })
  }
  onButtonDeletePress() {
    const data = this.props.form
    const url = 'https://simple-ecommerce-9999.herokuapp.com/api/v1/product/' + data.id

    axios.delete(url)
      .then(() => {
        this.props.dispatch({ type: 'RESET_PRODUCT' })
        this.props.navigation.navigate('Product List')
      })
  }
  render() { 
    return (
      <View>
        <Header title="Edit Product" />
        <Card>
          <ProductForm />
          <CardSection>
            <Button onPress={ () => this.onButtonPress() }>
              Edit
            </Button>
          </CardSection>
          <CardSection>
            <Button onPress={ () => this.onButtonDeletePress() }>
              Delete
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

const mstp = (state) => ({ form: state.productForm })
 
export default connect(mstp)(ProductEdit);