import React, { useState, useEffect } from 'react';
import "../static/css/MyPage-Info.css";
import frame from "../static/images/Error-Frame1.png";
import { Link } from "react-router-dom";
import axios from 'axios';

//로그인이 성공했다 가정하고 
sessionStorage.setItem("key1", 10);
//로그인 성공했을 떄 유저DB에 있는 기본키값이나 아이디값을 가져와서 세션이나 로컬에 저장해야할거같습니다.
const ok = sessionStorage.getItem("key1");  

const MyPage =() => {
    const[users , setUsers] = useState([]);
    const[company] = useState(['구글','네이버','한국','중국'])
    const[number,setNumber] = useState(0)
    
    //버튼 클릭했을 때 로컬스토리지에 저장하는거
    // 메인페이지에서 마커 클릭했을 때 로컬스토리지에 저장한다는 가정 마이페이지 테스트용
    const fix1=()=>{ 
      setNumber(number+1)
      let textbox1 = document.getElementById('my_company1').value;
      let get_local = localStorage.getItem("data"); //get_local은 로컬에 키가 data로 저장된 value값을 가져온다.
      if (get_local == null) { // 값이 비어있다면
        get_local = []; //빈배열로만들어주고
      } else {
        get_local = JSON.parse(get_local); // 값이 있다면 배열로만들어준다 로컬스토리지에는 key,value로 밖에 저장되지 않아서 JSON.parse 를 이용해야 한다.
      }

      get_local.push(textbox1);
      get_local = new Set(get_local);
      get_local = [...get_local];
      localStorage.setItem("data", JSON.stringify(get_local));
    }

    //버튼 클릭했을 때 로컬스토리지에 저장하는거
    // 메인페이지에서 마커 클릭했을 때 로컬스토리지에 저장한다는 가정 마이페이지 테스트용
    const fix2=()=>{ 
      let textbox2 = document.getElementById('my_company2').value;

      let get_local = localStorage.getItem("key"); //get_local은 로컬에 키가 data로 저장된 value값을 가져온다.
      if (get_local == null) { // 값이 비어있다면
        get_local = []; //빈배열로만들어주고
      } else {
        get_local = JSON.parse(get_local); // 값이 있다면 배열로만들어준다 로컬스토리지에는 key,value로 밖에 저장되지 않아서 JSON.parse 를 이용해야 한다.
      }

      get_local.push(textbox2);
      get_local = new Set(get_local);
      get_local = [...get_local];
      localStorage.setItem("key", JSON.stringify(get_local));
    }

    useEffect(() => {
      axios.get('https://jsonplaceholder.typicode.com/users/'+ok) //여기에 api요청하면 될거같습니다.
          .then(response => {
              setUsers(response.data);
          });
    }, []);


    return (
      <div className="MyPage-Main">
        <div className="MyPage-Head">
          <Link to="/SideBar" className="left-items"><img src={frame} className="oo"/></Link>
          <div className="left-items2">알쓸신잡</div>
          <Link to='/Main' className="right-items" style={{ textDecoration: "none" }}>Home</Link>
        </div>

        <div className='MyPage'>MY PAGE</div>

        <div className="ff">
          <div className="myinfo1">내정보</div>
          <Link to='/MyPage2' className="myinfo2" style={{ textDecoration: "none" }}>최근 조회 기록</Link>
        </div>
        <div className="ee">
            <div className="all">이름 : {users.name}</div>
            <div className="all">메일 : {users.username}</div>
            <div className="all">주소 : {users.email}</div>
            <div className="all">현재 비밀번호 :{users.phone}</div>
            <div className="all">새비밀번호</div>
            <div className="all">비밀번호확인</div>
            <button onClick={fix1} id="my_company1" value={company[number]} > 날 클릭해봐 </button>
            <button onClick={fix2} id="my_company2" value={company}> key </button>
        </div>
      </div>
    );
  }

export default MyPage;

 /* <div className='ssss'>안뇽 
<div><Link to='/MyPage2' className="my-record" style={{ textDecoration: "none" }}>최근 조회 기록</Link></div> */