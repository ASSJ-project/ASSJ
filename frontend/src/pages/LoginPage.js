import "@/components/domain/Login/LoginPage.css";
import GoogleLoginBtn from "@/components/domain/Login/GoogleLoginBtn";
import KakaoLoginBtn from "@/components/domain/Login/KakaoLoginBtn";
import MainLogo from "assets/images/logo.svg";
import React, { useState } from "react";
import { loginDo } from "@/apis/login/loginDo";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailVisable, setEmailVisable] = useState(true);
  const [passwordVisable, setPasswordVisable] = useState(true);
  const [loginError, setLoginError] = useState(false);

  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const emailChange = (e) => {
    setEmail(e.target.value);
    if (emailRegex.test(email)) {
      setEmailVisable(true);
    } else {
      setEmailVisable(false);
    }
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
    if (passwordRegex.test(password)) {
      setPasswordVisable(true);
    } else {
      setPasswordVisable(false);
    }
  };
  return (
    <>
      <div className="login-container">
        <img className="loginlogo" src={MainLogo} alt="메인로고" />
        <div className="id-container">
          <p className="id-text">이메일</p>
          <input
            className="input"
            placeholder="Email"
            type="email"
            value={email}
            onChange={emailChange}
          />
          {!emailVisable && email.length > 0 && (
            <div className="errorMessage">이메일 형식을 확인해주세요</div>
          )}
        </div>

        <div className="pw-container">
          <p className="pw-text">비밀번호</p>
          <input
            className="input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={passwordChange}
          />
          {!passwordVisable && password.length > 0 && (
            <div className="errorMessage">
              비밀번호는 영문자+숫자 8글자 이상이여야 합니다
            </div>
          )}
        </div>
        <p>{loginError && "이메일과 비밀번호를 확인해주세요"}</p>
        <div className="find-pw-container">
          <p className="find-pw">비밀번호 찾기</p>
        </div>
        <div className="login-btn-container">
          <Button
            className="login-btn"
            variant="contained"
            onClick={() => {
              setLoginError(loginDo(email, password));
            }}
          >
            {" "}
            Login
          </Button>
        </div>
        <div className="api-btn">
          <GoogleLoginBtn />
          <KakaoLoginBtn />
        </div>

        <div className="signup-div">
          <p>
            계정이 없으신가요?{" "}
            <span className="signup-btn">
              <Link to="/register">회원가입</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
