import { serverApi } from '../../config/serverApi';
import { FETCH_PRODUCTS_FAIL, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS } from '../constants/ProductConstant';

export const fetchAllProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });
  try {
    const response = await fetch(`${serverApi}/products`);
    const data = await response.json(); // Parse JSON response

    console.log("Data received in action:", data); // ✅ Log to check data

    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data.products });
  } catch (error) {
    console.error("Error in fetchAllProducts:", error); // Optional: log the error
    dispatch({
      type: FETCH_PRODUCTS_FAIL,
      payload: error.message || 'Something went wrong'
    });
  }
};
