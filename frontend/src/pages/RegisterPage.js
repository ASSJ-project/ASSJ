import "../components/domain/Register/register.css";
import { postalSeach } from "../components/domain/Register/RegisterApi";
import React, { useEffect, useState } from "react";
import { emailCheck } from "../apis/emailCheck/emailCheck";
import { registerDo } from "@/apis/register/registerDo";
import emailjs from "@emailjs/browser";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";

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
  const [emailSend, setEmailSend] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emailChecked, setEmailChecked] = useState(false);
  const [random, setRandom] = useState("000000");

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

  //인증번호 6자리 생성 함수
  var generateRandom = function () {
    var ranNum = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
    return ranNum;
  };

  //사용자 이메일에 메일보내기
  const sendEmail = (inDB) => {
    emailjs.init("O8bUvMyNJhc1Z6tVI");
    const ranNum = generateRandom();
    setRandom(ranNum);
    console.log(ranNum);
    let templateParams = {
      sendemail: email,
      number: ranNum,
    };
    console.log(inDB);
    if (!inDB) {
      emailjs.send("service_vpprlhi", "template_w9u1t6g", templateParams);
      setEmailSend(true);
    } else {
      setEmailSend(false);
    }
  };

  const error = (message = <>&nbsp;</>) => {
    return <div className="errorMessage">{message}</div>;
  };

  const emailCheckInput = (e) => {
    setEmailInput(e.target.value);
  };

  const emailSubmit = () => {
    if (emailInput.match(random)) setEmailChecked(true);
    else
      document.getElementById("email-check-number-input").innerText =
        "번호를 확인해주세요";
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

      <div className="input-container">
        <p className="text_box">이메일</p>
        <div>
          <input
            className="total_input"
            placeholder="Email Address"
            type="email"
            onChange={(e) => {
              // emailChange(e);
              setEmailInDB(emailCheck(e.target.value));
              console.log(emailInDB);
            }}
            name="user_email"
            autoComplete="off"
          />
          <input value={random} name="random" type="hidden" />
        </div>
        {email.length > 0 && emailInDB
          ? error("이미 존재하는 이메일 입니다")
          : error("")}
        <div className="email-check-button">
          {!emailVisable && email.length > 0 ? (
            <Button
              variant="contained"
              className="send-email-disabled"
              disabled
            >
              이메일 형식을 확인해주세요
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                sendEmail(emailInDB);
              }}
              className="send-email"
            >
              인증번호 전송
            </Button>
          )}
          {emailSend && (
            <>
              <TextField
                id="email-check-number-input"
                placeholder="인증 번호 입력"
                size="small"
                variant="standard"
                onChange={emailCheckInput}
              />
              <Button
                variant="contained"
                className="email-number-button"
                onClick={emailSubmit}
              >
                확인
              </Button>
            </>
          )}
        </div>
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
        {emailChecked ? (
          <Button
            className="Signup-btn"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={() => {
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
