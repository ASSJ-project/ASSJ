import "../components/domain/Error/ErrorPage.css"
import logo2 from "../assets/images/Error-logo.PNG";
import logo from "../assets/images/mainlogo.png";
import { Link } from "react-router-dom";

const ErrorPage =() => {
  return (
      <div className="Error">
          <div className="Error-logo">
            <img src={logo} alt="logo" className="logo1"/>
          </div>  
          <div className="Error-logo">  
            <img src={logo2} alt="logo2" className="logo2"/>
          </div>        
          <div className="text-wrap">
            <h2>주소가 잘못입력되었습니다!</h2>
            <h3>주소를 다시 입력하시거나<br/>
            홈 버튼을 눌러주세요! </h3>
          </div>
          <Link to="/" className="noe" >Home</Link>
        </div>
  );
}

export default ErrorPage;


/* <div className="logo2">
          <img src={logo2} alt="logo2"/>
          </div> */