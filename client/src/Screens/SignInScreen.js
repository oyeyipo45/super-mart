import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import signin from './../redux/actions/userActions';


const SignInScreen = (props) => {

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
  const userSignIn = useSelector(state => state.userSignIn);
  const {  loading, userInfo, error } = userSignIn;
  const dispatch = useDispatch();
    console.log(userInfo);
    console.log(error);
    
    
  
  const submitHandler = (e) => {
      e.preventDefault();
      dispatch(signin(email, password))
  }

  
    useEffect(() => {
        if(userInfo){
            props.history.push('/')
        }
        return () => {
           
        }
    }, [userInfo])


    return (
        <div className="form signin-form">
            <form onSubmit={submitHandler}>
                <ul className="form-container ">
                 
                    {/* <li>{error.message}</li> */}
                    <li>
                        {loading && <div className="alert alert-success"> Signing In ...</div>}
                        {error && <div className="alert alert-danger alert-dismissible fade show">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>Invalid Email or Password</div>}
                    </li>
                    <li className="email-container">
                        <label htmlFor="email">
                            Email address:
                        </label>
                        <input type="email" name="email" id="email" placeholder="Email address" onChange={((e) => setEmail(e.target.value))}></input>
                        
                    </li>
                    <li className="password-container">
                        <label htmlFor="password">
                            Password:
                        </label>
                        <input type="password" name="password" id="password" placeholder="Password" nChange={((e) => setPassword(e.target.value))}></input>
                        
                    </li>
                    
                    <li>
                        <button type="submit" className="signin-button">Sign in </button>
                    </li>
                    <li className="forgot-password">
                        Forgot your Password ?
                    </li>
                    <li className="signUp-link">
                        <Link to="/register" className="signUp-link-text">Create your Lolaine Account</Link>
                    </li>
                </ul>
            </form>
            
        </div>
    )
}


export default SignInScreen;
