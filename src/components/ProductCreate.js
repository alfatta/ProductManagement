import React, { Component } from 'react';

import { Card } from './common';

import ProductForm from './ProductForm';

class ProductCreate extends Component {
  render() { 
    return (
      <Card>
        <ProductForm />
      </Card>
    );
  }
}
 
export default ProductCreate;