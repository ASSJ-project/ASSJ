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
  const url = "api/login.do";
  let token = null;
  await axios
    .post(url, {
      email: e,
      password: p,
    })
    .then((response) => {
      token = response.data;
    })
    .catch((error) => console.log(error));

  console.log(token);
}

export async function registerDo(e, p, a) {
  const url = "api/register.do";
  let result = false;
  await axios
    .post(url, {
      email: e,
      password: p,
      user_address: a,
    })
    .then((response) => {
      result = response.data;
    })
    .catch((error) => console.log(error));

  console.log(result);
}
