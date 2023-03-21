import "./test.css";
import InputBox from "./InputBox";
import { useState, useEffect } from "react";
import { findPassword } from "../apis/findPassword/findPassword";
import { loginDo } from "../apis/login/loginDo";
import { Link, useLocation } from "react-router-dom";
export default function Test() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const accessToken = sessionStorage.getItem("access_token");
  const Logout = () => (
    <button
      onClick={() => {
        sessionStorage.clear();
        window.location.reload();
      }}
    >
      로그아웃
    </button>
  );

  const Login = () => (
    <button
      onClick={() => {
        loginDo(email, pw);
      }}
    >
      로그인
    </button>
  );

  return (
    <>
      <div className="testcontainer">
        <div className="idbox">
          <InputBox text="email" inputText={(email) => setEmail(email)} />
        </div>
        <div className="pwbox">
          <InputBox text="password" inputText={(pw) => setPw(pw)} />
        </div>
        {/* <div className="addressbox">
          <InputBox text="address" inputText={(add) => setAdd(add)} />
        </div> */}
        {/* <button onClick={() => findPassword(email)}>이메일체크</button> */}
        {accessToken ? <Logout /> : <Login />}
        {/* <button onClick={() => registerDo(email, pw, add)}>회원가입</button> */}
        {/* <p>{email}</p> */}
        {/* <p>{inDB}</p> */}
        {/* <p>{pw}</p>
        <p>{add}</p> */}
      </div>
    </>
  );
}
