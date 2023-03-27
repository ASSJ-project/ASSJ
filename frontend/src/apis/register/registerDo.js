import axios from "axios";
export async function registerDo(e, p, a, n) {
  const url = "api/users/register.do";
  let result = false;
  await axios
    .post(url, {
      userEmail: e,
      userPassword: p,
      userAddress: a,
      userName: n,
    })
    .then((response) => {
      if (response.data) window.location.href = "login";
      return true;
      return true;
    })
    .catch((error) => console.log(error));

  console.log(result);
}
