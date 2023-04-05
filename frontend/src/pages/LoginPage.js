import "@/components/domain/Login/LoginPage.css";
import GoogleLoginBtn from "@/components/domain/Login/GoogleLoginBtn";
import KakaoLoginBtn from "@/components/domain/Login/KakaoLoginBtn";
import ImgHeader from "../components/Structure/Header/ImgHeader";
import React, { useState, useEffect } from "react";
import { loginDo } from "@/apis/login/loginDo";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    //sessionStorage.clear();
    setIsLogin(localStorage.getItem("login"));
  }, []);

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = () => {
    loginDo(email, password).then((result) => {
      setLoginError(result);
      //
    });
  };

  const logout = () => {
    localStorage.clear();
    alert("로그아웃되었습니다.");
    window.location.href = "login";
  };
  return (
    <>
      <div className="login-container">
        <ImgHeader />
        {isLogin ? (
          <Button variant="contained" onClick={logout}>
            로그아웃
          </Button>
        ) : (
          <>
            <span className="logintext">로그인</span>
            <div className="id-container">
              <p className="id-text">이메일</p>
              <input
                className="input"
                placeholder="Email"
                type="email"
                value={email}
                onChange={emailChange}
              />
            </div>

            <div className="pw-container">
              <p className="pw-text">비밀번호</p>
              <input
                className="input"
                placeholder="Password"
                type="password"
                value={password}
                onChange={passwordChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    login();
                  }
                }}
              />
            </div>

            <div className="find-pw-container">
              <p className="find-pw"><Link to="/findpassword">비밀번호 찾기</Link></p>
            </div>
            <div className="login-btn-container">
              <p className="errorMessage">
                {loginError ? "" : "이메일과 비밀번호를 확인해주세요"}
              </p>
              <Button className="login-btn" variant="contained" onClick={login}>
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
          </>
        )}
      </div>
    </>
  );
}

export default LoginPage;
