import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Card, CardSection, Button } from './common';

import ProductForm from './ProductForm';
import { View } from 'react-native';
import { Header } from './common';

class ProductCreate extends Component {
  onButtonPress() {
    const url = 'https://simple-ecommerce-9999.herokuapp.com/api/v1/product'
    const data = this.props.form

    axios.post(url, data)
      .then(() => {
        this.props.dispatch({ type: 'RESET_PRODUCT' })
        this.props.navigation.navigate('Product List')
      })
  }
  render() { 
    return (
      <View>
        <Header title="Add New Product" />
        <Card>
          <ProductForm />
          <CardSection>
            <Button onPress={ () => this.onButtonPress() }>
              Save
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

const mstp = (state) => ({ form: state.productForm })
 
export default connect(mstp)(ProductCreate);