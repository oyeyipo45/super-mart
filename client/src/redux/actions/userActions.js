import axios from "axios";
import Cookie from "js-cookie";
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_LOGOUT
} from "./../constants/userConstants";




const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  console.log(email, password, "request");
  
  try {
    const { data } = await axios.post("/api/users/signin", { email, password });
    
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    console.log(data, "data user");
    Cookie.set("userInfoLoLaine", JSON.stringify(data));
    console.log(data, "userInfoLoLaine actions success");

  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
};



const signup = (firstName, lastName, email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNUP_REQUEST,
    payload: { firstName, lastName, email, password },
  });

  try {
    const { data } = await axios.post("api/users/signup", {
      firstName,
      lastName,
      email,
      password,
    });
    console.log(data, "from actions");

    dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
    Cookie.set("userInfoLoLaine", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNUP_FAIL, payload: error.message });
  }
};


const logout = () => (dispatch) => {
  Cookie.remove("userInfoLoLaine");
  dispatch({ type: USER_LOGOUT })
}


export { signin, signup, logout};
