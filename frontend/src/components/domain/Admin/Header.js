import { FiMenu, FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";
import title_img from "../static/images/logo_only_word.svg";

function Header({ title }) {
  return (
    <div className="header_container">
      {/* 햄버거 메뉴아이콘, 타이틀 */}
      <div className="header">
        <FiMenu size="1.2em" />
        <Link to="/">
          <img id="title_img" src={title_img} width="280em" alt="title_img" />{" "}
        </Link>
        <Link to="/">
          <FiHome className="home_link" size="2.2em" />
        </Link>
      </div>
      <div>
        <div className="title">{title}</div>
      </div>
    </div>
  );
}
export default Header;
