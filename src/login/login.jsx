import { useState } from 'react'
import './login.css'
import googleLogo from '../images/google-logo.png'
export const LoginPage =() =>{
    const[email,setEmail] = useState("");
    const[password,setPassword]  =useState("");
return(
    <div className="container">
        <div className="container-login">
            <div className="wrap-login">
                <form className="login-form">
                    <span className="login-form-title">Welcome Back!</span>
                    <div className="wrap-input">
                        <input
                        type="email" 
                        className={email !== "" ? "has-val-input":"input"}
                        />
                        <span className="focus-input" data-placeholder="Email"></span>

                    </div>
                    <div className="wrap-input">
                        <input className={password !== "" ? "has-val-input":"input"} type="password"/>
                        <span className="focus-input" data-placeholder="Password"></span>
                    </div>
                    <div className="container-login-form-btn">
                        <button className="login-form-btn">
                            Login
                        </button>
                    </div>
                    <hr/>
                    <div className="g-button-container">
                        <button className="g-button">
                            Continue with
                            <img src={googleLogo} className='g-logo'></img>
                        </button>
                    </div>
                    <div className="text-center">
              
              <a className="txt2" href="#">
                Forgot Password?
              </a>
            </div>

                       
                        
                      
                    

                </form>
            </div>
        </div>
    </div>
)
}