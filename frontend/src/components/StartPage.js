import "../static/css/StartPage.css";
import logo from "../static/images/nuki02.png";
import { Link } from "react-router-dom";

function StartPage() {
  return (
    <div className="start_page">
      <div className="item">
        <img id="logo" src={logo} alt="logo-img" />
      </div>

      {/* 버튼: 로그인, 회원가입 */}
      <div className="item">
        <Link to="/login">
          <button className="btn">
            <h1>Log in</h1>
          </button>
        </Link>
        <Link to="/SignUp">
          <button className="btn">
            <h1>Sign up</h1>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default StartPage;
