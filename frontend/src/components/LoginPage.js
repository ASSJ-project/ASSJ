import "../static/css/LoginPage.css";
import React from "react";
import GoogleLoginBtn from "./Login/GoogleLoginBtn";
import KakaoLoginBtn from "./Login/KakaoLoginBtn";
import NaverLoginBtn from "./Login/NaverLoginBtn";

function LoginPage() {
  return (
    <>
      <div className="container">
        <p className="logintext">Login</p>
        <div className="id-container">
          <p className="id-text">Email</p>
          <input
            className="id-input"
            placeholder="Email Address"
            type="email"
          />
        </div>
        <div className="errorMessage">
          <div>Please verify your email</div>
        </div>

        <div className="pw-container">
          <p className="pw-text">Password</p>
          <input className="pw-input" placeholder="Password" type="password" />
        </div>
        <div className="errorMessage">
          <div>Please verify your email</div>
        </div>

        <div className="onoff-switch-container">
          <input type="checkbox" name="onoff-switch" id="onoff-switch1" />
          <label htmlFor="onoff-switch1"></label>
          <span className="toggle-text">Remember me</span>
          <a className="find-pw">forgot password?</a>
        </div>

        <div>
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
            <span>
              <a className="signup-btn"> Sign up</a>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
