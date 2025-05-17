import { serverApi } from '../../config/serverApi';
import { FETCH_PRODUCTS_FAIL, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from '../constants/ProductConstant';

export const fetchAllProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });
  try {
    const response = await fetch(`${serverApi}/products`);
    const data = await response.json(); // Parse JSON response

    console.log("Data received in action:", data); 

    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data.products });
  } catch (error) {
    console.error("Error in fetchAllProducts:", error);
    dispatch({
      type: FETCH_PRODUCTS_FAIL,
      payload: error.message || 'Something went wrong'
    });
  }
};


export const updateProduct = (productId, updatedData) => async (dispatch) => {

  dispatch({ type: UPDATE_PRODUCT_REQUEST });
  try {
    const response = await fetch(`${serverApi}/admin/product/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });

    if (!response.ok) {
      throw new Error('Failed to update product');
    }

    const data = await response.json();

    console.log("Data received in updateProduct action:", data);
    
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error in updateProduct:", error);
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.message || 'Something went wrong'
    });
  }
  
 }
