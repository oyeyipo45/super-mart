import { CART_ADD_ITEM, CART_REMOVE_ITEM} from "./../constants/cartConstants";

const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
        const item = action.payload; 
        console.log("item >>>>", item);
        
        console.log(state.cartItems);
        
        const product = state.cartItems.find(product => product.id === item.id)
        
        
        if(product){
            return { cartItems: state.cartItems.map(itemFound => itemFound.id === product.id ? item : itemFound)}
        }
        return {cartItems: [...state.cartItems, item]}
      case CART_REMOVE_ITEM:
        const cartArr = [...state.cartItems]
        const updatedArr = cartArr.filter(item => item.id !== action.payload)
        return {
          updatedArr
        }
    
        default:
        return state;
  }
};


export default cartReducer;