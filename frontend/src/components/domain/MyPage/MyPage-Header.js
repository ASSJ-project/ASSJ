import { Link } from "react-router-dom";
import frame from ".../assets/images/Error-Frame1.png";
// import { useState } from "react";


export default function MyPageHeader(yam){

    // let[yam,setYam] = useState(false)

    // function info(){
    //   return(
    //   setYam(true)
    //   );
    // }

    // function yam(){
    //   return(
    //     setYam(false)
    //   )
    // }



    return(
        <>
        <div className="MyPage-Head2">
          <Link to="/SideBar" className="left-items3"><img src={frame} className="oo"/></Link>
          <div className="left-items4">알쓸신잡</div>
          <Link to='/Main' className="right-items2" style={{ textDecoration: "none" }}>Home</Link>
        </div>
        <div className='MyPage2'>MY PAGE</div>
        <div className="ff">
          <button className="myinfo3" >내정보</button>
          <button className="myinfo4" style={{ textDecoration: "none" }}>최근 조회 기록</button>
        </div>
        </>
    );
};