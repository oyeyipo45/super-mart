import axios from "axios";
import { returnErrors } from "./errorAction";
import { tokenConfig } from "./authActions";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,

} from "./../constants/orderConstants";

const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    console.log(order);

    const {
      data: { data: newOrder },
    } = await axios.post("api/orders", order, tokenConfig(getState));

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
  } catch (error) {
    //  dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
};

const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });

    const { data } = await axios.get(
      "/api/orders/" + orderId,
      tokenConfig(getState)
    );

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
  }
};

const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST,
       payload: paymentResult });

       console.log(paymentResult, "payresultttttt");
    const { data } = await axios
    .put(
      "/api/orders/" +
       order._id +
       "/pay" ,
       paymentResult,
      tokenConfig(getState)
    );

    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    console.log(data, "dataaaaaaaaa");
  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
  }
};






export { createOrder, detailsOrder, payOrder };
