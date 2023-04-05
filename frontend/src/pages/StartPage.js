// coding by 'ikki'
import "../components/domain/Start/StartPage.css";
import logo from "../assets/images/logo.svg";
import { useEffect } from "react";
import Button from "@mui/material/Button";

function StartPage() {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <>
      <div className="start-container">
        <div className="logo-item">
          <img id="logo" src={logo} alt="logo-img" />
        </div>

        <div className="btn-item">
          <Button
            variant="contained"
            className="btn-lo"
            onClick={() => (window.location.href = "/login")}
          >
            <p>로그인</p>
          </Button>
          <Button
            variant="contained"
            className="btn-re"
            onClick={() => (window.location.href = "/register")}
          >
            <p>회원가입</p>
          </Button>
        </div>
      </div>
    </>
  );
}

export default StartPage;
