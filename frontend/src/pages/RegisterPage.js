// import Address from "./SignupApi/SignupAddress";
import "../components/domain/Register/register.css";
import { postalSeach } from "../components/domain/Register/RegisterApi";
import { useEffect, useState } from "react";


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setcheckPassword] = useState("");
  const [nameVisable, setNameVisable] = useState("");
  const [emailVisable, setEmailVisable] = useState("");
  const [passwordVisable, setPasswordVisable] = useState("");
  const [checkPasswordVisable, setcheckPasswordVisable] = useState("");

  const nameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z]{2,}$/;
  const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const nameChange = (e) => {
    setName(e.target.value);
    if (nameRegex.test(name)) {
      setNameVisable(true);
    } else {
      setNameVisable(false);
    }
  };
  const emailChange = (e) => {
    setEmail(e.target.value);
    if (emailRegex.test(email)) {
      setEmailVisable(true);
    } else {
      setEmailVisable(false);
    }
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
    if (passwordRegex.test(password)) {
      setPasswordVisable(true);
    } else {
      setPasswordVisable(false);
    }
  };

  const checkPasswordChange = (e) => {
    setcheckPassword(e.target.value);
    if(password == checkPassword) {
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

  return (
    <div className="signup-container">
      <span className="signuptext">회원가입</span>
      <div className="input-container">
        <p className="text_box">이름</p>
        <input className="total_input" 
          placeholder="User name" 
          type="text" 
          onChange={nameChange}/>
        {!nameVisable && name.length > 0 &&(
            <div className="errorMessage">이름 형식을 확인해주세요</div>
        )}
      </div>
      <div className="input-container">
        <p className="text_box">이메일</p>
        <input
          className="total_input"
          placeholder="Email Address"
          type="email"
          onChange={emailChange}
        />
        {!emailVisable && email.length > 0 &&(
            <div className="errorMessage">이메일 형식을 확인해주세요</div>
        )}
      </div>
      <div className="input-container">
        <p className="text_box">주소</p>
        <input
          className="total_input"
          placeholder="User Address"
          onClick={() => postalSeach()}
        />
      </div>
      <div className="input-container">
        <p className="text_box">상세주소</p>
        <input className="total_input" placeholder="Detailed Address" />
      </div>
      <div className="input-container">
        <p className="text_box">비밀번호</p>
        <input 
          className="total_input" 
          placeholder="Password" 
          type="password" 
          onChange={passwordChange}
        />
        {!passwordVisable && password.length > 0 &&(
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
        {!checkPasswordVisable && checkPassword.length > 0 && (
            <div className="errorMessage">비밀번호가 일치하지 않습니다</div>
        )}
      </div>
      <div>
        <button className="Signup-btn">회원가입</button>
      </div>
    </div>
  );
}

export default Register;