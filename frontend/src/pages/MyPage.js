import MyPageInfo from "./MyPage-Info";
import MyPageCheck from "./MyPage-Check";
import MyPageHeader from "./MyPage-Header";
// import { useState } from "react";
import "../components/domain/MyPage/MyPage.css"

export default function(){

    // const[ls,setLs] = useState[false]

    return(
        <div className="MyPage-Main2">
            <MyPageHeader/>
            <MyPageCheck/>
        </div>
    );
}