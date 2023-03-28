import "@/components/domain/Error/ErrorPage.css";
import logo2 from "assets/images/Error-logo.PNG";
import logo from "assets/images/logo_only_word.svg";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

const ErrorPage = () => {
  return (
    <div className="Error">
      <div className=".Error-logo">
        <div>
          <img src={logo} alt="Error-logo1" className="Error-logo1" />
        </div>
        <div>
          <img src={logo2} alt="Error-logo2" className="Error-logo2" />
        </div>
      </div>
      <div className="Error-text">
        <h2>주소가 잘못되었습니다!</h2>
        <h3>
          주소를 확인하거나
          <br />홈 버튼을 눌러주세요!{" "}
        </h3>
      </div>

      <Link to="/">
        <Button className="Error-home" variant="contained">
          Home
        </Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
