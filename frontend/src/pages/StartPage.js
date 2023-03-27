// coding by 'ikki'
import "../components/domain/Start/StartPage.css";
import logo from "../assets/images/logo.svg";

function StartPage() {
  return (
    <>
      <div className="start-container">
        <div className="logo-item">
          <img id="logo" src={logo} alt="logo-img" />
        </div>

        <div className="btn-item">
          <button
            className="btn"
            onClick={() => (window.location.href = "/login")}
          >
            <p>로그인</p>
          </button>
          <button
            className="btn"
            onClick={() => (window.location.href = "/register")}
          >
            <p>회원가입</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default StartPage;
