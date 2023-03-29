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

export async function registerDo(e, p, a, n) {
  const url = "api/users/register.do";

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
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}
