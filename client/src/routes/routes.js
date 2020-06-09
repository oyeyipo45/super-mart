import React from 'react';
import { Route } from "react-router-dom";
import HomeScreen from './../Screens/HomeScreens';
import ProductScreen from './../Screens/ProductScreen';



const Routes =  [
  {ProductScreen: <Route path="/products/:id" component={ProductScreen} />},
{HomeScreen: <Route path="/" exact component={true} component={HomeScreen} />}
]
    
        
        
    



export default Routes;