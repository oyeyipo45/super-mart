import { GET_ERRORS, CLEAR_ERRORS } from './../constants/errorConstants';


//RETURN ERRORS
const returnErrors = (message, status, id = null) => {
    return{
        type: GET_ERRORS,
        payload: {message, status, id}
    }
}

//RETURN ERRORS
const clearErrors = () => {
    return{
        type: CLEAR_ERRORS
    }
}



export {returnErrors, clearErrors}