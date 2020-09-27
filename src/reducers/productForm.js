const initialState = {
  id_category: '',
  name: '',
  price: '',
  image: '',
  actionLink: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCT_FIELD':
      return {...state, [action.payload[0]]: action.payload[1]}
    case 'SET_PRODUCT':
      return {...state, ...action.payload}
    case 'RESET_PRODUCT':
      return initialState
    default:
      return state
  }
}