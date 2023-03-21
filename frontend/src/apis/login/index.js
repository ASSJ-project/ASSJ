// api로 호출 할 데이터
import axios from "axios";

export async function loginDo(e, p) {
    const url = "api/users/login.do";
    let token = null;
    await axios
      .post(url, {
        userEmail: e,
        userPassword: p,
      })
      .then((response) => {
        token = response.data;
      })
      .catch((error) => console.log(error));
  
    console.log(token);
  }