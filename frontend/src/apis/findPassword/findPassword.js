import axios from "axios";

export async function findPassword(email) {
  const url = "api/users/emailCheck.do";
  let result = false;
  await axios
    .post(url, {
      userEmail: email,
    })
    .then((response) => {
      result = response.data;
      sessionStorage.setItem("email_check", result);
    })
    .catch((error) => console.log(error));
}
