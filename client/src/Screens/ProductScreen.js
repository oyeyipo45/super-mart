import React, {useState, useEffect} from "react";
import {useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import { detailsProduct } from "../redux/actions/actions";

const ProductScreen = (props) => {
  const [qty,  setQty] = useState(1)
  const productDetails = useSelector(state => state.productDetails)
  
  const { product, loading, error } = productDetails;
  console.log(productDetails);
  
  
  const dispatch = useDispatch()
  

  useEffect( ( ) => {
    dispatch(detailsProduct(props.match.params.id))
   return () => {

  };
},[])

 const handleAddToCart = () => {
   props.history.push(`/cart/${props.match.params.id}?qty=${qty}`)
 }

  return (
    
    <div>
      <div className="back-to-results">
        <Link to="/">Return Back To Results</Link>
      </div>
      { loading  ? <div> loading .. </div> :
    error ?  <div> { error }</div> :

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
            <li>Qty: <select value={qty} onChange={(e) => setQty(e.target.value)}>
                {[...Array(product.countInStock).keys()].map(totalInStock =>
                  <option key={totalInStock + 1} value={ totalInStock + 1}> {totalInStock + 1} </option>
                  )}
                    </select>
                    </li>
                    <li>
                        <button className="button" onClick={handleAddToCart}>Add To Cart</button>
                    </li>
          </ul>
        </div>
      </div>
    }
      
    </div>
  );
}

export default ProductScreen;
