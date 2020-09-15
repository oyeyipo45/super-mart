import { combineReducers } from "redux";
import {productListReducer, productsDetailsReducer, createProductReducer} from "./productReducer";
import cartReducer from './cartReducer';
import { authReducer } from './authReducer';
import { errorReducer } from './errorReducer';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from "./orderReducers";



const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productsDetailsReducer,
    cart: cartReducer,
    auth: authReducer,
    error: errorReducer,
    createProduct: createProductReducer,
    orderCreate : orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer
})


export default rootReducer;