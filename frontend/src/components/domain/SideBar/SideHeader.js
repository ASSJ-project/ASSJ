import logo from "../../../assets/images/logo_only_word.svg"
import "../SideBar/SideBar.css"

export default function SideHeader(){
    return(
        <header>
            <img src={logo} className="Logo"/>
        </header>
    );
}

//"../../static/images/logo_only_word.svg"