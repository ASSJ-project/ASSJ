import axios from "axios";
import Swal from "sweetalert2";

export async function passwordChange(email, password) {
  const url = "api/users/passwordChange.do";
  try {
    const result = await axios.post(url, {
      userPassword: password,
      userEmail: email
    });
    if(result.data == 1) {
      Swal.fire({
        icon: "success",
        title : "비밀번호가 변경되었습니다."
      }).then(function(){
      window.location.href = "/login"
      });
    }
    return result.data;
  } catch {}
}
