import { combineReducers } from "redux";
import {productListReducer, productsDetailsReducer} from "./productReducer";
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productsDetailsReducer,
    cart: cartReducer
})


export default rootReducer;