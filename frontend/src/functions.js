import axios from "axios";

export async function callApi(url) {
  let dataSet = null;
  await axios
    .get(url, {
      // Header: {},
      // Payload: {},
    })
    .then((response) => {
      dataSet = response.data;
    })
    .catch((error) => console.log(error));

  return dataSet;
}

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
  //로그인 성공
  if (token != null) {
    sessionStorage.setItem(e, token);
    sessionStorage.setItem(token, true);
  }
  // console.log(token);
  // return token;
}

export async function registerDo(e, p, a) {
  const url = "api/users/register.do";
  let result = false;
  await axios
    .post(url, {
      userEmail: e,
      userPassword: p,
      userAddress: a,
    })
    .then((response) => {
      result = response.data;
    })
    .catch((error) => console.log(error));

  console.log(result);
}
