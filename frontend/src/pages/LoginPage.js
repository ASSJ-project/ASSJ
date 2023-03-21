// import "../static/css/LoginPage.css";
// import GoogleLoginBtn from "./GoogleLoginBtn";
// import KakaoLoginBtn from "./KakaoLoginBtn";
// import NaverLoginBtn from "./NaverLoginBtn";
import MainLogo from "../static/images/nuki02.png";
import React, { useState } from "react";
import { loginDo } from "../functions";
import { Link } from "react-router-dom";

/* <InputProps
  placeholder="Email"
  type="email"
  value={email} onChange={emailChange}
/> */
// <InputProps
//   placeholder="Password"
//   type="password"
//   value={password} onChange={passwordChange}
// />

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailVisable, setEmailVisable] = useState(true);
  const [passwordVisable, setPasswordVisable] = useState(true);

  const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  const emailChange = (e) => {
    setEmail(e.target.value)
  }

  const passwordChange = (e) => {
    setPassword(e.target.value)
  }

  //정규식 확인 후 true 그대로 진행, false일 경우 에러메세지 호출
  const onClickSignUp = () => {    
    if(emailRegex.test(email)) {
      setEmailVisable(true);
    } else {
      setEmailVisable(false);
    }

    if(passwordRegex.test(password)) {
      setPasswordVisable(true);
    } else {
      setPasswordVisable(false);
    }
  }

  return (
    <>
      <div className="container">
        <img className="loginlogo" src={MainLogo} alt="메인로고" />
        <div className="id-container">
          <p className="id-text">Email</p>
          <input className="id-input" placeholder="Email" type="email" value={email} onChange={emailChange} />
          {!emailVisable && (
          <div className="errorMessage">
            Please verify your email
          </div>
          )}

        </div>

        <div className="pw-container">
          <p className="pw-text">Password</p>
          <input className="pw-input" placeholder="Password" type="password" value={password} onChange={passwordChange} />  
          {!passwordVisable && (
          <div className="errorMessage">
            Please verify your password
          </div>
          )}
        </div>

        <div className="find-pw-container">
          <p className="find-pw">
            forgot password?
          </p>
        </div>
        <div className="login-container">
          <button className="login-btn" 
            onClick={() => {
              onClickSignUp();
              loginDo(email, password);
          }}>
            Login
          </button>
        </div>
        <div className="api-btn">
          {/* <GoogleLoginBtn />
          <KakaoLoginBtn />
          <NaverLoginBtn />  */}
        </div>

        <div className="signup-div">
          <p>
            Don't have an account? <span className="signup-btn"><Link to="/Signup">Sign up</Link></span>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;