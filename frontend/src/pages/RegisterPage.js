// import Address from "./SignupApi/SignupAddress";
import "../components/domain/Register/register.css";
import { postalSeach } from "../components/domain/Register/RegisterApi";
import React, { useEffect, useState, useRef } from "react";
import { emailCheck } from "../apis/emailCheck/emailCheck";
import { registerDo } from "../functions";
import emailjs from "@emailjs/browser";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [checkPassword, setcheckPassword] = useState("");
  const [nameVisable, setNameVisable] = useState("");
  const [emailVisable, setEmailVisable] = useState("");
  const [passwordVisable, setPasswordVisable] = useState("");
  const [registerSuccess, setregisterSuccess] = useState(false);

  const nameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z]{2,}$/;
  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const nameChange = (e) => {
    setName(e.target.value);
    nameRegex.test(name) ? setNameVisable(true) : setNameVisable(false);
  };
  const emailChange = (e) => {
    setEmail(e.target.value);
    emailRegex.test(email) ? setEmailVisable(true) : setEmailVisable(false);
  };

  const addressChange = () => {
    setAddress(document.getElementById("address").value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
    passwordRegex.test(password)
      ? setPasswordVisable(true)
      : setPasswordVisable(false);
  };

  const checkPasswordChange = (e) => {
    setcheckPassword(e.target.value);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.head.appendChild(script);
  }, []);

  const checkSuccess = () => {
    registerDo(email, password, address, name);
  };

  const [random, setRandom] = useState("000000");

  function num() {
    setRandom(String(Math.floor(Math.random() * 1000000)).padStart(6, "0"));
  }

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_bhg1fi8",
        "template_hi33sxj",
        form.current,
        "1TUNz-cyWeI9OUyAH"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="signup-container">
      <span className="signuptext">회원가입</span>
      <div className="input-container">
        <p className="text_box">이름</p>
        <input
          className="total_input"
          placeholder="User name"
          type="text"
          onChange={nameChange}
        />
        {!nameVisable && name.length > 0 && (
          <div className="errorMessage">이름 형식을 확인해주세요</div>
        )}
      </div>
      <form ref={form} onSubmit={sendEmail}>
        <div className="input-container">
          <p className="text_box">이메일</p>
          <input
            className="total_input"
            placeholder="Email Address"
            type="email"
            onChange={emailChange}
            name="user_email"
          />
          {!emailVisable && email.length > 0 && (
            <div className="errorMessage">이메일 형식을 확인해주세요</div>
          )}
        </div>
        {/* <input value={random} name="random" type="hidden" />
        <button onClick={num}>인증번호 전송</button> */}
      </form>
      <div className="input-container">
        <p className="text_box">주소</p>
        <input
          className="total_input"
          id="address"
          placeholder="User Address"
          onFocus={() => postalSeach()}
        />
      </div>
      <div className="input-container">
        <p className="text_box">비밀번호</p>
        <input
          className="total_input"
          id="address_detail"
          placeholder="Password"
          type="password"
          onChange={passwordChange}
          onFocus={addressChange}
        />
        {!passwordVisable && password.length > 0 && (
          <div className="errorMessage">비밀번호 형식을 확인해주세요</div>
        )}
      </div>

      <div className="input-container">
        <p className="text_box">비밀번호 확인</p>
        <input
          className="total_input"
          placeholder="Confirm password"
          type="password"
          onChange={checkPasswordChange}
        />
        {password !== checkPassword && checkPassword.length > 0 && (
          <div className="errorMessage">비밀번호가 일치하지 않습니다</div>
        )}
      </div>
      {/* 커밋 버튼 활성화 조건 
       1. 이메일 체크가 끝나야 함 => 일단 활성화 
       2. 모든 입력칸이 길이가 0 이상이여야 함 
       
       */}
      <div>
        <button
          className="Signup-btn"
          onClick={() => {
            setregisterSuccess(checkSuccess);
          }}
        >
          {" "}
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Register;
