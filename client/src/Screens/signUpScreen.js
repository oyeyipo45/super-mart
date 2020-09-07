import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../redux/actions/authActions";
import { clearErrors } from "../redux/actions/errorAction";
import PropTypes from "prop-types";

const SignUpScreen = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [errormessage, setErrorMessage] = useState(null);

  SignUpScreen.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    signup: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const error = useSelector((state) => state.error);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (firstName === "" || lastName === "") {
      return e.preventDefault(alert("Please Fill Fields"));
    } else if (email === "" || password === "") {
      return e.preventDefault(alert("Please Fill Fields"));
    } else {
      e.preventDefault(alert("Please Fill Fields"));
    }

    //CREATE NEW USER

    if (password !== repassword) {
      setErrorMessage("Passwords do not match");
    } else {
      const newUser = {
        firstName,
        lastName,
        email,
        password,
      };

      dispatch(clearErrors());

      //REGISTER USER
      dispatch(signup(newUser));
    }
  };

  useEffect(() => {
    if (error.id === "SIGNUP_FAIL") {
      setErrorMessage({ message: error.message.message });
    } else {
      setErrorMessage({ message: null });
    }

    //IF AUTHENTICATED REDIRECT TO HOME
    if (isAuthenticated) {
      return props.history.push("/");
    }

    return () => {};
  }, [error.message.message, isAuthenticated]);

  const clearErrorAlert = () => {
    dispatch(clearErrors());
  };

  return (
    <div className="form signin-form">
      <form onSubmit={submitHandler}>
        <ul className="form-container ">
          <li>Create Account</li>
          <li>
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
              Sign up
            </button>
          </li>
          <li>
            Already have an account? <Link to="/signin">Sign in</Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default SignUpScreen;
