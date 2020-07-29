import React from 'react';
import { Route, Link } from "react-router-dom";
import HomeScreen from "./../screens/HomeScreen";
import ProductScreen from "./../screens/ProductScreen";
import SignInScreen from "./../screens/SignInScreen";
import CartScreen from './../screens/CartScreen';

const Body = () => {
    return (
        <div>
          <main className="main">
        
        <div className="content">
          <Route path="/" exact={true} component={HomeScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/signin" component={SignInScreen} />
        </div>
      </main>
        </div>
    )
}

export default Body


