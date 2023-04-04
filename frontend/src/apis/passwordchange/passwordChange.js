import axios from "axios";

export async function passwordChange(email, password) {
  const url = "api/users/passwordChange.do";
  try {
    const result = await axios.post(url, {
      userPassword: password,
      userEmail: email
    });
    if(result.data == 1) {
      alert("비밀번호가 변경되었습니다.")
      window.location.href = "/login"
    }
    return result.data;
  } catch {}
}
