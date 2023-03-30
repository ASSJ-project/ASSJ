import React, { useState } from 'react';
import styled from 'styled-components';
import { FiAlignJustify, FiX } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import logo from 'assets/images/logo_only_word.svg';
import { Link } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';

function Header() {
  const [isToggled, setIsToggled] = useState(false);

  function logout() {
    sessionStorage.clear();
    alert('로그아웃되었습니다.');
    window.location.href = 'login';
  }

  const HeadContainer = styled.div`
    margin: 0;
    padding: 0;
    font-family: Georgia, '맑은 고딕', serif;
  `;

  const Nav = styled.nav`
    margin: 0 15px;
    
    .header__menulist {
    margin: 0 auto;
    padding: 15px 0;
    display: flex;
    justify-content: space-around;
    list-style : none;
    border-bottom: solid 1px #dfe2d5;
    color: #878982;
    font-size : 20px;
    }

    @media screen and (max-width: 768px) {
      flex-wrap: wrap;
  
      .header__menulist {
        display: ${(props) => (props.isToggled ? 'flex' : 'none')};
        flex-direction: row;
        font-size : 17px;
      }
  `;

  const Head = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border-bottom: solid 1px #dfe2d5;
    margin: 0 10px;

    img {
      width: 15vw;
      height: 60px;
    }

    .header-right {
      list-style: none;
      display: flex;
      width: 100px;
      font-size: 40px;
    }

    .header-right button {
      border: 0;
      background-color: transparent;
    }

    .toggle {
      display: none;
      font-size: 30px;
      width: 100px;
    }

    @media screen and (max-width: 768px) {
      .header-right {
        flex-direction: row;
        width: 70px;
        font-size: 30px;
      }

      .header-logo {
        width: 200px;
      }

      img {
        width: 150px;
        height: 60px;
      }

      .toggle,
      .user {
        display: block;
      }
    }

    @media screen and (max-width: 480px) {
      .header-right {
        flex-direction: row;
        width: 70px;
        font-size: 20px;
      }
  `;

  return (
    <HeadContainer>
      <Head isToggled={isToggled}>
        {/* 햄버거 버튼(bar) */}
        <div
          className="toggle"
          onClick={() => {
            setIsToggled(!isToggled);
          }}
        >
          {!isToggled ? <FiAlignJustify /> : <FiX />}
        </div>

        {/* 알쓸신잡 로고 */}
        <div className="header-logo">
          <img src={logo} alt="logo" />
        </div>

        {/* User 메뉴 리스트 */}
        <div className="header-right">
          <Link
            to="/mypage"
            style={{ textDecoration: 'none', color: '#9588E0' }}
          >
            <FaUserCircle />{' '}
          </Link>
          <button onClick={logout} style={{ color: '#9588E0' }}>
            <AiOutlineLogout />
          </button>
        </div>
      </Head>
      <Nav isToggled={isToggled}>
        <ul className="header__menulist">
          <li>
            <Link
              to="/map"
              style={{ textDecoration: 'none', color: '#878982' }}
            >
              Main
            </Link>
          </li>
          <li>
            <Link
              to="/mypage"
              style={{ textDecoration: 'none', color: '#878982' }}
            >
              MyInfo
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              style={{ textDecoration: 'none', color: '#878982' }}
            >
              Admin
            </Link>
          </li>
          <li>뭐하지 애는</li>
        </ul>
      </Nav>
    </HeadContainer>
  );
}

export default Header;
