import "../static/css/SideBar.css"
import logo from "../static/images/mainlogo.png"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const SideBar = () =>{
    return(
        <div  className="main">
            <Head/>
            <Body/>
        </div>
    );
}

export default SideBar;


function Head(){ // 이 친구는 윗부분에 있는 컴포넌트에용
    return(
        <>
        <header className="App-header">
         <img src={logo} className="Logo"/>
        </header>
        </>
    );
}

function Body(){
    const navigate = useNavigate();

    function logout(){
        sessionStorage.clear();
    }

    return(
        <div className="body">
            <Link to="/Main"><div className="box">메인 페이지</div></Link>  
            <Link to="/MyPage"><div className="box">마이 페이지</div></Link>
            <Link to="/Notice"><div className="box">공지사항</div></Link>
            <div className="box">버전 정보</div>
            <div className="woo">
                <div onClick={() => navigate(-1)}>뒤로가기</div>
                <div onClick={logout}>로그아웃</div>
            </div>    
        </div>
    );
}