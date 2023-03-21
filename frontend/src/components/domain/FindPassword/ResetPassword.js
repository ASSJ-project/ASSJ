import "./FindPassword.css";
import FindPasswordHeader from "./FindPasswordHeader";
import FindPasswordInput from "./FindPasswordInput";
import FindPasswordButton from "./FindPasswordButton";

{/* <FindPasswordInput  inputText="Confirm Password" placeholder="Confirm Password"/> */}
function ResetPassword() {
    return(
        <>
            <FindPasswordHeader title="Reset Password" content="Your new password must be different from previously used password"/>
            <FindPasswordInput  inputText="New Password" placeholder="New Password"/>
            <FindPasswordButton text="Update Password"/>
        </>
    ) 
}

export default ResetPassword