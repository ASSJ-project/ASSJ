import axios from "axios";

export async function passwordChange(password) {
  const url = "api/users/passwordChange.do";
  token = sessionStorage.getItem("access_token");

  try {
    const result = await axios.post(url, {
      headers: {
        authorization: "Bearer " + token,
      },
      body: {
        userPassword: password,
      },
    });
    return result.data;
  } catch {}
}
