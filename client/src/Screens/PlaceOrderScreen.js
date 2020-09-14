import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { saveShipping  } from "../redux/actions/cartAction";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrderScreen = (props) => {
  const cart = useSelector((state) => state.cart);

  const { cartItems, shipping, payment } = cart;

  console.log(shipping);

  const dispatch = useDispatch();

  useEffect(() => {
   
    if(!shipping.address) {
        props.history.push("/payUp")
    }

    if(!payment.paymentMethod) {
        props.history.push("/payment")
    }
      // dispatch(saveShipping());
    
  }, []);

 
  const checkoutHandler = () => {
    props.history.push(`/signin?redirect=shipping`);
  };

  return (
      <div >
          <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
    <div className={cartItems.length === 0 ? "cart-empty" : "cart"}>
      <div className="cart-list">
          <div className="">
            <h3>
                Shipping
            </h3>
            <div>
                {shipping.address} ,
                 {shipping.city} ,
                 {shipping.postalCode} ,
                 {shipping.country}
            </div>
            <div>
                <h3>Payment</h3>
            <div>
            Payment Method: {payment.paymentMethod}
            </div>
            </div>
            <div>
            <ul className="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <h3>Price</h3>
          </li>
          {cartItems.length === 0 ? (
            <div className="cart-empty-text">Cart Is Empty</div>
          ) : (
            cartItems.map((item) => (
              <li key={item.id}>
                <div className="cart-image">
                  <img src={item.image} alt="product" />
                </div>

                <div className="cart-name">
                  <div>
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </div>
                  <div className="cart-qty">
                    <div>
                      Qty:
                  {item.qty}
                    </div>


          
                  </div>
                </div>
                <div className="cart-price">${item.price}</div>
              </li>
            ))
          )}
        </ul>
            </div>

          </div>
       
      </div>

      <div className="placeOrder-action">
        <ul>
          <li className="cart-action-summary">
            <h3>Summary</h3>
          </li>

          <li className="cart-action-subTotal">
            <p>
              Sub Total ( {cartItems.reduce((a, c) => a + Number(c.qty), 0)}{" "}
              items)
            </p>
            <p> ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</p>
          </li>

          <li className="cart-action-total">
            <p>VAT </p>
            <p>${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</p>
          </li>

          <li className="cart-action-total">
            <p>Total </p>
            <p>${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</p>
          </li>

          <li>
            <button
              onClick={checkoutHandler}
              className="full-width button primary"
              disabled={cartItems.length === 0}
            >
              Proceed To Checkout
            </button>
          </li>
        </ul>
      </div>
    </div>
      </div>
  );
};

export default PlaceOrderScreen;
