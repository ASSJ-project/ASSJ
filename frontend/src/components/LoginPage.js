import "../static/css/LoginPage.css";
import React from "react";
import GoogleLoginBtn from "./GoogleLoginBtn";
import KakaoLoginBtn from "./KakaoLoginBtn";
import NaverLoginBtn from "./NaverLoginBtn";
import MainLogo from "../static/images/nuki02.png";
import InputProps from "./input";

//<p className="logintext">Login</p>
//<input className="id-input" placeholder="Email Address" type="email" />
//<input className="pw-input" placeholder="Password" type="password" />

function LoginPage() {
  return (
    <>
      <div className="container">        
        <img className="loginlogo" src={MainLogo} />
        <div className="id-container">
          <p className="id-text">Email</p>
          <InputProps placeholder="Email" type="email" />
          <div className="errorMessage">
            Please verify your email
          </div>
        </div>

        <div className="pw-container">
          <p className="pw-text">Password</p>
          <InputProps placeholder="Password" type="password" />
          <div className="errorMessage">
            Please verify your email
          </div>
        </div>
        <div className="find-pw-container">
          <p className="find-pw"><a>forgot password?</a></p>
        </div>
        <div className="login-container">
          <button className="login-btn">Login</button>
        </div>
        <div className="api-btn">
          <GoogleLoginBtn />
          <KakaoLoginBtn />
          <NaverLoginBtn />
        </div>

        <div className="signup-div">
          <p>
            Don't have an account?{" "}
            <span className="signup-btn">
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
