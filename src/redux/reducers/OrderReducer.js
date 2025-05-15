import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, UPDATE_ORDER_STATUS_FAIL, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from "../constants/OrderConstant";

  const initialState = {
    loading: false,
    orders: [],
    error: null,
  };
  
  export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_ORDER_REQUEST:
      case GET_ORDER_REQUEST:
      case UPDATE_ORDER_STATUS_REQUEST:
        return { ...state, loading: true };
  
      case CREATE_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          orders: action.payload,
          error: null,
        };
  
      case GET_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          orders: action.payload,
          error: null,
        };
  
      case UPDATE_ORDER_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
          // Optional: update the specific order in the list
          orders: state.orders.map(order =>
            order._id === action.payload._id ? action.payload : order
          ),
          error: null,
        };
  
      case CREATE_ORDER_FAIL:
      case GET_ORDER_FAIL:
      case UPDATE_ORDER_STATUS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  