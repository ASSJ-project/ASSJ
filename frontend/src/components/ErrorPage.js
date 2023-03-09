import "../static/css/ErrorPage.css";
import logo2 from "../static/images/Error-logo.PNG";
import frame from "../static/images/Error-Frame1.png";

const clickMe = () => {
  document.location.href('/')
}

const ErrorPage =() => {
  return (
    <div className="main">
      <span className="App-title">알쓸신잡</span>
      <button className="yami">회원가입</button>
      <header className="App-header">
        <img src={frame} className="Hug"></img>
        <img src={logo2} className="App-logo" alt="logo" />
      </header>
      <h2 className="sorry">주소가 잘못입력되었습니다!</h2>
      <p className="sorry">주소를 다시 입력하시거나</p>
      <p className="sorry"> 홈 버튼을 눌러주세요! </p>
      <button type="button" className="retry" onClick={clickMe}>
      Home
      </button>
    </div>
  );
}

export default ErrorPage;
