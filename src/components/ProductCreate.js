import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Card, CardSection, Button } from './common';

import ProductForm from './ProductForm';

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
      <Card>
        <ProductForm />
        <CardSection>
          <Button onPress={ () => this.onButtonPress() }>
            Save
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mstp = (state) => ({ form: state.productForm })
 
export default connect(mstp)(ProductCreate);