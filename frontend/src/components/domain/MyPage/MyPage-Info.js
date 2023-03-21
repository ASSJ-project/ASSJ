import React, { useState, useEffect } from 'react';
import "../domain/MyPage/MyPage.css"
import { Link } from "react-router-dom";
import axios from 'axios';

//로그인이 성공했다 가정하고 
sessionStorage.setItem("key1", 10);
//로그인 성공했을 떄 유저DB에 있는 기본키값이나 아이디값을 가져와서 세션이나 로컬에 저장해야할거같습니다.
const ok = sessionStorage.getItem("key1");  

const MyPageInfo =() => {
    const[users , setUsers] = useState([]);
    const[company] = useState(['구글','네이버','한국','중국']); //지도클릭가정 ^0^
    const[number,setNumber] = useState(0);
    const[pw,setPw] = useState('');
    
    // 마이페이지(내정보)상태로 들어오면 api를 요청하여 아이디정보를 가져온다
    useEffect(() => {
      axios.get('https://jsonplaceholder.typicode.com/users/'+ok) //여기에 api요청하면 될거같습니다.
          .then(response => {
              setUsers(response.data);
          });
    }, []);

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

    //비밀번호를 입력해주세요 인풋칸에 적으면 useState훅을 통해 적은값을 가져옴
    const onChange = (e) => {
      setPw(e.target.value);
    };

    // // 비밀번호가 동일하면 보이게 안보이게 하려고합니다.
    // const checkPw = () =>{
    //   if(pw==users.phone){
    //     .all{

    //     }
    //   }
    // }

    return (
        <div className="ee">
            <div className='all'>현재비밀번호 확인:<input placeholder='비밀번호를 입력하세요' type={'password'} onChange={onChange} ></input><button>확인</button></div>
            <div className="all">이름 : {users.name}</div>
            <div className="all">메일 : {users.email}</div>
            <div className="all">현재 비밀번호 :{users.phone}</div>
            <div className="all">주소 : {users.id}</div>
            <button onClick={fix1} id="my_company1" value={company[number]} > 날 클릭해봐(지도클릭이라고 가정이요^0^) </button>
        </div>    
    );
  }

export default MyPageInfo;


