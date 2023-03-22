import "./test.css";
import InputBox from "./InputBox";
import { useState, useEffect } from "react";
import { findPassword } from "../apis/findPassword/findPassword";
import { loginDo } from "../apis/login/loginDo";
import { Link, useLocation } from "react-router-dom";
import { registerDo } from "../functions";
import Button from "./button";
export default function Test() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
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

  const Register = () => {
    <button
      onClick={() => {
        registerDo(email, pw, addr, name);
      }}
    >
      회원가입
    </button>;
  };

  const [index, setIndex] = useState(0);

  const tab = [
    {
      tabTitle: (
        <Button
          title="1번탭"
          index={0}
          clicked={(index) => setIndex(index)}
          selected={index}
        />
      ),
      tabContent: <div> 탭 내용1 </div>,
      index: 0,
    },

    {
      tabTitle: (
        <Button
          title="2번탭"
          index={1}
          clicked={(index) => setIndex(index)}
          selected={index}
        />
      ),
      tabContent: <div> 탭 내용2 </div>,
      index: 1,
    },
    {
      tabTitle: (
        <Button
          title="3번탭"
          index={2}
          clicked={(index) => setIndex(index)}
          selected={index}
        />
      ),
      tabContent: <div> 탭 내용3 </div>,
      index: 2,
    },
  ];

  return (
    <>
      <div>{tab.map((item, index) => item.tabTitle)}</div>
      <div>{tab[index].tabContent}</div>
      {/* <div className="testcontainer">
        <div className="box">
          <InputBox text="email" inputText={(email) => setEmail(email)} />
        </div>
        <div className="box">
          <InputBox text="password" inputText={(pw) => setPw(pw)} />
        </div>
        <div className="box">
          <InputBox text="address" inputText={(addr) => setAddr(addr)} />
        </div>
        <div className="box">
          <InputBox text="name" inputText={(name) => setName(name)} />
        </div>
        <Register /> */}

      {/* <button onClick={() => findPassword(email)}>이메일체크</button> */}
      {/* {accessToken ? <Logout /> : <Login />} */}
      {/* <button onClick={() => registerDo(email, pw, add)}>회원가입</button> */}
      {/* <p>{email}</p> */}
      {/* <p>{inDB}</p> */}
      {/* <p>{pw}</p>
        <p>{add}</p> */}
      {/* </div> */}
    </>
  );
}
