import "./StartPage.css";
import logo from "./static/logo-img.png";

function StartPage() {
  return (
    <div className="start_page">
      <div className="item">
        <img id="logo" src={logo} alt="logo-img" />
      </div>
      <div className="item">
        <button className="btn">Log in</button>
        <button className="btn">Sign up</button>
      </div>
    </div>
  );
}

export default StartPage;
