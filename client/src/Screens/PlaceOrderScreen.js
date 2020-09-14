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
        props.history.push("/shipping")
    } else if (!payment.paymentMethod) {
        props.history.push("/payment")
    }
      // dispatch(saveShipping());
    
  }, []);

  const itemsPrice = cartItems.reduce((a,c) => a + c.price * c.qty, 0)
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const  taxPrice = 0.15 * itemsPrice;
  const totalPrice  = itemsPrice +shippingPrice + taxPrice
 
  const placeOrderHandler = () => {
    //CREATE AN ORDER
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
                {shipping.address}, 
                 { shipping.city},  
                 { shipping.postalCode}, 
                 { shipping.country}
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
            <h3>Order Summary</h3>
          </li>

          <li className="cart-action-subTotal">
            <p>
             Items
            </p>
            <p> ${itemsPrice}</p>
          </li>

          <li className="cart-action-subTotal">
            <p>
            Shipping
            </p>
            <p> ${shippingPrice}</p>
          </li>

          <li className="cart-action-total">
            <p>Tax </p>
            <p>${taxPrice}</p>
          </li>

          <li className="cart-action-total">
            <p>Order Total </p>
            <p>${totalPrice}</p>
          </li>

          <li>
            <button
              onClick={placeOrderHandler}
              className="full-width button primary"
              
            >
              Place Order
            </button>
          </li>
        </ul>
      </div>
    </div>
      </div>
  );
};

export default PlaceOrderScreen;
