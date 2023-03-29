import "../components/domain/FindPassword/FindPassword.css";
import backbtn from "assets/images/backbtn.png"
import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { emailCheck } from "../apis/emailCheck/emailCheck";
import { useNavigate } from "react-router-dom";

function EmailVerification() {
    const [key, setKey] = useState(""); 
    const [checkKey, setCheckKey] = useState("");
    const [email, setEmail] = useState("");
    const [checkEmail, setCheckEmail] = useState("");
    const [emailErrorMessage, setEmailErrorMessage] = useState(false);
    const [keyErrorMessage, setKeyErrorMessage] = useState(false);
    const [disable, setDisable] = useState(true);

    const navigate = useNavigate();

    const changeEmail = (e) => {
        setEmail(e.target.value);
    }
    const changeKey = (e) => {
        setKey(e.target.value);
    }
    //인증번호 6자리 생성 함수
    var generateRandom = function () {
        var ranNum = Math.floor(Math.random()*(999999-111111 + 1)) + 111111;
        return ranNum;
    }

    //사용자 이메일에 메일보내기
    const sendEmail = () => {
        emailjs.init('O8bUvMyNJhc1Z6tVI');
        const ranNum = generateRandom();
        setCheckKey(ranNum);
        console.log(ranNum);
        let templateParams = {
            sendemail: email,
            number: ranNum,
        }
        if(checkEmail == true) {
            console.log("이메일 전송 성공")
            emailjs.send('service_vpprlhi', 'template_w9u1t6g', templateParams)
            setKeyErrorMessage(false);
        } else {
            console.log("이메일 전송 실패");
            setEmailErrorMessage(true);
        }   
    }
    
    //인증코드 확인 후 버튼 활성화 여부
    const checkKeyValue = () => {
        if(key != checkKey) {
            setDisable(true);
            setKeyErrorMessage(true);
        } else {
            setDisable(false);
            setKeyErrorMessage(false);
        }
    }

    return(
        <>    
            <div className="div1">
                    <img src={backbtn} onClick={() => {navigate(-1);}} className="backbtn"/>
            </div>

            <div className="find-container">        
                <div className="div2">
                    <span>비밀번호 찾기</span> <br></br>
                    <strong>비밀번호를 찾고자 하는 이메일을 입력한 뒤 이메일 인증 하십시오</strong>
                </div>

                <div className="div3">
                    <p>이메일</p>
                    <input type="email" placeholder="이메일" value={email} onChange={changeEmail} />
                    <button 
                        onClick={() => { 
                            setCheckEmail(emailCheck(email)); 
                            sendEmail(email) }}>확인</button>
                    {emailErrorMessage && (
                        <div className="errorMessage">존재하지 않는 이메일입니다</div>
                    )}
                    <p>인증번호</p>
                    <input type="text" placeholder="인증번호" value={key} onChange={changeKey} /> 
                    <button
                        onClick={() => {checkKeyValue()}}>확인</button>
                    {keyErrorMessage && (
                        <div className="errorMessage">인증번호가 일치하지 않습니다</div>
                    )}
                </div>
    
                <div className="div5"> {/*onClick={onClickbtn}*/}
                    <button id="nextbtn" disabled={disable} onClick={() => (window.location.href = "/ResetPassword")}>인증</button>
                </div>
            </div>
        </>
    )
}

export default EmailVerification