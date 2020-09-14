import React from 'react';
import { Route } from "react-router-dom";
import ProductScreen from "../screens/ProductScreen";
import SignInScreen from "../screens/SignInScreen";
import CartScreen from '../screens/CartScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import ShippingScreen from '../screens/ShippingScreen';
import CreateProductScreen from '../screens/CreateProductScreen';
import paystackPaymentScreen from '../screens/PaystackPaymentScreen';
import PaymentScreen from '../screens/PaymentScreen';
import PlaceOrderScreen from '../screens/PlaceOrderScreen';

const Body = () => {
    return (
        <div>
          <main className="main">
        
        <div className="content">
          <Route path="/" exact={true} component={HomeScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/signin" component={SignInScreen} />
          <Route path="/signup" component={SignUpScreen} />
          <Route path="/placeOrder" component={PlaceOrderScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/createProduct/" component={CreateProductScreen} />
          <Route path="/payment/" component={PaymentScreen} />
          <Route path="/payStack-payment/" component={paystackPaymentScreen} />
        </div>
      </main>
        </div>
    )
}

export default Body


