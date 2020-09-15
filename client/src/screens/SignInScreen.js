import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../redux/actions/authActions";
import { clearErrors } from "../redux/actions/errorAction";

const SignInScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setErrorMessage] = useState(null);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const error = useSelector((state) => state.error);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    if (email === "" || password === "") {
      return e.preventDefault(alert("Please Fill Fields"));
    } else {
      e.preventDefault();
    }

    //SIGN IN USER
    const newUser = {
      email,
      password,
    };

    dispatch(clearErrors());

    //REGISTER USER
    dispatch(signin(newUser));
  };

  const redirect = props.location.search ? props.location.search.split("=")[1] : "/"
  useEffect(() => {
    if (error.id === "LOGIN_FAIL") {
      setErrorMessage({ message: error.message.message });
    } else {
      setErrorMessage({ message: null });
    }

    //IF AUTHENTICATED REDIRECT TO HOME
    if (isAuthenticated) {
      return props.history.push(redirect);
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
          <li>Sign in</li>
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
            <Link to={redirect === "/" ? "signup" : "signup?redirect=" + redirect} className="signUp-link-text">
              Create your Lolaine Account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default SignInScreen;
