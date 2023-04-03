import axios from "axios";

export async function getUser(page, limit) {
  const url = `api/users/all?page=${page}&limit=${limit}`;
  const token = sessionStorage.getItem("access_token");
  const refresh = sessionStorage.getItem("refresh_token");
  try {
    const result = await axios.get(url, {
      headers: {
        authorization: "Bearer " + token + " " + refresh,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
}
