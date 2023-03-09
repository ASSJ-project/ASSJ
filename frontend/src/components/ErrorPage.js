import "./error.css";
import logo2 from "./error.PNG";
import frame from "./Frame1.png";

function ErrorPage() {
  return (
    <div className="main">
      <span className="App-title">알쓸신잡</span>
      <button className="yami">회원가입</button>
      <header className="App-header">
        <img src={frame} className="Hug"></img>
        <img src={logo2} className="App-logo" alt="logo" />
      </header>
      <h2 className="sorry">Sorry!</h2>
      <p className="sorry">e is temporarily unavailable due to technic</p>
      <p className="sorry"> Please try again later</p>
      <button type="button" className="retry">
        Retry
      </button>
    </div>
  );
}

export default ErrorPage;
