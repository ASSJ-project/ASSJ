//여기 최근조회기록 누르면 나오는 페이지에요 ㅎㅎ

import "../static/css/MyPage-Check.css";
import frame from "../static/images/Error-Frame1.png";
import { Link } from "react-router-dom";


function yab(){
  console.log(1)
}

const MyPage2 = () =>{
  return (
    <div className="main">
        <Head/>
        <Link to="/Main" className="home">Home</Link>
        <Link to="/MyPage" className="my-information2">내정보</Link>
        <button className="my-record2">최근 조회 기록</button>
        <p className="mypage">MY PAGE</p>
      </div>
    );
  
}

export default MyPage2; 

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