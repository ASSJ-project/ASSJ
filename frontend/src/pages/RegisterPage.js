// import Address from "./SignupApi/SignupAddress";
import "../components/domain/Register/register.css";
import { postalSeach } from "../components/domain/Register/RegisterApi";
import React, { useEffect, useState, useRef } from "react";
import { emailCheck } from "../apis/emailCheck/emailCheck";
import { registerDo } from "@/apis/register/registerDo";
import emailjs from "@emailjs/browser";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { purple } from "@mui/material/colors";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [checkPassword, setcheckPassword] = useState("");
  const [nameVisable, setNameVisable] = useState("");
  const [emailVisable, setEmailVisable] = useState("");
  const [passwordVisable, setPasswordVisable] = useState("");
  const [registerSuccess, setregisterSuccess] = useState();
  const [emailInDB, setEmailInDB] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);

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
    num();
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

  const button_color = purple[200];

  const error = (message = <>&nbsp;</>) => {
    return <div className="errorMessage">{message}</div>;
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
        {!nameVisable && name.length > 0
          ? error("이름 형식을 확인해주세요")
          : error()}
      </div>
      <div ref={form}>
        <div className="input-container">
          <p className="text_box">이메일</p>
          <input
            className="total_input"
            placeholder="Email Address"
            type="email"
            onChange={(e) => {
              emailChange(e);
            }}
            name="user_email"
          />
        </div>
        <input value={random} name="random" type="hidden" />
        {!emailVisable && email.length > 0 ? (
          <Button variant="contained" disabled>
            이메일 형식을 확인해주세요
          </Button>
        ) : (
          <Button variant="contained" onClick={sendEmail}>
            인증번호 전송
          </Button>
        )}
      </div>
      <div className="input-container">
        <div className="addressSearch">
          <p className="text_box">주소</p>
          <Button
            className="addressButton"
            variant="contained"
            onClick={() => postalSeach()}
          >
            주소검색
          </Button>
        </div>
        <input
          className="total_input"
          id="address"
          placeholder="User Address"
          disabled
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
        {!passwordVisable && password.length > 0
          ? error("비밀번호 형식을 확인하세요")
          : error()}
      </div>

      <div className="input-container">
        <p className="text_box">비밀번호 확인</p>
        <input
          className="total_input"
          placeholder="Confirm password"
          type="password"
          onChange={checkPasswordChange}
        />
        {password !== checkPassword && checkPassword.length > 0
          ? error("비밀번호가 일치하지 않습니다")
          : error()}
      </div>
      <div className="signUp">
        {registerSuccess === false
          ? error("입력 항목의 빈칸을 확인해주세요")
          : error()}
        {email.length > 0 && emailInDB
          ? error("이미 존재하는 이메일 입니다")
          : error()}
        {emailChecked ? (
          <Button
            className="Signup-btn"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={() => {
              setEmailInDB(emailCheck(email));
              if (
                name.length > 0 &&
                email.length > 0 &&
                password.length > 0 &&
                address.length > 0 &&
                checkPassword.length > 0 &&
                password === checkPassword
              ) {
                setregisterSuccess(checkSuccess);
              } else {
                console.log("회원가입실패");
                setregisterSuccess(false);
              }
            }}
          >
            {" "}
            회원가입
          </Button>
        ) : (
          <Button
            className="Signup-btn"
            variant="contained"
            endIcon={<SendIcon />}
            disabled
          >
            회원가입
          </Button>
        )}{" "}
      </div>
    </div>
  );
}

export default Register;
