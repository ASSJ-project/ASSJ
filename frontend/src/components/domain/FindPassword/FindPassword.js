import "./FindPassword.css";
import FindPasswordHeader from "./FindPasswordHeader";
import FindPasswordInput from "./FindPasswordInput";
import FindPasswordButton from "./FindPasswordButton";


function FindPassword() {
    return(
        <>
            <FindPasswordHeader title="Forgot Password" content="Enter ther email address associated with your account"/>
            <FindPasswordInput  inputText="Email" placeholder="example@example.com"/>
            <FindPasswordButton text="Proceed"/>
        </>
    ) 
}

export default FindPassword