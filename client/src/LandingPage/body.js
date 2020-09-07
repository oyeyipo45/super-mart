import React from 'react';
import { Route } from "react-router-dom";
import ProductScreen from "../screens/productScreen";
import SignInScreen from "../screens/signInScreen";
import CartScreen from '../screens/cartScreen';
import SignUpScreen from '../screens/signUpScreen';
import HomeScreen from '../screens/homeScreen';
import createProductScreen from './../screens/createProductScreen';

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
          <Route path="/createProduct/" component={createProductScreen} />
        </div>
      </main>
        </div>
    )
}

export default Body


