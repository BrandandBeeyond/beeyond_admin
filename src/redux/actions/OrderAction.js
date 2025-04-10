// OrderAction.js
import axios from "axios";
import { serverApi } from "../../config/serverApi";
import { GET_ORDER_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from "../constants/OrderConstant";

export const getOrders = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDER_REQUEST });

    const response = await fetch(`${serverApi}/orders`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: data.orders,
    });

  
  } catch (error) {
    dispatch({
      type: GET_ORDER_FAIL,
      payload: error.message,
    });

    
  }
};
