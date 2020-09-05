import { combineReducers } from "redux";
import {productListReducer, productsDetailsReducer} from "./productReducer";
import cartReducer from './cartReducer';
import { authReducer } from './authReducer';
import { errorReducer } from './errorReducer';



const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productsDetailsReducer,
    cart: cartReducer,
    auth: authReducer,
    error: errorReducer 
})


export default rootReducer;