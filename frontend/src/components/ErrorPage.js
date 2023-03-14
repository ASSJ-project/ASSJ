import "../static/css/ErrorPage.css";
import logo2 from "../static/images/Error-logo.PNG";
import logo from "../static/images/mainlogo.png";
import { Link } from "react-router-dom";

const ErrorPage =() => {
  return (
    <div className="main">
      <Head/>
      <Body/>
    </div>
  );
}

export default ErrorPage;


// 물병 밑에 나오는 부분 컴포넌트입니다 ^0^
function Body(){
  return(
    <>
      <h2 className="sorry">주소가 잘못입력되었습니다!<br/></h2>
      <p className="sorry">주소를 다시 입력하시거나</p>
      <p className="sorry"> 홈 버튼을 눌러주세요! </p>
      <Link to="/" className="retry" >Home</Link>
    </>
  );
}

// 위에있는 이미지 첨가부분입니다.
function Head(){
  return(
    <>
      <header className="App-header">
        <img src={logo} className="Logo"/>
        <img src={logo2} className="App-logo" alt="logo" />
      </header>
    </>
  );
}