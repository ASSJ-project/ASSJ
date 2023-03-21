import "./FindPassword.css";
import FindPasswordHeader from "./FindPasswordHeader";
import FindPasswordInput from "./FindPasswordInput";
import FindPasswordButton from "./FindPasswordButton";


function EmailVerification() {
    return(
        <>
            <FindPasswordHeader title="Email Verification" content="please enter the 4 digit code send to your email Address"/>
            <FindPasswordInput  inputText="Email Verification" placeholder="123456"/>
            <FindPasswordButton text="Verify"/>
        </>
    ) 
}

export default EmailVerification