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
  const [emailSend, setEmailSend] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailIndDB, setEmailInDB] = useState(false);
  const [random, setRandom] = useState("000000");
  const [checked, setChecked] = useState(false);

  const nameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z]{2,}$/;
  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
  const passwordRegex =
    /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;

  const nameChange = (e) => {
    setName(e.target.value);
    nameRegex.test(e.target.value)
      ? setNameVisable(true)
      : setNameVisable(false);
  };
  const emailChange = (e) => {
    setEmail(e.target.value);
    emailRegex.test(e.target.value)
      ? setEmailVisable(true)
      : setEmailVisable(false);
  };

  const addressChange = () => {
    setAddress(document.getElementById("address").value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
    passwordRegex.test(e.target.value)
      ? setPasswordVisable(true)
      : setPasswordVisable(false);
  };
  const checkPasswordChange = (e) => {
    setcheckPassword(e.target.value);
  };

  const emailCheckInput = (e) => {
    setEmailInput(e.target.value);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.head.appendChild(script);
  }, []);

  // 회원가입 시도 요청 함수
  const checkSuccess = () => {
    registerDo(email, password, address, name);
  };

  //인증번호 6자리 생성 함수
  var generateRandom = function () {
    var ranNum = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
    return ranNum;
  };

  //사용자 이메일에 메일보내기
  const sendEmail = () => {
    emailjs.init("O8bUvMyNJhc1Z6tVI");
    const ranNum = generateRandom();
    setRandom(ranNum);
    console.log(ranNum);
    let templateParams = {
      sendemail: email,
      number: ranNum,
    };
    emailjs.send("service_vpprlhi", "template_w9u1t6g", templateParams);
    setEmailSend(true);
    alert("입력하신 이메일로 인증번호가 전송되었습니다");
  };

  // 에러메시지 출력함수
  const error = (message = <>&nbsp;</>) => {
    return <div className="errorMessage">{message}</div>;
  };

  // 이메일 인증번호와 입력번호가 같은지 확인하는 함수
  const emailSubmit = () => {
    if (emailInput.match(random)) {
      setEmailChecked(true);
      alert("인증번호 확인에 성공했습니다");
    } else setEmailChecked(false);
  };

  // 유저가 DB에 존재하는지 요청하는 함수
  const mailCheck = () => {
    if (email.length <= 0) {
      alert("이메일을 입력해주세요");
      return;
    }
    emailCheck(email).then((result) => {
      console.log(result.data);
      if (result.data === false)
        alert("사용할 수 있는 이메일 입니다 인증번호 전송 버튼을 눌러주십시오");
      setEmailInDB(result.data);
      setChecked(!result.data);
    });
  };

  useEffect(() => {
    // 이메일 입력창에 입력된 값이 없어지면 버튼들의 상태를 초기화
    if (email.length < 1) {
      setChecked(false);
      setEmailInDB(false);
    }
  }, [email.length]);

  return (
    <div className="signup-container">
      <span className="signuptext">회원가입</span>
      <div className="input-container">
        <TextField
          className="total_input"
          type="text"
          label="이름"
          onChange={nameChange}
        />
        {!nameVisable && name.length > 0
          ? error("이름 형식을 확인해주세요")
          : error()}
      </div>

      <div className="input-container">
        <div className="email-input">
          <TextField
            className="total_input"
            label="이메일"
            type="email"
            size="large"
            onChange={emailChange}
          />
          <Button
            variant="contained"
            onClick={() => {
              checked ? sendEmail() : mailCheck();
            }}
            className="btn-send-email"
          >
            {email.length > 0
              ? checked
                ? "인증번호전송"
                : "중복확인"
              : "중복확인"}
          </Button>
        </div>
        {email.length > 0 && !emailVisable
          ? error("이메일 입력을 확인해주세요")
          : error("")}
        {email.length > 0
          ? emailIndDB
            ? error("이미 존재하는 이메일 입니다")
            : error("")
          : error("")}
        <div className="email-check-button">
          {emailSend && (
            <>
              <TextField
                id="email-check-number-input"
                type="numric"
                placeholder="인증 번호 입력"
                size="small"
                variant="standard"
                disabled={emailChecked}
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
          <TextField
            className="total_input"
            id="address"
            label="주소"
            disabled
          />
          <Button
            className="addressButton"
            variant="contained"
            onClick={() => postalSeach()}
          >
            주소검색
          </Button>
        </div>
      </div>
      <div className="input-container">
        <TextField
          className="total_input"
          id="address_detail"
          label="비밀번호"
          type="password"
          onChange={passwordChange}
          onFocus={addressChange}
        />
        {!passwordVisable && password.length > 0
          ? error("비밀번호 형식을 확인하세요")
          : error()}
      </div>

      <div className="input-container">
        <TextField
          className="total_input"
          label="비밀번호 확인"
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
        <Button
          className="Signup-btn"
          variant="contained"
          endIcon={<SendIcon />}
          disabled={!emailChecked}
          onClick={() => {
            if (
              name.length > 0 &&
              email.length > 0 &&
              password.length > 0 &&
              address.length > 0 &&
              checkPassword.length > 0 &&
              password === checkPassword
            ) {
              alert("회원가입에 성공했습니다 로그인 페이지로 돌아갑니다");
              setregisterSuccess(checkSuccess);
            } else {
              alert("입력칸을 확인해주세요");
              setregisterSuccess(false);
            }
          }}
        >
          회원가입
        </Button>
      </div>
    </div>
  );
}

export default Register;
