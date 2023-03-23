import "./Header.css";
import StartPage from "../../../pages/StartPage";
import RegisterPage from "../../../pages/RegisterPage";
import frame from "../../../assets/images/Error-Frame1.png";

// import { FiMenu, FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";
import title_img from "../../../assets/images/logo_only_word.svg";

function Header({ title, link_text }) {
  return (
    <div className="header_container">
      {/* 햄버거버튼, 타이틀, 홈으로 */}
      <div className="header">
        <Link to="/">
          <img src={frame} />
        </Link>
        <Link to="/">
          <img id="title_img" src={title_img} width="280em" alt="title_img" />{" "}
        </Link>
        <button className="link">{link_text}</button>
      </div>
      <div>
        {/* header '알쓸신잡' 우측 BTN = '홈으로' 일때 하단 div노출, '회원가입'일때 노출X */}
        {link_text == "HOME" ? <div className="title">{title}</div> : null}
      </div>
    </div>
  );
}
export default Header;
