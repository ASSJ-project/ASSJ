import "../static/css/LoginPage.css";
import React, { useState, useEffect } from 'react';
import SocialLogin from "./SocialLogin";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState("");

    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    useEffect(() => {
      if(emailValid && pwValid) {
        setNotAllow(false);
        return;
      }
      setNotAllow(true);
    }, [emailValid, pwValid]);

    const handleEmail = (e) => {
      setEmail(e.target.value);
      const regex =
        /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      if (regex.test(e.target.value)) {
        setEmailValid(true);
      } else {
        setEmailValid(false);
      }
    };
    const handlePw = (e) => {
      setPw(e.target.value);
      const regex =
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
      if (regex.test(e.target.value)) {
        setPwValid(true);
      } else {
        setPwValid(false);
      }
    };
    // const onClickConfirmButton = () => {
    //   //버튼 클릭시 DB데이터 추출 후 대조 후

    // }

  return (
    <>
    <div className="container">

      <p className="logintext">Login</p>
      <div className="id-container">
        <p className="id-text">Email</p>
        <input className="id-input" placeholder="Email Address" type="email" value={email} onChange={handleEmail}/>
      </div>
      <div className="errorMessage">
            {!emailValid && email.length > 0 && (
              <div>Please verify your email</div>
            )}
      </div>

      <div className="pw-container">
        <p className="pw-text">Password</p>
        <input className="pw-input" placeholder="Password" type="password" value={pw} onChange={handlePw}/>
      </div>
      <div className="errorMessage">
            {!pwValid && pw.length > 0 && (
              <div>Please verify your password</div>
            )}
      </div>
      
      <div className="onoff-switch-container">
        <input type="checkbox" name="onoff-switch" id="onoff-switch1"/>
        <label htmlFor="onoff-switch1"></label>
        <span className="toggle-text">Remember me</span>
        <a className="find-pw">forgot password?</a>
      </div>

      <div>
      <button className="login-btn" disabled={notAllow}>Login</button>
      </div>
      
      <div className="api-btn">
        <SocialLogin />
      </div>

      <div className="signup-div">
        <p>Don't have an account? <span><a className="signup-btn"> Sign up</a></span></p>
      </div>
    </div>
    </>
  );
}

export default LoginPage;
