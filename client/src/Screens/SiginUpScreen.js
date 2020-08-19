import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {signup} from "./../redux/actions/userActions";

const SignUpScreen = (props) => {


    const [firstName, setFirstName] = useState(" ");
    const [lastName, setLastName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [repassword, setRepassword] = useState(" ");
  const userSignIn = useSelector((state) => state.userSignIn);
  const { loading, userInfo, error } = userSignIn;
  
 
  const dispatch = useDispatch();
  console.log(userInfo, "userINfo");
  console.log(error, "error");

  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signup(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
    return () => {};
  }, [userInfo]);

  return (
    <div className="form signin-form">
      <form onSubmit={submitHandler}>
        <ul className="form-container ">
          <li>Creat Account</li>
          <li>
            {loading && (
              <div className="alert alert-success"> Signing In ...</div>
            )}
            {error && (
              <div className="alert alert-danger alert-dismissible fade show">
                <button type="button" className="close" data-dismiss="alert">
                  &times;
                </button>
                Invalid Email or Password
              </div>
            )}
          </li>
          <li className="email-container">
            <label htmlFor="email">First Name</label>
            <input
              type="name"
              name="name"
              id="name"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </li>
          <li className="email-container">
            <label htmlFor="email">Last Name</label>
            <input
              type="name"
              name="name"
              id="name"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            ></input>
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
          <li className="password-container">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Repeat Password"
              onChange={(e) => setRepassword(e.target.value)}
            ></input>
          </li>

          <li>
            <button type="submit" className="signin-button">
              Sign in{" "}
            </button>
          </li>
          <li >Already have an account? <Link to="/signin">Sign in</Link></li>
          
        </ul>
      </form>
    </div>
  );
};

export default SignUpScreen;
