import React from 'react';
import { Route } from "react-router-dom";
import ProductScreen from "../screens/productScreen";
import SignInScreen from "../screens/signInScreen";
import CartScreen from '../screens/cartScreen';
import SignUpScreen from '../screens/siginUpScreen';
import HomeScreen from '../screens/homeScreen';

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


