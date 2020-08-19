import React from 'react';
import { Route } from "react-router-dom";
import HomeScreen from "./../screens/HomeScreen";
import ProductScreen from "./../screens/ProductScreen";
import SignInScreen from "./../screens/SignInScreen";
import CartScreen from './../screens/CartScreen';
import SignUpScreen from './../screens/SiginUpScreen';

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
        </div>
      </main>
        </div>
    )
}

export default Body


