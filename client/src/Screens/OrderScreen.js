import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { saveShipping  } from "../redux/actions/cartAction";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios"
import CheckoutSteps from "../components/CheckoutSteps";
import { detailsOrder, payOrder  } from "../redux/actions/orderAction";
import PaypalButton from './../components/PaypalButton';

const OrderScreen = (props) => {
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;
  
console.log(order, "order screennnnnnnnnn");
  const orderPay = useSelector(state => state.orderPay)
  const {loading: loadingPay, success: successPay, error: errorPay} = orderPay


const dispatch = useDispatch() 

const handleSuccessPayment = (paymentResult) => {
  dispatch(payOrder(order, paymentResult))
}



  useEffect(() => {
    if(successPay){
      props.history.push('/')
    } else {
      dispatch(detailsOrder(props.match.params.id))
     
    }

    return () => {
          
    }
   
   
}, [successPay])


 

  return loading ? (
    <div> loading ....</div>
  ) : error ? (
    <div> {error}</div>
  ) : (
    <div>
      <div className={order.orderItems.length === 0 ? "cart-empty" : "cart"}>
        <div className="cart-list">
          <div className="">
            <h3>Shipping</h3>
            <div>
              {order.shipping.address},{order.shipping.city},{order.shipping.postalCode},
              {order.shipping.country}
            </div>
            <div>
              {order.isDelivered
                ? "Delivered at" + order.deliveredAt
                : "Not Delivered"}
            </div>
            <div>
              <h3>Payment</h3>
              <div>Payment Method: {order.payment.paymentMethod}</div>
              <div>{order.isPaid ? "Paid at" + order.paidAt : "Not Paid"}</div>
            </div>
            <div>
              <ul className="cart-list-container">
                <li>
                  <h3>Shopping Cart</h3>
                  <h3>Price</h3>
                </li>
                {order.orderItems.length === 0 ? (
                  <div className="cart-empty-text">Cart Is Empty</div>
                ) : (
                  order.orderItems.map((item) => (
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
              <p>Items</p>
              <p> ${order.itemsPrice}</p>
            </li>

            <li className="cart-action-subTotal">
              <p>Shipping</p>
              <p> ${order.shippingPrice}</p>
            </li>

            <li className="cart-action-total">
              <p>Tax </p>
              <p>${order.taxPrice}</p>
            </li>

            <li className="cart-action-total">
              <p>Order Total </p>
              <p>${order.totalPrice}</p>
            </li>

            <li>
            {loadingPay && <div>Finishing Payment...</div>}
                {
                !order.isPaid && 
                <PaypalButton 
                amount={order.totalPrice} 
                onSuccess={handleSuccessPayment}
                />
                }
                
             
              
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
