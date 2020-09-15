import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { savePayment } from "../redux/actions/cartAction";
import { clearErrors } from "../redux/actions/errorAction";
import CheckoutSteps from "../components/CheckoutSteps";



const PaymentScreen = (props) => {
    const [paymentMethod, setPaymentMethod] = useState("");
   
    const [message, setErrorMessage] = useState(null);
    const error = useSelector((state) => state.error);
  
    const dispatch = useDispatch();
  
    const submitHandler = (e) => {
   
        e.preventDefault();
      
  //REGISTER USER
  dispatch(savePayment({paymentMethod}));
      
  
      // dispatch(clearErrors());
  
      
      //REDIRECT USER TO PLACEORDER
      props.history.push("/placeOrder")
    };
  
    // const redirect = props.location.search ? props.location.search.split("=")[1] : "/"
    
    useEffect(() => {
      if (error.id === "LOGIN_FAIL") {
        setErrorMessage({ message: error.message.message });
      } else {
        setErrorMessage({ message: null });
      }
  
      //IF AUTHENTICATED REDIRECT TO HOME
    //   if (isAuthenticated) {
    //     return props.history.push(redirect);
    //   }
   
      return () => {};
    }, []);
  
    const clearErrorAlert = () => {
      dispatch(clearErrors());
    };
    return (
        <div >
            <CheckoutSteps step1 step2 step3>
            
            </CheckoutSteps>
            <div className="form signin-form">
            <form onSubmit={submitHandler}>
              <ul className="form-container ">
                <li>Payment</li>
               
                <li className="email-container">
                 <div>
                 <label htmlFor="paymentMethod">Paypal:</label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="paymentMethod"
                    value="paypal"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></input>
                 </div>
                </li>
                
                
                <li>
                  <button type="submit" className="signin-button">
                    Continue
                  </button>
                </li>
               
              </ul>
            </form>
          </div>
        </div>
    )
}

export default PaymentScreen
