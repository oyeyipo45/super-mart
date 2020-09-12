import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_SUCCESS,
} from "../constants/productConstants";
import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";

import axios from "axios";
import { returnErrors } from "./errorAction";
import { tokenConfig } from "./authActions";

const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const detailsProduct = (productId) => async (dispatch, getState) => {
   console.log(tokenConfig(getState));
  
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get(`/api/products/${productId}` , tokenConfig(getState));
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

const createProduct = (createproduct) => async (dispatch, getState) => {
  

  //REQUEST BODY
  const product = JSON.stringify(createproduct);

  // console.log(product, "product request");
  dispatch({ type: CREATE_PRODUCT_REQUEST });

  axios
    .post("api/products/", product, tokenConfig(getState))
    .then(
      (res) => 
      dispatch({ 
        type: CREATE_PRODUCT_SUCCESS,
         payload: res.data 
      }),
      
    )

    .catch((error) => {
      dispatch(
        returnErrors(
          error.response.data,
          error.response.status,
          "CREATE_PRODUCT_FAIL"
        )
      );
      dispatch({ type: CREATE_PRODUCT_FAIL });
    });
};

export { listProducts, detailsProduct, createProduct };
