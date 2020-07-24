import { combineReducers } from "redux";
import {productListReducer, productsDetailsReducer} from "./productReducer";
import cartReducer from './cartReducer';
import { userSigninReducer } from './userReducer';

const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productsDetailsReducer,
    cart: cartReducer,
    userSignIn: userSigninReducer
})


export default rootReducer;