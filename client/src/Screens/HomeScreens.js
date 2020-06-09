import React, { Component } from "react";
import data from "../data/data";
import { Link } from "react-router-dom"




const HomeScreen = (props) => {
  return (
    <ul className="products">
      {data.products.map((product) => (
        <li key={product._id}>
          <div className="product">
          <Link to={`/product/${product._id}`}> <img className="product-image" src={product.image} alt="products" /></Link>
           
            <div className="product-name">
              <Link to={`/product/${product._id}`}>{product.name}</Link>
            </div>
            <div className="product-brand">{product.price}</div>
            <div className="product-price"> {product.price}</div>
            <div className="product-rating">
              {product.rating} Stars ({product.numReviews} Reviews){" "}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default HomeScreen;
