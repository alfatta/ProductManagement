import { combineReducers } from 'redux';

import productForm from './productForm'
import categoryList from './categoryList'

export default combineReducers({
  productForm,
  categoryList,
})