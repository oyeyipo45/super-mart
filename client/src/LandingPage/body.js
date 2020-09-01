import React from 'react';
import { Route } from "react-router-dom";
import productScreen from "../screens/productScreen";
import signInScreen from "../screens/signInScreen";
import cartScreen from '../screens/cartScreen';
import signUpScreen from '../screens/siginUpScreen';
import homeScreen from '../screens/homeScreen';

const Body = () => {
    return (
        <div>
          <main className="main">
        
        <div className="content">
          <Route path="/" exact={true} component={homeScreen} />
          <Route path="/product/:id" component={productScreen} />
          <Route path="/cart/:id?" component={cartScreen} />
          <Route path="/signin" component={signInScreen} />
          <Route path="/signup" component={signUpScreen} />
        </div>
      </main>
        </div>
    )
}

export default Body


