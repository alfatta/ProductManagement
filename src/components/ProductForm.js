import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { CardSection, Input, InputPicker } from './common';

class ProductForm extends Component {
  state = {
    categoryList: []
  }
  componentDidMount() {
    if (this.props.hasCategory) {
      this.setState({ categoryList: this.props.categoryList })
    } else {
      axios.get('https://simple-ecommerce-9999.herokuapp.com/api/v1/category')
      .then(({ data }) => {
        console.log(data.data);
        this.setState({ categoryList: data.data })
        this.props.setCategory(data.data)
      })
    }
  }
  render() { 
    const pickerData = this.state.categoryList.map(item => {
      return {
        label: item.name,
        value: item.id
      }
    })
    return (
      <>
        <CardSection>
          <Input
            value={ this.props.form.name }
            onChangeText={ (val) => this.props.setForm('name', val) }
            label="Name"
            placeholder="Product Name" />
        </CardSection>
        <CardSection>
          <Input
            value={ this.props.form.price }
            onChangeText={ (val) => this.props.setForm('price', val) }
            label="Price"
            placeholder="Product Price" />
        </CardSection>
        <CardSection>
          <Input
            value={ this.props.form.image }
            onChangeText={ (val) => this.props.setForm('image', val) }
            label="Image"
            placeholder="https://..." />
        </CardSection>
        <CardSection>
          <Input
            value={ this.props.form.actionLink }
            onChangeText={ (val) => this.props.setForm('actionLink', val) }
            label="Action Link"
            placeholder="https://..." />
        </CardSection>
        <CardSection>
          <InputPicker
            selectedValue={ this.props.form.id_category }
            onValueChange={ (val) => this.props.setForm('id_category', val) }
            label="Category"
            data={ pickerData } />
        </CardSection>
      </>
    );
  }
}

const mstp = (state) => {
  return {
    hasCategory: state.categoryList.hasCategory,
    categoryList: state.categoryList.categoryList,
    form: state.productForm
  }
}

const mdtp = (dispatch) => {
  return {
    setCategory: (category) => dispatch({ type: 'SET_CATEGORY_LIST', payload: category }),
    setForm: (key, value) => dispatch({ type: 'SET_PRODUCT_FIELD', payload: [key, value] }),
  }
}

export default connect(mstp, mdtp)(ProductForm);