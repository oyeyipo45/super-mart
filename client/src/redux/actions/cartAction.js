import  axios  from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "./../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        id: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      }
    });
  } catch (error) {
    console.log(error);
  }
};


export const removeFromCart = (productId) => dispatch => {
    dispatch({type :CART_REMOVE_ITEM,
    payload: productId
  });
}

