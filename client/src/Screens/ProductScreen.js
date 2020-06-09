import React from "react";
import data from "../data/data";
import { Link } from "react-router-dom";

function ProductScreen(props) {
  console.log(props.match.params.id);

  const product = data.products.find(
    (clickedProduct) => clickedProduct._id === props.match.params.id
  );
  console.log(product.image);

  return (
    <div>
      <div className="back-to-results">
        <Link to="/">Return Back To Results</Link>
      </div>
      <div className="details">
        <div className="product-brand">
          <img src={product.image} alt="products" />
        </div>

        <div className="details-info">
          <ul >
            <li>
              <h4>{product.name}</h4>
            </li>

            <li>
              {product.rating} Stars ({product.numReviews} Reviews){" "}
            </li>
            <li>
              <b>Price: ${product.price}</b>
            </li>
            <li>
              Description:
              <div>{product.description}</div>
            </li>
          </ul>
        </div>
        <div className="details-action">
          <ul>
            <li>Price: {product.price}</li>
            <li>Status: {product.price}</li>
            <li>Qty: <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                    </select>
                    </li>
                    <li>
                        <button className="button">Add To Cart</button>
                    </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
