import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Linking } from 'react-native';
import { connect } from 'react-redux';

import { Card, CardSection, Button } from './common'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const style = StyleSheet.create({
  image: {
    height: 300,
    flex: 1
  },
  name: {
    flex: 1,
    fontSize: 18
  },
  price: {
    fontSize: 18,
    color: 'navy',
    textAlign: 'right',
    width: 100
  }
})

class ProductItem extends Component {
  getPriceFormatted(price) {
    if (price) {
      const priceFormatted = price // 50000
        .toString()                // '50000'
        .split('')                 // ['5','0','0','0','0']
        .reverse()                 // ['0','0','0','0','5']
        .reduce((a, c, i) => c + (i && i % 3 == 0 ? '.' : '') + a, '')
        // ''
        // 0 -> '0'
        // 1 -> '00'
        // 2 -> '000'
        // 3 -> '0.000'
        // 4 -> '50.000'
      return `Rp${priceFormatted}`
    } else {
      return 'Rp0'
    }
  }

  onEditPress() {
    console.log('Edit product');
    this.props.dispatch({ type: 'SET_PRODUCT', payload: this.props.product })
    this.props.navigation.navigate('Edit Product')
  }

  render() { 
    const { name, price, image, actionLink } = this.props.product

    return (
      <Card>
        <CardSection>
          <TouchableWithoutFeedback onPress={ () => this.onEditPress() }>
            <Text>Edit</Text>
          </TouchableWithoutFeedback>
        </CardSection>
        <CardSection>
          <Image style={ style.image } source={ {uri: image} } />
        </CardSection>
        <CardSection>
          <Text style={ style.name }>
            { name }
          </Text>
          <Text style={ style.price }>
            { this.getPriceFormatted(price) }
          </Text>
        </CardSection>
        <CardSection>
          <Button onPress={ () => Linking.openURL(actionLink) }>
            Buy now
          </Button>
        </CardSection>
      </Card>
    );
  }
}
 
export default connect()(ProductItem);