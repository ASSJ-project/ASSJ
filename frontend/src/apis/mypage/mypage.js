import axios from "axios";

export async function getUser() {
  const url = "api/users/getUser";
  const token = sessionStorage.getItem("access_token");
  try {
    const result = await axios.get(url, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
}
