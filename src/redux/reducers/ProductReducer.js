import { FETCH_PRODUCTS_FAIL, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from '../constants/ProductConstant';

const initialState = {
  products: [],
  loading: false,
  error: null
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
    case UPDATE_PRODUCT_REQUEST: 
      return {
        ...state,
        loading: true
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload
      };

    case UPDATE_PRODUCT_SUCCESS:
    return{
       ...state,
       loading: false,
       products:state.products.map((product) =>
         product._id === action.payload._id ? { ...product, ...action.payload } : product
       )
    }
    case FETCH_PRODUCTS_FAIL:
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
