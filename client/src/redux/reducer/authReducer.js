import {

  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_LOGOUT,
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR
} from "../constants/userConstants";



const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};



export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case USER_SIGNIN_SUCCESS:
    case USER_SIGNUP_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        ...action.payload,
      };
    case USER_SIGNIN_FAIL:
    case USER_LOGOUT:
    case AUTH_ERROR:
    case USER_SIGNUP_FAIL:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
      

    default:
      return state;
  }
};


