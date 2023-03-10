import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../static/css/Notice.css"

const Notice = () =>{
    return(
        <Body/>
    );
}

export default Notice;

function Body(){
    const navigate = useNavigate();

    return(
        <div className="main">
            <div className="you"> 친애하는 앱을 사용하시는 여러분<br/>
                  이 앱을 사용해주셔서 감사합니다<br/>
                  너무좋아요 <br/>
                  나는 이앱을 사용중입니다.<br/>
                  아리가또 앤 고자이닷흐<br/>
                  야미데스
            </div>
            <div className="woo">
                <div onClick={() => navigate(-1)}>뒤로가기</div>
                <Link to="/Main"><div>메인으로</div></Link>
            </div>    
        </div>
    );
}