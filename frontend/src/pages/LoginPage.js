import "../components/domain/Login/LoginPage.css";
import React from "react";
// import GoogleLoginBtn from "./GoogleLoginBtn";
// import KakaoLoginBtn from "./KakaoLoginBtn";
// import NaverLoginBtn from "./NaverLoginBtn";
import MainLogo from "../assets/images/nuki02.png";
import InputProps from "../components/domain/Login/Input";
import { useState, useEffect } from "react";
import { loginDo } from "../apis/login/loginDo";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="container">
        <img className="loginlogo" src={MainLogo} />
        <div className="id-container">
          <p className="id-text">Email</p>
          <InputProps
            placeholder="이메일"
            type="email"
            inputText={(email) => setEmail(email)}
          />
          <div className="errorMessage">Please verify your email</div>
        </div>

        <div className="pw-container">
          <p className="pw-text">Password</p>
          <InputProps
            placeholder="비밀번호"
            type="password"
            inputText={(password) => setPassword(password)}
          />
          <div className="errorMessage">Please verify your email</div>
        </div>
        <div className="find-pw-container">
          <p className="find-pw">
            <a>forgot password?</a>
          </p>
        </div>
        <div className="login-container">
          <button
            className="login-btn"
            onClick={() => {
              loginDo(email, password);
            }}
          >
            Login
          </button>
        </div>
        <div className="api-btn">
          {/* <GoogleLoginBtn />
          <KakaoLoginBtn />
          <NaverLoginBtn /> */}
        </div>

        <div className="signup-div">
          <p>
            Don't have an account? <span className="signup-btn"></span>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
