import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";


const SignInScreen = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    
    if (email === "" || password === "") {
      return e.preventDefault(alert("Please Fill Fields"));
       } else {
        e.preventDefault()
       }
  };

//   useEffect(() => {
//     if (userInfoLoLaine) {
//       props.history.push("/");
//     }
//     return () => {};
//   }, [userInfoLoLaine]);

  return (
    <div className="form signin-form">
      <form onSubmit={submitHandler}>
        <ul className="form-container ">
        <li>Sign in</li>
          <li>
            {/* {loading && 
              <div className="alert alert-success"> Signing In ...</div>
            }
            {error && 
              <div className="alert alert-danger">
               {error.message}
              </div>
            } */}
          </li>
          <li className="email-container">
            <label htmlFor="email">Email address:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </li>
          <li className="password-container">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </li>

          <li>
            <button type="submit" className="signin-button">
              Sign in{" "}
            </button>
          </li>
          <li className="forgot-password">Forgot your Password ?</li>
          <li className="signUp-link">
            <Link to="/signup" className="signUp-link-text">
              Create your Lolaine Account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default SignInScreen;
