import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { saveShipping } from "../redux/actions/cartAction";
import { clearErrors } from "../redux/actions/errorAction";
import CheckoutSteps from "../components/CheckoutSteps";



const ShippingScreen = (props) => {
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [message, setErrorMessage] = useState(null);
  
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
    const error = useSelector((state) => state.error);
  
    const dispatch = useDispatch();
  
    const submitHandler = (e) => {
      if (address === "" || postalCode === "" || city === "" || country === "") {
        return e.preventDefault(alert("Please Fill Fields"));
      } else {
        e.preventDefault();
      }
  
      //SIGN IN USER
      const userAddress = {
        address,
        city,
        postalCode,
        country,
      };
  
      dispatch(clearErrors());
  
      //REGISTER USER
      dispatch(saveShipping(userAddress));
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
        <div>
            <CheckoutSteps step1 step2 >
            
            </CheckoutSteps>
            <div className="form signin-form">
            <form onSubmit={submitHandler}>
              <ul className="form-container ">
                <li>Shipping</li>
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
                  <label htmlFor="address">Address:</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}
                  ></input>
                </li>
                <li className="email-container">
                  <label htmlFor="city">City:</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="City"
                    onChange={(e) => setCity(e.target.value)}
                  ></input>
                </li>
                <li className="email-container">
                  <label htmlFor="Postal Code">Postal Code</label>
                  <input
                    type="text"
                    name="Postal Code"
                    id="Postal Code"
                    placeholder="Email address"
                    onChange={(e) => setPostalCode(e.target.value)}
                  ></input>
                </li>
                <li className="email-container">
                  <label htmlFor="country">Country:</label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    placeholder="Email address"
                    onChange={(e) => setCountry(e.target.value)}
                  ></input>
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

export default ShippingScreen
