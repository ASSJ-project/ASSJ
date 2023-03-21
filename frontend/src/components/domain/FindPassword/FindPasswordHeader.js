import backbtn from "../../../assets/images/backbtn.png"


export default function FindPasswordHeader(props) {
    return(
        <>
            <div className="div1">
                <img src={backbtn} className="backbtn"/>
                <span>{props.title}</span>
            </div>

            <div className="div2">
                <span>{props.title}</span>
                <p>{props.content}</p>
            </div>
        </>
    )
}