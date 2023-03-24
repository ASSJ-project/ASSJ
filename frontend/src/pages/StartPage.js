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
            <h1>로그인</h1>
          </button>
          <button
            className="btn"
            onClick={() => (window.location.href = "/register")}
          >
            <h1>회원가입</h1>
          </button>
        </div>
      </div>
    </>
  );
}

export default StartPage;
