import axios from "axios";

export async function emailCheck(email) {
  const url = "api/users/emailCheck.do";

  await axios
    .post(url, {
      userEmail: email,
    })
    .then((response) => {
      sessionStorage.setItem("email_check", response.data);
    })
    .catch((error) => console.log(error));
}
