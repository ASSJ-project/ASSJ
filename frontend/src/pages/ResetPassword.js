import "../components/domain/FindPassword/FindPassword.css";
import backbtn from "../../../assets/images/backbtn.png"


function ResetPassword() {
    return(
        <>
            <div className="div1">
                <img src={backbtn} className="backbtn"/>
                <span>비밀번호 재설정</span>
            </div>
                
            <div className="div2">
                <span>비밀번호 재설정</span>
                <p>새로운 비밀번호를 입력해주세요</p>
            </div>

            <div className="div3">
                <p>새로운 비밀번호</p>
                <input type="password" placeholder="새로운 비밀번호" /> 
                <p>비밀번호 확인</p>
                <input type="password" placeholder="비밀번호 확인" /> 
            </div>
            <div className="div4">
                <button>비밀번호 변경</button>
            </div>
        </>
    ) 
}

export default ResetPassword