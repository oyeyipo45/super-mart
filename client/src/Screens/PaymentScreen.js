import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { savePayment } from "../redux/actions/cartAction";
import { clearErrors } from "../redux/actions/errorAction";
import CheckoutSteps from "../components/CheckoutSteps";



const PaymentScreen = (props) => {
    const [paymentMethod, setPaymentMethod] = useState("");
   
    const [message, setErrorMessage] = useState(null);
  
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
    const error = useSelector((state) => state.error);
  
    const dispatch = useDispatch();
  
    const submitHandler = (e) => {
      if (paymentMethod || "") {
        return e.preventDefault(alert("Please Fill Fields"));
      } else {
        e.preventDefault();
      }
  
      //SIGN IN USER
      const newUser = {
       paymentMethod
      };
  
      dispatch(clearErrors());
  
      //REGISTER USER
      dispatch(savePayment({paymentMethod}));
      //REDIRECT USER TO PAYMENT
      props.history.push("/payment")
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
    }, [error.message.message, isAuthenticated]);
  
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
                {/* <li>
                  {error.id ? (
                    <div className="alert alert-danger alert-dismissible fade show">
                      <button
                        type="button"
                        onClick={clearErrorAlert}
                        className="close"
                        data-dismiss="alert"
                      >
                        &times;
                      </button>
                      {error.message.message}
                    </div>
                  ) : null}
                </li> */}
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
                  <Link to="/placeOrder" ><button type="submit" className="signin-button">
                    Continue
                  </button></Link>
                </li>
               
              </ul>
            </form>
          </div>
        </div>
    )
}

export default PaymentScreen
