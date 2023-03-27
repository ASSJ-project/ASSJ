import axios from "axios";

export async function emailCheck(email) {
  const url = "api/users/emailCheck.do";
  sessionStorage.removeItem("email_check");
  await axios
    .post(url, {
      userEmail: email,
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => console.log(error));
}
