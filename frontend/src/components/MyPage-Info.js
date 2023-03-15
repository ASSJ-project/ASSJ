import React, { useState, useEffect } from 'react';
import "../static/css/MyPage-Info.css";
import frame from "../static/images/Error-Frame1.png";
import { Link } from "react-router-dom";
import axios from 'axios';
// let [user, setuser] = useState(data)
// import UserList from './UserList';

//로그인이 성공했다 가정하고 
sessionStorage.setItem("key1", 10);
//로그인 성공했을 떄 유저DB에 있는 기본키값이나 아이디값을 가져와서 세션이나 로컬에 저장해야할거같습니다.
var ok = sessionStorage.getItem("key1");  

const MyPage =() => {
  // let[로그인정보] = useState(["이진범" , "ahso0@naver.com" , "효성동이랍니다" , "1234"]);
    // let {id} = useParams();
    const[users , setUsers] = useState([]);

      
    const fix=()=>{
      sessionStorage.setItem("company","안녕")
    }


    useEffect(() => {
      axios.get('https://jsonplaceholder.typicode.com/users/'+ok) //여기에 api요청하면 될거같습니다. 이건 임시로 사이트에서했어영
          .then(response => {
              setUsers(response.data);
          });
    }, []);


    return (
      <div className="main">
        <Head/>
        <Link to='/Main' className="home" style={{ textDecoration: "none" }}>Home</Link>
        <div className="my-information">내정보</div>
        <Link to='/MyPage2' className="my-record" style={{ textDecoration: "none" }}>최근 조회 기록</Link>
        <p className="mypage">MY PAGE</p> 
        <div className="ee">
          <Yam/>
          <div className="yam">
            <div className="yas">{users.name}</div>
            <div className="yas">{users.username}</div>
            <div className="yas">{users.email}</div>
            <div className="yas">{users.phone}</div>
            <div className="yas">새비밀번호</div>
            <div className="yas">비밀번호확인</div>
            <button onClick={fix}>1 </button>
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