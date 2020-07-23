import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import signin from './../redux/actions/userActions';


const SignInscreen = (props) => {

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
  const dispatch = useDispatch();
  const userSignIn = useSelector(state => state.userSignIn);
  const {  loading, userInfo, error } = userSignIn;
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
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h3>Sign In</h3>
                    </li>
                    {/* <li>{error.message}</li> */}
                    <li>
                        {loading && <div className="alert alert-success"> Signing In ...</div>}
                        {error && <div className="alert alert-danger alert-dismissible fade show">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>Invalid Email or Password</div>}
                    </li>
                    <li>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input type="email" name="email" id="email" onChange={((e) => setEmail(e.target.value))}></input>
                    </li>
                    <li>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input type="password" name="password" id="password" onChange={((e) => setPassword(e.target.value))}></input>
                    </li>
                    <li>
                        <button type="submit" className="button primary">SignIn </button>
                    </li>
                    <li>
                        New to Lolaine
                    </li>
                    <li>
                        <Link to="/register" className="button button-secondary">Create your Lolaine Account</Link>
                    </li>
                </ul>
            </form>
            
        </div>
    )
}


export default SignInscreen;
