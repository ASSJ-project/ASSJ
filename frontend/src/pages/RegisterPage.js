// import Address from "./SignupApi/SignupAddress";
import "../components/domain/Register/register.css";
import { postalSeach } from "../components/domain/Register/RegisterApi";
import { useEffect, useState } from "react";
import { emailCheck } from "../apis/emailCheck/emailCheck";
import { registerDo } from "../functions";
import InputContainer from "../components/domain/Register/InputContainer";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [checkPassword, setcheckPassword] = useState("");
  const [nameVisable, setNameVisable] = useState("");
  const [emailVisable, setEmailVisable] = useState("");
  const [passwordVisable, setPasswordVisable] = useState("");
  const [checkPasswordVisable, setcheckPasswordVisable] = useState("");

  const nameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z]{2,}$/;
  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const checkRegex = (regex, name) => {};

  const nameChange = (e) => {
    setName(e);
    if (nameRegex.test(name)) {
      setNameVisable(true);
    } else {
      setNameVisable(false);
    }
  };
  const emailChange = (e) => {
    setEmail(e);
    if (emailRegex.test(email)) {
      setEmailVisable(true);
    } else {
      setEmailVisable(false);
    }
  };

  const addressChange = (e) => {
    setAddress(e);
  };
  const passwordChange = (e) => {
    setPassword(e);
    if (passwordRegex.test(password)) {
      setPasswordVisable(true);
    } else {
      setPasswordVisable(false);
    }
  };

  const checkPasswordChange = (e) => {
    setcheckPassword(e);
    if (password == checkPassword) {
      setcheckPasswordVisable(true);
    } else {
      setcheckPasswordVisable(false);
    }
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

  return (
    <div className="signup-container">
      <span className="signuptext">회원가입</span>
      <InputContainer
        title="이름"
        change={(name) => nameChange(name)}
        type="text"
        placeHolder="User name"
      />
      {!nameVisable && name.length > 0 && (
        <div className="errorMessage">이름 형식을 확인해주세요</div>
      )}
      <InputContainer
        title="이메일"
        change={(email) => emailChange(email)}
        type="email"
        placeHolder="User email"
      />
      {!emailVisable && email.length > 0 && (
        <div className="errorMessage">이메일 형식을 확인해주세요</div>
      )}
      <InputContainer
        title="주소"
        change={(address) => addressChange(address)}
        click={() => postalSeach()}
        type="text"
        placeHolder="User address"
        id="address"
      />
      <InputContainer
        title="상세주소"
        placeHolder="Detailed Address"
        id="address_detail"
      />
      <InputContainer
        title="비밀번호"
        change={(password) => passwordChange(password)}
        type="password"
        placeHolder="Password"
      />
      {!passwordVisable && password.length > 0 && (
        <div className="errorMessage">비밀번호 형식을 확인해주세요</div>
      )}
      <InputContainer
        title="비밀번호 확인"
        change={(checkPassword) => checkPasswordChange(checkPassword)}
        type="password"
        placeHolder="Confirm password"
      />
      {password != checkPassword && checkPassword.length > 0 && (
        <div className="errorMessage">비밀번호가 일치하지 않습니다</div>
      )}

      {/* 커밋 버튼 활성화 조건 
       1. 이메일 체크가 끝나야 함 => 일단 활성화 
       2. 모든 입력칸이 길이가 0 이상이여야 함 
       
       */}
      <div>
        <button className="Signup-btn" onClick={checkSuccess}>
          {" "}
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Register;
