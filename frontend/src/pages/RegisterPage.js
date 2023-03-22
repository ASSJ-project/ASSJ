// import Address from "./SignupApi/SignupAddress";
import "../components/domain/Register/register.css";
import { postalSeach } from "../components/domain/Register/RegisterApi";
import { useEffect, useState } from "react";
import { emailCheck } from "../apis/emailCheck/emailCheck";

function Register() {
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
        <p className="text_box">이메일</p>
        <input
          className="total_input"
          placeholder="Email Address"
          type="email"
        />
        {/* <button onClick={() => emailCheck()}>이메일확인</button> */}
      </div>
      {/* {emailCheck && ( */}
      <div className="other">
        <div className="input-container">
          <p className="text_box">이름</p>
          <input className="total_input" placeholder="User name" type="text" />
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
          />
        </div>
        <div className="input-container">
          <p className="text_box">비밀번호 확인</p>
          <input
            className="total_input"
            placeholder="Confirm password"
            type="password"
          />
        </div>
        <div>
          <button className="Signup-btn">회원가입</button>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

export default Register;
