


export default function FindPasswordInput(props) {
    return(
        <>
            <div className="div3">
                <p>{props.inputText}</p>
                <input placeholder={props.placeholder} />
            </div>
        </>
    )
}