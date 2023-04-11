import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "assets/images/logo_only_word.svg";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";

const HeadContainer = styled.div`
  width: 480px;
  min-width: 420px;
  height: 10vh;
  margin: auto;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-bottom: solid 1px #dfe2d5;
  margin: 0 10px;

  img {
    margin-top: 10px;
    width: 200px;
    height: 60px;
  }

  .header-right {
    list-style: none;
    display: flex;
    width: 220px;
  }

  .header-right Button {
    margin: 0 4px;
  }
`;

function Header() {
  const [isLogin, SetIsLogin] = useState("");
  const [isAdmin, SetIsAdmin] = useState("");

  useEffect(() => {
    let login = sessionStorage.getItem("login");
    let role = sessionStorage.getItem("role");
    if (login == "true") {
      if (role == "ROLE_ADMIN") {
        SetIsAdmin(true);
      } else {
        SetIsAdmin(false);
      }
      SetIsLogin(true);
    } else {
      SetIsLogin(false);
    }
  }, []);

  function logout() {
    sessionStorage.clear();
    Swal.fire({
      icon: "success",
      title: "로그아웃되었습니다.",
    }).then(function () {
      window.location.href = "login";
    });
  }

  return (
    <HeadContainer className="img_header">
      <Head>
        {/* 알쓸신잡 로고 */}
        <div className="header-logo">
          <Link to="/map" style={{ textDecoration: "none" }}>
            <img src={logo} alt="logo" />
          </Link>
        </div>

        {/* User 메뉴 리스트 */}
        <div className="header-right">
          <Link
            to="/admin"
            style={
              isAdmin ? { textDecoration: "none" } : { visibility: "hidden" }
            }
          >
            <Button
              variant="contained"
              disableElevation
              style={{
                width: "45px",
                height: "35px",
                fontSize: "11px",
                padding: "0",
              }}
            >
              ADMIN
            </Button>
          </Link>

          {!isLogin ? (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                disableElevation
                style={{
                  width: "45px",
                  height: "35px",
                  fontSize: "11px",
                  padding: "0",
                }}
              >
                로그인
              </Button>
            </Link>
          ) : (
            <Link to="/mypage" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                disableElevation
                style={{
                  width: "45px",
                  height: "35px",
                  fontSize: "11px",
                  padding: "0",
                }}
              >
                내정보
              </Button>
            </Link>
          )}
          {!isLogin ? (
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                disableElevation
                style={{
                  width: "45px",
                  height: "35px",
                  fontSize: "11px",
                  padding: "0",
                }}
              >
                회원가입
              </Button>
            </Link>
          ) : (
            <Button
              variant="contained"
              disableElevation
              onClick={logout}
              style={{
                width: "45px",
                height: "35px",
                fontSize: "11px",
                padding: "0",
              }}
            >
              로그아웃
            </Button>
          )}
        </div>
      </Head>
    </HeadContainer>
  );
}

export default Header;
