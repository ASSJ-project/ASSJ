// api로 호출 할 데이터
import axios from "axios";

export async function snsLoginDo(id) {
  const url = "api/users/snslogin.do";
  try {
    const result = await axios.post(url, {
      userId: id,
    });
    if (result.status === 200) {
      if (result.data === "") return false;
      sessionStorage.setItem("role", result.data);
      sessionStorage.setItem("login", true);
      window.location.href = "map";
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}
