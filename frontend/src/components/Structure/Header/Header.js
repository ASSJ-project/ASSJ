import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from 'assets/images/logo_only_word.svg';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const HeadContainer = styled.div`
  margin: 0;
  padding: 0;
  font-family: Georgia, '맑은 고딕', serif;
`;

const Head = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border-bottom: solid 1px #dfe2d5;
    margin: 0 10px;

    img {
      margin-top : 10px;
      width: 200px;
      height: 60px;
    }

    .header-right {
      list-style: none;
      display: flex;
      width: 180px;
      font-size: 10px;
    }

    .header-right Button{
      margin:0 4px;
    }

    .toggle {
      display: none;
      font-size: 30px;
      width: 100px;
    }

    @media screen and (max-width: 768px) {
      .header-right {
        flex-direction: row;
        width: 150px;
        font-size: 14px;
      }

      .header-right Button{
        margin:0 3px;
      }

      .header-logo {
        width: 180px;
      }

      img {
        width: 160px;
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
        width: 130px;
        font-size: 8px;
      }

      img{
        width: 120px;
      }

      .header-right Button{
        margin:0 1px;
      }
  `;

function Header() {
  const [isLogin, SetIsLogin] = useState('');
  const [isAdmin, SetIsAdmin] = useState('');

  useEffect(() => {
    let login = localStorage.getItem('login');
    let role = localStorage.getItem('role');
    if (login == 'true') {
      SetIsLogin(true);
      if (role == 'ADMIN') {
        SetIsAdmin(true);
      } else {
        SetIsAdmin(false);
      }
    } else {
      SetIsLogin(false);
    }
  }, []);

  function logout() {
    localStorage.clear();
    alert('로그아웃되었습니다.');
    window.location.href = 'login';
  }

  return (
    <HeadContainer>
      <Head>
        {/* 알쓸신잡 로고 */}
        <div className="header-logo">
          <Link to="/map" style={{ textDecoration: 'none' }}>
            <img src={logo} alt="logo" />
          </Link>
        </div>

        {/* User 메뉴 리스트 */}
        <div className="header-right">
          {!isLogin ? (
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button variant="contained" size="small" disableElevation>
                로그인
              </Button>
            </Link>
          ) : isAdmin ? (
            <Link to="/admin" style={{ textDecoration: 'none' }}>
              <Button variant="contained" size="small" disableElevation>
                관리자
              </Button>
            </Link>
          ) : (
            <Link to="/mypage" style={{ textDecoration: 'none' }}>
              <Button variant="contained" size="small" disableElevation>
                내정보
              </Button>
            </Link>
          )}
          {!isLogin ? (
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Button variant="contained" size="small" disableElevation>
                가입
              </Button>
            </Link>
          ) : (
            <Button
              variant="contained"
              size="small"
              disableElevation
              onClick={logout}
            >
              나가기
            </Button>
          )}
        </div>
      </Head>
    </HeadContainer>
  );
}

export default Header;
