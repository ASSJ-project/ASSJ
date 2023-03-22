import "../SideBar/SideBar.css"

const Notice = (props) =>{
    
    const side = () =>{
        props.side(1);    
    };

    return(
        <div className="side-body">
            <div className="sidebox2"> 
                친애하는 앱을 사용하시는 여러분<br/>
                이 앱을 사용해주셔서 감사합니다<br/>
                베타 테스트 중입니다 <br/>
                나는 이앱을 사용중입니다.<br/>
                아리가또 앤 고자이닷흐<br/>
                야미데스<br/>
                좋은하루되세요<br/>
            </div>
            <button onClick={side} className="sidebox" >뒤로가기</button>
        </div>
    );
}

export default Notice;

