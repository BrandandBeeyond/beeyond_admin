
import { serverApi } from '../../config/serverApi'
import {
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
} from '../constants/OrderConstant'

export const getOrders = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDER_REQUEST })

    const response = await fetch(`${serverApi}/orders`)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: data.orders,
    })
  } catch (error) {
    dispatch({
      type: GET_ORDER_FAIL,
      payload: error.message,
    })
  }
}

export const updateOrderStatus = (orderId, status) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST })

    const response = await fetch(`${serverApi}/admin/order/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    })

    if (!response.ok) {
      throw new Error(`Failed to update status. HTTP status: ${response.status}`)
    }

    const data = await response.json()

    dispatch({
      type: UPDATE_ORDER_STATUS_SUCCESS,
      payload: data.order,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_STATUS_FAIL,
      payload: error.message,
    })
  }
}
