import axios from "axios";
import { returnErrors } from "./errorAction";
import { tokenConfig } from "./authActions";
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL } from './../constants/orderConstants';


 const createOrder = (order) =>  async (dispatch, getState) => {

   console.log(order, "orderrrrrrrrrr");
   try {
    dispatch({type: ORDER_CREATE_REQUEST, payload: order})
    const {data: {data: newOrder}} = await axios.post("api/orders", order, tokenConfig(getState))

    dispatch({type: ORDER_CREATE_SUCCESS, payload: newOrder})

   } catch (error) {
   //  dispatch(returnErrors(error.response.data, error.response.status));
       dispatch({type: ORDER_CREATE_FAIL, payload: error.message})
   }

}

export {createOrder}



