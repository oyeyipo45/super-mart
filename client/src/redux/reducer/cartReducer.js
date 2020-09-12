import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from "./../constants/cartConstants";

const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const product = state.cartItems.find((product) => product.id === item.id);

      if (product) {
        return {
          cartItems: state.cartItems.map((itemFound) =>
            itemFound.id === product.id ? item : itemFound
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };
    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case CART_SAVE_SHIPPING:
      return {
        ...state,
        shipping: action.payload,
      };
    case CART_SAVE_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
