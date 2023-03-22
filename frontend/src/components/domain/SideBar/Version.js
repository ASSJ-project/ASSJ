import "../SideBar/SideBar.css"

const Notice = (props) =>{
    
    const side = () =>{
        props.side(1);    
    };

    return(
        <div className="side-body">
            <div className="sidebox2"> 
                Beta 0.00.0 ver <br/>
                제작자 : 알 쓸 신 잡
            </div>
            <button onClick={side} className="sidebox" >뒤로가기</button>
        </div>
    );
}

export default Notice;

