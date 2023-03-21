import MyPageInfo from "../components/domain/MyPage/MyPage-Info";
import MyPageCheck from "../components/domain/MyPage/MyPage-Check";
import MyPageHeader from "../components/domain/MyPage/MyPage-Header";
import { useState } from "react";
import "../components/domain/MyPage/MyPage.css"

export default function(){
    const [value, setValue] = useState(false);

    const getMyPage1 = (text) =>{
        setValue(text);
    }

    const getMyPage2 = (text) =>{
        setValue(text);
    }
    
    return(
        <div className="MyPage-Main">
            <MyPageHeader getMyPage1={getMyPage1} getMyPage2={getMyPage2}/>
            {value == true ? <MyPageCheck/> : <MyPageInfo/> }
        </div>
    );
}