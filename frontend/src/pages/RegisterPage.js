import "../components/domain/Register/register.css";
import { postalSeach } from "../components/domain/Register/RegisterApi";
import React, { useEffect, useState } from "react";
import { emailCheck } from "../apis/emailCheck/emailCheck";
import { registerDo } from "@/apis/register/registerDo";
import emailjs from "@emailjs/browser";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import ImgHeader from "../components/Structure/Header/ImgHeader";
import Footer from "../components/Structure/Footer/Footer";

function Register() {
  const [name, setName] = useState(""); // 이름
  const [email, setEmail] = useState(""); // 이메일 주소
  const [password, setPassword] = useState(""); // 비밀번호
  const [address, setAddress] = useState(""); // 주소
  const [checkPassword, setcheckPassword] = useState(""); // 비밀번호 확인 상태
  const [nameVisable, setNameVisable] = useState(""); // 이름 입력값의 유효성
  const [emailVisable, setEmailVisable] = useState(""); // 이메일 입력값의 유효성
  const [passwordVisable, setPasswordVisable] = useState(""); // 비밀번호 입력값의 유효성
  const [registerSuccess, setregisterSuccess] = useState(); // 회원가입 성공 유무
  const [emailSend, setEmailSend] = useState(false); // 이메일 확인번호 전송 상태
  const [emailInput, setEmailInput] = useState(""); // 이메일 입력 업데이트
  const [emailChecked, setEmailChecked] = useState(false); // 이메일 전송 숫자와 입력 숫자 일치 확인
  const [emailIndDB, setEmailInDB] = useState(false); // 이메일 DB 내 존재 유무
  const [random, setRandom] = useState("000000"); // 사용자에게 보낼 6자리 난수
  const [checked, setChecked] = useState(false); // 전송 버튼과 에러메시지 출력을 위한 상태

  const nameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z]{2,}$/; // 이름 정규식 (한글, 영문 2글자 이상)
  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/; // 이메일 정규식
  const passwordRegex =
    /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/; // 비밀번호 정규식 (숫자 영문 특수문자 조합 8자리 이상)

  // 마운트시에 주소검색 기능 불러오기
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    // 이메일 입력창에 입력된 값이 변하면 버튼들의 상태를 초기화
    setChecked(false);
    setEmailInDB(false);
    setEmailChecked(false);
  }, [email.length]);

  // 이벤트, 셋함수, 정규식, 유효성-셋함수를 받아 업데이트 하는 함수
  const setState = (e, set, regex, visable) => {
    set(e.target.value);
    regex.test(e.target.value) ? visable(true) : visable(false);
  };

  // 회원가입 시도 요청 함수
  const checkSuccess = () => {
    registerDo(email, password, address, name);
  };

  //인증번호 6자리 생성 함수
  const generateRandom = function () {
    const ranNum = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
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
    // emailjs.send("service_vpprlhi", "template_w9u1t6g", templateParams);
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

  // 메일 전송 버튼 색깔 토글 함수
  const sendBtn = (checked) => (checked ? "red" : "blue");

  // 회원가입 함수
  const enterClick = () => {
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
  };

  return (
    <div className="signup-all-container">
      <div className="signup-container">
        <ImgHeader />
      </div>
      <div className="signup-paper-container">
        <Paper className="fpwd-container container_border" elevation={8}>
          <div className="signuptext">회원가입</div>
          <div className="input-container">
            <TextField
              className="total_input"
              type="text"
              label="이름"
              onChange={(e) => setState(e, setName, nameRegex, setNameVisable)}
              autoComplete="off"
              autoFocus
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
                onChange={(e) =>
                  setState(e, setEmail, emailRegex, setEmailVisable)
                }
              />
              <Button
                id="btn-set"
                variant="contained"
                onClick={() => {
                  checked ? sendEmail() : mailCheck();
                }}
                style={{ background: sendBtn(checked) }}
                className="btn-send-email"
              >
                {email.length > 0
                  ? checked
                    ? "전송"
                    : "중복확인"
                  : "중복확인"}
              </Button>
            </div>
            {email.length > 0 && !emailVisable
              ? error("이메일 형식을 확인해주세요")
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
                    onChange={(e) => setState(e, setEmailInput, /^$/, (f) => f)}
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
                placeholder="주소검색 버튼을 눌러주세요"
                disabled
              />
              <Button
                id="btn-set"
                className="addressButton"
                variant="contained"
                onClick={() => postalSeach(setAddress)}
              >
                주소검색
              </Button>
            </div>
          </div>
          <div className="input-container" id="password">
            <TextField
              className="total_input"
              label="비밀번호"
              type="password"
              onChange={(e) =>
                setState(e, setPassword, passwordRegex, setPasswordVisable)
              }
            />
            {!passwordVisable && password.length > 0
              ? error("비밀번호 형식은 8자 이상 영문 숫자 특수문자 조합입니다")
              : error()}
          </div>

          <div className="input-container">
            <TextField
              className="total_input"
              label="비밀번호 확인"
              type="password"
              onChange={(e) =>
                setState(e, setcheckPassword, passwordRegex, (f) => f)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  enterClick();
                }
              }}
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
                enterClick();
              }}
            >
              회원가입
            </Button>
          </div>
        </Paper>

        <Footer />
      </div>
    </div>
  );
}

export default Register;
