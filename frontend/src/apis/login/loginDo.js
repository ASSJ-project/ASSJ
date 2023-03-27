// api로 호출 할 데이터
import axios from "axios";

export async function loginDo(e, p) {
  const url = "api/users/login.do";
  sessionStorage.removeItem("access_token");
  await axios
    .post(url, {
      userEmail: e,
      userPassword: p,
    })
    .then((response) => {
      if (response.data) {
        sessionStorage.setItem("access_token", response.data);
        window.location.href = "map";
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => console.log(error));
}
