import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';

import ProductItem from './ProductItem'

class ProductList extends Component {
  state = {
    products: []
  }

  componentDidMount() {
    const url = 'https://simple-ecommerce-9999.herokuapp.com/api/v1/product'

    console.log('Request to', url);
    
    axios.get(url)
      .then(({ data }) => {
        console.log('Result', data);
        this.setState({ products: data.data })
      })
      .catch(error => {
        console.log('Error', error.message);
      })
  }

  renderProducts() {
    return this.state.products.map(product => 
      <ProductItem product={ product } key={ product.id } />
    )
  }

  render() { 
    return (
      <ScrollView>
        { this.renderProducts() }
      </ScrollView>
    );
  }
}
 
export default ProductList;
