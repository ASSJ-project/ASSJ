import "../components/domain/FindPassword/FindPassword.css";
import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { emailCheck } from "../apis/emailCheck/emailCheck";
import { useNavigate } from "react-router-dom";
import { passwordChange } from "@/apis/passwordchange/passwordChange";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import ImgHeader from "../components/Structure/Header/ImgHeader";
import Footer from "@/components/Structure/Footer/Footer";

function FindPassword() {
  const [key, setKey] = useState("");
  const [checkKey, setCheckKey] = useState();
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState(true);
  const [keyErrorMessage, setKeyErrorMessage] = useState(true);
  const [pwd, setPwd] = useState("");
  const [PwdErrorMessage, setPwdErrorMessage] = useState(false);
  const [confirmPwd, setConfirmPwd] = useState(false);
  const [confirmPwdErrorMessage, setConfirmPwdErrorMessage] = useState(false);
  const [emailDisable, setEmailDisable] = useState(false); //이메일 인증 완료 시 비활성화: 인증 후 수정 방지
  const [passwordDisable, setPasswordDisable] = useState(true); //비밀번호 입력창 비활성화
  const [btnDisable, setBtnDisable] = useState(true); //비밀번호 재설정 버튼 비활성화
  const [isLogin, setIsLogin] = useState(""); // 로그인 상태인지 로그인 상태아닌지 체크입니다.

  const passwordRegex =
    /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;

  //뒤로가기 버튼을 위해 useNavigate 선언
  const navigate = useNavigate();

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changeKey = (e) => {
    setKey(e.target.value);
  };

  //비밀번호 정규식 확인
  const changePwd = (e) => {
    setPwd(e.target.value);
    passwordRegex.test(e.target.value)
      ? setPwdErrorMessage(true)
      : setPwdErrorMessage(false);
  };

  //비밀번호 재입력 확인
  const changeconfirmPwd = (e) => {
    setConfirmPwd(e.target.value);
    if (e.target.value == pwd) {
      setConfirmPwdErrorMessage(true);
      setBtnDisable(false);
    } else {
      setConfirmPwdErrorMessage(false);
    }
    // pwd == (e.target.value) ? setConfirmPwdErrorMessage(true) && setBtnDisable(false) : setConfirmPwdErrorMessage(false);
    // confirmPwd == pwd ? setConfirmPwdErrorMessage(true) : setConfirmPwdErrorMessage(false);
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
    setCheckKey(ranNum);
    console.log(ranNum);
    //이메일 값과 인증번호 값 딕셔너리에 추가
    let templateParams = {
      sendemail: email,
      number: ranNum,
    };
    //이메일 검사를 통해 해당 이메일이 존재할 경우 이메일 전송, 존재하지 않을 경우 에러메세지 출력
    emailCheck(email).then((result) => {
      console.log(result.data);
      if (result.data == true) {
        console.log("이메일 전송 성공");
        setEmailDisable(true);
        // emailjs.send('service_vpprlhi', 'template_w9u1t6g', templateParams)
        setEmailErrorMessage(true);
      } else {
        console.log("이메일 전송 실패");
        setEmailErrorMessage(false);
      }
    });
  };
  //인증코드 확인 후 일치할 시 버튼 활성화 일치하지 않을 경우 버튼 비활성화, 에러메시지 출력
  const checkKeyValue = () => {
    console.log(key);
    console.log(checkKey);
    if (key != checkKey) {
      setPasswordDisable(true);
      setKeyErrorMessage(false);
    } else {
      setPasswordDisable(false);
      setKeyErrorMessage(true);
    }
  };

  useEffect(() => {
    setIsLogin(sessionStorage.getItem("login"));
  }, []);

  return (
    <div className="fpwd-all-container">
      <div className="fpwd-title-container">
        <Button
          className="backbtn "
          variant="contained"
          onClick={() => {
            navigate(-1);
          }}
        >
          이전
        </Button>
        <ImgHeader />
      </div>

      <div>
        <Paper className="container_border" elevation={8}>
          <div>
            <span className="signuptext">
              비밀번호 {isLogin ? "수정" : "찾기"}
            </span>
          </div>

          <div className="fp_input-container">
            <div className="fp-inner-container">
              <TextField
                className="fpwd-body"
                type="email"
                label="이메일"
                size="large"
                value={email}
                onChange={changeEmail}
                id="email-input"
                disabled={emailDisable}
                autoFocus
              />
              {/* setCheckEmail(emailCheck(email)); */}
              <Button
                className="pw_btn"
                variant="contained"
                onClick={() => {
                  sendEmail(email);
                }}
              >
                확인
              </Button>
              {!emailErrorMessage && (
                <div className="errorMessage">존재하지 않는 이메일입니다</div>
              )}
            </div>
            <div className="fp-inner-container">
              <TextField
                className="fpwd-body"
                type="text"
                label="인증번호"
                value={key}
                onChange={changeKey}
              />
              <Button
                className="pw_btn"
                variant="contained"
                onClick={() => {
                  checkKeyValue();
                }}
              >
                확인
              </Button>
              {!keyErrorMessage && (
                <div className="errorMessage">인증번호가 일치하지 않습니다</div>
              )}
            </div>
            <div className="fp-inner-container">
              <TextField
                className="newpassword"
                type="password"
                label="새로운 비밀번호"
                onChange={changePwd}
                disabled={passwordDisable}
              />
              {!PwdErrorMessage && pwd.length > 0 && (
                <div className="errorMessage">
                  비밀번호 형식은 8자 이상 영문 숫자 특수문자 조합입니다
                </div>
              )}
            </div>
            <div className="fp-inner-container">
              <TextField
                className="newpassword"
                type="password"
                label="비밀번호 재입력"
                onChange={changeconfirmPwd}
                disabled={passwordDisable}
              />
              {!confirmPwdErrorMessage && confirmPwd.length > 0 && (
                <div className="errorMessage">비밀번호가 일치하지 않습니다</div>
              )}
            </div>

            <div className="fp_btn_margin">
              <Button
                className="fpwd-nextbtn"
                variant="contained"
                disabled={btnDisable}
                onClick={() => passwordChange(email, pwd)}
              >
                비밀번호 재설정
              </Button>
            </div>
          </div>
        </Paper>
        <Footer />
      </div>
    </div>
  );
}

export default FindPassword;
