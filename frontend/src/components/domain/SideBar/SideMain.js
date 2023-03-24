import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../SideBar/SideBar.css"

export default function SideMain(props){
    const navigate = useNavigate();

    function logout(){
        sessionStorage.clear();
    }

    const notice = () => {
        props.notice(2);
    }

    const version = () => {
        props.version(3);
    }

    return(
        <div className="side-body">
            <Link to="/map" className="sidebox">메인 페이지(아마 맵으로 보낼거같습니다)</Link>  
            <Link to="/mypage" className="sidebox">마이 페이지</Link>
            <button className="sidebox" onClick={notice}>공지사항</button>
            <button className="sidebox" onClick={version}>버전 정보</button>
            <div className="sidemenu">
                <div onClick={() => navigate(-1)} className="sideback">뒤로가기</div>
                <div onClick={logout} className="sidelogout">로그아웃</div>
            </div>  
        </div>  
    );
}
