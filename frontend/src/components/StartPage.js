import "../static/css/StartPage.css";
import logo from "../static/images/nuki02.png";

function StartPage() {
  return (
    <div className="start_page">
      <div className="item">
        <img id="logo" src={logo} alt="logo-img" />
      </div>
      <div className="item">
        <a href="http://naver.com">
          <button className="btn" onClick="<Home />">
            Log in
          </button>
        </a>
        <a href="http://naver.com">
          <button className="btn" onClick="<Home />">
            Sigh up
          </button>
        </a>
      </div>
    </div>
  );
}

export default StartPage;
