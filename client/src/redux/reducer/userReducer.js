import {USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL } from "../constants/userConstants"
import {USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL } from './../constants/userConstants';

const initialState = {

};

  

  export const userSigninReducer = (state = initialState, action ) => {
      switch(action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true};
            case USER_SIGNIN_SUCCESS:
                return { loading: false, userInfo: action.payload};
                case USER_SIGNIN_FAIL:
                    return { loading: false, error : action.payload};
        default:
            return state;
    }
  }


  export const userSignupReducer = (state = initialState, action ) => {
    switch(action.type) {
      case USER_SIGNUP_REQUEST:
          return { loading: true};
          case USER_SIGNUP_SUCCESS:
              return { loading: false, userInfo: action.payload};
              case USER_SIGNUP_FAIL:
                  return { loading: false, error : action.payload};
      default:
          return state;
  }
}
