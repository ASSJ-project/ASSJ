import React, { useEffect, useState } from "react";
import styled from "styled-components"
import {FiAlignJustify, FiX} from "react-icons/fi";
import {FaUserCircle} from "react-icons/fa";
import logo from "../assets/images/logo_only_word.svg"
import { Link } from "react-router-dom";

function Header() {
    const [isToggled, setIsToggled] = useState(false);
    const [userToggled, setUserToggled] = useState(false);
  //   const [login,setLogin] = useState("true");

  // useEffect(()=>{
  //   if(sessionStorage.getItem("key1")){
  //     setLogin(false);
  //   };
  // },[]);

 

    const Head = styled.div`
    width : 100vw;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
    background-color: white;
    border : 2px solid #9588E0;
    
    .logo {
      margin: 0 1rem;
      font-size: 2rem;
    }

    img {
      width: 200px;
      height: 80px
    }
  
    .header__menulist {
      list-style: none;
      display: flex;
      margin : 0 100px 0 12px; 
      height : 100%;
    }

    .header__menulist li{
      
      justify-content : center;
      align-items : center;
      display : flex;
      height : 100%;
    }
  
    .header__left {
      display: flex;
    }
  
    .header__right {
      list-style: none;
      display: flex;
    }
  
    .header__right div {
      margin: 0 1rem;
    }
  
    li {
      padding: 0 1rem;
    }
  
    .toggle {
      display: none;
      font-size: 1.5rem;
      padding: 1rem 1rem;
    }

    .user {
      display: none;
      font-size: 1.5rem;
      padding: 1rem 1rem;
    }
    
    .header__menulist li:hover,
    .header__right li:hover{
      background-color: #9588E0;
    }


    @media screen and (max-width: 768px) {
      flex-wrap: wrap;
  
      .header__right {
        display: ${(props) => (props.userToggled ? "flex" : "none")};
        flex-direction: column;
        width: 100%;
        background-color: white;
      }
  
      .header__menulist {
        display: ${(props) => (props.isToggled ? "flex" : "none")};
        flex-direction: column;
        width: 100%;
        height : 100%;
        background-color: white;
        
      }
  
      .header__menulist li,
      .header__right li {
        margin: 1rem 0;
        padding: 0;
        text-align : center;
      }
  
      .toggle {
        display: block;
      }
  
      .user {
        display: block;
      }
    }
  `;

   

    return (
      
      <Head isToggled={isToggled} userToggled={userToggled}>
        {/* 햄버거 버튼(bar) */}
        <div className="toggle" onClick={() => {setIsToggled(!isToggled);}}>
         {!isToggled ?  <FiAlignJustify/> : <FiX/>}
        </div>
  
        {/* 알쓸신잡 로고 */}
        <div className="logo">
          <img src={logo} alt="logo"/>
        </div>
  
        {/* User 버튼 */}
        <div className="user" onClick={() => { setUserToggled(!userToggled);}}>
          {!userToggled? <FaUserCircle/> : <FiX/>}
        </div>
  
        {/* 메뉴 리스트 */}
        <ul className="header__menulist">
          <li><Link to="/map">회사정보</Link></li>
          <li><Link to="/home">이건뭐로</Link></li>
          <li><Link>Secciones</Link></li>
          <li><Link>Secciones</Link></li>
          <li><Link>Secciones</Link></li>
          <li><Link>Secciones</Link></li>
        </ul>
  
        {/* User 메뉴 리스트 */}
        <ul className="header__right">
          <li><Link to="/mypage">나의정보</Link></li>
          <li><button onClick={()=>sessionStorage.clear()}>로그아웃</button></li>
        </ul>
      </Head> 
    );
  }
  
  export default Header;	