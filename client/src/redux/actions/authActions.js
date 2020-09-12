import axios from "axios";
import { returnErrors } from "./errorAction";
import {
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_LOGOUT,
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
} from "../constants/userConstants";

//CHECK LOAD USER
const loadUser = () => (dispatch, getState) => {
  //USER LOADING
  dispatch({ type: USER_LOADING });

  //FETCH USER
  axios
    .get("/api/users/signin/auth", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

//SIGN IN
const signin = ({ email, password }) => (dispatch) => {
  //HEADERS
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //REQUEST BODY
  const body = JSON.stringify({ email, password });

  console.log(body, "signin user");

  axios
    .post("api/users/signin", body, config)
    .then((res) =>
      dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) => {
      dispatch(
        returnErrors(error.response.data, error.response.status, "SIGNIN_FAIL")
      );
      dispatch({
        type: USER_SIGNIN_FAIL,
      });
    });
};

//SIGN UP USER
const signup = ({ firstName, lastName, email, password }) => (dispatch) => {
  //HEADERS
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //REQUEST BODY
  const body = JSON.stringify({ firstName, lastName, email, password });

  console.log(body, "auth user");

  //REQUEST TO POST USER
  axios
    .post("api/users/signup", body, config)
    .then((res) =>
      dispatch({
        type: USER_SIGNUP_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) => {
      dispatch(
        returnErrors(error.response.data, error.response.status, "SIGNUP_FAIL")
      );
      dispatch({
        type: USER_SIGNUP_FAIL,
      });
    });
};

//SETUP CONFIG/HEADERS AND TOKEN

const tokenConfig = (getState) => {
  //GET TOKEN FROM LOCALSTORAGE
  const token = getState().auth;

  //HEADER
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //IF TOKEN AVAILABLE ADD TO HEADERS
  if (token) {
    config.headers["authorization"] = "Bearer " + token.token;
  }
  console.log(config, "conrigggggg");
  return config;
};

const logout = () => {
  return {
    type: USER_LOGOUT,
  };
};

export { loadUser, tokenConfig, signup, signin, logout };
