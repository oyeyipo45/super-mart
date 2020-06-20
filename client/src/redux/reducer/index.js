import { combineReducers } from "redux";
import {productListReducer, productsDetailsReducer} from "./productReducer";

const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productsDetailsReducer
})


export default rootReducer;