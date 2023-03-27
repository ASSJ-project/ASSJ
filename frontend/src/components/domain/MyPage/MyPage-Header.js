import { Link } from "react-router-dom";
import frame from "../../../assets/images/Error-Frame1.png"
import mypagelogo from "../../../assets/images/logo_only_word.svg"
import { useState } from "react";
import "../MyPage/MyPage.css"

export default function MyPageHeader(props){

  const[tab, setTab] = useState(false)

    const mypage1 = () => {
      props.getMyPage1(false);
      setTab(false);
    }

    const mypage2 = () =>{
      props.getMyPage2(true);
      setTab(true);
    }

  
    return(
        <>
          {/* <div className="mypage-head">
        <Link to="/sidebar" className="mypage-head-left-items"><img src={frame}/></Link>
        <div className="mypage-head-left-items2"><img src={mypagelogo} className="mypagelogo"></img></div>
        <Link to='/map' className="mypage-head-right-items" style={{ textDecoration: "none" }}>Home</Link>
      </div> */}
      <div className='mypage-mypage'>MY PAGE</div>
      <div className="mypage-clickmenu">
        <button className={tab ? "mypage-myinfo2" : "mypage-myinfo1"} onClick={mypage1}>내정보</button>
        <button className={tab ? "mypage-myinfo1" : "mypage-myinfo2"} style={{ textDecoration: "none" }} onClick={mypage2}>최근 조회 기록</button>
      </div>
      </>
    );
};