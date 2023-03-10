import { useState } from "react";
import "../static/css/MyPage-Info.css";
import frame from "../static/images/Error-Frame1.png";
import { Link } from "react-router-dom";

// let[로그인정보] = useState(["이진범" , "ahso0@naver.com" , "효성동이랍니다" , "1234"]);


const MyPage =() => {
  let[로그인정보] = useState(["이진범" , "ahso0@naver.com" , "효성동이랍니다" , "1234"]);

    return (
      <div className="main">
        <Head/>
        <Link to='/Main' className="home">Home</Link>
        <div className="my-information">내정보</div>
        <Link to='/MyPage2' className="my-record">최근 조회 기록</Link>
        <p className="mypage">MY PAGE</p>
        <div className="ee">
          <Yam/>
          <div className="yam">
            <div className="yas">{로그인정보[0]}</div>
            <div className="yas">{로그인정보[1]}</div>
            <div className="yas">{로그인정보[2]}</div>
            <div className="yas">{로그인정보[3]}</div>
            <div className="yas">새비밀번호</div>
            <div className="yas">비밀번호확인</div>
          </div>
        </div>
      </div>
    );
  }

export default MyPage;

function Yam(){  // 이친구는 왼쪽 컴포넌트에용
  return(
    <div className="yam">
      <div className="yas">이름</div>
      <div className="yas">메일</div>
      <div className="yas">주소</div>
      <div className="yas">현재비밀번호</div>
      <div className="yas">새비밀번호</div>
      <div className="yas">비밀번호확인</div>
      <div className="yas">수정</div>
    </div>
  );
}

function Head(){ // 이 친구는 윗부분에 있는 컴포넌트에용
  return(
    <>
  <span className="App-title">알쓸신잡</span>
  <header className="App-header">
    <Link to="/SideBar"><img src={frame} className="Hug"/></Link>
  </header>
  </>
  );
}