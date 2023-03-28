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
  }

  const Nav = styled.nav`
    color: #878982;
    width: 100vw;

    .header__menulist {
    width: 100%;  
    margin: 0 auto;
    padding: 15px 0;
    display: flex;
    justify-content: space-around;
    list-style : none;
    border: solid 1px #dfe2d5
    }

    @media screen and (max-width: 768px) {
      flex-wrap: wrap;
  
      .header__menulist {
        display: ${(props) => (props.isToggled ? 'flex' : 'none')};
        flex-direction: row;
        width: 100%;
        height : 100%;
      }
    `;

  const Head = styled.div`
    width: 100vw;
    height: 60px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
    background-color: white;

    .logo {
      margin: 0 1rem;
      font-size: 2rem;
    }

    img {
      width: 200px;
      height: 60px;
    }

    .header__right {
      list-style: none;
      display: flex;
    }

    .header__right button {
      border: 0;
      background-color: transparent;
    }

    li {
      padding: 0 1rem;
    }

    .toggle {
      display: none;
      font-size: 20px;
      margin-left: 3px;
    }

    @media screen and (max-width: 768px) {
      .header__right {
        flex-direction: row;
        width: 100px;
      }

      .header__right li {
        font-size: 20px;
      }

      img,
      .toggle,
      .user {
        display: block;
      }
    }
  `;

  return (
    <>
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
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        {/* User 메뉴 리스트 */}
        <ul className="header__right">
          <li>
            <Link to="/mypage">
              <FaUserCircle />{' '}
            </Link>
          </li>
          <li>
            <button onClick={logout}>
              <AiOutlineLogout />
            </button>
          </li>
        </ul>
      </Head>
      <Nav isToggled={isToggled}>
        {/* 메뉴 리스트 */}
        <ul className="header__menulist">
          <li>
            <Link to="/map">회사정보</Link>
          </li>
          <li>
            <Link to="/mypage">마이페이지</Link>
          </li>
          <li>
            <Link to="/mypage">Secciones</Link>
          </li>
          <li>
            <button
              onClick={logout}
              style={{ border: '0', backgroundColor: 'transparent' }}
            >
              logout
            </button>
          </li>
        </ul>
      </Nav>
    </>
  );
}

export default Header;
