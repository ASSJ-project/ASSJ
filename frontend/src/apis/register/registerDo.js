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
      result = response.data;
    })
    .catch((error) => console.log(error));

  console.log(result);
}
