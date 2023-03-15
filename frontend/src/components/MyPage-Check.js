//여기 최근조회기록 누르면 나오는 페이지에요 ㅎㅎ

import "../static/css/MyPage-Check.css";
import frame from "../static/images/Error-Frame1.png";
import { Link } from "react-router-dom";

// 요건 지도페이지에서 마커클릭시 세션스토리지나 로컬스토리지에 저장하면 좋을거같아영
var d =sessionStorage.getItem("company")

const MyPage2 = () =>{
  return (
    <div className="main">
        <Head/>
        <Link to="/Main" className="home" style={{ textDecoration: "none" }}>Home</Link>
        <Link to="/MyPage" className="my-information2"style={{ textDecoration: "none" }}>내정보</Link>
        <button className="my-record2">최근 조회 기록</button>
        <p className="mypage">MY PAGE</p>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>6</div>
        <div>6</div>
        <div>6</div>
        <div>6</div>
        <div>6</div>
        <div>{d}</div>
      </div>
    );
  
}

export default MyPage2; 

function Head(){ // 이 친구는 윗부분에 있는 컴포넌트에용
  return(
    <>
  <span className="App-title">알쓸신잡</span>
  <header className="App-header">
    <Link to="/SideBar" style={{ textDecoration: "none" }}><img src={frame} className="Hug"/></Link>
  </header>
  </>
  );
}