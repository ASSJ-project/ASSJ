import "../components/domain/SideBar/SideBar.css"
import { useState } from "react";
import SideHeader from "../components/domain/SideBar/SideHeader";
import SideMain from "../components/domain/SideBar/SideMain";
import Notice from "../components/domain/SideBar/Notice";
import Version from "../components/domain/SideBar/Version"

const SideBar = () =>{
    const [test,setTest] = useState(1);

    const notice = (number) => {
        setTest(number);
    }
    const version = (number) => {
        setTest(number);
    }
    const side = (number) => {
        setTest(number);
    }

    return(
        <div className="side-main">
            <SideHeader/>   
            {(function(){    
             if(test === 1){
                return <SideMain notice={notice} version={version}/>
             }else if(test === 2){
                return <Notice side={side}/>
             }else if(test === 3){
                return <Version side={side}/>
             }   
            })()}
        </div>
    );
}

export default SideBar;
