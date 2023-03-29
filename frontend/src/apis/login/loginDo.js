// api로 호출 할 데이터
import axios from "axios";

export async function loginDo(e, p) {
  const url = "api/users/login.do";
  sessionStorage.removeItem("access_token");
  try {
    const result = await axios.post(url, {
      userEmail: e,
      userPassword: p,
    });
    if (result.data) {
      sessionStorage.setItem("access_token", result.data);
      window.location.href = "map";
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}
